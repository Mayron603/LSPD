import { useState, useEffect } from 'react';
import { 
  Search, User, AlertTriangle, ShieldAlert, Car, 
  Users, Briefcase, FileText, Camera, MapPin, 
  Crosshair, ChevronRight, FileWarning, DollarSign, 
  Clock, PlusCircle, Save, Fingerprint, Terminal, Activity, FileKey
} from 'lucide-react';

export default function BancoCriminal() {
  const [view, setView] = useState('busca'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mensagemBusca, setMensagemBusca] = useState('');

  const [fichasNoBanco, setFichasNoBanco] = useState([]);
  const [fichaAtual, setFichaAtual] = useState(null);

  useEffect(() => {
    buscarFichas();
  }, []);

  const buscarFichas = async () => {
    try {
      const response = await fetch('/api/banco-criminal');
      if (response.ok) {
        const data = await response.json();
        setFichasNoBanco(data);
      }
    } catch (error) {
      console.error("Erro ao carregar banco de dados:", error);
    }
  };

  // Estado completo com TODAS as informações
  const [formData, setFormData] = useState({
    nome: '', apelido: '', passaporte: '', nascimento: '', telefone: '', endereco: '', 
    status: 'Limpo', periculosidade: 'Baixo',
    veiculos: '', associacoes: '', historico: '', prisoes: '', multas: '', mandados: '', notas: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setMensagemBusca('');
    
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    const resultado = fichasNoBanco.find(ficha => 
      (ficha.nome && ficha.nome.toLowerCase().includes(query)) ||
      (ficha.passaporte && String(ficha.passaporte) === query) ||
      (ficha.apelido && ficha.apelido.toLowerCase().includes(query))
    );

    if (resultado) {
      setFichaAtual(resultado);
      setView('perfil');
    } else {
      setMensagemBusca(`NENHUM REGISTRO ENCONTRADO PARA: "${searchQuery.toUpperCase()}"`);
      setFichaAtual(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitNovaFicha = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/banco-criminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Limpa o formulário todo após criar
        setFormData({ 
          nome: '', apelido: '', passaporte: '', nascimento: '', telefone: '', endereco: '', 
          status: 'Limpo', periculosidade: 'Baixo', veiculos: '', associacoes: '', historico: '', prisoes: '', multas: '', mandados: '', notas: '' 
        });
        await buscarFichas(); 
        setView('busca');
        setSearchQuery('');
        setMensagemBusca('NOVO REGISTRO INSERIDO COM SUCESSO NO SISTEMA CENTRAL.');
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("ERRO CRÍTICO: Falha na comunicação com o mainframe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20 text-slate-50 relative overflow-hidden">
      
      {/* Luzes de Fundo (Ambiente Tático) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Cabeçalho do Sistema */}
        <div className="mb-10 pb-6 border-b border-slate-800/80">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-900/50 text-blue-400 text-xs font-mono mb-4">
                <Terminal size={12} />
                <span>TERMINAL LSPD-OS v5.0 // ACESSO RESTRITO</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter flex items-center gap-4">
                <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-500/20">
                  <Activity className="text-blue-500" size={32} /> 
                </div>
                Banco Criminal
              </h1>
            </div>
            
            {/* Navegação */}
            <div className="flex flex-wrap gap-3 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
              <button onClick={() => { setView('busca'); setFichaAtual(null); setMensagemBusca(''); }}
                className={`px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${view === 'busca' || view === 'perfil' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                <Search size={16} /> Pesquisa
              </button>
              <button onClick={() => setView('criar')}
                className={`px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${view === 'criar' ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'}`}>
                <PlusCircle size={16} /> Novo Registro
              </button>
            </div>
          </div>
        </div>

        {/* --- ABA 1: PESQUISA & RESULTADO --- */}
        {(view === 'busca' || view === 'perfil') && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900 border border-slate-700/50 p-3 rounded-2xl flex gap-3 shadow-2xl backdrop-blur-xl">
                <div className="relative flex-1 flex items-center">
                  <Search className="absolute left-5 text-blue-500" size={24} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="INSERIR NOME, PASSAPORTE OU VULGO PARA BUSCA..." 
                    className="w-full bg-transparent border-none py-4 pl-14 pr-4 text-white text-lg font-medium placeholder:text-slate-500 focus:ring-0 outline-none uppercase tracking-wide"
                  />
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-10 rounded-xl font-black uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] active:scale-95">
                  Buscar
                </button>
              </div>
            </form>

            {mensagemBusca && (
              <div className={`p-4 rounded-xl font-mono text-sm font-bold text-center border backdrop-blur-md flex items-center justify-center gap-3 ${mensagemBusca.includes('SUCESSO') ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-400' : 'bg-red-900/20 border-red-500/30 text-red-400'}`}>
                {mensagemBusca.includes('SUCESSO') ? <ShieldAlert size={18} /> : <AlertTriangle size={18} />}
                {mensagemBusca}
              </div>
            )}

            {view === 'busca' && !mensagemBusca && (
              <div className="flex flex-col items-center justify-center p-20 border border-dashed border-slate-700/50 rounded-3xl bg-slate-900/30 backdrop-blur-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
                  <Terminal className="w-20 h-20 text-slate-600 relative z-10" strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-bold text-slate-300 mb-3 tracking-tight">SISTEMA LSPD PRONTO</h3>
                <p className="text-slate-500 font-mono text-sm">
                  {fichasNoBanco.length > 0 
                    ? `[ BASE DE DADOS: ${fichasNoBanco.length} REGISTROS CARREGADOS ]`
                    : "[ BASE DE DADOS VAZIA. AGUARDANDO INSERÇÃO DE DADOS. ]"}
                </p>
              </div>
            )}

            {/* Ficha do Cidadão (PERFIL COMPLETO) */}
            {view === 'perfil' && fichaAtual && (
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in slide-in-from-bottom-8 duration-700">
               
               {/* Coluna Esquerda: ID Card */}
               <div className="lg:col-span-4 space-y-6">
                 <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl relative group">
                   <div className={`absolute top-0 w-full h-1.5 ${['Procurado', 'Foragido', 'Preso'].includes(fichaAtual.status) ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]' : 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]'}`}></div>
                   
                   <div className="p-8 text-center relative">
                     <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/50 blur-[2px] opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20"></div>
                     
                     <div className="relative w-40 h-40 mx-auto mb-6">
                        <div className="absolute inset-0 bg-slate-800 rounded-2xl rotate-3 transition-transform group-hover:rotate-6"></div>
                        <div className="absolute inset-0 bg-slate-950 rounded-2xl border-2 border-slate-700 flex items-center justify-center overflow-hidden z-10">
                          <User size={80} className="text-slate-700" />
                        </div>
                        <div className="absolute -bottom-3 -right-3 bg-slate-900 p-2 rounded-xl border border-slate-700 z-20 text-slate-500">
                          <Fingerprint size={24} />
                        </div>
                     </div>

                     <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-1">{fichaAtual.nome}</h2>
                     <p className="text-blue-400 font-bold tracking-widest text-sm mb-5 uppercase">VULGO: "{fichaAtual.apelido || 'N/A'}"</p>
                     
                     <div className={`inline-flex items-center gap-2 text-white px-5 py-2 rounded-lg font-black uppercase tracking-widest text-sm shadow-xl ${['Procurado', 'Foragido', 'Preso'].includes(fichaAtual.status) ? 'bg-red-600/20 border border-red-500/50 text-red-500 animate-pulse' : 'bg-emerald-600/20 border border-emerald-500/50 text-emerald-500'}`}>
                       {['Procurado', 'Foragido', 'Preso'].includes(fichaAtual.status) ? <AlertTriangle size={16} strokeWidth={3} /> : <ShieldAlert size={16} strokeWidth={3} />}
                       STATUS: {fichaAtual.status || 'LIMPO'}
                     </div>
                   </div>
                   
                   <div className="bg-slate-950/50 border-t border-slate-800 p-6">
                     <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                       <div>
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Passaporte</p>
                         <p className="font-mono text-blue-300 font-bold text-lg">{fichaAtual.passaporte}</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Nascimento</p>
                         <p className="font-mono text-slate-300">{fichaAtual.nascimento || '---'}</p>
                       </div>
                       <div className="col-span-2">
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Telefone</p>
                         <p className="font-mono text-slate-300">{fichaAtual.telefone || '---'}</p>
                       </div>
                       <div className="col-span-2 bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><MapPin size={12}/> Última Residência</p>
                         <p className="text-slate-300 text-sm leading-relaxed">{fichaAtual.endereco || 'Desconhecido'}</p>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                   <div className="flex justify-between items-end mb-4">
                     <h3 className="font-bold uppercase text-xs text-slate-400 tracking-widest">Ameaça</h3>
                     <span className={`text-xs font-black uppercase px-2 py-0.5 rounded ${
                        fichaAtual.periculosidade === 'Baixo' ? 'bg-emerald-500/20 text-emerald-400' : 
                        fichaAtual.periculosidade === 'Médio' ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'
                     }`}>{fichaAtual.periculosidade}</span>
                   </div>
                   <div className="flex gap-1.5 h-3">
                     <div className={`flex-1 rounded-sm ${['Baixo', 'Médio', 'Alto', 'Extremo'].includes(fichaAtual.periculosidade) ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-800'}`}></div>
                     <div className={`flex-1 rounded-sm ${['Médio', 'Alto', 'Extremo'].includes(fichaAtual.periculosidade) ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'bg-slate-800'}`}></div>
                     <div className={`flex-1 rounded-sm ${['Alto', 'Extremo'].includes(fichaAtual.periculosidade) ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-slate-800'}`}></div>
                     <div className={`flex-1 rounded-sm ${fichaAtual.periculosidade === 'Extremo' ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)] animate-pulse' : 'bg-slate-800'}`}></div>
                   </div>
                 </div>

                 {/* Associações e Gangues */}
                 <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                   <h3 className="font-bold uppercase text-xs mb-3 flex items-center gap-2 text-indigo-400 tracking-widest border-b border-slate-800 pb-2">
                     <Users size={14}/> Associações Conhecidas
                   </h3>
                   <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{fichaAtual.associacoes || 'Nenhuma facção ou gangue registrada.'}</p>
                 </div>

               </div>

               {/* Coluna Direita: Relatórios e Ficha */}
               <div className="lg:col-span-8 space-y-6">
                 
                 {/* Mandados Ativos */}
                 {fichaAtual.mandados && fichaAtual.mandados.trim() !== '' && (
                    <div className="bg-red-950/20 border border-red-900/50 rounded-3xl p-6 border-l-4 border-l-red-600 shadow-lg relative overflow-hidden">
                      <div className="absolute right-0 top-0 opacity-10"><Crosshair size={150} className="-mt-10 text-red-500"/></div>
                      <h3 className="font-black uppercase text-red-500 flex items-center gap-2 mb-4 relative z-10">
                        <Crosshair size={20} strokeWidth={3} /> MANDADOS ATIVOS
                      </h3>
                      <p className="text-red-200 text-sm whitespace-pre-wrap leading-relaxed relative z-10 bg-red-950/40 p-4 rounded-xl border border-red-900/30">
                        {fichaAtual.mandados}
                      </p>
                    </div>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Histórico Criminal */}
                   <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                     <h3 className="font-bold uppercase text-xs mb-4 flex items-center gap-2 text-slate-400 tracking-widest border-b border-slate-800 pb-3">
                       <FileText className="text-blue-500" size={16}/> Histórico de Infrações
                     </h3>
                     {fichaAtual.historico ? (
                       <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">{fichaAtual.historico}</p>
                     ) : (
                       <p className="text-slate-600 text-sm italic py-4 text-center">Ficha Limpa</p>
                     )}
                   </div>

                   {/* Prisões */}
                   <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                     <h3 className="font-bold uppercase text-xs mb-4 flex items-center gap-2 text-slate-400 tracking-widest border-b border-slate-800 pb-3">
                       <Clock className="text-orange-500" size={16}/> Histórico de Prisões
                     </h3>
                     {fichaAtual.prisoes ? (
                       <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800 border-l-2 border-l-orange-500/50">{fichaAtual.prisoes}</p>
                     ) : (
                       <p className="text-slate-600 text-sm italic py-4 text-center">Nenhuma prisão registrada.</p>
                     )}
                   </div>

                   {/* Multas */}
                   <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                     <h3 className="font-bold uppercase text-xs mb-4 flex items-center gap-2 text-slate-400 tracking-widest border-b border-slate-800 pb-3">
                       <DollarSign className="text-emerald-500" size={16}/> Multas e Pendências
                     </h3>
                     {fichaAtual.multas ? (
                       <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">{fichaAtual.multas}</p>
                     ) : (
                       <p className="text-slate-600 text-sm italic py-4 text-center">Nenhuma multa pendente.</p>
                     )}
                   </div>

                   {/* Veículos */}
                   <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                     <h3 className="font-bold uppercase text-xs mb-4 flex items-center gap-2 text-slate-400 tracking-widest border-b border-slate-800 pb-3">
                       <Car className="text-purple-500" size={16}/> Veículos Registrados
                     </h3>
                     {fichaAtual.veiculos ? (
                       <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">{fichaAtual.veiculos}</p>
                     ) : (
                       <p className="text-slate-600 text-sm italic py-4 text-center">Nenhum veículo no nome.</p>
                     )}
                   </div>
                 </div>

                 {/* Alerta de Notas */}
                 {fichaAtual.notas && (
                   <div className="bg-gradient-to-r from-yellow-900/20 to-slate-900/80 border border-yellow-700/30 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5"><FileWarning size={150} /></div>
                     <h3 className="font-bold uppercase text-xs mb-3 text-yellow-500 tracking-widest flex items-center gap-2"><FileKey size={14}/> Anotações Confidenciais (Apenas LSPD)</h3>
                     <p className="text-slate-300 text-sm leading-relaxed font-mono relative z-10 border-l-2 border-yellow-600/50 pl-4 py-1 whitespace-pre-wrap">
                       {fichaAtual.notas}
                     </p>
                   </div>
                 )}

               </div>
             </div>
            )}
          </div>
        )}

        {/* --- ABA 3: CRIAR NOVO REGISTRO (FORMULÁRIO COMPLETO) --- */}
        {view === 'criar' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 max-w-5xl mx-auto">
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
              
              <div className="bg-gradient-to-r from-emerald-900/40 to-slate-900 border-b border-emerald-900/50 p-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10"><Terminal size={200} className="-mt-10 -mr-10 text-emerald-500"/></div>
                <h2 className="text-3xl font-black text-white uppercase flex items-center gap-4 relative z-10 tracking-tight">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><PlusCircle size={28} /></div>
                  Criação de Dossiê Criminal Completo
                </h2>
                <p className="text-slate-400 mt-2 text-sm font-mono relative z-10">Preencha todos os campos conhecidos sobre o indivíduo.</p>
              </div>

              <form onSubmit={handleSubmitNovaFicha} className="p-8 space-y-10">
                
                {/* 1. Dados Pessoais */}
                <div>
                  <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2"><User size={14}/> Identificação do Indivíduo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="group md:col-span-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Nome Completo *</label>
                      <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all" />
                    </div>
                    <div className="group md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Apelido (Vulgo)</label>
                      <input type="text" name="apelido" value={formData.apelido} onChange={handleInputChange} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all" />
                    </div>
                    <div className="group md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Passaporte (ID) *</label>
                      <input type="text" name="passaporte" value={formData.passaporte} onChange={handleInputChange} required className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all" />
                    </div>
                    <div className="group md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Data de Nascimento</label>
                      <input type="text" name="nascimento" value={formData.nascimento} onChange={handleInputChange} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all" placeholder="DD/MM/AAAA" />
                    </div>
                    <div className="group md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Telefone</label>
                      <input type="text" name="telefone" value={formData.telefone} onChange={handleInputChange} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all" />
                    </div>
                    <div className="group md:col-span-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Endereço / Residência</label>
                      <input type="text" name="endereco" value={formData.endereco} onChange={handleInputChange} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 2. Status e Avaliação */}
                <div>
                  <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2"><ShieldAlert size={14}/> Avaliação Tática e Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Status Atual</label>
                      <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer">
                        <option value="Limpo">Limpo (Cidadão sem pendências)</option>
                        <option value="Procurado">Procurado (Mandado Ativo / Fuga)</option>
                        <option value="Preso">Preso (Cumprindo pena no momento)</option>
                        <option value="Foragido">Foragido (Fugiu do sistema prisional)</option>
                      </select>
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Nível de Ameaça / Periculosidade</label>
                      <select name="periculosidade" value={formData.periculosidade} onChange={handleInputChange} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer">
                        <option value="Baixo">Verde - Risco Baixo (Cidadão comum)</option>
                        <option value="Médio">Amarelo - Risco Médio (Pequenos delitos)</option>
                        <option value="Alto">Laranja - Risco Alto (Tráfico, gangues armadas)</option>
                        <option value="Extremo">Vermelho - Risco Extremo (Atirar para matar, Terrorismo)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Propriedades e Associações */}
                <div>
                  <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2"><Car size={14}/> Propriedades e Ligações</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Veículos no Nome (Modelo - Cor - Placa)</label>
                      <textarea name="veiculos" value={formData.veiculos} onChange={handleInputChange} rows="3" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-500 outline-none transition-all resize-none" placeholder="Ex: Sultan Preto - ABC-1234"></textarea>
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Associações (Gangues, Facções, Cúmplices)</label>
                      <textarea name="associacoes" value={formData.associacoes} onChange={handleInputChange} rows="3" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-500 outline-none transition-all resize-none" placeholder="Ex: Membro dos Ballas. Cúmplice: João (ID 123)"></textarea>
                    </div>
                  </div>
                </div>

                {/* 4. Histórico Criminal Expandido */}
                <div>
                  <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2"><FileText size={14}/> Histórico Policial Completo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Infrações e Crimes Cometidos</label>
                      <textarea name="historico" value={formData.historico} onChange={handleInputChange} rows="4" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-500 outline-none transition-all resize-none" placeholder="Liste os crimes que ele já cometeu."></textarea>
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Registro de Prisões (Motivo e Meses)</label>
                      <textarea name="prisoes" value={formData.prisoes} onChange={handleInputChange} rows="4" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-500 outline-none transition-all resize-none" placeholder="Ex: Preso dia 01/01 por Roubo Armado (40 meses)"></textarea>
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Multas (Pagas / Pendentes)</label>
                      <textarea name="multas" value={formData.multas} onChange={handleInputChange} rows="4" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-500 outline-none transition-all resize-none" placeholder="Ex: $1200 - Direção Perigosa (Pendente)"></textarea>
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-red-400 transition-colors">MANDADOS ATIVOS</label>
                      <textarea name="mandados" value={formData.mandados} onChange={handleInputChange} rows="4" className="w-full bg-red-950/20 border border-red-900/50 rounded-xl px-4 py-3 text-white text-sm focus:border-red-500 outline-none transition-all resize-none placeholder:text-red-800/50" placeholder="Se existir mandado de busca ou prisão, digite aqui."></textarea>
                    </div>
                  </div>
                </div>

                {/* 5. Observações do Oficial */}
                <div>
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-400 transition-colors">Anotações Confidenciais do Oficial</label>
                    <textarea name="notas" value={formData.notas} onChange={handleInputChange} rows="3" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 outline-none transition-all resize-none" placeholder="Tatuagens, modus operandi, se costuma andar armado..."></textarea>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-slate-800/80">
                  <button type="button" onClick={() => setView('busca')} className="px-8 py-3.5 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors uppercase tracking-widest text-sm">
                    Cancelar
                  </button>
                  <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-3.5 rounded-xl font-black uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                    <Save size={18} /> {isSubmitting ? 'PROCESSANDO...' : 'SALVAR DOSSIÊ COMPLETO'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(160px); opacity: 0; }
        }
        .animate-scan { animation: scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}} />
    </div>
  );
}