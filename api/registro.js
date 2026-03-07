import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("lspd_database");
    const usuariosCollection = db.collection("usuarios");

    const { nome, passaporte, email, senha } = req.body;

    // Verifica se o passaporte (ID) já está cadastrado
    const usuarioExistente = await usuariosCollection.findOne({ passaporte });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Este passaporte já está registrado no sistema.' });
    }

    // Cria o novo usuário com os padrões de "Cidadão" e "User"
    const novoUsuario = {
      nome,
      passaporte,
      email,
      senha, // Nota: em um sistema real faríamos criptografia aqui
      role: 'user', // Permissão padrão: usuário normal
      patente: 'Cidadão', // Patente padrão
      dataRegistro: new Date()
    };

    await usuariosCollection.insertOne(novoUsuario);

    return res.status(201).json({ message: 'Registro criado com sucesso!' });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ message: 'Erro interno ao processar o registro.' });
  }
}