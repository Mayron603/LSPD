import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("lspd_database"); 
    const collection = db.collection("operacoes");

    if (req.method === 'GET') {
      const operacoes = await collection.find({}).sort({ dataRegistro: -1 }).toArray();
      return res.status(200).json(operacoes);
    }

    if (req.method === 'POST') {
      const novaOperacao = req.body;
      
      const operacaoParaInserir = {
        ...novaOperacao,
        dataRegistro: new Date().toISOString()
      };

      const result = await collection.insertOne(operacaoParaInserir);
      
      return res.status(201).json({ 
        success: true, 
        id: result.insertedId 
      });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (error) {
    console.error("Erro na API de Operações:", error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}