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

    if (req.method === 'POST') {
      const novaFicha = req.body;
      
      // Guarda exatamente o que vem do formulário e adiciona a data de registo
      const fichaParaInserir = {
        ...novaFicha,
        dataRegistro: new Date().toISOString()
      };

      const result = await collection.insertOne(fichaParaInserir);
      
      return res.status(201).json({ 
        success: true, 
        message: 'Ficha criada com sucesso',
        id: result.insertedId 
      });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (error) {
    console.error("Erro na API de Banco Criminal:", error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}