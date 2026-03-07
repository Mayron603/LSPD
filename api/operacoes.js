import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("lspd_database");
  const collection = db.collection("operacoes");

  try {
    if (req.method === 'GET') {
      const ops = await collection.find({}).sort({ dataCriacao: -1 }).toArray();
      return res.status(200).json(ops);
    }

    if (req.method === 'POST') {
      const novaOp = {
        ...req.body,
        dataCriacao: new Date().toISOString(),
        status: req.body.status || 'Planejada'
      };
      const resultado = await collection.insertOne(novaOp);
      return res.status(201).json({ ...novaOp, _id: resultado.insertedId });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: 'Operação removida' });
    }
    
    // Rota para atualizar Status (Concluir/Cancelar)
    if (req.method === 'PUT') {
        const { id, status } = req.body;
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: status } }
        );
        return res.status(200).json({ message: 'Status atualizado' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}