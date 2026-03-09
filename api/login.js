import clientPromise from './_lib/mongodb.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("lspd_database");
    const usuariosCollection = db.collection("usuarios");

    const { email, senha } = req.body;

    const usuario = await usuariosCollection.findOne({ email, senha });

    if (usuario) {
      const { senha: _, ...dadosDoUsuario } = usuario;
      
      // Criar o Token de Segurança (JWT) válido por 12 horas
      // Na produção, deves ter uma JWT_SECRET no teu ficheiro .env
      const jwtSecret = process.env.JWT_SECRET || 'chave_secreta_provisoria_lspd_v5';
      const token = jwt.sign(
        { id: usuario._id, role: usuario.role, patente: usuario.patente }, 
        jwtSecret, 
        { expiresIn: '12h' }
      );
      
      return res.status(200).json({ user: dadosDoUsuario, token: token });
    } else {
      return res.status(401).json({ message: 'Email ou senha incorretos. Verifique as suas credenciais.' });
    }
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: 'Erro interno ao ligar ao servidor.' });
  }
}