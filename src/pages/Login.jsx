import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, ShieldAlert } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Estabelecendo conexão segura...' });

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('autenticado', 'true');
        localStorage.setItem('usuario', JSON.stringify(data.user));

        setStatus({ type: 'success', message: `Acesso autorizado. Bem-vindo, ${data.user.nome}!` });
        setTimeout(() => navigate('/'), 2000); 
      } else {
        setStatus({ type: 'error', message: data.message || 'Credenciais inválidas.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Erro de conexão com os servidores LSPD.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efeitos de Fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md backdrop-blur-xl bg-slate-900/60 p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-slate-700/50 relative z-10">
        
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl flex items-center justify-center border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.3)] mb-4">
            <Shield className="text-blue-500" size={40} />
          </div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-200 uppercase tracking-widest">LSPD SYSTEM</h2>
          <p className="text-slate-400 text-xs font-bold tracking-[0.2em] mt-2 uppercase">Acesso Restrito ao Departamento</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Passaporte / Usuário</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Ex: 4821 ou admin"
                required 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Senha de Segurança</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                required 
              />
            </div>
          </div>
          
          {status.message && (
            <div className={`p-4 rounded-lg text-sm text-center font-bold flex items-center justify-center gap-2 ${
              status.type === 'error' ? 'bg-red-950/50 text-red-400 border border-red-900/50' : 
              status.type === 'success' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/50' : 
              'bg-blue-950/50 text-blue-400 border border-blue-900/50'
            }`}>
              {status.type === 'error' && <ShieldAlert size={16} />}
              {status.message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={status.type === 'loading'}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-black py-4 px-4 rounded-lg uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            {status.type === 'loading' ? 'Verificando...' : 'Autenticar'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-800/50 pt-6">
          <p className="text-slate-500 text-sm">
            Não possui credenciais? <br/>
            <Link to="/registro" className="text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase text-xs tracking-widest mt-2 inline-block">
              Solicitar Registro no Sistema
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}