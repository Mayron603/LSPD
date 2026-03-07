import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("lspd_database");
    const usuariosCollection = db.collection("usuarios");

    // Agora recebemos email e senha do formulário
    const { email, senha } = req.body;

    // Busca no banco de dados o usuário que tenha esse exato email e senha
    const usuario = await usuariosCollection.findOne({ email, senha });

    if (usuario) {
      // Se encontrou, tira a senha dos dados por segurança antes de devolver pro site
      const { senha: _, ...dadosDoUsuario } = usuario;
      
      return res.status(200).json({ user: dadosDoUsuario });
    } else {
      // Se não encontrou, o email ou senha estão errados
      return res.status(401).json({ message: 'Email ou senha incorretos. Verifique suas credenciais.' });
    }
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: 'Erro interno ao conectar no servidor.' });
  }
}