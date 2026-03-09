import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';
import { verificarToken } from './_lib/auth.js'; // <-- IMPORTAÇÃO DO GUARDIÃO

export default async function handler(req, res) {
  // BLINDAGEM MÁXIMA: Verifica o crachá digital antes de qualquer coisa
  const usuarioLogado = verificarToken(req, res);
  if (!usuarioLogado) return; // Se for nulo, o guardião já enviou a mensagem de erro (401) e aborta

  try {
    const client = await clientPromise;
    const db = client.db("lspd_database"); 
    const collection = db.collection("fichas_criminais");

    // LER (BUSCAR TODOS)
    if (req.method === 'GET') {
      const fichas = await collection.find({}).toArray();
      return res.status(200).json(fichas);
    }

    // CRIAR NOVO
    if (req.method === 'POST') {
      const novaFicha = req.body;
      const fichaParaInserir = {
        ...novaFicha,
        dataRegistro: new Date().toISOString()
      };
      const result = await collection.insertOne(fichaParaInserir);
      return res.status(201).json({ success: true, message: 'Ficha criada com sucesso', id: result.insertedId });
    }

    // ATUALIZAR (EDITAR)
    if (req.method === 'PUT') {
      const { _id, ...updateData } = req.body; // Remove o ID do corpo para o Mongo não dar erro
      await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );
      return res.status(200).json({ message: 'Ficha atualizada com sucesso' });
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
    console.error("Erro na API de Banco Criminal:", error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}