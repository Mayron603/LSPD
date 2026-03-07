import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("lspd_database"); 
    const collection = db.collection("fichas_criminais"); // Nome da tabela no banco

    // Método GET: Puxar os dados para mostrar na tela
    if (req.method === 'GET') {
      const fichas = await collection.find({}).toArray();
      return res.status(200).json(fichas);
    }

    // Método POST: Salvar um novo registro
    if (req.method === 'POST') {
      const novaFicha = req.body;
      const result = await collection.insertOne(novaFicha);
      return res.status(201).json(result);
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}