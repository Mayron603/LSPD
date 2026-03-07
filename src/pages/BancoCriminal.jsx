import { useState } from 'react';
import { 
  Search, User, AlertTriangle, ShieldAlert, Car, 
  Users, Briefcase, FileText, Camera, MapPin, 
  Crosshair, ChevronRight, FileWarning, DollarSign, Clock
} from 'lucide-react';

export default function BancoCriminal() {
  const [view, setView] = useState('busca'); // 'busca', 'perfil', 'procurados'
  const [searchQuery, setSearchQuery] = useState('');

  // Dados Simulados do Cidadão
  const cidadaoExemplo = {
    nome: "Marcus Reed",
    apelido: "Ghost",
    id: "4821",
    nascimento: "12/05/1998",
    telefone: "555-0192",
    endereco: "Grove Street, 42 - Los Santos",
    status: "Procurado",
    periculosidade: "Alto",
    historico: [
      { data: "07/03/2026", crime: "Fuga Policial", oficial: "Sgt. Walker", status: "Confirmado" },
      { data: "05/03/2026", crime: "Porte Ilegal de Arma", oficial: "Cabo Johnson", status: "Confirmado" },
      { data: "03/03/2026", crime: "Tráfico de Drogas", oficial: "Det. Smith", status: "Confirmado" }
    ],
    prisoes: [
      { data: "04/02/2026", motivo: "Roubo Armado", oficial: "Sgt. Walker", tempo: "40 meses" }
    ],
    multas: [
      { data: "10/01/2026", infracao: "Direção Perigosa", valor: "$1200", oficial: "Ofc. Davis" }
    ],
    veiculos: [
      { modelo: "Sultan", placa: "GHO5T", cor: "Preto", status: "Procurado" },
      { modelo: "Sanchez", placa: "R33D", cor: "Branca", status: "Apreendido" }
    ],
    associacoes: ["Gangue Ballas", "Carlos Johnson (Cúmplice)"],
    casos: ["Operação Cobra", "Investigação Grove Street"],
    mandados: [
      { tipo: "Mandado de Prisão", motivo: "Homicídio", data: "08/03/2026", status: "ATIVO" }
    ],
    notas: "Suspeito costuma andar armado. Já tentou fugir de abordagem utilizando um Sultan preto."
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.toLowerCase().includes('marcus') || searchQuery === '4821') {
      setView('perfil');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-4xl font-black text-white uppercase flex items-center gap-3 tracking-tighter">
              <Search className="text-blue-500" size={36} /> 
              Banco de Dados Criminal
            </h1>
            <p className="text-slate-400 mt-1">
              Sistema Integrado de Segurança de Los Santos. Acesso restrito.
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setView('busca')}
              className={`px-4 py-2 rounded-lg font-bold text-sm uppercase transition-colors ${view === 'busca' || view === 'perfil' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
            >
              Pesquisa
            </button>
            <button 
              onClick={() => setView('procurados')}
              className={`px-4 py-2 rounded-lg font-bold text-sm uppercase flex items-center gap-2 transition-colors ${view === 'procurados' ? 'bg-red-600 text-white' : 'bg-slate-900 text-red-500 hover:bg-red-950/30'}`}
            >
              <AlertTriangle size={16} /> Mais Procurados
            </button>
          </div>
        </div>

        {/* --- ABA 1: PESQUISA & RESULTADO --- */}
        {(view === 'busca' || view === 'perfil') && (
          <div className="space-y-6 animate-in fade-in duration-500">
            
            {/* Barra de Pesquisa */}
            <form onSubmit={handleSearch} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex gap-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar cidadão por Nome, ID, Placa ou Apelido..." 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-4 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-8 rounded-lg font-black uppercase tracking-widest transition-transform hover:scale-105">
                Buscar
              </button>
            </form>

            {/* Placeholder quando não há pesquisa */}
            {view === 'busca' && (
              <div className="text-center p-16 border border-dashed border-slate-800 rounded-xl bg-slate-900/50">
                <ShieldAlert className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400 mb-2">Sistema LSPD Pronto</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">Digite "Marcus" ou "4821" para ver um exemplo de ficha criminal completa.</p>
              </div>
            )}

            {/* Ficha do Cidadão (Perfil) */}
            {view === 'perfil' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4">
                
                {/* Coluna Esquerda: Informações Básicas */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 w-full h-2 bg-red-600"></div>
                    <div className="p-6 text-center border-b border-slate-800">
                      <div className="w-32 h-32 bg-slate-800 rounded-full mx-auto mb-4 border-4 border-slate-950 flex items-center justify-center overflow-hidden">
                        <User size={64} className="text-slate-600" />
                      </div>
                      <h2 className="text-2xl font-black uppercase">{cidadaoExemplo.nome}</h2>
                      <p className="text-blue-500 font-bold mb-3">"{cidadaoExemplo.apelido}"</p>
                      
                      <div className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded font-black uppercase tracking-widest flex items-center justify-center gap-1 mx-auto w-max mb-4 shadow-lg shadow-red-900/40">
                        <AlertTriangle size={14} strokeWidth={3} /> {cidadaoExemplo.status}
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4 bg-slate-950/50">
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Passaporte / ID</p>
                        <p className="font-bold text-lg">{cidadaoExemplo.id}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Nascimento</p>
                        <p className="font-medium text-slate-300">{cidadaoExemplo.nascimento}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Telefone</p>
                        <p className="font-medium text-slate-300">{cidadaoExemplo.telefone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Residência</p>
                        <p className="font-medium text-slate-300 text-sm flex items-start gap-1"><MapPin size={14} className="mt-0.5 text-blue-500 shrink-0"/> {cidadaoExemplo.endereco}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-bold uppercase text-xs mb-3 text-slate-500 tracking-widest">Nível de Periculosidade</h3>
                    <div className="flex gap-2">
                      <div className="flex-1 h-2 rounded-full bg-emerald-500/20"></div>
                      <div className="flex-1 h-2 rounded-full bg-yellow-500/20"></div>
                      <div className="flex-1 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                      <div className="flex-1 h-2 rounded-full bg-black border border-slate-800"></div>
                    </div>
                    <p className="text-right mt-2 text-[10px] font-black text-red-500 uppercase">{cidadaoExemplo.periculosidade}</p>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-yellow-500/10"><FileWarning size={100} /></div>
                    <h3 className="font-bold uppercase text-xs mb-2 text-yellow-500 tracking-widest relative z-10">Anotações Policiais</h3>
                    <p className="text-sm text-yellow-100/70 italic relative z-10">"{cidadaoExemplo.notas}"</p>
                  </div>
                </div>

                {/* Coluna Direita: Módulos (Histórico, Veículos, etc) */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Mandados Ativos */}
                  <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6 border-l-4 border-l-red-600 shadow-lg">
                    <h3 className="font-black uppercase text-red-500 flex items-center gap-2 mb-4">
                      <Crosshair size={20} strokeWidth={3} /> Mandados Ativos
                    </h3>
                    <div className="bg-slate-950 border border-red-900/30 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white text-lg">{cidadaoExemplo.mandados[0].tipo}</p>
                        <p className="text-slate-400 text-sm">Motivo: <span className="text-red-400 font-medium">{cidadaoExemplo.mandados[0].motivo}</span> • Expedido em: {cidadaoExemplo.mandados[0].data}</p>
                      </div>
                      <span className="bg-red-600 text-white px-4 py-2 rounded font-black uppercase tracking-widest animate-pulse">
                        {cidadaoExemplo.mandados[0].status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Histórico Criminal */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                      <h3 className="font-bold uppercase text-sm mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                        <FileText className="text-blue-500" size={18}/> Histórico Criminal
                      </h3>
                      <div className="space-y-3">
                        {cidadaoExemplo.historico.map((h, i) => (
                          <div key={i} className="bg-slate-950 p-3 rounded border border-slate-800 text-sm">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-white">{h.crime}</span>
                              <span className="text-[10px] text-slate-500">{h.data}</span>
                            </div>
                            <p className="text-xs text-slate-400">Oficial: {h.oficial}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prisões e Multas */}
                    <div className="space-y-6">
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="font-bold uppercase text-sm mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                          <Clock className="text-orange-500" size={18}/> Registro de Prisões
                        </h3>
                        {cidadaoExemplo.prisoes.map((p, i) => (
                          <div key={i} className="bg-slate-950 p-3 rounded border border-slate-800 text-sm mb-2">
                            <p className="font-bold text-white">{p.motivo}</p>
                            <div className="flex justify-between text-xs mt-1">
                              <span className="text-orange-400 font-bold">Pena: {p.tempo}</span>
                              <span className="text-slate-500">{p.data}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="font-bold uppercase text-sm mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                          <DollarSign className="text-emerald-500" size={18}/> Multas
                        </h3>
                        {cidadaoExemplo.multas.map((m, i) => (
                          <div key={i} className="bg-slate-950 p-3 rounded border border-slate-800 text-sm flex justify-between items-center">
                            <div>
                              <p className="font-bold text-white">{m.infracao}</p>
                              <p className="text-xs text-slate-500">{m.data}</p>
                            </div>
                            <span className="text-emerald-500 font-black">{m.valor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Veículos Registrados */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-bold uppercase text-sm mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Car className="text-purple-500" size={18}/> Veículos Registrados
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {cidadaoExemplo.veiculos.map((v, i) => (
                        <div key={i} className="bg-slate-950 p-4 rounded border border-slate-800 flex justify-between items-center">
                          <div>
                            <p className="font-black text-lg text-white">{v.modelo}</p>
                            <p className="text-xs text-slate-400 uppercase tracking-widest">{v.cor} • Placa: <span className="text-blue-400 font-bold">{v.placa}</span></p>
                          </div>
                          <span className={`text-[10px] px-2 py-1 rounded font-black uppercase ${v.status === 'Procurado' ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-slate-800 text-slate-400'}`}>
                            {v.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Conexões Criminais */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-bold uppercase text-sm mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Users className="text-indigo-500" size={18}/> Conexões Conhecidas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cidadaoExemplo.associacoes.map((assoc, i) => (
                        <span key={i} className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                          <User size={14} /> {assoc}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}

        {/* --- ABA 2: MOST WANTED (MAIS PROCURADOS) --- */}
        {view === 'procurados' && (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-10">
              <h2 className="text-5xl font-black text-red-600 uppercase tracking-tighter mb-2" style={{ textShadow: '0 0 20px rgba(220, 38, 38, 0.5)'}}>
                Most Wanted
              </h2>
              <p className="text-red-400/80 font-bold tracking-widest uppercase">Alvos Prioritários do Estado</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card Most Wanted Exemplo */}
              <div className="bg-slate-900 border-2 border-red-900/50 rounded-xl overflow-hidden relative group">
                <div className="bg-red-600 text-white text-center font-black uppercase tracking-widest py-2 text-sm">Procurado Vivo ou Morto</div>
                <div className="p-6 text-center">
                  <div className="w-40 h-40 bg-slate-950 mx-auto mb-4 border-4 border-slate-800 flex items-center justify-center">
                    <Camera size={40} className="text-slate-700" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase mb-1">Marcus Reed</h3>
                  <p className="text-red-500 font-bold mb-4">Líder de Organização Criminosa</p>
                  
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 mb-4 text-left">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Crimes:</p>
                    <p className="text-sm text-slate-300">Homicídio de Oficial, Tráfico Internacional, Formação de Quadrilha.</p>
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-500/30 py-3 rounded">
                    <p className="text-[10px] text-green-500 font-black uppercase tracking-widest mb-1">Recompensa</p>
                    <p className="text-2xl font-black text-green-400">$50,000</p>
                  </div>
                </div>
              </div>
              
              {/* Mais slots vazios para dar a ideia de lista */}
              <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-xl flex items-center justify-center opacity-50">
                <div className="text-center">
                  <User size={48} className="text-slate-700 mx-auto mb-2" />
                  <p className="text-slate-500 font-bold uppercase">Alvo não identificado</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}