import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("lspd_database");
    const relatoriosColl = db.collection("relatorios");

    // BUSCAR TODOS OS RELATÓRIOS
    if (req.method === 'GET') {
      // Ordenar do mais recente para o mais antigo (data de criação)
      const relatorios = await relatoriosColl.find({}).sort({ criadoEm: -1 }).toArray();
      return res.status(200).json(relatorios);
    }

    // CRIAR UM NOVO RELATÓRIO
    if (req.method === 'POST') {
      const { nome, patente, badge, descricao, autor, data } = req.body;
      const novo = await relatoriosColl.insertOne({ 
        nome,
        patente,
        badge,
        descricao,
        autor,
        data, // Data formatada (ex: 13/03/2026)
        criadoEm: new Date() // Data exata do sistema para ordenação
      });
      return res.status(201).json(novo);
    }

    // DELETAR UM RELATÓRIO
    if (req.method === 'DELETE') {
      const { id } = req.query;
      await relatoriosColl.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: 'Removido com sucesso' });
    }

    return res.status(405).json({ message: 'Método não permitido' });
  } catch (error) {
    console.error("Erro na API de relatórios:", error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}