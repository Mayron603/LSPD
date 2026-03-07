import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("lspd_database");
    const collection = db.collection("investigacoes");

    if (req.method === 'GET') {
      const casos = await collection.find({}).toArray();
      return res.status(200).json(casos);
    }

    if (req.method === 'POST') {
      const novoCaso = req.body;
      const result = await collection.insertOne(novoCaso);
      return res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}