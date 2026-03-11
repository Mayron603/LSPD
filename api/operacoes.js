import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';
import { verificarToken } from './_lib/auth.js'; 
import { enviarWebhookDiscord } from './_lib/discord.js';

export default async function handler(req, res) {
  const usuarioLogado = verificarToken(req, res);
  if (!usuarioLogado) return; 

  const client = await clientPromise;
  const db = client.db("lspd_database");
  const collection = db.collection("operacoes");

  // ATENÇÃO: COLE AQUI O LINK DO SEU WEBHOOK DE OPERAÇÕES
  const WEBHOOK_OPERACOES = "https://discord.com/api/webhooks/1481344171703795856/kKB_68r6dkZjamQMBT-eFVs0XnptoyIeX2eAegujvYLMyQwqkJvcSW5IsEUIF92eo0r1";

  try {
    // LER (BUSCAR TODOS)
    if (req.method === 'GET') {
      const operacoes = await collection.find({}).sort({ data: -1 }).toArray();
      return res.status(200).json(operacoes);
    }

    // CRIAR NOVA OPERAÇÃO
    if (req.method === 'POST') {
      const novaOperacao = { ...req.body, data: new Date().toISOString() };
      const resultado = await collection.insertOne(novaOperacao);

      // --- NOTIFICAÇÃO DISCORD: NOVA OPERAÇÃO ---
      try {
        const embed = {
          title: `📋 NOVA OPERAÇÃO REGISTRADA`,
          color: 3447003, // Azul Policial
          description: `A operação **${novaOperacao.nome.toUpperCase()}** foi inserida no sistema de planeamento tático.\n\n> **📍 Local / Alvo:**\n> ${novaOperacao.local || "Não informado"}`,
          fields: [
            { name: "🏷️ Código", value: `\`${novaOperacao.codigo || "OP-XXX"}\``, inline: true },
            { name: "👮 Comandante", value: `\`${novaOperacao.comandante || "N/A"}\``, inline: true },
            { name: "📊 Status", value: `\`${novaOperacao.status || "Planejada"}\``, inline: true },
            { name: "⚠️ Nível de Risco", value: `\`${novaOperacao.risco || "Médio"}\``, inline: true },
            { name: "📅 Data e Hora", value: `\`${novaOperacao.dataHorario || "A definir"}\``, inline: true }
          ],
          footer: { text: "Terminal LSPD-OS v5.1 // Planeamento Tático" },
          timestamp: new Date().toISOString()
        };
        await enviarWebhookDiscord(WEBHOOK_OPERACOES, embed);
      } catch (err) {
        console.error("Falha ao enviar notificação de nova operação:", err);
      }

      return res.status(201).json({ ...novaOperacao, _id: resultado.insertedId });
    }

    // ATUALIZAR (EDITAR E MUDANÇA DE STATUS)
    if (req.method === 'PUT') {
      const { _id, ...updateData } = req.body;
      
      // Busca a operação antiga para saber se o status mudou
      const operacaoAntiga = await collection.findOne({ _id: new ObjectId(_id) });
      
      await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );

      // --- NOTIFICAÇÃO DISCORD: MUDANÇA DE STATUS ---
      if (operacaoAntiga && updateData.status && operacaoAntiga.status !== updateData.status) {
        try {
          const statusLimpo = updateData.status.toLowerCase();
          let corEmbed = 3447003; // Azul padrão
          let tituloEmbed = `🔄 STATUS DA OPERAÇÃO ATUALIZADO`;
          let statusText = updateData.status.toUpperCase();

          // Define as cores e títulos baseado no novo status
          if (statusLimpo.includes('aprovada')) {
            corEmbed = 3066993; // Verde (Aprovada)
            tituloEmbed = `✅ OPERAÇÃO APROVADA`;
          } else if (statusLimpo.includes('cancelada')) {
            corEmbed = 15158332; // Vermelho (Cancelada)
            tituloEmbed = `❌ OPERAÇÃO CANCELADA`;
          } else if (statusLimpo.includes('concluída') || statusLimpo.includes('concluida')) {
            corEmbed = 9807270; // Cinza/Escuro (Concluída)
            tituloEmbed = `🏁 OPERAÇÃO CONCLUÍDA`;
          } else if (statusLimpo.includes('andamento')) {
            corEmbed = 15844367; // Dourado/Laranja (Em andamento)
            tituloEmbed = `🚨 OPERAÇÃO EM ANDAMENTO`;
          }

          const embedAtualizacao = {
            title: tituloEmbed,
            color: corEmbed,
            description: `A operação **${updateData.nome || operacaoAntiga.nome}** teve o seu status alterado pelo Alto Comando.`,
            fields: [
              { name: "🏷️ Código", value: `\`${updateData.codigo || operacaoAntiga.codigo}\``, inline: true },
              { name: "👮 Comandante", value: `\`${updateData.comandante || operacaoAntiga.comandante}\``, inline: true },
              { name: "📊 Novo Status", value: `\`${statusText}\``, inline: true }
            ],
            footer: { text: "Terminal LSPD-OS v5.1 // Comando Geral" },
            timestamp: new Date().toISOString()
          };
          await enviarWebhookDiscord(WEBHOOK_OPERACOES, embedAtualizacao);
        } catch (err) {
          console.error("Falha ao enviar notificação de atualização de operação:", err);
        }
      }

      return res.status(200).json({ message: 'Operação atualizada com sucesso' });
    }

    // APAGAR (DELETAR)
    if (req.method === 'DELETE') {
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: 'Removido com sucesso' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}