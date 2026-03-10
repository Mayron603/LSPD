import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função mágica que busca os dados atualizados (patente/role) no backend
  const sincronizarSessao = async (currentToken, userId) => {
    try {
      // Chama a nossa API de usuários enviando o ID específico
      const res = await fetch(`/api/usuarios?id=${userId}`, {
        headers: { 'Authorization': `Bearer ${currentToken}` }
      });
      
      if (res.ok) {
        const dadosAtualizados = await res.json();
        if (dadosAtualizados) {
          // Atualiza o estado da memória do React
          setUser(dadosAtualizados);
          // Substitui o cache do localStorage com a versão mais recente
          localStorage.setItem('usuario', JSON.stringify(dadosAtualizados));
        }
      }
    } catch (error) {
      console.error("Falha ao sincronizar dados da sessão.", error);
    } finally {
      setLoading(false);
    }
  };

  // Quando o site carrega, verifica se há uma sessão válida guardada
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);
      
      // Chama a sincronização em background. O ID pode vir como "id" ou "_id" dependendo do MongoDB
      const userId = parsedUser._id || parsedUser.id;
      if (userId) {
        sincronizarSessao(storedToken, userId);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('usuario', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    localStorage.setItem('autenticado', 'true');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('autenticado');
  };

  // Expomos o sincronizarSessao para caso queira forçar uma atualização clicando num botão no futuro
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, sincronizarSessao }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);