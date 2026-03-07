import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, BadgeInfo, Mail } from 'lucide-react';

export default function Registro() {
  const [formData, setFormData] = useState({
    nome: '',
    passaporte: '', // ID do jogo
    email: '',
    senha: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Processando credenciais...' });

    try {
      // Chamada para a API criar o usuário
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Registro concluído! Redirecionando para login...' });
        setTimeout(() => navigate('/login'), 2000); 
      } else {
        setStatus({ type: 'error', message: data.message || 'Erro ao registrar.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Erro crítico de conexão.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efeitos de Fundo */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md backdrop-blur-xl bg-slate-900/60 p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-slate-700/50 relative z-10">
        
        <div className="flex flex-col items-center justify-center mb-6">
          <Shield className="text-slate-500 mb-2" size={32} />
          <h2 className="text-2xl font-black text-white uppercase tracking-widest">Solicitar Acesso</h2>
          <p className="text-slate-400 text-xs text-center mt-2">Preencha os dados abaixo. Seu cadastro será avaliado pela administração.</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome do Personagem</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none text-sm" placeholder="Ex: Marcus Reed" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Passaporte (ID)</label>
              <div className="relative mt-1">
                <BadgeInfo className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type="text" name="passaporte" value={formData.passaporte} onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none text-sm" placeholder="Ex: 4821" required />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none text-sm" placeholder="seu@email.com" required />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Criar Senha</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input type="password" name="senha" value={formData.senha} onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none text-sm" placeholder="••••••••" required />
            </div>
          </div>
          
          {status.message && (
             <div className="p-3 rounded-lg text-xs text-center font-bold bg-slate-950 border border-slate-800 text-slate-300">
               {status.message}
             </div>
          )}

          <button type="submit" disabled={status.type === 'loading'} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-3 px-4 rounded-lg uppercase tracking-widest transition-all border border-slate-600 mt-2">
            Enviar Solicitação
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-slate-400 hover:text-white transition-colors uppercase text-[10px] tracking-widest">
            ← Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}