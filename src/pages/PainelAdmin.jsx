import { useState, useEffect } from 'react';
import { ShieldCheck, Users, ShieldAlert, UserCog, Save } from 'lucide-react';

export default function PainelAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const patentesDisponiveis = ["Cidadão", "Recruta", "Oficial", "Sargento", "Tenente", "Capitão", "Comandante"];
  const permissoesDisponiveis = ["user", "admin"];

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const res = await fetch('/api/usuarios');
      const data = await res.json();
      setUsuarios(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      setLoading(false);
    }
  };

  const handleAtualizarUsuario = async (id, campo, valor) => {
    try {
      // Faz o update no banco de dados
      const res = await fetch('/api/usuarios', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, campo, valor })
      });

      if (res.ok) {
        // Atualiza a lista na tela imediatamente
        setUsuarios(usuarios.map(u => u._id === id ? { ...u, [campo]: valor } : u));
      } else {
        alert("Erro ao atualizar o usuário.");
      }
    } catch (error) {
      console.error("Erro na atualização:", error);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
          <div className="w-16 h-16 bg-red-900/20 rounded-2xl flex items-center justify-center border border-red-500/30">
            <ShieldCheck className="text-red-500" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Central de Administração</h1>
            <p className="text-slate-400">Gestão de acessos, patentes e permissões do sistema LSPD.</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 bg-slate-900/50 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="text-blue-500" /> Efetivo Registrado
            </h2>
            <span className="bg-slate-950 text-blue-400 px-4 py-1 rounded-full text-xs font-black border border-slate-800 uppercase tracking-widest">
              Total: {usuarios.length} Usuários
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500 font-bold uppercase tracking-widest animate-pulse">
              Buscando dados no servidor...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950 text-slate-500 uppercase font-black text-[10px] tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Nome & Passaporte</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Patente Atual</th>
                    <th className="px-6 py-4">Nível de Acesso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {usuarios.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-base">{user.nome}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">ID: {user.passaporte}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{user.email}</td>
                      
                      {/* Seleção de Patente */}
                      <td className="px-6 py-4">
                        <select 
                          value={user.patente}
                          onChange={(e) => handleAtualizarUsuario(user._id, 'patente', e.target.value)}
                          className={`bg-slate-950 border rounded p-2 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-blue-500 cursor-pointer ${user.patente === 'Cidadão' ? 'border-slate-700 text-slate-400' : 'border-blue-900/50 text-blue-400'}`}
                        >
                          {patentesDisponiveis.map(pat => (
                            <option key={pat} value={pat}>{pat}</option>
                          ))}
                        </select>
                      </td>

                      {/* Seleção de Permissão (Role) */}
                      <td className="px-6 py-4">
                        <select 
                          value={user.role}
                          onChange={(e) => handleAtualizarUsuario(user._id, 'role', e.target.value)}
                          className={`bg-slate-950 border rounded p-2 text-xs font-black uppercase tracking-widest focus:outline-none cursor-pointer ${user.role === 'admin' ? 'border-red-900/50 text-red-500' : 'border-slate-700 text-slate-400'}`}
                        >
                          {permissoesDisponiveis.map(role => (
                            <option key={role} value={role}>{role === 'admin' ? 'ADMINISTRADOR' : 'USUÁRIO NORMAL'}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}