import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("lspd_database");
    const comunicadosColl = db.collection("comunicados");

    if (req.method === 'GET') {
      const comunicados = await comunicadosColl.find({}).sort({ data: -1 }).toArray();
      return res.status(200).json(comunicados);
    }

    if (req.method === 'POST') {
      const { texto, autor, prioridade } = req.body;
      const novo = await comunicadosColl.insertOne({ 
        texto, 
        autor, 
        prioridade: prioridade || 'Normal',
        data: new Date() 
      });
      return res.status(201).json(novo);
    }

    if (req.method === 'PUT') {
      const { id, texto } = req.body;
      await comunicadosColl.updateOne(
        { _id: new ObjectId(id) },
        { $set: { texto, dataAtualizacao: new Date() } }
      );
      return res.status(200).json({ message: 'Atualizado com sucesso' });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await comunicadosColl.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: 'Removido com sucesso' });
    }

    return res.status(405).json({ message: 'Método não permitido' });
  } catch (error) {
    console.error("Erro na API de comunicados:", error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}