import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("lspd_database");
  const collection = db.collection("operacoes");

  try {
    // LER (BUSCAR TODOS)
    if (req.method === 'GET') {
      const operacoes = await collection.find({}).sort({ data: -1 }).toArray();
      return res.status(200).json(operacoes);
    }

    // CRIAR NOVA OPERAÇÃO
    if (req.method === 'POST') {
      const novaOperacao = {
        ...req.body,
        data: new Date().toISOString()
      };
      const resultado = await collection.insertOne(novaOperacao);
      return res.status(201).json({ ...novaOperacao, _id: resultado.insertedId });
    }

    // ATUALIZAR (EDITAR)
    if (req.method === 'PUT') {
      const { _id, ...updateData } = req.body;
      await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );
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