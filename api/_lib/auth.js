import jwt from 'jsonwebtoken';

export function verificarToken(req, res) {
  // Puxa o cabeçalho de autorização da requisição
  const authHeader = req.headers.authorization;
  
  // Se não houver cabeçalho ou não começar com 'Bearer ', bloqueia a porta
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Acesso negado. Credenciais do departamento não encontradas.' });
    return null;
  }

  // Extrai apenas o código do token
  const token = authHeader.split(' ')[1];

  try {
    // Usa a mesma chave secreta que criámos no login para abrir o token
    const jwtSecret = process.env.JWT_SECRET || 'chave_secreta_provisoria_lspd_v5';
    const decodificado = jwt.verify(token, jwtSecret);
    
    // Devolve os dados do usuário (id, role, patente) se for válido
    return decodificado; 
  } catch (error) {
    // Se o token for falso ou tiver expirado as 12h
    res.status(401).json({ message: 'Sessão expirada ou acesso inválido. Faça login novamente.' });
    return null;
  }
}