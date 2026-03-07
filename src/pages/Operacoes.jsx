import { useState, useEffect } from 'react';
import { Crosshair, Map, Plus, Users, Clock, XCircle, Trash2, Shield } from 'lucide-react';

export default function Operacoes() {
  const [showModal, setShowModal] = useState(false);
  const [operacoes, setOperacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para o formulário
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'Mandado de Prisão',
    comandante: JSON.parse(localStorage.getItem('usuario') || '{}').nome || '',
    local: '',
    briefing: '',
    status: 'Planejada'
  });

  const fetchOperacoes = async () => {
    try {
      const res = await fetch('/api/operacoes');
      const data = await res.json();
      setOperacoes(data);
    } catch (err) {
      console.error("Erro ao carregar operações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOperacoes(); }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/operacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setShowModal(false);
      setFormData({ ...formData, nome: '', local: '', briefing: '' });
      fetchOperacoes();
    }
  };

  const handleExcluir = async (id) => {
    if (confirm("Deseja remover esta operação do registro oficial?")) {
      await fetch(`/api/operacoes?id=${id}`, { method: 'DELETE' });
      fetchOperacoes();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planejada': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Em andamento': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Concluída': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 uppercase flex items-center gap-3 tracking-tighter">
              <Crosshair className="text-emerald-500" size={36} /> Operações Policiais
            </h1>
            <p className="text-slate-400">Gerenciamento tático de incursões e patrulhamento especial.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-emerald-900/20"
          >
            <Plus size={20} /> AGENDAR OPERAÇÃO
          </button>
        </div>

        {/* Lista de Operações */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 animate-pulse">Carregando painel tático...</div>
        ) : operacoes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operacoes.map((op) => (
              <div key={op._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black border uppercase tracking-widest ${getStatusColor(op.status)}`}>
                      {op.status}
                    </span>
                    <button onClick={() => handleExcluir(op._id)} className="text-slate-700 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-tight group-hover:text-emerald-400 transition-colors">{op.nome}</h3>
                  <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-4">{op.tipo}</p>
                  
                  <div className="space-y-3 text-sm text-slate-400 border-t border-slate-800 pt-4">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-slate-500" /> 
                      <span>Comandante: <b className="text-slate-200">{op.comandante}</b></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Map size={14} className="text-slate-500" /> 
                      <span>Local: <b className="text-slate-200">{op.local}</b></span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-950 p-4 flex justify-between items-center">
                   <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest">Ver Detalhes</button>
                   <Clock size={14} className="text-slate-700" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-dashed border-slate-800 p-20 rounded-2xl text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="text-slate-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-500">NENHUMA OPERAÇÃO AGENDADA</h2>
          </div>
        )}

        {/* Modal de Criação */}
        {showModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                    <Crosshair className="text-emerald-500" /> Registrar Missão
                </h2>
                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors">
                    <XCircle size={28} />
                </button>
              </div>
              <form onSubmit={handleSalvar} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nome da Operação</label>
                    <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 outline-none transition-all" 
                        placeholder="Ex: Operação Cavalo de Troia"
                        value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tipo de Missão</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 outline-none transition-all"
                        value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                      <option>Mandado de Prisão</option>
                      <option>Operação Antidrogas</option>
                      <option>Blitz / Bloqueio</option>
                      <option>Incursão em Favela</option>
                      <option>Escolta de Comboio</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Localização Alvo</label>
                    <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 outline-none transition-all" 
                        placeholder="Ex: Sandy Shores / Groove St."
                        value={formData.local} onChange={e => setFormData({...formData, local: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Briefing Tático (Objetivos)</label>
                  <textarea required rows="4" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 outline-none transition-all resize-none" 
                    placeholder="Descreva o plano de ação e unidades envolvidas..."
                    value={formData.briefing} onChange={e => setFormData({...formData, briefing: e.target.value})}></textarea>
                </div>
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-800 text-slate-400 font-bold py-4 rounded-xl hover:bg-slate-700 transition-all">CANCELAR</button>
                    <button type="submit" className="flex-1 bg-emerald-600 text-white font-black py-4 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/40 uppercase tracking-tighter">
                        PUBLICAR ORDEM DE MISSÃO
                    </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}