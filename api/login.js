import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
  // O login só deve aceitar requisições do tipo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
    }

    const client = await clientPromise;
    const db = client.db("lspd_database");

    // Busca o usuário na coleção "usuarios"
    const user = await db.collection("usuarios").findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado no sistema.' });
    }

    // ⚠️ AVISO: Para este teste estamos comparando a senha em texto limpo.
    // Em um sistema real de produção, você DEVE usar uma biblioteca como 'bcrypt' para criptografar as senhas!
    if (user.password !== password) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Login com sucesso!
    return res.status(200).json({ 
      message: 'Login aprovado!', 
      user: { username: user.username, patente: user.patente } 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}