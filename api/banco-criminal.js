import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';
import { verificarToken } from './_lib/auth.js';

export default async function handler(req, res) {
  // BLINDAGEM MÁXIMA: Verifica o crachá digital antes de qualquer coisa
  const usuarioLogado = verificarToken(req, res);
  if (!usuarioLogado) return;

  try {
    const client = await clientPromise;
    const db = client.db("lspd_database"); 
    const collection = db.collection("fichas_criminais");

    // LER (BUSCAR TODOS)
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
        // INJEÇÃO DA AUDITORIA: Salva quem criou
        criadoPor: usuarioLogado.nome || 'Oficial Desconhecido',
        criadoPorId: usuarioLogado.id || null
      };
      
      const result = await collection.insertOne(fichaParaInserir);
      return res.status(201).json({ success: true, message: 'Ficha criada com sucesso', id: result.insertedId });
    }

    // ATUALIZAR (EDITAR)
    if (req.method === 'PUT') {
      const { _id, ...updateData } = req.body; 
      
      await collection.updateOne(
        { _id: new ObjectId(_id) },
        { 
          $set: { 
            ...updateData,
            // INJEÇÃO DA AUDITORIA: Salva quem foi o último a editar
            atualizadoPor: usuarioLogado.nome || 'Oficial Desconhecido',
            dataAtualizacao: new Date().toISOString()
          } 
        }
      );
      return res.status(200).json({ message: 'Ficha atualizada com sucesso' });
    }

    // APAGAR (DELETAR)
    if (req.method === 'DELETE') {
      const { id } = req.query;
      // Dica RP: Num sistema mais avançado, poderíamos fazer um "Soft Delete" (marcar como apagado)
      // para que os deuses (Admin) vejam quem tentou apagar. Mas vamos manter o original por agora.
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