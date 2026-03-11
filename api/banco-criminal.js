import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';
import { verificarToken } from './_lib/auth.js'; 
import { enviarWebhookDiscord } from './_lib/discord.js'; 

export default async function handler(req, res) {
  const usuarioLogado = verificarToken(req, res);
  if (!usuarioLogado) return; 

  try {
    const client = await clientPromise;
    const db = client.db("lspd_database"); 
    const collection = db.collection("fichas_criminais");

    // ATENÇÃO: COLE AQUI O SEU LINK DA FIB
    const WEBHOOK_FIB = "https://discord.com/api/webhooks/1481343465475412149/TZf3uy1hPbJ4HY_PIYcp9kG33GN9MtfWT68-PEVT96w6Xkw0HQ_SJF-fnlQYGyialeTP";

    if (req.method === 'GET') {
      const fichas = await collection.find({}).toArray();
      return res.status(200).json(fichas);
    }

    // CRIAR NOVO
    if (req.method === 'POST') {
      const novaFicha = req.body;
      const fichaParaInserir = {
        ...novaFicha,
        dataRegistro: new Date().toISOString(),
        criadoPor: usuarioLogado.nome || 'Oficial Desconhecido',
        criadoPorId: usuarioLogado.id || null
      };
      const result = await collection.insertOne(fichaParaInserir);

      const statusLimpo = fichaParaInserir.status ? String(fichaParaInserir.status).trim().toLowerCase() : '';

      if (statusLimpo === 'procurado' || statusLimpo === 'foragido') {
        try {
          const nomeAlvo = fichaParaInserir.nome ? fichaParaInserir.nome.toUpperCase() : "DESCONHECIDO";
          const vulgoAlvo = fichaParaInserir.apelido ? fichaParaInserir.apelido.toUpperCase() : "NENHUM";
          
          const embed = {
            title: `⚖️ DEPARTAMENTO DE JUSTIÇA - MANDADO DE PRISÃO`,
            color: 15548997, // Vermelho Sangue
            description: `Um novo mandado foi emitido e encontra-se **ATIVO** no sistema central.\n\n> **ALVO:** ${nomeAlvo}\n> **VULGO:** ${vulgoAlvo}`,
            fields: [
              { name: "🛂 Passaporte (ID)", value: `\`${fichaParaInserir.passaporte || "N/A"}\``, inline: true },
              { name: "⚠️ Risco / Ameaça", value: `\`${fichaParaInserir.periculosidade || "N/A"}\``, inline: true },
              { name: "🛑 Status", value: `\`${fichaParaInserir.status.toUpperCase()}\``, inline: true },
              { name: "👮 Oficial Emissor", value: `\`${fichaParaInserir.criadoPor}\``, inline: false }
            ],
            footer: { text: "Terminal FIB // Bureau de Investigações" },
            timestamp: new Date().toISOString()
          };
          await enviarWebhookDiscord(WEBHOOK_FIB, embed);
        } catch (err) {
          console.error("Erro interno ao enviar webhook (POST):", err);
        }
      }

      return res.status(201).json({ success: true, message: 'Ficha criada com sucesso', id: result.insertedId });
    }

    // ATUALIZAR (EDITAR)
    if (req.method === 'PUT') {
      const { _id, ...updateData } = req.body; 
      
      const dadosAtualizados = {
        ...updateData,
        atualizadoPor: usuarioLogado.nome || 'Oficial Desconhecido',
        dataAtualizacao: new Date().toISOString()
      };

      await collection.updateOne(
        { _id: new ObjectId(_id) }, 
        { $set: dadosAtualizados }
      );

      const statusLimpo = dadosAtualizados.status ? String(dadosAtualizados.status).trim().toLowerCase() : '';

      if (statusLimpo === 'procurado' || statusLimpo === 'foragido') {
        try {
          const nomeAlvo = dadosAtualizados.nome ? dadosAtualizados.nome.toUpperCase() : "DESCONHECIDO";
          const vulgoAlvo = dadosAtualizados.apelido ? dadosAtualizados.apelido.toUpperCase() : "NENHUM";

          const embed = {
            title: `⚠️ ATUALIZAÇÃO DE MANDADO DE PRISÃO`,
            color: 15844367, // Laranja Alerta
            description: `O dossiê do cidadão foi atualizado e o mandado continua **ATIVO**.\n\n> **ALVO:** ${nomeAlvo}\n> **VULGO:** ${vulgoAlvo}`,
            fields: [
              { name: "🛂 Passaporte (ID)", value: `\`${dadosAtualizados.passaporte || "N/A"}\``, inline: true },
              { name: "⚠️ Risco / Ameaça", value: `\`${dadosAtualizados.periculosidade || "N/A"}\``, inline: true },
              { name: "🛑 Status", value: `\`${dadosAtualizados.status.toUpperCase()}\``, inline: true },
              { name: "🔄 Atualizado Por", value: `\`${dadosAtualizados.atualizadoPor}\``, inline: false }
            ],
            footer: { text: "Terminal FIB // Bureau de Investigações" },
            timestamp: new Date().toISOString()
          };
          await enviarWebhookDiscord(WEBHOOK_FIB, embed);
        } catch (err) {
          console.error("Erro interno ao enviar webhook (PUT):", err);
        }
      }

      return res.status(200).json({ message: 'Ficha atualizada com sucesso' });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: 'Removido com sucesso' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (error) {
    console.error("Erro na API de Banco Criminal:", error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}