import { useState, useEffect } from 'react';
import { ShieldCheck, Users, Search, UserCog, AlertCircle } from 'lucide-react';
import { fetchSeguro } from '../lib/api';

// Configuração visual e de valores dos cargos (Roles) do sistema
const ROLES_CONFIG = {
  visitante: { label: 'Visitante (Básico)', color: 'text-slate-400 bg-slate-900 border-slate-700' },
  oficial: { label: 'Oficial LSPD', color: 'text-blue-400 bg-blue-900/20 border-blue-800' },
  comando: { label: 'Alto Comando', color: 'text-purple-400 bg-purple-900/20 border-purple-800' },
  fib: { label: 'Agente FIB', color: 'text-amber-400 bg-amber-900/20 border-amber-800' },
  admin: { label: 'Administrador (Total)', color: 'text-red-500 bg-red-900/20 border-red-800' }
};

const PATENTES = [
  "Cidadão", "Recruta", "Oficial I", "Oficial II", "Policial Senior", 
  "Sargento", "Tenente", "Capitão", "Comandante",
  "Agente FIB", "Diretor FIB"
];

export default function PainelAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const res = await fetchSeguro('/api/usuarios');
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
      const res = await fetchSeguro('/api/usuarios', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, campo, valor })
      });

      if (res.ok) {
        setUsuarios(usuarios.map(u => u._id === id ? { ...u, [campo]: valor } : u));
      } else {
        alert("Erro ao atualizar o usuário.");
      }
    } catch (error) {
      console.error("Erro na atualização:", error);
    }
  };

  // Filtra os usuários com base na barra de pesquisa (Nome ou Passaporte)
  const usuariosFiltrados = usuarios.filter(user => 
    user.nome?.toLowerCase().includes(termoBusca.toLowerCase()) || 
    user.passaporte?.toString().includes(termoBusca)
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho do Painel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-red-900/20 rounded-2xl flex items-center justify-center border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <ShieldCheck className="text-red-500" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Central de Administração</h1>
              <p className="text-slate-400 text-sm">Gerencie o efetivo, níveis de acesso e patentes da LSPD & FIB.</p>
            </div>
          </div>
          
          {/* Barra de Pesquisa */}
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-slate-500" size={18} />
            </div>
            <input
              type="text"
              placeholder="Buscar por nome ou passaporte..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Tabela de Usuários */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-wide">
              <Users className="text-blue-500" size={20} /> Efetivo Registrado
            </h2>
            <div className="flex gap-2">
              <span className="bg-slate-950 text-slate-400 px-3 py-1 rounded-md text-xs font-black border border-slate-800 uppercase tracking-widest">
                Exibindo: {usuariosFiltrados.length}
              </span>
              <span className="bg-blue-900/20 text-blue-400 px-3 py-1 rounded-md text-xs font-black border border-blue-900/50 uppercase tracking-widest">
                Total: {usuarios.length}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-slate-500 gap-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="font-bold uppercase tracking-widest animate-pulse">Sincronizando banco de dados...</span>
            </div>
          ) : usuariosFiltrados.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2">
              <AlertCircle size={32} className="text-slate-600 mb-2" />
              <p className="font-bold uppercase tracking-widest text-sm">Nenhum oficial encontrado.</p>
              <p className="text-xs">Tente buscar por outro nome ou passaporte.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-950 text-slate-500 uppercase font-black text-[10px] tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Oficial</th>
                    <th className="px-6 py-4">Contato (Email)</th>
                    <th className="px-6 py-4">Patente (Roleplay)</th>
                    <th className="px-6 py-4">Permissão no Sistema</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {usuariosFiltrados.map((user) => {
                    const currentRole = user.role || 'visitante'; // Se não tiver role, é visitante
                    const roleStyle = ROLES_CONFIG[currentRole] || ROLES_CONFIG.visitante;

                    return (
                      <tr key={user._id} className="hover:bg-slate-800/30 transition-colors group">
                        
                        {/* Nome e Passaporte */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">
                              {user.nome.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-white text-base">{user.nome}</div>
                              <div className="text-[10px] text-blue-400 font-black tracking-widest uppercase mt-0.5">
                                Passaporte: {user.passaporte}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        {/* Email */}
                        <td className="px-6 py-4 text-slate-400 font-medium">{user.email}</td>
                        
                        {/* Seleção de Patente */}
                        <td className="px-6 py-4">
                          <select 
                            value={user.patente || "Cidadão"}
                            onChange={(e) => handleAtualizarUsuario(user._id, 'patente', e.target.value)}
                            className="bg-slate-950 border border-slate-700 text-slate-300 rounded-md py-1.5 px-3 text-xs font-bold uppercase tracking-wide focus:outline-none focus:border-blue-500 cursor-pointer hover:bg-slate-800 transition-colors"
                          >
                            {PATENTES.map(pat => (
                              <option key={pat} value={pat}>{pat}</option>
                            ))}
                          </select>
                        </td>

                        {/* Seleção de Permissão (Role) */}
                        <td className="px-6 py-4">
                          <div className={`inline-block border rounded-md overflow-hidden ${roleStyle.color}`}>
                            <select 
                              value={currentRole}
                              onChange={(e) => handleAtualizarUsuario(user._id, 'role', e.target.value)}
                              className="bg-transparent appearance-none py-1.5 pl-3 pr-8 text-xs font-black uppercase tracking-widest focus:outline-none cursor-pointer w-full"
                              style={{ 
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.5rem center',
                                backgroundSize: '1em'
                              }}
                            >
                              {Object.entries(ROLES_CONFIG).map(([roleKey, config]) => (
                                <option key={roleKey} value={roleKey} className="bg-slate-900 text-white">
                                  {config.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}