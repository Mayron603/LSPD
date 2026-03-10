import clientPromise from './_lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("lspd_database");
    const usuariosCollection = db.collection("usuarios");

    // Método GET: Puxa todos os usuários OU puxa apenas um se receber o ID
    if (req.method === 'GET') {
      const { id } = req.query;

      // Se passou o ID na URL, devolve só esse usuário (usado para sincronizar sessão)
      if (id) {
        const usuario = await usuariosCollection.findOne(
          { _id: new ObjectId(id) }, 
          { projection: { senha: 0 } } // Remove a senha por segurança
        );
        return res.status(200).json(usuario);
      }

      // Se não passou ID, retorna todos os usuários (para o Painel Admin)
      const usuarios = await usuariosCollection.find({}, { projection: { senha: 0 } }).toArray();
      return res.status(200).json(usuarios);
    }

    // Método PUT: Atualiza a patente ou a permissão (role) de um usuário
    if (req.method === 'PUT') {
      const { id, campo, valor } = req.body;
      
      const resultado = await usuariosCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { [campo]: valor } }
      );

      return res.status(200).json(resultado);
    }

  } catch (error) {
    console.error("Erro na API de usuários:", error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}