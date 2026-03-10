import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';
import { verificarToken } from './_lib/auth.js';

export default async function handler(req, res) {
  const usuarioLogado = verificarToken(req, res);
  if (!usuarioLogado) return;

  try {
    const client = await clientPromise;
    const db = client.db("lspd_database");
    const collection = db.collection("marcadores_mapa");

    if (req.method === 'GET') {
      const marcadores = await collection.find({}).toArray();
      return res.status(200).json(marcadores);
    }

    if (req.method === 'POST') {
      const { lat, lng, tipo, descricao } = req.body;
      const novoMarcador = {
        lat, lng, tipo, descricao,
        autor: usuarioLogado.nome,
        data: new Date().toISOString()
      };
      const result = await collection.insertOne(novoMarcador);
      return res.status(201).json({ success: true, id: result.insertedId, marcador: novoMarcador });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}