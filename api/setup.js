import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("lspd_database");

    // Tenta inserir um usuário de teste
    const result = await db.collection("usuarios").insertOne({
      username: "admin",
      password: "123", 
      patente: "Comandante"
    });

    res.status(200).json({ message: "Usuário 'admin' com senha '123' criado com sucesso!", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}