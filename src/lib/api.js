// Ficheiro: src/lib/api.js

export async function fetchSeguro(url, options = {}) {
  // Pega no token que foi guardado no login
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Se o token existir, anexa o crachá na requisição
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Faz a requisição à base de dados
  const response = await fetch(url, {
    ...options,
    headers
  });

  // SISTEMA DE DEFESA: Se o backend disser que o token expirou (Erro 401)
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('autenticado');
    window.location.href = '/login'; // Expulsa o utilizador para o ecrã de login
  }

  return response;
}