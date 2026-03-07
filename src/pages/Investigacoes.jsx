import { useState } from 'react';
import { 
  Briefcase, Users, Target, Clock, AlertCircle, 
  Plus, Search, Camera, StickyNote, FileText, ChevronRight,
  MapPin, Car, Save, X, ArrowLeft
} from 'lucide-react';

export default function Investigacoes() {
  // Controle de visualização: 'lista', 'detalhes' ou 'novo-caso'
  const [view, setView] = useState('lista'); 
  const [selectedCase, setSelectedCase] = useState(null);

  // Base de dados inicial com a Operação Cobra
  const [casos, setCasos] = useState([
    {
      id: "CASE-2026-042",
      nome: "Operação Cobra",
      tipo: "Tráfico de drogas",
      investigador: "Det. Walker",
      status: "Em investigação",
      prioridade: "Alta",
      progresso: 60,
      ultimaAtt: "07/03/2026",
      descricao: "Recebemos informações de que uma organização está distribuindo drogas na região de Grove Street. Suspeitos foram vistos utilizando um veículo Sultan preto.",
      local: "Grove Street",
      detalhesLocal: "Área conhecida por atividade de gangue Ballas.",
      veiculos: "Sultan Preto - Placa Desconhecida",
      timeline: [
        { data: "03/03", evento: "Caso aberto e equipe designada" },
        { data: "04/03", evento: "Primeira evidência coletada" },
        { data: "05/03", evento: "Suspeito 'Ghost' identificado via CFTV" },
        { data: "06/03", evento: "Mandado solicitado" }
      ],
      suspeitos: [
        { nome: "Marcus Reed", apelido: "Ghost", status: "Procurado", risco: "Alto", obs: "Possível líder da operação." }
      ]
    }
  ]);

  const handleOpenCase = (caso) => {
    setSelectedCase(caso);
    setView('detalhes');
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Cabeçalho Dinâmico */}
        <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-4xl font-black text-white uppercase flex items-center gap-3 tracking-tighter">
              <Briefcase className="text-blue-500" size={36} /> 
              {view === 'lista' ? 'Investigações (FIB)' : view === 'detalhes' ? selectedCase.nome : 'Novo Registro de Caso'}
            </h1>
            <p className="text-slate-400 mt-1">
              {view === 'lista' ? 'Lista de dossiês e inteligência policial.' : 
               view === 'detalhes' ? `Dossiê Investigativo • ID: ${selectedCase.id}` : 
               'Preencha todos os campos para iniciar a investigação oficial.'}
            </p>
          </div>
          
          {view !== 'lista' && (
            <button 
              onClick={() => setView('lista')}
              className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-bold uppercase transition-colors"
            >
              <ArrowLeft size={18} /> Voltar para Lista
            </button>
          )}
        </div>

        {/* --- 1. ABA PRINCIPAL: LISTA DE INVESTIGAÇÕES --- */}
        {view === 'lista' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="text" placeholder="Buscar caso, ID ou suspeito..." className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 pl-12 outline-none focus:border-blue-500" />
              </div>
              <button 
                onClick={() => setView('novo-caso')}
                className="bg-blue-600 hover:bg-blue-500 px-6 rounded-lg font-bold flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Plus size={18} /> ABRIR NOVO CASO
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950/50 text-slate-500 uppercase font-black text-[10px] tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Caso</th>
                    <th className="px-6 py-4">Responsável</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Prioridade</th>
                    <th className="px-6 py-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {casos.map((c) => (
                    <tr key={c.id} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => handleOpenCase(c)}>
                      <td className="px-6 py-4 font-bold text-blue-400">{c.nome}</td>
                      <td className="px-6 py-4 text-slate-300">{c.investigador}</td>
                      <td className="px-6 py-4">
                        <span className="bg-yellow-500/10 text-yellow-500 text-[10px] px-2 py-1 rounded font-black border border-yellow-500/20 uppercase">{c.status}</span>
                      </td>
                      
                      {/* AQUI ESTÁ A IMPLEMENTAÇÃO 1: PRIORIDADE NA TABELA */}
                      <td className="px-6 py-4">
                        {c.prioridade === "Alta" ? (
                          <span className="flex items-center gap-1 font-bold text-red-500 uppercase text-[11px]">
                            <AlertCircle size={14} strokeWidth={3} /> {c.prioridade}
                          </span>
                        ) : (
                          <span className="font-bold text-slate-400 uppercase text-[11px]">{c.prioridade}</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right"><ChevronRight className="inline text-slate-600 group-hover:text-white" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- 2. PÁGINA DE DETALHES (OPERAÇÃO COBRA) --- */}
        {view === 'detalhes' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2 uppercase tracking-tighter text-blue-400">
                  <FileText size={20} /> Relatório de Inteligência
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6 italic">"{selectedCase.descricao}"</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1 tracking-widest">Local Investigado</p>
                    <p className="font-bold text-slate-200">{selectedCase.local}</p>
                    <p className="text-xs text-slate-500 mt-1">{selectedCase.detalhesLocal}</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1 tracking-widest">Veículos Sob Suspeita</p>
                    <p className="font-bold text-slate-200">{selectedCase.veiculos}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter text-red-500 flex items-center gap-2">
                  <Target size={20} /> Alvos Identificados
                </h3>
                {selectedCase.suspeitos.map((s, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-950 border border-slate-800 rounded-lg mb-2">
                    <div>
                      <p className="font-black text-lg text-white">{s.nome} <span className="text-blue-500 text-sm ml-2">"{s.apelido}"</span></p>
                      <p className="text-xs text-slate-400 mt-1">{s.obs}</p>
                    </div>
                    
                    {/* AQUI ESTÁ A IMPLEMENTAÇÃO 2: ÍCONE NO STATUS DO ALVO */}
                    <div className="text-right flex flex-col items-end">
                      <span className="bg-red-600 text-white text-[10px] px-3 py-1 rounded font-black uppercase flex items-center gap-1 mb-1">
                        <AlertCircle size={10} strokeWidth={3} /> {s.status}
                      </span>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Risco: {s.risco}</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-black text-slate-500 uppercase mb-4 tracking-widest text-center">Resolução do Caso</h3>
                <div className="w-full bg-slate-950 h-4 rounded-full border border-slate-800 overflow-hidden">
                  <div className="bg-blue-600 h-full shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-1000" style={{ width: `${selectedCase.progresso}%` }}></div>
                </div>
                <p className="text-center mt-2 font-black text-blue-500 text-xl">{selectedCase.progresso}%</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase tracking-tighter"><Clock size={18}/> Linha do Tempo</h3>
                <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
                  {selectedCase.timeline.map((t, i) => (
                    <div key={i} className="relative pl-8">
                      <div className="absolute left-0 top-1.5 w-6 h-6 bg-slate-950 border-2 border-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      </div>
                      <p className="text-[10px] font-black text-blue-500 uppercase">{t.data}</p>
                      <p className="text-sm text-slate-300 font-medium">{t.evento}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. ABA: NOVO REGISTRO --- */}
        {view === 'novo-caso' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Informações Básicas */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="font-bold uppercase text-sm mb-6 flex items-center gap-2 text-blue-400 border-b border-slate-800 pb-3">
                  <FileText size={18} /> 1. Informações do Registro
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nome do Caso</label>
                    <input type="text" placeholder="Operação..." className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm focus:border-blue-500 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tipo de Crime</label>
                    <input type="text" placeholder="Ex: Tráfico, Furto..." className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm focus:border-blue-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Descrição Inicial</label>
                  <textarea rows="4" placeholder="Descreva os motivos da investigação..." className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm focus:border-blue-500 outline-none"></textarea>
                </div>
              </div>

              {/* Suspeitos e Pessoas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h3 className="font-bold uppercase text-xs mb-4 flex items-center gap-2 text-red-500"><Target size={14}/> Suspeitos Iniciais</h3>
                  <button className="w-full py-3 border border-dashed border-slate-700 rounded text-[10px] font-black text-slate-500 hover:text-white hover:border-blue-500 transition-all uppercase tracking-widest">
                    + Vincular Suspeito
                  </button>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h3 className="font-bold uppercase text-xs mb-4 flex items-center gap-2 text-emerald-500"><Users size={14}/> Relacionados</h3>
                  <button className="w-full py-3 border border-dashed border-slate-700 rounded text-[10px] font-black text-slate-500 hover:text-white hover:border-blue-500 transition-all uppercase tracking-widest">
                    + Adicionar Vítima/Testemunha
                  </button>
                </div>
              </div>

              {/* Local e Veículos */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="font-bold uppercase text-sm mb-6 flex items-center gap-2 text-orange-400 border-b border-slate-800 pb-3">
                   <MapPin size={18} /> 2. Local e Logística
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <input type="text" placeholder="Rua / Bairro Principal" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs outline-none focus:border-blue-500" />
                    <textarea placeholder="Ponto de referência ou descrição do local..." className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs outline-none focus:border-blue-500" rows="2"></textarea>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-purple-400 font-bold text-[10px] uppercase tracking-widest mb-1"><Car size={14}/> Veículos Envolvidos</div>
                    <input type="text" placeholder="Modelo / Cor / Placa" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Coluna de Status e Finalização */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 text-center">Nível de Prioridade</label>
                  
                  {/* AQUI ESTÁ A IMPLEMENTAÇÃO 3: BOTÕES DE PRIORIDADE NO NOVO CASO */}
                  <div className="flex gap-2">
                    <button type="button" className="flex-1 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded text-[9px] font-black transition-all hover:bg-emerald-500/20">BAIXA</button>
                    <button type="button" className="flex-1 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded text-[9px] font-black transition-all hover:bg-yellow-500/20">MÉDIA</button>
                    <button type="button" className="flex-1 py-2 bg-red-600 text-white rounded text-[9px] font-black shadow-lg shadow-red-900/40 flex items-center justify-center gap-1 transition-transform hover:scale-105">
                      <AlertCircle size={12} strokeWidth={3} /> ALTA
                    </button>
                  </div>

                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span>Divisão Responsável</span>
                  </div>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs outline-none focus:border-blue-500">
                    <option>Detectives Division</option>
                    <option>Narcotics Unit</option>
                    <option>Gang Unit</option>
                    <option>Internal Affairs</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="font-bold uppercase text-[10px] mb-3 flex items-center gap-2 text-yellow-500 tracking-widest">
                  <StickyNote size={14} /> Notas Adicionais
                </h3>
                <textarea className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs outline-none focus:border-yellow-500" rows="4" placeholder="Observações sigilosas..."></textarea>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black text-white uppercase tracking-tighter flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-900/20">
                  <Save size={20} /> FINALIZAR REGISTRO
                </button>
                <button 
                  onClick={() => setView('lista')}
                  className="w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold text-slate-300 uppercase text-xs transition-all"
                >
                  Descartar Rascunho
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}