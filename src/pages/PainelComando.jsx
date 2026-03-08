import { useState, useEffect } from 'react';
import { 
  Shield, Users, Crosshair, FileSearch, 
  Gavel, Megaphone, MapPin, CheckCircle, XCircle, 
  TrendingUp, Medal, FileSignature, AlertOctagon,
  AlertTriangle, LayoutDashboard, Loader2, ChevronRight, Activity
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
        body: JSON.stringify({ id, status: novoStatus })
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

  const operacoesAtivas = operacoes.filter(op => !['Concluída', 'Cancelada', 'Negada'].includes(op.status));
  const investigacoesAtivas = investigacoes.filter(inv => !['Concluído', 'Arquivado'].includes(inv.status));

  const stats = [
    { 
      id: 'operacoes', 
      label: "Operações Ativas", 
      valor: operacoesAtivas.length.toString(), 
      icon: <Crosshair size={32} className="text-red-500"/>, 
      bg: "bg-gradient-to-br from-red-950/40 to-slate-900",
      accent: "border-red-500/30",
      glow: "group-hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]",
      targetTab: 'tatico' 
    },
    { 
      id: 'investigacoes', 
      label: "Investigações (IA)", 
      valor: investigacoesAtivas.length.toString(), 
      icon: <FileSearch size={32} className="text-purple-500"/>, 
      bg: "bg-gradient-to-br from-purple-950/40 to-slate-900",
      accent: "border-purple-500/30",
      glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
      targetTab: 'inteligencia' 
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)]"></div>
        <Loader2 className="animate-spin text-blue-500 mb-6" size={56} />
        <p className="text-slate-400 font-bold tracking-widest uppercase text-sm animate-pulse">Estabelecendo Conexão Segura...</p>
        <p className="text-slate-600 text-[10px] uppercase tracking-[0.3em] mt-2">Nível de Acesso: Alto Comando</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 xl:px-0">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-slate-800/80 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Sistema Online</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase flex items-center gap-3 tracking-tighter">
              <Shield className="text-yellow-500" size={40} /> 
              Centro de Comando
            </h1>
            <p className="text-slate-400 mt-2 font-medium">
              Gestão estratégica de operações, efetivo e inteligência.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Oficial Conectado</p>
              <p className="text-sm font-black text-white">Comando Geral</p>
            </div>
            <div className="h-10 w-10 bg-slate-800 rounded-full border-2 border-slate-700 flex items-center justify-center">
              <Shield size={20} className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO (TABS) */}
        <div className="flex overflow-x-auto gap-2 mb-10 border-b border-slate-800/50 pb-px scrollbar-hide">
          {[
            { id: 'geral', label: 'Visão Geral', icon: LayoutDashboard, color: 'text-yellow-500', activeColor: 'bg-yellow-500/10 border-yellow-500 text-yellow-500' },
            { id: 'efetivo', label: 'Efetivo', icon: Users, color: 'text-blue-500', activeColor: 'bg-blue-500/10 border-blue-500 text-blue-500' },
            { id: 'tatico', label: 'Centro Tático', icon: Crosshair, color: 'text-red-500', activeColor: 'bg-red-500/10 border-red-500 text-red-500' },
            { id: 'inteligencia', label: 'Inteligência', icon: AlertOctagon, color: 'text-purple-500', activeColor: 'bg-purple-500/10 border-purple-500 text-purple-500' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-bold text-xs uppercase tracking-widest flex items-center gap-3 border-b-2 transition-all duration-300 whitespace-nowrap rounded-t-lg
                ${activeTab === tab.id ? tab.activeColor : 'border-transparent text-slate-500 hover:bg-slate-900/50 hover:text-slate-300'}`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? '' : tab.color} /> 
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTEÚDO DAS ABAS */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* --- ABA 1: VISÃO GERAL --- */}
          {activeTab === 'geral' && (
            <div className="space-y-8">
              
              {/* ESTATÍSTICAS CLICÁVEIS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveTab(stat.targetTab)}
                    className={`group relative overflow-hidden p-8 rounded-2xl border ${stat.accent} ${stat.bg} flex items-center justify-between text-left transition-all duration-300 transform hover:-translate-y-1 hover:border-slate-600 ${stat.glow}`}
                  >
                    <div className="absolute -right-6 -top-6 opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                      {stat.icon}
                    </div>
                    <div className="relative z-10">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                      <h3 className="text-6xl font-black text-white tracking-tighter">{stat.valor}</h3>
                    </div>
                    <div className="relative z-10 p-5 bg-slate-950/60 rounded-2xl border border-slate-800/50 group-hover:bg-slate-950 transition-colors">
                      {stat.icon}
                    </div>
                  </button>
                ))}
              </div>

              {/* MÓDULOS INFORMATIVOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-orange-500"></div>
                  <h3 className="font-black uppercase text-sm mb-6 flex items-center gap-3 text-orange-500 tracking-widest border-b border-slate-800/50 pb-4">
                    <MapPin size={20} /> Situação da Cidade
                  </h3>
                  <div className="space-y-4">
                    <p className="text-slate-400 font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
                      <TrendingUp size={16} className="text-orange-400"/> Ameaças Identificadas
                    </p>
                    <ul className="space-y-3">
                      {['Gangue em atividade intensa nas zonas sul.', 'Aumento de roubos no centro da cidade.', 'Alerta de contrabando no porto.'].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 font-medium bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                          <Activity size={16} className="text-orange-500/50 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-blue-500"></div>
                  <h3 className="font-black uppercase text-sm mb-6 flex items-center gap-3 text-blue-400 tracking-widest border-b border-slate-800/50 pb-4">
                    <Megaphone size={20} /> Murão de Avisos
                  </h3>
                  <div className="bg-blue-950/20 border border-blue-900/30 p-5 rounded-xl relative">
                    <div className="absolute -top-3 left-4 bg-slate-950 border border-blue-900/50 px-2 py-0.5 rounded text-[9px] font-black text-blue-400 uppercase tracking-widest">
                      Novo
                    </div>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed mt-2">
                      Lembrete oficial a todo o efetivo: O uso da bodycam é estritamente obrigatório durante qualquer abordagem ou patrulha tática.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- ABA 2: EFETIVO --- */}
          {activeTab === 'efetivo' && (
            <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center mb-6 shadow-xl">
                <Users size={40} className="text-slate-600" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tighter mb-2">Módulo de Efetivo em Manutenção</h2>
              <p className="text-slate-500 max-w-md">A integração com a base central de oficiais e patentes está sendo aprimorada pela equipa técnica.</p>
            </div>
          )}

          {/* --- ABA 3: CENTRO TÁTICO (OPERAÇÕES) --- */}
          {activeTab === 'tatico' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black uppercase text-lg flex items-center gap-3 text-white tracking-tighter">
                  <div className="p-2 bg-red-500/10 rounded-lg"><Crosshair size={24} className="text-red-500"/></div>
                  Operações Registadas
                </h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {operacoes.length > 0 ? operacoes.map((op) => {
                  const isPending = op.status === 'Planejada' || op.status === 'Aguardando';
                  const isSuccess = op.status === 'Aprovada' || op.status === 'Concluída';
                  
                  return (
                    <div key={op._id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative group transition-all hover:border-slate-700">
                      <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-2xl ${isSuccess ? 'bg-emerald-500' : isPending ? 'bg-yellow-500' : 'bg-red-600'}`}></div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">ID: {op._id.slice(-6).toUpperCase()}</p>
                          <h4 className="font-black text-2xl text-white uppercase tracking-tighter">{op.nome || 'Sem Nome'}</h4>
                        </div>
                        <span className={`text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest border ${
                          isPending ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                          isSuccess ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                          'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                          {op.status}
                        </span>
                      </div>
                      
                      <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 mb-6 min-h-[80px]">
                        <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">{op.descricao || 'Sem detalhes fornecidos na criação do briefing.'}</p>
                      </div>
                      
                      <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                        <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <Shield size={14}/> Oficial Comandante
                        </span>
                        <span className="text-white font-black uppercase text-sm bg-slate-800 px-3 py-1 rounded-md">{op.comandante || 'Não Atribuído'}</span>
                      </div>

                      {/* Botões de Ação */}
                      {isPending && (
                        <div className="flex gap-3 pt-2 border-t border-slate-800/50">
                          <button onClick={() => handleUpdateOperacao(op._id, 'Aprovada')} className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(5,150,105,0.2)] hover:shadow-[0_0_25px_rgba(5,150,105,0.4)] hover:-translate-y-0.5">
                            <CheckCircle size={18} /> Autorizar
                          </button>
                          <button onClick={() => handleUpdateOperacao(op._id, 'Cancelada')} className="flex-1 flex items-center justify-center gap-2 bg-slate-950 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-800 hover:border-red-600 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-0.5">
                            <XCircle size={18} /> Negar
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }) : (
                  <div className="col-span-full bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-16 text-center">
                    <Crosshair size={40} className="mx-auto text-slate-700 mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest">Nenhuma operação ativa no radar.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- ABA 4: INTELIGÊNCIA --- */}
          {activeTab === 'inteligencia' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-slate-800/50 pb-6 gap-4">
                  <div>
                    <h3 className="font-black uppercase text-2xl text-white tracking-tighter flex items-center gap-3">
                      <AlertOctagon size={28} className="text-purple-500" /> Banco de Inteligência
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 font-medium">Acesso de leitura irrestrito a inquéritos e dossiês departamentais.</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-lg text-purple-400 text-[10px] font-black uppercase tracking-widest">
                    Nível de Acesso: Máximo
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {investigacoes.length > 0 ? investigacoes.map((inv) => (
                    <div key={inv._id} className="p-6 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-purple-500/40 transition-all duration-300 group relative flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="absolute left-0 top-0 w-1 h-full bg-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-black text-white text-xl tracking-tight group-hover:text-purple-400 transition-colors">{inv.nome || 'Caso em Sigilo'}</p>
                          {inv.prioridade === 'Alta' && <span className="bg-red-500/20 text-red-500 border border-red-500/30 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-1"><AlertTriangle size={10}/> Alta</span>}
                        </div>
                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed max-w-2xl">{inv.descricao || 'Detalhes omitidos ou não preenchidos no dossiê principal.'}</p>
                      </div>
                      
                      <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto md:min-w-[200px] shrink-0">
                        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg w-full">
                          <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Investigador</p>
                          <p className="text-sm text-white font-bold truncate">{inv.investigador || 'Não atribuído'}</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg w-full flex justify-between items-center">
                          <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Status</p>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${inv.status === 'Concluído' ? 'text-emerald-500' : 'text-yellow-500'}`}>
                            {inv.status || 'Ativa'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="py-16 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
                      <FileSearch size={40} className="mx-auto text-slate-700 mb-4" />
                      <p className="text-slate-400 font-bold tracking-widest uppercase">Nenhum inquérito encontrado.</p>
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