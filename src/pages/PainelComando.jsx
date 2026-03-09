import { useState, useEffect } from 'react';
import { 
  Shield, Crosshair, FileSearch, 
  Megaphone, MapPin, CheckCircle, XCircle, 
  TrendingUp, AlertOctagon,
  AlertTriangle, LayoutDashboard, Loader2, Activity,
  Target, BarChart, ShieldAlert, Radar
} from 'lucide-react';

export default function PainelComando() {
  const [activeTab, setActiveTab] = useState('geral');
  
  const [operacoes, setOperacoes] = useState([]);
  const [investigacoes, setInvestigacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [resOperacoes, resInvestigacoes] = await Promise.all([
          fetch('/api/operacoes'),
          fetch('/api/investigacoes')
        ]);

        if (resOperacoes.ok) {
          const opsData = await resOperacoes.json();
          setOperacoes(opsData);
        }
        if (resInvestigacoes.ok) {
          const invData = await resInvestigacoes.json();
          setInvestigacoes(invData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do Alto Comando:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, []);

  const handleUpdateOperacao = async (id, novoStatus) => {
    try {
      const res = await fetch('/api/operacoes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, status: novoStatus })
      });

      if (res.ok) {
        setOperacoes(prev => 
          prev.map(op => op._id === id ? { ...op, status: novoStatus } : op)
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  // Filtros de Operações
  const operacoesPendentes = operacoes.filter(op => op.status === 'Planejada' || op.status === 'Aguardando');
  const operacoesAtivas = operacoes.filter(op => op.status === 'Aprovada' || op.status === 'Em andamento');
  
  // Filtros de Investigações
  const investigacoesAtivas = investigacoes.filter(inv => !['Concluído', 'Arquivado'].includes(inv.status));

  const stats = [
    { 
      id: 'operacoes', 
      label: "Operações Ativas/Pendentes", 
      valor: (operacoesPendentes.length + operacoesAtivas.length).toString(), 
      icon: <Crosshair size={32} className="text-red-500"/>, 
      bg: "bg-gradient-to-br from-red-950/40 to-slate-900",
      accent: "border-red-500/30",
      glow: "hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]",
      targetTab: 'tatico' 
    },
    { 
      id: 'investigacoes', 
      label: "Inquéritos FIB em Andamento", 
      valor: investigacoesAtivas.length.toString(), 
      icon: <FileSearch size={32} className="text-purple-500"/>, 
      bg: "bg-gradient-to-br from-purple-950/40 to-slate-900",
      accent: "border-purple-500/30",
      glow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
      targetTab: 'inteligencia' 
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)]"></div>
        <Loader2 className="animate-spin text-yellow-500 mb-6" size={56} />
        <p className="text-slate-400 font-bold tracking-widest uppercase text-sm animate-pulse">Autenticando Alto Comando...</p>
        <p className="text-slate-600 text-[10px] uppercase tracking-[0.3em] mt-2">Nível de Acesso: Máximo</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50 font-sans relative overflow-hidden">
      
      {/* Luzes de Fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 xl:px-0 relative z-10">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-slate-800/80 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Conexão Segura Estabelecida</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase flex items-center gap-4 tracking-tighter">
              <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <Shield className="text-yellow-500" size={32} /> 
              </div>
              Centro de Comando
            </h1>
            <p className="text-slate-400 mt-2 font-medium">Painel de aprovação estratégica e supervisão do departamento.</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl px-5 py-3 flex items-center gap-4 shadow-xl">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Acesso Autorizado</p>
              <p className="text-sm font-black text-yellow-500 uppercase tracking-wider">Alto Comando LSPD</p>
            </div>
            <div className="h-10 w-10 bg-yellow-500/20 rounded-full border border-yellow-500/50 flex items-center justify-center">
              <ShieldAlert size={20} className="text-yellow-500" />
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO (TABS) */}
        <div className="flex overflow-x-auto gap-2 mb-10 border-b border-slate-800/50 pb-px scrollbar-hide">
          {[
            { id: 'geral', label: 'Visão Geral', icon: LayoutDashboard, color: 'text-yellow-500', activeColor: 'bg-yellow-500/10 border-yellow-500 text-yellow-500' },
            { id: 'tatico', label: 'Operações (Tático)', icon: Crosshair, color: 'text-red-500', activeColor: 'bg-red-500/10 border-red-500 text-red-500' },
            { id: 'inteligencia', label: 'FIB (Inteligência)', icon: AlertOctagon, color: 'text-purple-500', activeColor: 'bg-purple-500/10 border-purple-500 text-purple-500' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-black text-xs uppercase tracking-widest flex items-center gap-3 border-b-2 transition-all duration-300 whitespace-nowrap rounded-t-lg
                ${activeTab === tab.id ? tab.activeColor : 'border-transparent text-slate-500 hover:bg-slate-900/50 hover:text-slate-300'}`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? '' : tab.color} /> 
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTEÚDO DAS ABAS */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* --- ABA 1: VISÃO GERAL --- */}
          {activeTab === 'geral' && (
            <div className="space-y-8">
              
              {/* ESTATÍSTICAS CLICÁVEIS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Nível de Ameaça Global (Fixo) */}
                <div className="relative overflow-hidden p-8 rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-950/40 to-slate-900 flex items-center justify-between text-left shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                  <div className="absolute -right-6 -top-6 opacity-10">
                    <AlertTriangle size={150} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Radar size={14}/> Nível de Ameaça Atual</p>
                    <h3 className="text-5xl font-black text-white tracking-tighter uppercase text-orange-500">Elevado</h3>
                  </div>
                </div>

                {stats.map((stat, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveTab(stat.targetTab)}
                    className={`group relative overflow-hidden p-8 rounded-3xl border ${stat.accent} ${stat.bg} flex items-center justify-between text-left transition-all duration-300 transform hover:-translate-y-1 ${stat.glow} cursor-pointer`}
                  >
                    <div className="absolute -right-6 -top-6 opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                      {stat.icon}
                    </div>
                    <div className="relative z-10">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                      <h3 className="text-5xl font-black text-white tracking-tighter">{stat.valor}</h3>
                    </div>
                    <div className="relative z-10 p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 group-hover:bg-slate-900 transition-colors">
                      {stat.icon}
                    </div>
                  </button>
                ))}
              </div>

              {/* MÓDULOS INFORMATIVOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-orange-500"></div>
                  <h3 className="font-black uppercase text-xs mb-6 flex items-center gap-3 text-orange-500 tracking-widest border-b border-slate-800/50 pb-4">
                    <MapPin size={16} /> Radar de Ocorrências e Alertas
                  </h3>
                  <div className="space-y-4">
                    <p className="text-slate-400 font-bold flex items-center gap-2 text-[10px] uppercase tracking-widest">
                      <TrendingUp size={14} className="text-orange-400"/> Zonas Quentes Identificadas
                    </p>
                    <ul className="space-y-3">
                      {['Tráfico intenso de entorpecentes em Grove Street.', 'Aumento de desmanches na região de Sandy Shores.', 'Comboios suspeitos reportados próximos ao porto.'].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 font-medium bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                          <Activity size={16} className="text-orange-500/50 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-blue-500"></div>
                  <h3 className="font-black uppercase text-xs mb-6 flex items-center gap-3 text-blue-400 tracking-widest border-b border-slate-800/50 pb-4">
                    <Megaphone size={16} /> Diretrizes do Comando
                  </h3>
                  <div className="bg-blue-950/20 border border-blue-900/30 p-6 rounded-2xl relative shadow-inner">
                    <div className="absolute -top-3 left-6 bg-slate-950 border border-blue-500/30 px-3 py-1 rounded-md text-[9px] font-black text-blue-400 uppercase tracking-widest">
                      Aviso Oficial
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mt-2 font-mono">
                      "Atenção a todas as unidades: O uso de força letal só está autorizado em caso de ameaça direta à vida dos oficiais ou civis. O descumprimento resultará em investigação imediata da Corregedoria."
                    </p>
                    <p className="text-right mt-4 text-[10px] text-slate-500 uppercase tracking-widest font-black">— Chefia de Polícia</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- ABA 2: CENTRO TÁTICO (OPERAÇÕES) --- */}
          {activeTab === 'tatico' && (
            <div className="space-y-10">
              
              {/* SESSÃO 1: AGUARDANDO APROVAÇÃO */}
              <div>
                <h3 className="font-black uppercase text-sm mb-6 flex items-center gap-2 text-yellow-500 tracking-widest border-b border-slate-800 pb-2">
                  <AlertTriangle size={18}/> Requer Autorização do Comando ({operacoesPendentes.length})
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {operacoesPendentes.length > 0 ? operacoesPendentes.map((op) => (
                    <div key={op._id} className="bg-slate-900/80 border border-yellow-500/30 rounded-3xl p-6 shadow-[0_0_20px_rgba(234,179,8,0.1)] relative group overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
                      
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><Radar size={12}/> Código: {op.codigo || op._id.slice(-6).toUpperCase()}</p>
                          <h4 className="font-black text-2xl text-white uppercase tracking-tight">{op.nome || 'Operação Sem Nome'}</h4>
                        </div>
                        <span className="text-[9px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest border bg-yellow-500/10 text-yellow-500 border-yellow-500/20 animate-pulse">
                          Aguardando
                        </span>
                      </div>
                      
                      <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/50 mb-6 relative z-10">
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Resumo Tático</p>
                        <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">{op.descricao || op.objetivoPrincipal || 'Sem detalhes fornecidos no briefing.'}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                           <span className="text-slate-500 font-bold uppercase text-[9px] tracking-widest flex items-center gap-1 mb-1"><Shield size={12}/> Comandante</span>
                           <span className="text-white font-bold text-sm truncate">{op.comandante || 'Não Atribuído'}</span>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                           <span className="text-slate-500 font-bold uppercase text-[9px] tracking-widest flex items-center gap-1 mb-1"><Target size={12}/> Risco</span>
                           <span className={`text-sm font-black uppercase ${op.risco === 'Extremo' ? 'text-red-500' : op.risco === 'Alto' ? 'text-orange-500' : 'text-yellow-500'}`}>{op.risco || 'Médio'}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-slate-800/50 relative z-10">
                        <button onClick={() => handleUpdateOperacao(op._id, 'Aprovada')} className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(5,150,105,0.2)] hover:shadow-[0_0_20px_rgba(5,150,105,0.4)]">
                          <CheckCircle size={16} /> Aprovar
                        </button>
                        <button onClick={() => handleUpdateOperacao(op._id, 'Cancelada')} className="flex-1 flex items-center justify-center gap-2 bg-slate-950 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-800 hover:border-red-600 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                          <XCircle size={16} /> Negar
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl p-12 text-center">
                      <CheckCircle size={32} className="mx-auto text-slate-600 mb-3" />
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Nenhuma operação pendente de aprovação.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* SESSÃO 2: OPERAÇÕES EM ANDAMENTO */}
              <div>
                <h3 className="font-black uppercase text-sm mb-6 flex items-center gap-2 text-emerald-500 tracking-widest border-b border-slate-800 pb-2">
                  <Activity size={18}/> Operações Aprovadas / Em Andamento ({operacoesAtivas.length})
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {operacoesAtivas.length > 0 ? operacoesAtivas.map((op) => (
                    <div key={op._id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
                      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                      
                      <div>
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded mb-3 inline-block border border-emerald-500/20">{op.status}</span>
                        <h4 className="font-black text-lg text-white uppercase tracking-tight mb-2 line-clamp-1">{op.nome}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1 mb-4"><MapPin size={12}/> {op.local || 'Localização Omitida'}</p>
                      </div>
                      
                      <div className="border-t border-slate-800/50 pt-4 mt-auto">
                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Responsável</p>
                        <p className="text-sm font-bold text-slate-300 truncate">{op.comandante}</p>
                      </div>
                    </div>
                  )) : (
                     <div className="col-span-full bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl p-10 text-center">
                       <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Nenhuma operação tática em solo.</p>
                     </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* --- ABA 3: INTELIGÊNCIA (FIB) --- */}
          {activeTab === 'inteligencia' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-slate-800/50 pb-6 gap-4">
                  <div>
                    <h3 className="font-black uppercase text-3xl text-white tracking-tighter flex items-center gap-3">
                      <AlertOctagon size={32} className="text-purple-500" /> Supervisão do FIB
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 font-medium">Acesso de leitura para acompanhamento de inquéritos federais em andamento.</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 px-5 py-2.5 rounded-lg text-purple-400 text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    Nível Sigilo: Clearance A
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {investigacoes.length > 0 ? investigacoes.map((inv) => (
                    <div key={inv._id} className="p-6 bg-slate-950/80 border border-slate-800 rounded-2xl hover:border-purple-500/40 transition-all duration-300 group relative flex flex-col justify-between shadow-lg">
                      <div className="absolute left-0 top-0 w-1.5 h-full bg-purple-600/80 rounded-l-2xl"></div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-1 font-mono">{inv.id || 'ID SIGILOSO'}</p>
                            <h4 className="font-black text-white text-xl tracking-tight group-hover:text-purple-400 transition-colors uppercase">{inv.nome || 'Caso Oculto'}</h4>
                          </div>
                          {inv.prioridade === 'Alta' && <span className="bg-red-500/20 text-red-500 border border-red-500/30 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm"><AlertTriangle size={10}/> Prioridade Alta</span>}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-mono">{inv.descricao || 'Detalhes omitidos ou não preenchidos no dossiê principal.'}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 flex items-center gap-1"><Shield size={10}/> Agente FIB</p>
                            <p className="text-sm text-slate-200 font-bold truncate">{inv.investigador || 'Não atribuído'}</p>
                          </div>
                          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 flex items-center gap-1"><BarChart size={10}/> Status</p>
                            <p className={`text-sm font-black uppercase truncate ${inv.status === 'Concluído' ? 'text-emerald-500' : 'text-yellow-500'}`}>{inv.status || 'Ativo'}</p>
                          </div>
                        </div>

                        {/* Barra de Progresso Real do FIB */}
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Resolução do Inquérito</p>
                            <p className="text-[10px] text-purple-400 font-black">{inv.progresso || 0}%</p>
                          </div>
                          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full transition-all duration-1000" style={{ width: `${inv.progresso || 0}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full py-20 text-center border border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
                      <FileSearch size={48} className="mx-auto text-slate-700 mb-4" />
                      <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">Nenhum inquérito do FIB registrado no sistema.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}