import { useState, useEffect } from 'react';
import { fetchSeguro } from '../lib/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  Crosshair, Map, Plus, Users, Clock, XCircle, 
  Trash2, Shield, Terminal, Activity, Radar, Target, 
  ChevronRight, FileText, Brain, AlertTriangle, 
  CheckSquare, FileImage, ShieldAlert, Edit, Download
} from 'lucide-react';

const ESTADO_INICIAL_FORMULARIO = {
  nome: '', codigo: '', tipo: 'Mandado de Prisão', dataHorario: '',
  comandante: JSON.parse(localStorage.getItem('usuario') || '{}').nome || '',
  local: '', status: 'Planejada', risco: 'Alto',
  objetivoPrincipal: '', objetivosSecundarios: '',
  contexto: '', suspeitos: '', unidades: '',
  planoTatico: '', evidencias: '', roe: '', resultados: ''
};

export default function Operacoes() {
  const [showModal, setShowModal] = useState(false);
  const [operacoes, setOperacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [operacaoSelecionada, setOperacaoSelecionada] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState(ESTADO_INICIAL_FORMULARIO);

  const fetchOperacoes = async () => {
    try {
      const res = await fetchSeguro('/api/operacoes');
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
    setIsSubmitting(true);
    
    const method = isEditing ? 'PUT' : 'POST';
    
    const res = await fetchSeguro('/api/operacoes', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (res.ok) {
      setShowModal(false);
      setIsEditing(false);
      setFormData(ESTADO_INICIAL_FORMULARIO);
      fetchOperacoes();
      
      if (operacaoSelecionada) {
          setOperacaoSelecionada(null);
      }
    }
    setIsSubmitting(false);
  };

  const handleExcluir = async (id) => {
    if (confirm("AUTORIZAÇÃO REQUERIDA: Deseja remover esta operação do registro oficial?")) {
      await fetchSeguro(`/api/operacoes?id=${id}`, { method: 'DELETE' });
      fetchOperacoes();
      if (operacaoSelecionada && operacaoSelecionada._id === id) setOperacaoSelecionada(null);
    }
  };

  const handleNovaOperacao = () => {
    setFormData(ESTADO_INICIAL_FORMULARIO);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditarOperacao = () => {
    setFormData(operacaoSelecionada);
    setIsEditing(true);
    setOperacaoSelecionada(null);
    setShowModal(true);
  };

  const exportarParaPDF = (op) => {
    const doc = new jsPDF();
    const dataGeracao = new Date().toLocaleString();

    // Cabeçalho Estilizado
    doc.setFillColor(15, 23, 42); // Cor bg-slate-900
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("LSPD - RELATORIO DE OPERACAO", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Codigo: ${op.codigo || 'N/A'} | Gerado em: ${dataGeracao}`, 105, 30, { align: "center" });

    // Informações Principais
    doc.setTextColor(0, 0, 0);
    autoTable(doc, {
      startY: 45,
      head: [['Campo', 'Informacao']],
      body: [
        ['Operacao', op.nome || 'N/A'],
        ['Comandante', op.comandante || 'N/A'],
        ['Data/Hora', op.dataHorario || 'A definir'],
        ['Local', op.local || 'N/A'],
        ['Status', op.status || 'N/A'],
        ['Risco', op.risco || 'N/A'],
      ],
      theme: 'striped',
      headStyles: { fillStyle: [30, 41, 59] }
    });

    // Detalhamento Tático
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text("Planejamento e Execucao", 14, finalY);
    
    autoTable(doc, {
      startY: finalY + 5,
      body: [
        ['Objetivo Principal', op.objetivoPrincipal || 'N/A'],
        ['Objetivos Secundarios', op.objetivosSecundarios || 'N/A'],
        ['Inteligencia/Contexto', op.contexto || 'N/A'],
        ['Suspeitos', op.suspeitos || 'N/A'],
        ['Unidades Envolvidas', op.unidades || 'N/A'],
        ['Plano Tatico', op.planoTatico || 'N/A'],
        ['Regras (ROE)', op.roe || 'N/A'],
        ['Resultados Pós-Acao', op.resultados || 'N/A'],
      ],
      columnStyles: { 0: { fontStyle: 'bold', width: 50 } },
      styles: { overflow: 'linebreak' } // Garante que textos longos quebrem a linha
    });

    // Sanitizar o nome do ficheiro para não dar erro
    const nomeFicheiroOp = (op.nome || 'Operacao').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(`LSPD_${op.codigo || 'DOC'}_${nomeFicheiroOp}.pdf`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planejada': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]';
      case 'Em andamento': return 'text-blue-400 bg-blue-500/10 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)] animate-pulse';
      case 'Concluída': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const getRiscoColor = (risco) => {
    switch (risco) {
      case 'Baixo': return 'text-emerald-400';
      case 'Médio': return 'text-yellow-400';
      case 'Alto': return 'text-orange-500';
      case 'Extremo': return 'text-red-500 animate-pulse';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20 text-slate-50 font-sans relative overflow-hidden">
      
      {/* Luzes de Fundo */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="mb-10 pb-6 border-b border-slate-800/80 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 text-xs font-mono mb-4">
              <Terminal size={12} />
              <span>TERMINAL LSPD-OS v5.1 // COMANDO TÁTICO</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter flex items-center gap-4">
              <div className="p-3 bg-emerald-600/10 rounded-xl border border-emerald-500/20">
                <Radar className="text-emerald-500" size={32} /> 
              </div>
              Centro de Operações
            </h1>
          </div>
          
          <button onClick={handleNovaOperacao} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 uppercase tracking-widest text-sm">
            <Plus size={18} /> Agendar Missão
          </button>
        </div>

        {/* Painel Central (Lista) */}
        <div className="animate-in fade-in zoom-in-95 duration-500">
          {loading ? (
             <div className="flex flex-col items-center justify-center p-32 border border-slate-800 rounded-3xl bg-slate-900/50 backdrop-blur-sm">
               <Radar size={48} className="text-emerald-500 animate-spin-slow mb-6 opacity-50" />
               <p className="text-slate-400 font-mono font-bold tracking-widest uppercase text-sm animate-pulse">Sincronizando base de dados...</p>
             </div>
          ) : operacoes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {operacoes.map((op) => (
                <div key={op._id} className="bg-slate-900/80 border border-slate-800/80 rounded-3xl overflow-hidden hover:border-slate-600 transition-all duration-300 group backdrop-blur-xl flex flex-col h-full shadow-2xl relative">
                  
                  <div className={`absolute top-0 left-0 w-full h-1.5 ${op.status === 'Concluída' ? 'bg-emerald-500' : op.status === 'Em andamento' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>

                  <div className="p-8 flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black border uppercase tracking-widest flex items-center gap-1.5 ${getStatusColor(op.status)}`}>
                        <Activity size={12} /> STATUS: {op.status}
                      </span>
                      <button onClick={() => handleExcluir(op._id)} className="text-slate-600 hover:text-red-500 bg-slate-950 hover:bg-red-950/50 p-2 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Radar size={10} /> Código da Operação
                    </p>
                    <p className="text-emerald-500 text-sm font-mono uppercase tracking-widest mb-3">{op.codigo || 'OP-XXX'}</p>
                    
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Target size={10} /> Nome da Operação
                    </p>
                    <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                      {op.nome}
                    </h3>
                    
                    <div className="space-y-3 text-sm bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                      <div className="flex items-start gap-3">
                        <Shield size={16} className="text-slate-500 mt-0.5" /> 
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Comandante</p>
                          <p className="font-bold text-slate-200">{op.comandante}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Map size={16} className="text-slate-500 mt-0.5" /> 
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Local</p>
                          <p className="font-bold text-slate-200">{op.local}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-5 flex justify-between items-center border-t border-slate-800 group-hover:bg-slate-900 transition-colors">
                     <button onClick={() => setOperacaoSelecionada(op)} className="text-xs font-black text-slate-400 hover:text-emerald-400 uppercase tracking-widest flex items-center gap-1 transition-colors w-full text-left">
                       Dossiê Completo <ChevronRight size={14} className="ml-auto" />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-20 border border-dashed border-slate-700/50 rounded-3xl bg-slate-900/30 backdrop-blur-sm">
              <Radar className="text-emerald-500 w-16 h-16 opacity-50 mb-4" />
              <h3 className="text-2xl font-bold text-slate-300 mb-2 uppercase">Setor Pacífico</h3>
              <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">[ NENHUMA OPERAÇÃO AGENDADA ]</p>
            </div>
          )}
        </div>

        {/* --- MODAL DE VISUALIZAÇÃO (O BRIEFING COMPLETO DIVIDIDO EM CARDS) --- */}
        {operacaoSelecionada && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-slate-900 border border-slate-700/50 w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
              
              {/* Header do Dossiê */}
              <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-6 md:p-8 border-b border-slate-800 flex justify-between items-start md:items-center relative shrink-0">
                <div className="absolute right-0 top-0 opacity-5 pointer-events-none"><FileText size={250} className="-mt-16 -mr-10 text-white"/></div>
                
                <div className="relative z-10 w-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest inline-flex items-center gap-1.5 ${getStatusColor(operacaoSelecionada.status)}`}>
                        <Activity size={12} /> STATUS: {operacaoSelecionada.status}
                      </span>
                      <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-widest border border-slate-700 flex items-center gap-1">
                        <Radar size={12}/> CÓDIGO: {operacaoSelecionada.codigo || 'OP-XXX'}
                      </span>
                    </div>
                    
                    {/* Botoes Exportar, Editar e Fechar */}
                    <div className="flex gap-2 self-end md:self-auto">
                      <button onClick={() => exportarParaPDF(operacaoSelecionada)} className="text-blue-400 hover:text-white bg-blue-900/20 border border-blue-500/30 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors font-bold uppercase text-xs flex items-center gap-2">
                        <Download size={16} /> PDF
                      </button>
                      <button onClick={handleEditarOperacao} className="text-yellow-500 hover:text-white bg-yellow-900/20 border border-yellow-500/30 hover:bg-yellow-600 px-4 py-2 rounded-lg transition-colors font-bold uppercase text-xs flex items-center gap-2">
                        <Edit size={16} /> Editar
                      </button>
                      <button onClick={() => setOperacaoSelecionada(null)} className="text-slate-500 hover:text-white bg-slate-800/50 hover:bg-slate-800 p-2 rounded-lg transition-colors">
                        <XCircle size={24} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Target size={12} /> Nome da Operação
                  </p>
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                      {operacaoSelecionada.nome}
                  </h2>
                </div>
              </div>

              {/* Corpo do Dossiê (Grid de Cards) */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 bg-slate-950/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* CARD 1: Informações Gerais */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-2 shadow-lg">
                    <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2"><ShieldAlert size={16}/> 1. Informações Gerais</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Comandante</p>
                        <p className="text-white font-bold">{operacaoSelecionada.comandante}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Data / Horário</p>
                        <p className="text-white font-mono">{operacaoSelecionada.dataHorario || 'A definir'}</p>
                      </div>
                      <div className="col-span-2 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"><Map size={12}/> Localização Alvo</p>
                        <p className="text-white font-bold">{operacaoSelecionada.local}</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: Avaliação de Risco */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10"><AlertTriangle size={100} className={getRiscoColor(operacaoSelecionada.risco)} /></div>
                    <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2"><AlertTriangle size={16}/> 2. Avaliação de Risco</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Nível de Ameaça Estimado</p>
                    <p className={`text-2xl font-black uppercase tracking-tighter ${getRiscoColor(operacaoSelecionada.risco)}`}>{operacaoSelecionada.risco || 'N/A'}</p>
                  </div>

                  {/* CARD 3: Objetivo */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-3 shadow-lg">
                    <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2"><Target size={16}/> 3. Objetivos da Missão</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 bg-emerald-950/30 inline-block px-2 py-1 rounded">Objetivo Principal</p>
                        <p className="text-white font-bold text-lg leading-tight">{operacaoSelecionada.objetivoPrincipal || 'Não definido.'}</p>
                      </div>
                      {operacaoSelecionada.objetivosSecundarios && (
                        <div className="border-l border-slate-800 pl-6">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Objetivos Secundários</p>
                          <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{operacaoSelecionada.objetivosSecundarios}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CARD 4: Contexto / Inteligência */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-2 shadow-lg">
                    <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2"><Brain size={16}/> 4. Inteligência e Contexto</h3>
                    <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed font-mono">
                      {operacaoSelecionada.contexto || 'Sem dados de inteligência prévios.'}
                    </p>
                  </div>

                  {/* CARD 5: Evidências */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2"><FileImage size={16}/> 5. Evidências Coletadas</h3>
                    <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                      {operacaoSelecionada.evidencias || 'Nenhuma evidência anexada.'}
                    </p>
                  </div>

                  {/* CARD 6: Suspeitos */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg border-l-4 border-l-red-500">
                    <h3 className="text-xs font-black text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2"><Crosshair size={16}/> 6. Alvos / Suspeitos</h3>
                    <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed bg-red-950/10 p-3 rounded-lg">
                      {operacaoSelecionada.suspeitos || 'Alvos não identified.'}
                    </p>
                  </div>

                  {/* CARD 7: Unidades */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2"><Users size={16}/> 7. Unidades Envolvidas</h3>
                    <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                      {operacaoSelecionada.unidades || 'Unidades não despachadas.'}
                    </p>
                  </div>

                  {/* CARD 8: Plano Tático */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-2 shadow-lg lg:row-span-2">
                    <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2"><Map size={16}/> 8. Plano Tático de Incursão</h3>
                    <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed font-mono bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                      {operacaoSelecionada.planoTatico || 'O comandante informará o plano no rádio.'}
                    </p>
                  </div>

                  {/* CARD 9: Regras de Engajamento */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xs font-black text-yellow-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2"><CheckSquare size={16}/> 9. Regras de Engajamento (R.O.E)</h3>
                    <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                      {operacaoSelecionada.roe || '• Seguir protocolo padrão LSPD.\n• Força letal apenas em último caso.'}
                    </p>
                  </div>

                  {/* CARD 10: Resultados Pós-Ação */}
                  {operacaoSelecionada.status === 'Concluída' && (
                    <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-2xl p-6 shadow-lg lg:col-span-3">
                      <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-emerald-900/50 pb-2"><Shield size={16}/> 10. Relatório Pós-Ação (Resultados)</h3>
                      <p className="text-emerald-100/80 text-sm whitespace-pre-wrap leading-relaxed font-mono">
                        {operacaoSelecionada.resultados || 'Nenhum relatório final anexado à operação.'}
                      </p>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL DE CRIAÇÃO / EDIÇÃO (SUPER FORMULÁRIO) --- */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-700/50 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[95vh]">
              
              <div className={`bg-gradient-to-r ${isEditing ? 'from-yellow-900/40' : 'from-emerald-900/40'} to-slate-900 p-6 md:p-8 border-b ${isEditing ? 'border-yellow-900/50' : 'border-emerald-900/50'} relative shrink-0`}>
                <div className="absolute right-0 top-0 opacity-10">
                  {isEditing ? <Edit size={200} className="-mt-16 -mr-10 text-yellow-500"/> : <Crosshair size={200} className="-mt-16 -mr-10 text-emerald-500"/>}
                </div>
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isEditing ? 'bg-yellow-500/20 text-yellow-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {isEditing ? <Edit size={24} /> : <Plus size={24} />}
                        </div>
                        {isEditing ? 'EDITAR OPERAÇÃO' : 'Agendar Operação'}
                    </h2>
                    <p className="text-slate-400 mt-2 text-sm font-mono tracking-wider">
                      {isEditing ? 'ATUALIZE O DOSSIÊ TÁTICO' : 'PREENCHA O DOSSIÊ TÁTICO COMPLETO'}
                    </p>
                  </div>
                  <button onClick={() => { setShowModal(false); setIsEditing(false); setFormData(ESTADO_INICIAL_FORMULARIO); }} className="text-slate-500 hover:text-white bg-slate-800/50 hover:bg-slate-800 p-2 rounded-full transition-colors">
                      <XCircle size={28} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSalvar} className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 space-y-10">
                
                {/* Secção 1 */}
                <div>
                  <h3 className={`text-sm font-black uppercase tracking-widest border-b border-slate-800 pb-2 mb-6 ${isEditing ? 'text-yellow-500' : 'text-emerald-500'}`}>1. Dados Operacionais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="group md:col-span-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Nome da Operação *</label>
                      <input required type="text" className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none transition-all ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} placeholder="Ex: Operação Hydra" />
                    </div>
                    <div className="group md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Código</label>
                      <input type="text" className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none transition-all font-mono ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.codigo} onChange={e => setFormData({...formData, codigo: e.target.value})} placeholder="OP-021" />
                    </div>
                    <div className="group md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Data e Hora</label>
                      <input type="text" className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none transition-all font-mono ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.dataHorario} onChange={e => setFormData({...formData, dataHorario: e.target.value})} placeholder="07/03/2026 - 21:00" />
                    </div>
                    <div className="group md:col-span-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Localização / Região Alvo *</label>
                      <input required type="text" className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none transition-all ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.local} onChange={e => setFormData({...formData, local: e.target.value})} placeholder="Ex: Galpão abandonado - Grove Street" />
                    </div>
                    <div className="group md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Status Inicial</label>
                      <select className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                        <option>Planejada</option><option>Em andamento</option><option>Concluída</option>
                      </select>
                    </div>
                    <div className="group md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Nível de Risco</label>
                      <select className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.risco} onChange={e => setFormData({...formData, risco: e.target.value})}>
                        <option>Baixo</option><option>Médio</option><option>Alto</option><option>Extremo</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Secção 2 */}
                <div>
                  <h3 className={`text-sm font-black uppercase tracking-widest border-b border-slate-800 pb-2 mb-6 ${isEditing ? 'text-yellow-500' : 'text-emerald-500'}`}>2. Objetivos e Regras (ROE)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Objetivo Principal *</label>
                      <textarea required rows="2" className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none resize-none ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.objetivoPrincipal} onChange={e => setFormData({...formData, objetivoPrincipal: e.target.value})} placeholder="Ex: Cumprir mandado de prisão contra Marcus Reed."></textarea>
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Regras de Engajamento (R.O.E)</label>
                      <textarea rows="2" className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none resize-none ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.roe} onChange={e => setFormData({...formData, roe: e.target.value})} placeholder="Ex: Uso de força letal apenas se os suspeitos dispararem primeiro."></textarea>
                    </div>
                    <div className="group md:col-span-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Objetivos Secundários</label>
                      <textarea rows="2" className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none resize-none ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.objetivosSecundarios} onChange={e => setFormData({...formData, objetivosSecundarios: e.target.value})} placeholder="Ex: Apreender armas ilegais, recolher evidências..."></textarea>
                    </div>
                  </div>
                </div>

                {/* Secção 3 */}
                <div>
                  <h3 className={`text-sm font-black uppercase tracking-widest border-b border-slate-800 pb-2 mb-6 ${isEditing ? 'text-yellow-500' : 'text-emerald-500'}`}>3. Inteligência e Alvos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Contexto / Inteligência</label>
                      <textarea rows="3" className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none resize-none ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.contexto} onChange={e => setFormData({...formData, contexto: e.target.value})} placeholder="Informações obtidas antes da operação. Atividades suspeitas..."></textarea>
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Suspeitos Principais</label>
                      <textarea rows="3" className="w-full bg-red-950/10 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none resize-none" value={formData.suspeitos} onChange={e => setFormData({...formData, suspeitos: e.target.value})} placeholder="Nomes, vulgos e periculosidade dos alvos."></textarea>
                    </div>
                    <div className="group md:col-span-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Evidências Coletadas (Provas prévias)</label>
                      <input type="text" className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none transition-all ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.evidencias} onChange={e => setFormData({...formData, evidencias: e.target.value})} placeholder="Ex: Fotos do galpão, testemunhas, relatório do FIB." />
                    </div>
                  </div>
                </div>

                {/* Secção 4 */}
                <div>
                  <h3 className={`text-sm font-black uppercase tracking-widest border-b border-slate-800 pb-2 mb-6 ${isEditing ? 'text-yellow-500' : 'text-emerald-500'}`}>4. Tática e Mobilização</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Unidades Envolvidas</label>
                      <textarea rows="4" className="w-full bg-blue-950/10 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none resize-none" value={formData.unidades} onChange={e => setFormData({...formData, unidades: e.target.value})} placeholder="Ex: Comando (Sgt. Walker), Patrulha (Adam 12), Tática (Bravo 3)"></textarea>
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Plano Tático</label>
                      <textarea rows="4" className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none resize-none font-mono ${isEditing ? 'focus:border-yellow-500' : 'focus:border-emerald-500'}`} value={formData.planoTatico} onChange={e => setFormData({...formData, planoTatico: e.target.value})} placeholder="Estratégia, rotas de entrada, perímetro, contenção..."></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Resultados Pós-Ação (Só aparece se estiver a editar) */}
                {isEditing && (
                  <div>
                    <h3 className="text-sm font-black text-blue-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-6">5. Relatório Pós-Ação</h3>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Resultados Obtidos</label>
                      <textarea rows="4" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none resize-none font-mono" value={formData.resultados} onChange={e => setFormData({...formData, resultados: e.target.value})} placeholder="Relate o desfecho da operação..."></textarea>
                    </div>
                  </div>
                )}

                {/* Botões do Formulário */}
                <div className="pt-6 border-t border-slate-800/80 flex justify-end gap-4 pb-10 shrink-0">
                  <button type="button" onClick={() => { setShowModal(false); setIsEditing(false); setFormData(ESTADO_INICIAL_FORMULARIO); }} className="px-8 py-3.5 rounded-xl font-bold text-slate-400 hover:bg-slate-800 transition-all uppercase tracking-widest text-xs">
                    Cancelar
                  </button>
                  <button type="submit" disabled={isSubmitting} className={`flex items-center justify-center gap-2 text-white font-black px-10 py-3.5 rounded-xl transition-all disabled:opacity-50 uppercase tracking-widest text-xs ${isEditing ? 'bg-yellow-600 hover:bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'}`}>
                    {isSubmitting ? 'SALVANDO...' : (isEditing ? 'SALVAR ALTERAÇÕES' : 'REGISTRAR OPERAÇÃO')}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(51, 65, 85, 0.8); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(71, 85, 105, 1); }
      `}} />
    </div>
  );
}