import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("lspd_database");

    if (req.method === 'GET') {
      const oficiais = await db.collection("oficiais").find({}).toArray();
      return res.status(200).json(oficiais);
    }

    if (req.method === 'POST') {
      const novoOficial = req.body;
      const result = await db.collection("oficiais").insertOne(novoOficial);
      return res.status(201).json(result);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}