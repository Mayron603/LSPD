import { useState, useEffect } from 'react';
import { 
  Briefcase, Users, Target, Clock, AlertCircle, 
  Plus, Search, StickyNote, FileText, ChevronRight,
  MapPin, Car, Save, ArrowLeft, Trash2
} from 'lucide-react';

export default function Investigacoes() {
  const [view, setView] = useState('lista'); 
  const [selectedCase, setSelectedCase] = useState(null);
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado para o novo caso (Formulário)
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    descricao: '',
    local: '',
    detalhesLocal: '',
    veiculos: '',
    prioridade: 'Média',
    investigador: JSON.parse(localStorage.getItem('usuario') || '{}').nome || 'Sistema',
    status: 'Em investigação',
    progresso: 10
  });

  // Buscar dados do Banco de Dados
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

  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/investigacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: `CASE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
          timeline: [{ data: new Date().toLocaleDateString('pt-BR'), evento: "Investigação Iniciada" }],
          suspeitos: [] // Inicialmente vazio para expansão futura
        }),
      });
      if (res.ok) {
        setView('lista');
        fetchCasos();
        setFormData({ ...formData, nome: '', tipo: '', descricao: '', local: '', detalhesLocal: '', veiculos: '' });
      }
    } catch (err) {
      alert("Erro ao salvar no banco de dados");
    }
  };

  const handleExcluir = async (id, e) => {
    e.stopPropagation(); // Impede de abrir o caso ao clicar em excluir
    if (confirm("Deseja arquivar este dossiê permanentemente?")) {
      await fetch(`/api/investigacoes?id=${id}`, { method: 'DELETE' });
      fetchCasos();
      if (view === 'detalhes') setView('lista');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Cabeçalho Dinâmico */}
        <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-4xl font-black text-white uppercase flex items-center gap-3 tracking-tighter">
              <Briefcase className="text-blue-500" size={36} /> 
              {view === 'lista' ? 'Investigações (FIB)' : view === 'detalhes' ? selectedCase.nome : 'Novo Registro'}
            </h1>
            <p className="text-slate-400 mt-1">
              {view === 'lista' ? 'Lista de dossiês e inteligência policial.' : 
               view === 'detalhes' ? `Dossiê Investigativo • ID: ${selectedCase.id}` : 
               'Preencha todos os campos para iniciar a investigação oficial.'}
            </p>
          </div>
          
          {view !== 'lista' && (
            <button onClick={() => setView('lista')} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-bold uppercase transition-colors">
              <ArrowLeft size={18} /> Voltar
            </button>
          )}
        </div>

        {/* 1. LISTA DE INVESTIGAÇÕES */}
        {view === 'lista' && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="text" placeholder="Buscar caso..." className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 pl-12 outline-none focus:border-blue-500" />
              </div>
              <button onClick={() => setView('novo-caso')} className="bg-blue-600 hover:bg-blue-500 px-6 rounded-lg font-bold flex items-center gap-2 transition-all">
                <Plus size={18} /> ABRIR NOVO CASO
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950/50 text-slate-500 uppercase font-black text-[10px] tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Caso / Tipo</th>
                    <th className="px-6 py-4">Responsável</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Prioridade</th>
                    <th className="px-6 py-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {loading ? (
                    <tr><td colSpan="5" className="p-10 text-center text-slate-500">Acessando arquivos confidenciais...</td></tr>
                  ) : casos.map((c) => (
                    <tr key={c._id} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => handleOpenCase(c)}>
                      <td className="px-6 py-4">
                        <div className="font-bold text-blue-400 uppercase">{c.nome}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-tighter">{c.tipo}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{c.investigador}</td>
                      <td className="px-6 py-4">
                        <span className="bg-yellow-500/10 text-yellow-500 text-[10px] px-2 py-1 rounded font-black border border-yellow-500/20 uppercase">{c.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-bold uppercase text-[11px] flex items-center gap-1 ${c.prioridade === 'Alta' ? 'text-red-500' : 'text-slate-400'}`}>
                          {c.prioridade === 'Alta' && <AlertCircle size={14} />} {c.prioridade}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={(e) => handleExcluir(c._id, e)} className="p-2 hover:bg-red-500/20 text-slate-600 hover:text-red-500 rounded-lg transition-all mr-2">
                           <Trash2 size={16} />
                        </button>
                        <ChevronRight className="inline text-slate-600 group-hover:text-white" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. DETALHES DO CASO */}
        {view === 'detalhes' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2 uppercase text-blue-400">
                  <FileText size={20} /> Relatório de Inteligência
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6 italic">"{selectedCase.descricao}"</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Local Investigado</p>
                    <p className="font-bold text-slate-200">{selectedCase.local}</p>
                    <p className="text-xs text-slate-500 mt-1">{selectedCase.detalhesLocal}</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Veículos Envolvidos</p>
                    <p className="font-bold text-slate-200">{selectedCase.veiculos || 'Nenhum registrado'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-black text-slate-500 uppercase mb-4 text-center">Resolução</h3>
                <div className="w-full bg-slate-950 h-4 rounded-full border border-slate-800 overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{ width: `${selectedCase.progresso}%` }}></div>
                </div>
                <p className="text-center mt-2 font-black text-blue-500 text-xl">{selectedCase.progresso}%</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase"><Clock size={18}/> Linha do Tempo</h3>
                <div className="space-y-4">
                  {selectedCase.timeline?.map((t, i) => (
                    <div key={i} className="border-l-2 border-blue-600 pl-4 py-1">
                      <p className="text-[10px] font-black text-blue-500 uppercase">{t.data}</p>
                      <p className="text-sm text-slate-300">{t.evento}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. FORMULÁRIO NOVO CASO */}
        {view === 'novo-caso' && (
          <form onSubmit={handleSalvar} className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="font-bold uppercase text-sm mb-6 flex items-center gap-2 text-blue-400 border-b border-slate-800 pb-3">
                  <FileText size={18} /> 1. Informações do Registro
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input required placeholder="Nome do Caso (Ex: Operação...)" className="bg-slate-950 border border-slate-800 rounded p-3 text-sm outline-none focus:border-blue-500" 
                    value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
                  <input required placeholder="Tipo de Crime" className="bg-slate-950 border border-slate-800 rounded p-3 text-sm outline-none focus:border-blue-500"
                    value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})} />
                </div>
                <textarea required rows="4" placeholder="Descrição dos fatos..." className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm outline-none focus:border-blue-500"
                  value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} />
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="font-bold uppercase text-sm mb-6 flex items-center gap-2 text-orange-400 border-b border-slate-800 pb-3">
                   <MapPin size={18} /> 2. Local e Logística
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Bairro / Rua" className="bg-slate-950 border border-slate-800 rounded p-3 text-sm outline-none focus:border-blue-500"
                    value={formData.local} onChange={e => setFormData({...formData, local: e.target.value})} />
                  <input placeholder="Veículos (Modelo/Cor)" className="bg-slate-950 border border-slate-800 rounded p-3 text-sm outline-none focus:border-blue-500"
                    value={formData.veiculos} onChange={e => setFormData({...formData, veiculos: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase text-center block">Prioridade</label>
                <div className="flex gap-2">
                  {['Baixa', 'Média', 'Alta'].map(p => (
                    <button key={p} type="button" onClick={() => setFormData({...formData, prioridade: p})}
                      className={`flex-1 py-2 rounded text-[10px] font-black transition-all ${formData.prioridade === p ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                      {p}
                    </button>
                  ))}
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black text-white uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                  <Save size={20} /> FINALIZAR REGISTRO
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}