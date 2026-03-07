import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Estabelecendo conexão com o servidor LSPD...' });

    try {
      // Fazendo a chamada para nossa API na Vercel / Backend
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: `Acesso liberado, ${data.user.patente}! Redirecionando...` });
        // Redireciona para o painel de comando após 2 segundos
        setTimeout(() => navigate('/comando'), 2000); 
      } else {
        setStatus({ type: 'error', message: data.message || 'Falha na autenticação.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Erro crítico de conexão com o banco de dados.' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-slate-900 p-8 rounded-lg shadow-2xl border border-slate-800 w-full max-w-md">
        <div className="flex justify-center mb-6">
          {/* Se você tiver uma logo, pode colocar a tag <img src="/logo.png" /> aqui */}
          <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center border-2 border-blue-500">
            <span className="text-blue-400 font-bold text-xl">LSPD</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Acesso Restrito</h2>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-slate-400 text-sm mb-1 uppercase tracking-wider">Identificação (Usuário)</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              required 
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1 uppercase tracking-wider">Senha de Segurança</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              required 
            />
          </div>
          
          {/* Mensagens de Feedback */}
          {status.message && (
            <div className={`p-3 rounded text-sm text-center font-medium ${
              status.type === 'error' ? 'bg-red-900/50 text-red-300 border border-red-800' : 
              status.type === 'success' ? 'bg-green-900/50 text-green-300 border border-green-800' : 
              'bg-blue-900/50 text-blue-300 border border-blue-800'
            }`}>
              {status.message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={status.type === 'loading'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {status.type === 'loading' ? 'Verificando...' : 'Autenticar'}
          </button>
        </form>
      </div>
    </div>
  );
}