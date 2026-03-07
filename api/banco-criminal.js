import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("lspd_database"); 
    const collection = db.collection("fichas_criminais");

    if (req.method === 'GET') {
      const fichas = await collection.find({}).toArray();
      return res.status(200).json(fichas);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}