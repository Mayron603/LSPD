import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("lspd_database");
  const collection = db.collection("investigacoes");

  try {
    // BUSCAR
    if (req.method === 'GET') {
      const casos = await collection.find({}).sort({ data: -1 }).toArray();
      return res.status(200).json(casos);
    }

    // CRIAR
    if (req.method === 'POST') {
      const novoCaso = {
        ...req.body,
        data: new Date().toISOString(),
        status: req.body.status || 'Ativa'
      };
      const resultado = await collection.insertOne(novoCaso);
      return res.status(201).json({ ...novoCaso, _id: resultado.insertedId });
    }

    // ATUALIZAR (EDITAR) - NOVO MÉTODO
    if (req.method === 'PUT') {
      const { _id, ...updateData } = req.body; // Removemos o _id para o Mongo não reclamar
      await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );
      return res.status(200).json({ message: 'Dossiê atualizado com sucesso' });
    }

    // DELETAR
    if (req.method === 'DELETE') {
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: 'Removido com sucesso' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}