import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb'; // Necessário para apagar pelo ID

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("lspd_database"); 
    const collection = db.collection("fichas_criminais");

    // 1. ROTA GET (BUSCAR REGISTOS)
    if (req.method === 'GET') {
      const fichas = await collection.find({}).sort({ _id: -1 }).toArray(); // O sort(-1) traz os mais recentes primeiro
      return res.status(200).json(fichas);
    }

    // 2. ROTA POST (CRIAR NOVO REGISTO)
    if (req.method === 'POST') {
      const novaFicha = req.body;
      const resultado = await collection.insertOne(novaFicha);
      return res.status(201).json({ ...novaFicha, _id: resultado.insertedId });
    }

    // 3. ROTA DELETE (APAGAR REGISTO)
    if (req.method === 'DELETE') {
      const { id } = req.query; // Pega o ID que foi enviado na URL

      if (!id) {
        return res.status(400).json({ error: "ID não fornecido" });
      }

      // Procura e apaga no MongoDB
      const resultado = await collection.deleteOne({ _id: new ObjectId(id) });

      if (resultado.deletedCount === 1) {
        return res.status(200).json({ message: 'Registo apagado com sucesso.' });
      } else {
        return res.status(404).json({ error: 'Registo não encontrado.' });
      }
    }

    // Caso enviem outro método (PUT, PATCH, etc)
    return res.status(405).json({ message: 'Método não permitido.' });

  } catch (error) {
    console.error("Erro na API de Banco Criminal:", error);
    res.status(500).json({ error: error.message });
  }
}