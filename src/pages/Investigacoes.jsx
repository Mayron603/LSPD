import { useState, useEffect } from 'react';
import { 
  Briefcase, Users, Target, Clock, AlertCircle, 
  Plus, Search, FileText, ChevronRight, Edit, CheckSquare,
  MapPin, Car, Save, ArrowLeft, Trash2, Camera
} from 'lucide-react';

const ESTADO_INICIAL_FORMULARIO = {
  nome: '', tipo: '', descricao: '', local: '', detalhesLocal: '', 
  veiculos: '', armas: '', suspeitos: '', evidencias: '', conclusao: '',
  prioridade: 'Média', status: 'Em investigação', progresso: 10,
  investigador: JSON.parse(localStorage.getItem('usuario') || '{}').nome || 'Sistema'
};

export default function Investigacoes() {
  const [view, setView] = useState('lista'); // 'lista', 'detalhes', 'formulario'
  const [selectedCase, setSelectedCase] = useState(null);
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(ESTADO_INICIAL_FORMULARIO);

  const fetchCasos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/investigacoes');
      const data = await res.json();
      setCasos(data);
    } catch (err) {
      console.error("Erro ao carregar investigações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCasos(); }, []);

  const handleOpenCase = (caso) => {
    setSelectedCase(caso);
    setView('detalhes');
  };

  const handleOpenFormulario = (casoEdit = null) => {
    if (casoEdit) {
      setFormData(casoEdit);
      setIsEditing(true);
    } else {
      setFormData(ESTADO_INICIAL_FORMULARIO);
      setIsEditing(false);
    }
    setView('formulario');
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      const url = '/api/investigacoes';
      const method = isEditing ? 'PUT' : 'POST';
      
      const payload = isEditing ? formData : {
        ...formData,
        id: `CASE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        timeline: [{ data: new Date().toLocaleDateString('pt-BR'), evento: "Investigação Iniciada" }]
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setView('lista');
        fetchCasos();
        setFormData(ESTADO_INICIAL_FORMULARIO);
      }
    } catch (err) {
      alert("Erro ao salvar no banco de dados");
    }
  };

  const handleExcluir = async (id, e) => {
    if(e) e.stopPropagation();
    if (confirm("Deseja arquivar este dossiê permanentemente?")) {
      await fetch(`/api/investigacoes?id=${id}`, { method: 'DELETE' });
      fetchCasos();
      if (view === 'detalhes') setView('lista');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 border-b border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-4xl font-black text-white uppercase flex items-center gap-3 tracking-tighter">
              <Briefcase className="text-blue-500" size={36} /> 
              {view === 'lista' ? 'Investigações (FIB)' : view === 'detalhes' ? 'Dossiê ' + selectedCase.id : isEditing ? 'Editar Dossiê' : 'Novo Registro'}
            </h1>
            <p className="text-slate-400 mt-1">
              {view === 'lista' ? 'Central de Inteligência Policial.' : 'Restrito: Apenas pessoal autorizado do FIB.'}
            </p>
          </div>
          
          {view !== 'lista' && (
            <div className="flex gap-3">
              {view === 'detalhes' && (
                <button onClick={() => handleOpenFormulario(selectedCase)} className="bg-yellow-600/20 text-yellow-500 border border-yellow-500/50 hover:bg-yellow-600 hover:text-white px-4 py-2 rounded-lg font-bold uppercase text-xs flex items-center gap-2 transition-all">
                  <Edit size={16} /> Editar Caso
                </button>
              )}
              <button onClick={() => setView('lista')} className="bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white px-4 py-2 rounded-lg font-bold uppercase text-xs flex items-center gap-2 transition-all">
                <ArrowLeft size={16} /> Voltar
              </button>
            </div>
          )}
        </div>

        {/* 1. LISTA DE INVESTIGAÇÕES */}
        {view === 'lista' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="text" placeholder="Buscar caso por nome ou tipo..." className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 pl-12 outline-none focus:border-blue-500" />
              </div>
              <button onClick={() => handleOpenFormulario()} className="bg-blue-600 hover:bg-blue-500 px-6 rounded-lg font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <Plus size={18} /> ABRIR NOVO CASO
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-950/50 text-slate-500 uppercase font-black text-[10px] tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Dossiê / Tipo</th>
                    <th className="px-6 py-4">Investigador Responsável</th>
                    <th className="px-6 py-4">Status / Progresso</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {loading ? (
                    <tr><td colSpan="4" className="p-10 text-center text-slate-500 font-bold animate-pulse">Acessando arquivos confidenciais...</td></tr>
                  ) : casos.length === 0 ? (
                    <tr><td colSpan="4" className="p-10 text-center text-slate-500">Nenhuma investigação em andamento.</td></tr>
                  ) : casos.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-800/50 transition-colors group cursor-pointer" onClick={() => handleOpenCase(c)}>
                      <td className="px-6 py-4">
                        <div className="font-bold text-white uppercase text-base group-hover:text-blue-400">{c.nome}</div>
                        <div className="text-[10px] text-blue-500 uppercase font-black tracking-tighter mt-0.5">{c.id} • {c.tipo}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-medium">{c.investigador}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-black border uppercase w-fit ${c.status === 'Concluído' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>{c.status}</span>
                          <div className="w-32 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800 mt-1">
                            <div className="bg-blue-600 h-full" style={{ width: `${c.progresso || 0}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={(e) => handleExcluir(c._id, e)} className="p-2 bg-slate-950 hover:bg-red-600 border border-slate-800 text-slate-500 hover:text-white rounded-lg transition-all mr-2">
                           <Trash2 size={16} />
                        </button>
                        <button className="p-2 bg-slate-950 border border-slate-800 text-slate-500 group-hover:text-blue-400 group-hover:border-blue-900 rounded-lg transition-all">
                           <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. DETALHES DO CASO */}
        {view === 'detalhes' && selectedCase && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-right-4">
            
            <div className="lg:col-span-8 space-y-6">
              {/* Relatório Principal */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-5 pointer-events-none"><Briefcase size={200} className="-mt-10 -mr-10"/></div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-1 relative z-10">{selectedCase.nome}</h2>
                <p className="text-blue-500 font-black tracking-widest text-xs uppercase mb-6 relative z-10">TIPO DE CRIME: {selectedCase.tipo}</p>
                
                <h3 className="text-xs font-black text-slate-500 uppercase mb-2">Relatório do Investigador</h3>
                <p className="text-slate-300 leading-relaxed font-mono bg-slate-950/50 p-4 rounded-xl border border-slate-800 relative z-10 whitespace-pre-wrap">
                  {selectedCase.descricao || 'Sem descrição.'}
                </p>
              </div>

              {/* Informações Inteligência */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-xs font-black text-red-500 uppercase mb-4 flex items-center gap-2"><Target size={16}/> Suspeitos Identificados</h3>
                  <p className="text-sm text-slate-300 whitespace-pre-wrap bg-slate-950/50 p-3 rounded-lg border border-red-900/30">{selectedCase.suspeitos || 'Nenhum suspeito catalogado.'}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-xs font-black text-emerald-500 uppercase mb-4 flex items-center gap-2"><Camera size={16}/> Evidências</h3>
                  <p className="text-sm text-slate-300 whitespace-pre-wrap bg-slate-950/50 p-3 rounded-lg border border-emerald-900/30">{selectedCase.evidencias || 'Nenhuma evidência coletada.'}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-xs font-black text-slate-500 uppercase mb-4 flex items-center gap-2"><MapPin size={16}/> Localização e Rastreio</h3>
                  <p className="text-sm font-bold text-white mb-1">{selectedCase.local || 'Desconhecido'}</p>
                  <p className="text-xs text-slate-400">{selectedCase.detalhesLocal}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-xs font-black text-slate-500 uppercase mb-4 flex items-center gap-2"><Car size={16}/> Frota / Armamento Envolvido</h3>
                  <p className="text-sm text-slate-300 mb-2 border-b border-slate-800 pb-2"><span className="text-slate-500 font-bold text-[10px] uppercase block">Veículos</span> {selectedCase.veiculos || 'N/A'}</p>
                  <p className="text-sm text-slate-300"><span className="text-slate-500 font-bold text-[10px] uppercase block">Armas</span> {selectedCase.armas || 'N/A'}</p>
                </div>
              </div>

              {/* Conclusão Final */}
              {selectedCase.conclusao && (
                <div className="bg-indigo-950/20 border border-indigo-900/50 rounded-2xl p-6">
                   <h3 className="text-xs font-black text-indigo-400 uppercase mb-4 flex items-center gap-2"><CheckSquare size={16}/> Conclusão do Dossiê</h3>
                   <p className="text-sm text-indigo-100/80 whitespace-pre-wrap font-mono">{selectedCase.conclusao}</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              {/* Painel de Controle */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-center">
                <h3 className="text-xs font-black text-slate-500 uppercase mb-4 tracking-widest">Resolução do Caso</h3>
                <div className="w-32 h-32 mx-auto rounded-full border-8 border-slate-800 flex items-center justify-center relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] mb-4">
                  <span className="text-3xl font-black text-blue-500">{selectedCase.progresso}%</span>
                </div>
                <div className={`px-4 py-2 rounded-lg font-black border uppercase tracking-widest text-xs inline-block ${selectedCase.status === 'Concluído' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                  {selectedCase.status}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xs font-black text-slate-500 uppercase mb-6 flex items-center gap-2 tracking-widest"><Clock size={16}/> Histórico Registrado</h3>
                <div className="space-y-4">
                  {selectedCase.timeline?.map((t, i) => (
                    <div key={i} className="border-l-2 border-blue-600 pl-4 py-1 relative">
                      <div className="absolute w-2 h-2 bg-blue-600 rounded-full -left-[5px] top-1.5"></div>
                      <p className="text-[10px] font-black text-blue-500 uppercase">{t.data}</p>
                      <p className="text-sm text-slate-300 leading-tight mt-1">{t.evento}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => handleExcluir(selectedCase._id)} className="w-full flex items-center justify-center gap-2 bg-red-950/30 border border-red-900/50 text-red-500 hover:bg-red-600 hover:text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all">
                <Trash2 size={18} /> Arquivar Definitivamente
              </button>
            </div>
          </div>
        )}

        {/* 3. FORMULÁRIO (NOVO / EDITAR) */}
        {view === 'formulario' && (
          <form onSubmit={handleSalvar} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl animate-in slide-in-from-bottom-4">
            
            <h3 className="font-bold uppercase text-xs mb-8 flex items-center gap-2 text-blue-500 border-b border-slate-800 pb-3 tracking-widest">
              <FileText size={18} /> A. Informações Essenciais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Nome da Operação/Dossiê *</label>
                <input required className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
                  value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Tipologia Criminal *</label>
                <input required className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})} placeholder="Ex: Tráfico, Homicídio..." />
              </div>
              <div className="group md:col-span-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Resumo dos Fatos *</label>
                <textarea required rows="3" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none resize-none"
                  value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} />
              </div>
            </div>

            <h3 className="font-bold uppercase text-xs mb-8 flex items-center gap-2 text-emerald-500 border-b border-slate-800 pb-3 tracking-widest mt-10">
              <Search size={18} /> B. Dados de Inteligência (Opcional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Local Primário</label>
                <input className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  value={formData.local} onChange={e => setFormData({...formData, local: e.target.value})} />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Detalhes do Local</label>
                <input className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  value={formData.detalhesLocal} onChange={e => setFormData({...formData, detalhesLocal: e.target.value})} />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Suspeitos Identificados</label>
                <textarea rows="2" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none resize-none"
                  value={formData.suspeitos} onChange={e => setFormData({...formData, suspeitos: e.target.value})} />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Evidências Coletadas</label>
                <textarea rows="2" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none resize-none"
                  value={formData.evidencias} onChange={e => setFormData({...formData, evidencias: e.target.value})} />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Veículos Rastreáveis</label>
                <input className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  value={formData.veiculos} onChange={e => setFormData({...formData, veiculos: e.target.value})} />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Armas Utilizadas</label>
                <input className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  value={formData.armas} onChange={e => setFormData({...formData, armas: e.target.value})} />
              </div>
            </div>

            <h3 className="font-bold uppercase text-xs mb-8 flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3 tracking-widest mt-10">
              <Briefcase size={18} /> C. Gestão do Dossiê
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Status do Caso</label>
                <select className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-blue-500 outline-none"
                  value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option>Em investigação</option>
                  <option>Aguardando Mandado</option>
                  <option>Congelado (Cold Case)</option>
                  <option>Concluído</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Nível de Prioridade</label>
                <select className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-blue-500 outline-none"
                  value={formData.prioridade} onChange={e => setFormData({...formData, prioridade: e.target.value})}>
                  <option>Baixa</option>
                  <option>Média</option>
                  <option>Alta</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Progresso do Inquérito ({formData.progresso}%)</label>
                <input type="range" min="0" max="100" step="5" className="w-full accent-blue-600 mt-2"
                  value={formData.progresso} onChange={e => setFormData({...formData, progresso: parseInt(e.target.value)})} />
              </div>
              
              {formData.status === 'Concluído' && (
                <div className="group md:col-span-3">
                  <label className="block text-[10px] font-black text-indigo-400 uppercase mb-2">Relatório de Conclusão Final</label>
                  <textarea rows="3" className="w-full bg-indigo-950/20 border border-indigo-900/50 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none resize-none"
                    value={formData.conclusao} onChange={e => setFormData({...formData, conclusao: e.target.value})} placeholder="Escreva a conclusão do inquérito para fechamento." />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-slate-800">
              <button type="button" onClick={() => setView(isEditing ? 'detalhes' : 'lista')} className="px-8 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-800 transition-all uppercase text-xs tracking-widest">
                Cancelar
              </button>
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-3 rounded-xl font-black uppercase text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] tracking-widest">
                <Save size={18} /> {isEditing ? 'SALVAR ALTERAÇÕES' : 'ABRIR INVESTIGAÇÃO'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}