import { useState, useEffect } from 'react';
import { 
  Briefcase, Users, Target, Clock, AlertCircle, 
  Plus, Search, FileText, ChevronRight, Edit, CheckSquare,
  MapPin, Car, Save, ArrowLeft, Trash2, Camera, Shield, UserX, 
  Fingerprint, History, Image as ImageIcon, Video, UserPlus, Link, ShieldCheck
} from 'lucide-react';

// IMPORTAÇÃO OBRIGATÓRIA PARA A BLINDAGEM FUNCIONAR
import { fetchSeguro } from '../lib/api';

const ESTADO_INICIAL_FORMULARIO = {
  nome: '', tipo: '', descricao: '', local: '', detalhesLocal: '', 
  veiculos: '', armas: '', suspeitos: '', evidencias: '', conclusao: '',
  prioridade: 'Média', status: 'Em investigação', progresso: 0,
  investigador: JSON.parse(localStorage.getItem('usuario') || '{}').nome || 'Agente FIB',
  diligencias: [],
  oficiaisEnvolvidos: [], // Equipe do caso
  anexos: [], // Imagens e Vídeos
  novoEventoTimeline: '' 
};

export default function Investigacoes() {
  const [view, setView] = useState('lista'); 
  const [selectedCase, setSelectedCase] = useState(null);
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(ESTADO_INICIAL_FORMULARIO);
  
  // Estados para os inputs de listas
  const [diligenciaInput, setDiligenciaInput] = useState('');
  const [oficialInput, setOficialInput] = useState('');
  const [anexoUrl, setAnexoUrl] = useState('');
  const [anexoTipo, setAnexoTipo] = useState('imagem');

  const fetchCasos = async () => {
    setLoading(true);
    try {
      // USANDO FETCH SEGURO AQUI
      const res = await fetchSeguro('/api/investigacoes');
      const data = await res.json();
      setCasos(data);
    } catch (err) {
      console.error("Erro ao carregar investigações:", err);
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
      setFormData({
        ...casoEdit,
        diligencias: casoEdit.diligencias || [],
        oficiaisEnvolvidos: casoEdit.oficiaisEnvolvidos || [],
        anexos: casoEdit.anexos || [],
        novoEventoTimeline: ''
      });
      setIsEditing(true);
    } else {
      setFormData(ESTADO_INICIAL_FORMULARIO);
      setIsEditing(false);
    }
    setView('formulario');
  };

  // --- Funções de Arrays (Diligências, Oficiais, Anexos) ---
  const addDiligencia = () => {
    if (!diligenciaInput.trim()) return;
    const novasDiligencias = [...formData.diligencias, { id: Date.now(), texto: diligenciaInput, concluida: false }];
    setFormData({ ...formData, diligencias: novasDiligencias, progresso: calcularProgresso(novasDiligencias) });
    setDiligenciaInput('');
  };

  const toggleDiligencia = (id) => {
    const novasDiligencias = formData.diligencias.map(d => d.id === id ? { ...d, concluida: !d.concluida } : d);
    setFormData({ ...formData, diligencias: novasDiligencias, progresso: calcularProgresso(novasDiligencias) });
  };

  const removerDiligencia = (id) => {
    const novasDiligencias = formData.diligencias.filter(d => d.id !== id);
    setFormData({ ...formData, diligencias: novasDiligencias, progresso: calcularProgresso(novasDiligencias) });
  };

  const calcularProgresso = (diligencias) => {
    if (!diligencias || diligencias.length === 0) return formData.progresso;
    const concluidas = diligencias.filter(d => d.concluida).length;
    return Math.round((concluidas / diligencias.length) * 100);
  };

  const addOficial = () => {
    if (!oficialInput.trim()) return;
    setFormData({ ...formData, oficiaisEnvolvidos: [...formData.oficiaisEnvolvidos, oficialInput.trim()] });
    setOficialInput('');
  };

  const removerOficial = (index) => {
    const novosOficiais = [...formData.oficiaisEnvolvidos];
    novosOficiais.splice(index, 1);
    setFormData({ ...formData, oficiaisEnvolvidos: novosOficiais });
  };

  const addAnexo = () => {
    if (!anexoUrl.trim()) return;
    const novoAnexo = { id: Date.now(), tipo: anexoTipo, url: anexoUrl.trim() };
    setFormData({ ...formData, anexos: [...formData.anexos, novoAnexo] });
    setAnexoUrl('');
  };

  const removerAnexo = (id) => {
    setFormData({ ...formData, anexos: formData.anexos.filter(a => a.id !== id) });
  };

  // --- Salvar e Excluir ---
  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      const url = '/api/investigacoes';
      const method = isEditing ? 'PUT' : 'POST';
      let timelineAtualizada = formData.timeline || [];
      
      if (!isEditing) {
        timelineAtualizada = [{ data: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR').slice(0,5), evento: "Inquérito Federal Aberto" }];
      } else if (formData.novoEventoTimeline.trim() !== '') {
        timelineAtualizada = [
          { data: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR').slice(0,5), evento: formData.novoEventoTimeline },
          ...timelineAtualizada
        ];
      }

      const payload = {
        ...formData,
        timeline: timelineAtualizada,
        id: isEditing ? formData.id : `FIB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      };
      delete payload.novoEventoTimeline; 

      // USANDO FETCH SEGURO AQUI
      const res = await fetchSeguro(url, {
        method,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        if (isEditing) {
          const dadosAtualizados = await fetchSeguro('/api/investigacoes').then(r => r.json());
          setSelectedCase(dadosAtualizados.find(c => c._id === formData._id));
          setView('detalhes');
        } else {
          setView('lista');
        }
        fetchCasos();
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar no banco de dados da FIB");
    }
  };

  const handleExcluir = async (id, e) => {
    if(e) e.stopPropagation();
    if (confirm("AUTORIZAÇÃO FEDERAL EXIGIDA: Deseja apagar este dossiê permanentemente da rede?")) {
      // USANDO FETCH SEGURO AQUI
      await fetchSeguro(`/api/investigacoes?id=${id}`, { method: 'DELETE' });
      fetchCasos();
      if (view === 'detalhes') setView('lista');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50 font-sans relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 border-b border-slate-800 pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-900/50 text-cyan-400 text-xs font-mono mb-4">
              <Shield size={12} />
              <span>TERMINAL FIB // BUREAU DE INVESTIGAÇÕES</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase flex items-center gap-4 tracking-tighter">
              <div className="p-3 bg-cyan-600/10 rounded-xl border border-cyan-500/20">
                <Briefcase className="text-cyan-500" size={32} /> 
              </div>
              {view === 'lista' ? 'Central de Inquéritos' : view === 'detalhes' ? 'Dossiê ' + selectedCase.id : isEditing ? 'Editar Dossiê' : 'Novo Inquérito'}
            </h1>
          </div>
          
          {view !== 'lista' && (
            <div className="flex gap-3">
              {view === 'detalhes' && (
                <button onClick={() => handleOpenFormulario(selectedCase)} className="bg-cyan-900/20 text-cyan-500 border border-cyan-500/50 hover:bg-cyan-600 hover:text-white px-5 py-2.5 rounded-lg font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all">
                  <Edit size={16} /> Atualizar Caso
                </button>
              )}
              <button onClick={() => setView('lista')} className="bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white px-5 py-2.5 rounded-lg font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all">
                <ArrowLeft size={16} /> Voltar ao Arquivo
              </button>
            </div>
          )}
        </div>

        {/* --- 1. LISTA DE INVESTIGAÇÕES --- */}
        {view === 'lista' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative bg-slate-900 border border-slate-700/50 rounded-xl flex items-center shadow-xl">
                  <Search className="absolute left-4 text-cyan-500" size={20} />
                  <input type="text" placeholder="Buscar dossiê por alvo, tipo ou ID..." className="w-full bg-transparent border-none py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:ring-0 outline-none" />
                </div>
              </div>
              <button onClick={() => handleOpenFormulario()} className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 rounded-xl font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(8,145,178,0.4)] hover:shadow-[0_0_25px_rgba(8,145,178,0.6)]">
                <Plus size={18} /> Iniciar Investigação
              </button>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-950/80 text-cyan-500 uppercase font-black text-[10px] tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-5">Código / Alvo (Operação)</th>
                    <th className="px-6 py-5">Equipe Encarregada</th>
                    <th className="px-6 py-5">Status Operacional</th>
                    <th className="px-6 py-5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {loading ? (
                     <tr><td colSpan="4" className="p-16 text-center text-cyan-500 font-mono text-sm tracking-widest uppercase animate-pulse">Acessando mainframe do bureau...</td></tr>
                  ) : casos.length === 0 ? (
                    <tr><td colSpan="4" className="p-16 text-center text-slate-500 font-mono">NENHUM INQUÉRITO FEDERAL ATIVO.</td></tr>
                  ) : casos.map((c) => (
                    <tr key={c._id} className="hover:bg-cyan-950/10 transition-colors group cursor-pointer" onClick={() => handleOpenCase(c)}>
                      <td className="px-6 py-4">
                        <div className="font-black text-white uppercase text-base tracking-tight group-hover:text-cyan-400">{c.nome}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1 flex items-center gap-2">
                          <span className="text-cyan-500 font-mono">{c.id}</span> • {c.tipo}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-slate-200 font-bold text-xs uppercase tracking-wider">
                             <UserX size={14} className="text-slate-500"/> LÍDER: {c.investigador}
                          </div>
                          {c.oficiaisEnvolvidos && c.oficiaisEnvolvidos.length > 0 && (
                            <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                              + {c.oficiaisEnvolvidos.length} Oficial(is)
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5 w-40">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-black border uppercase w-fit tracking-widest ${c.status === 'Concluído' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : c.status === 'Congelado (Cold Case)' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                            {c.status}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                              <div className={`h-full ${c.status === 'Concluído' ? 'bg-emerald-500' : 'bg-cyan-500'}`} style={{ width: `${c.progresso || 0}%` }}></div>
                            </div>
                            <span className="text-[9px] font-black text-slate-400">{c.progresso || 0}%</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={(e) => handleExcluir(c._id, e)} className="p-2.5 bg-slate-950/50 border border-slate-800 hover:border-red-500/50 text-slate-500 hover:text-red-500 hover:bg-red-950/30 rounded-lg transition-all mr-2">
                           <Trash2 size={16} />
                        </button>
                        <button className="p-2.5 bg-slate-950/50 border border-slate-800 text-slate-500 group-hover:text-cyan-400 group-hover:border-cyan-900/50 rounded-lg transition-all">
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

        {/* --- 2. DETALHES DO CASO (DOSSIÊ FIB) --- */}
        {view === 'detalhes' && selectedCase && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-right-4">
            
            <div className="lg:col-span-8 space-y-6">
              
              {/* Relatório Principal */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-5 pointer-events-none text-white"><Fingerprint size={250} className="-mt-10 -mr-10"/></div>
                
                {/* Etiqueta Classificada */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 opacity-5 pointer-events-none select-none">
                  <span className="text-8xl font-black tracking-[0.5em] text-red-500 border-8 border-red-500 px-8 py-2 rounded-3xl">CLASSIFIED</span>
                </div>
                
                <div className="flex gap-2 mb-4 relative z-10">
                  <span className="bg-red-900/20 text-red-500 border border-red-500/30 px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase">Nível de Sigilo: {selectedCase.prioridade === 'Alta' ? 'Máximo' : 'Padrão'}</span>
                  <span className="bg-slate-800 text-cyan-400 border border-slate-700 px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase">{selectedCase.id}</span>
                </div>

                <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 relative z-10">{selectedCase.nome}</h2>
                
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 mb-8 relative z-10 flex flex-col sm:flex-row gap-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tipo de Crime</p>
                    <p className="text-cyan-500 font-bold uppercase">{selectedCase.tipo}</p>
                  </div>
                  <div className="sm:border-l border-slate-800 sm:pl-6">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Agente Líder</p>
                    <p className="text-slate-200 font-bold uppercase flex items-center gap-2"><UserX size={14} className="text-slate-500"/> {selectedCase.investigador}</p>
                  </div>
                  {/* Lista de Oficiais Envolvidos */}
                  {selectedCase.oficiaisEnvolvidos && selectedCase.oficiaisEnvolvidos.length > 0 && (
                    <div className="sm:border-l border-slate-800 sm:pl-6 flex-1">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Equipe Designada</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCase.oficiaisEnvolvidos.map((oficial, idx) => (
                          <span key={idx} className="bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase flex items-center gap-1.5 shadow-sm">
                            <ShieldCheck size={12} className="text-cyan-500" /> {oficial}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xs font-black text-slate-500 uppercase mb-3 tracking-widest flex items-center gap-2"><FileText size={16}/> Resumo Executivo dos Fatos</h3>
                <p className="text-slate-300 leading-relaxed font-mono bg-slate-950/50 p-6 rounded-2xl border border-slate-800 relative z-10 whitespace-pre-wrap text-sm shadow-inner">
                  {selectedCase.descricao || 'Sem descrição inserida.'}
                </p>
              </div>

              {/* Grid de Inteligência Misto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl lg:col-span-2">
                  <h3 className="text-xs font-black text-cyan-500 uppercase mb-4 flex items-center gap-2 tracking-widest border-b border-slate-800 pb-3"><CheckSquare size={16}/> Diligências e Tarefas ({selectedCase.diligencias?.length || 0})</h3>
                  {selectedCase.diligencias && selectedCase.diligencias.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedCase.diligencias.map(dil => (
                        <div key={dil.id} className={`p-3 rounded-xl border flex items-start gap-3 text-sm ${dil.concluida ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-400' : 'bg-slate-950/50 border-slate-800 text-slate-300'}`}>
                          <div className={`mt-0.5 w-4 h-4 rounded-sm flex items-center justify-center border shrink-0 ${dil.concluida ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'}`}>
                            {dil.concluida && <CheckSquare size={12} strokeWidth={4} />}
                          </div>
                          <span className={dil.concluida ? 'line-through opacity-70' : ''}>{dil.texto}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 italic bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-center">Nenhuma diligência registrada para este inquérito.</p>
                  )}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-xs font-black text-red-500 uppercase mb-4 flex items-center gap-2 tracking-widest"><Users size={16}/> Suspeitos & Organizações</h3>
                  <p className="text-sm text-slate-300 whitespace-pre-wrap bg-red-950/10 p-4 rounded-xl border border-red-900/30 leading-relaxed font-mono">{selectedCase.suspeitos || 'Nenhum alvo identificado.'}</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-xs font-black text-slate-500 uppercase mb-4 flex items-center gap-2 tracking-widest"><Camera size={16}/> Evidências Físicas</h3>
                  <p className="text-sm text-slate-300 whitespace-pre-wrap bg-slate-950/50 p-4 rounded-xl border border-slate-800 leading-relaxed font-mono">{selectedCase.evidencias || 'Nenhuma prova material descrita.'}</p>
                </div>
              </div>

              {/* MÓDULO MULTIMÍDIA (GALERIA) */}
              {selectedCase.anexos && selectedCase.anexos.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                  <h3 className="text-xs font-black text-indigo-400 uppercase mb-6 flex items-center gap-2 tracking-widest border-b border-slate-800 pb-3">
                    <ImageIcon size={18}/> Arquivos Multimídia (Evidências Visuais)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedCase.anexos.map((anexo) => (
                      <div key={anexo.id} className="relative group bg-slate-950 border border-slate-800 rounded-xl overflow-hidden aspect-video flex items-center justify-center shadow-inner">
                        {anexo.tipo === 'imagem' ? (
                          <img src={anexo.url} alt="Evidência" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <video src={anexo.url} controls className="w-full h-full object-cover bg-black" />
                        )}
                        <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded text-[9px] font-black uppercase text-slate-300 border border-slate-700 flex items-center gap-1">
                          {anexo.tipo === 'imagem' ? <ImageIcon size={10}/> : <Video size={10}/>} {anexo.tipo}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conclusão */}
              {selectedCase.conclusao && (
                <div className="bg-cyan-950/20 border border-cyan-900/50 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                   <div className="absolute right-0 top-0 opacity-10"><Shield size={150} className="-mt-10 -mr-10 text-cyan-500"/></div>
                   <h3 className="text-xs font-black text-cyan-400 uppercase mb-4 flex items-center gap-2 tracking-widest relative z-10"><CheckSquare size={16}/> Relatório de Fechamento do Inquérito</h3>
                   <p className="text-sm text-cyan-100/80 whitespace-pre-wrap font-mono relative z-10 bg-slate-950/40 p-5 rounded-2xl border border-cyan-900/30 leading-relaxed">{selectedCase.conclusao}</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl text-center relative overflow-hidden">
                <h3 className="text-xs font-black text-slate-500 uppercase mb-6 tracking-widest">Resolução do Inquérito</h3>
                <div className="w-40 h-40 mx-auto rounded-full border-[10px] border-slate-800 flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] mb-6 bg-slate-950">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke={selectedCase.status === 'Concluído' ? '#10b981' : '#06b6d4'} strokeWidth="10" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * (selectedCase.progresso || 0)) / 100} className="transition-all duration-1000 ease-out" />
                  </svg>
                  <span className="text-4xl font-black text-white">{selectedCase.progresso || 0}<span className="text-xl text-slate-500">%</span></span>
                </div>
                <div className={`px-5 py-2.5 rounded-xl font-black border uppercase tracking-widest text-xs inline-block shadow-lg ${selectedCase.status === 'Concluído' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : selectedCase.status === 'Congelado (Cold Case)' ? 'bg-slate-500/10 text-slate-400 border-slate-500/30' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'}`}>
                  {selectedCase.status}
                </div>
              </div>

              {/* Informações Locais (Sidebar) */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                <div>
                  <h3 className="text-[10px] font-black text-slate-500 uppercase mb-2 flex items-center gap-1 tracking-widest"><MapPin size={12}/> Localização</h3>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                    <p className="text-sm font-bold text-white mb-1">{selectedCase.local || 'Desconhecido'}</p>
                    <p className="text-xs text-slate-400">{selectedCase.detalhesLocal}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-slate-500 uppercase mb-2 flex items-center gap-1 tracking-widest"><Car size={12}/> Logística (Armas/Veículos)</h3>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-sm text-slate-300"><span className="text-slate-500 font-black text-[9px] uppercase block tracking-widest mb-0.5">Veículos Rastreáveis</span> {selectedCase.veiculos || 'N/A'}</p>
                    <div className="h-px w-full bg-slate-800"></div>
                    <p className="text-sm text-slate-300"><span className="text-slate-500 font-black text-[9px] uppercase block tracking-widest mb-0.5">Balística / Armas</span> {selectedCase.armas || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                <h3 className="text-xs font-black text-slate-500 uppercase mb-6 flex items-center gap-2 tracking-widest"><History size={16}/> Histórico Registrado</h3>
                <div className="space-y-5">
                  {selectedCase.timeline?.map((t, i) => (
                    <div key={i} className="border-l-2 border-cyan-600 pl-5 py-1 relative">
                      <div className="absolute w-3 h-3 bg-cyan-600 rounded-full -left-[7px] top-1 border-[3px] border-slate-900"></div>
                      <p className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-1">{t.data}</p>
                      <p className="text-sm text-slate-300 leading-snug">{t.evento}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. FORMULÁRIO (NOVO / EDITAR) --- */}
        {view === 'formulario' && (
          <form onSubmit={handleSalvar} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl animate-in slide-in-from-bottom-4 relative overflow-hidden">
            
            <h3 className="font-bold uppercase text-xs mb-8 flex items-center gap-2 text-cyan-500 border-b border-slate-800 pb-3 tracking-widest">
              <FileText size={18} /> A. Base do Inquérito
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Nome da Operação / Dossiê *</label>
                <input required className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 outline-none transition-all" 
                  value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} placeholder="Ex: Operação Valkyrie" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Tipologia Criminal *</label>
                <input required className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 outline-none transition-all"
                  value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})} placeholder="Ex: Tráfico Internacional, Homicídio..." />
              </div>
              <div className="group md:col-span-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Resumo Inicial dos Fatos *</label>
                <textarea required rows="4" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 outline-none resize-none transition-all font-mono text-sm"
                  value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} placeholder="Descreva os fatos que motivaram a abertura deste inquérito..." />
              </div>
            </div>

            {/* SEÇÃO NOVA: EQUIPE DESIGNADA */}
            <h3 className="font-bold uppercase text-xs mb-8 flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3 tracking-widest">
              <UserPlus size={18} /> B. Equipe de Investigação
            </h3>
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 mb-10">
              <p className="text-xs text-slate-400 mb-4 font-mono">Adicione os oficiais que estão colaborando neste caso.</p>
              <div className="flex gap-3 mb-6">
                <input type="text" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none text-sm" placeholder="Nome do Oficial / Distintivo" value={oficialInput} onChange={(e) => setOficialInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOficial())} />
                <button type="button" onClick={addOficial} className="bg-indigo-900/30 text-indigo-400 border border-indigo-500/50 hover:bg-indigo-600 hover:text-white px-6 rounded-xl font-bold uppercase tracking-widest text-xs transition-all">Atribuir</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.oficiaisEnvolvidos.map((oficial, index) => (
                  <span key={index} className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-2 shadow-sm">
                    <ShieldCheck size={14} className="text-indigo-400"/> {oficial}
                    <button type="button" onClick={() => removerOficial(index)} className="text-slate-500 hover:text-red-500 ml-1"><XCircle size={14} className="lucide-x-circle" /></button>
                  </span>
                ))}
                {formData.oficiaisEnvolvidos.length === 0 && <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Nenhum oficial designado.</p>}
              </div>
            </div>

            <h3 className="font-bold uppercase text-xs mb-8 flex items-center gap-2 text-emerald-500 border-b border-slate-800 pb-3 tracking-widest">
              <CheckSquare size={18} /> C. Plano de Ação (Diligências)
            </h3>
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 mb-10">
              <div className="flex gap-3 mb-6">
                <input type="text" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none text-sm" placeholder="Ex: Solicitar quebra de sigilo bancário..." value={diligenciaInput} onChange={(e) => setDiligenciaInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDiligencia())} />
                <button type="button" onClick={addDiligencia} className="bg-emerald-900/30 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-600 hover:text-white px-6 rounded-xl font-bold uppercase tracking-widest text-xs transition-all">Adicionar</button>
              </div>
              <div className="space-y-2">
                {formData.diligencias.map(dil => (
                  <div key={dil.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-xl group">
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${dil.concluida ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'bg-slate-950 border-slate-600'}`} onClick={() => toggleDiligencia(dil.id)}>
                        {dil.concluida && <CheckSquare size={14} strokeWidth={4} />}
                      </div>
                      <span className={`text-sm transition-all ${dil.concluida ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{dil.texto}</span>
                    </label>
                    <button type="button" onClick={() => removerDiligencia(dil.id)} className="text-slate-600 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>
            </div>

            {/* SEÇÃO NOVA: MULTIMÍDIA */}
            <h3 className="font-bold uppercase text-xs mb-8 flex items-center gap-2 text-fuchsia-500 border-b border-slate-800 pb-3 tracking-widest">
              <ImageIcon size={18} /> D. Arquivos e Evidências Visuais
            </h3>
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 mb-10">
              <p className="text-xs text-slate-400 mb-4 font-mono">Anexe links de imagens ou vídeos (Ex: Discord, Imgur, Youtube).</p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <select value={anexoTipo} onChange={(e) => setAnexoTipo(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 outline-none text-sm font-bold uppercase">
                  <option value="imagem">Imagem</option>
                  <option value="video">Vídeo</option>
                </select>
                <div className="relative flex-1">
                  <Link size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="url" className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-fuchsia-500 outline-none text-sm" placeholder="Cole o URL (link) aqui..." value={anexoUrl} onChange={(e) => setAnexoUrl(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAnexo())} />
                </div>
                <button type="button" onClick={addAnexo} className="bg-fuchsia-900/30 text-fuchsia-400 border border-fuchsia-500/50 hover:bg-fuchsia-600 hover:text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all">Anexar Arquivo</button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.anexos.map((anexo) => (
                  <div key={anexo.id} className="relative bg-slate-900 border border-slate-700 rounded-xl overflow-hidden group aspect-video flex items-center justify-center">
                    {anexo.tipo === 'imagem' ? (
                       <img src={anexo.url} alt="Evidência" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                       <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center gap-2 text-slate-500 p-4 text-center">
                         <Video size={32} className="text-slate-700" />
                         <span className="text-[9px] uppercase tracking-widest truncate w-full px-2">{anexo.url}</span>
                       </div>
                    )}
                    <button type="button" onClick={() => removerAnexo(anexo.id)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-red-500">
                      <Trash2 size={14} />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-sm border border-slate-700 px-2 py-1 rounded text-[9px] font-black uppercase text-slate-300">
                      {anexo.tipo}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-bold uppercase text-xs mb-8 flex items-center gap-2 text-blue-500 border-b border-slate-800 pb-3 tracking-widest">
              <Search size={18} /> E. Dados Físicos e Rastreio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Local Primário</label>
                <input className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-blue-500 outline-none transition-all"
                  value={formData.local} onChange={e => setFormData({...formData, local: e.target.value})} placeholder="Ponto de interesse principal" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Detalhes do Local</label>
                <input className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-blue-500 outline-none transition-all"
                  value={formData.detalhesLocal} onChange={e => setFormData({...formData, detalhesLocal: e.target.value})} placeholder="Ex: Galpão amarelo fundo" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Suspeitos Identificados</label>
                <textarea rows="3" className="w-full bg-red-950/10 border border-red-900/30 rounded-xl px-4 py-3.5 text-white focus:border-red-500 outline-none resize-none transition-all"
                  value={formData.suspeitos} onChange={e => setFormData({...formData, suspeitos: e.target.value})} placeholder="Liste suspeitos, ID, facções..." />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Evidências Materiais (Texto)</label>
                <textarea rows="3" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-blue-500 outline-none resize-none transition-all"
                  value={formData.evidencias} onChange={e => setFormData({...formData, evidencias: e.target.value})} placeholder="Descreva as provas físicas, drogas apreendidas..." />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Veículos Rastreáveis</label>
                <input className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-blue-500 outline-none transition-all"
                  value={formData.veiculos} onChange={e => setFormData({...formData, veiculos: e.target.value})} placeholder="Placas, modelos" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Balística / Armas Usadas</label>
                <input className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-blue-500 outline-none transition-all"
                  value={formData.armas} onChange={e => setFormData({...formData, armas: e.target.value})} placeholder="Tipos de calibre, cápsulas" />
              </div>
            </div>

            <h3 className="font-bold uppercase text-xs mb-8 flex items-center gap-2 text-yellow-500 border-b border-slate-800 pb-3 tracking-widest">
              <Briefcase size={18} /> F. Gestão do Dossiê e Histórico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Status do Caso</label>
                <select className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-yellow-500 outline-none transition-all cursor-pointer font-bold"
                  value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option>Em investigação</option>
                  <option>Aguardando Mandado</option>
                  <option>Congelado (Cold Case)</option>
                  <option>Concluído</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Nível de Prioridade</label>
                <select className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-yellow-500 outline-none transition-all cursor-pointer font-bold"
                  value={formData.prioridade} onChange={e => setFormData({...formData, prioridade: e.target.value})}>
                  <option>Baixa</option>
                  <option>Média</option>
                  <option>Alta</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">
                  Progresso Manual ({formData.progresso}%)
                </label>
                <input type="range" min="0" max="100" step="5" className="w-full accent-cyan-500 mt-3"
                  value={formData.progresso} 
                  onChange={e => setFormData({...formData, progresso: parseInt(e.target.value)})} 
                  title="Use apenas se não for usar a aba de Diligências." />
                <p className="text-[9px] text-slate-500 mt-2 font-mono uppercase">Atenção: A aba "Diligências" substitui esta barra.</p>
              </div>

              {isEditing && (
                <div className="group md:col-span-3 bg-cyan-950/10 border border-cyan-900/30 p-5 rounded-2xl">
                  <label className="block text-[10px] font-black text-cyan-500 uppercase mb-2 tracking-widest flex items-center gap-2"><History size={14}/> Adicionar Registro à Linha do Tempo</label>
                  <input className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 outline-none transition-all text-sm font-mono"
                    value={formData.novoEventoTimeline} onChange={e => setFormData({...formData, novoEventoTimeline: e.target.value})} placeholder="Ex: Câmeras de segurança do beco foram analisadas..." />
                </div>
              )}
              
              {formData.status === 'Concluído' && (
                <div className="group md:col-span-3">
                  <label className="block text-[10px] font-black text-emerald-500 uppercase mb-2 tracking-widest">Relatório de Fechamento (Conclusão)</label>
                  <textarea rows="4" className="w-full bg-emerald-950/10 border border-emerald-900/50 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none resize-none transition-all font-mono text-sm"
                    value={formData.conclusao} onChange={e => setFormData({...formData, conclusao: e.target.value})} placeholder="Escreva a conclusão do inquérito para o arquivamento definitivo." />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-slate-800">
              <button type="button" onClick={() => setView(isEditing ? 'detalhes' : 'lista')} className="px-8 py-4 rounded-xl font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all uppercase text-xs tracking-widest">
                Cancelar Edição
              </button>
              <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-4 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-3 transition-all shadow-[0_0_25px_rgba(8,145,178,0.4)] tracking-widest">
                <Save size={18} /> {isEditing ? 'SALVAR ATUALIZAÇÃO NO DOSSIÊ' : 'ABRIR INQUÉRITO FEDERAL'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}