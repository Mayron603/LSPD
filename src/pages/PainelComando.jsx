import { 
  Shield, Star, Award, Terminal, Users, 
  ChevronRight, CheckCircle2, Briefcase, 
  FileSignature, Scale, GraduationCap 
} from 'lucide-react';

export default function AltoComando() {
  
  // Dados simulados do Alto Comando
  const lideranca = {
    chief: {
      nome: "Mayron",
      cargo: "Chief of Police (Chefe de Polícia)",
      patente: "01",
      departamento: "Gabinete do Chefe",
      descricao: "Comandante supremo da LSPD. Responsável pela direção estratégica, relações públicas e aprovação final de todas as diretrizes táticas da cidade de Rebaixados.",
      estrelas: 4
    },
    deputys: [
      {
        nome: "James Walker",
        cargo: "Deputy Chief (Subchefe)",
        patente: "02",
        departamento: "Operações Táticas",
        descricao: "Supervisiona todas as divisões de elite (SPEED, ASD, MTE) e aprova operações de alto risco.",
        estrelas: 3
      },
      {
        nome: "Sarah Jenkins",
        cargo: "Deputy Chief (Subchefe)",
        patente: "03",
        departamento: "Assuntos Internos & RH",
        descricao: "Responsável pela academia de polícia, recrutamento e investigação de conduta de oficiais.",
        estrelas: 3
      }
    ],
    commanders: [
      { nome: "Marcus Reed", cargo: "Commander", divisao: "Divisão de Patrulha", estrelas: 2 },
      { nome: "Thomas Shelby", cargo: "Commander", divisao: "Divisão de Inteligência (FIB)", estrelas: 2 },
      { nome: "Elena Rostova", cargo: "Captain", divisao: "Supervisora de Turno", estrelas: 1 },
      { nome: "David Chen", cargo: "Captain", divisao: "Comandante da Academia", estrelas: 1 },
    ]
  };

  const RenderStars = ({ count }) => (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={16} className="text-yellow-500 fill-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20 text-slate-50 font-sans relative overflow-hidden">
      
      {/* Luzes de Fundo (Ambiente de Comando - Dourado e Azul) */}
      <div className="absolute top-[0%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-yellow-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Cabeçalho do Sistema */}
        <div className="mb-16 pb-6 border-b border-slate-800/80 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center justify-center md:justify-start gap-2 px-3 py-1 rounded-full bg-yellow-950/30 border border-yellow-900/50 text-yellow-500 text-xs font-mono mb-6 mx-auto md:mx-0 w-max">
              <Terminal size={12} />
              <span>TERMINAL LSPD-OS v5.0 // ACESSO: GABINETE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter flex flex-col md:flex-row items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-amber-700/20 rounded-2xl border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                <Shield className="text-yellow-500" size={40} /> 
              </div>
              Alto Comando
            </h1>
          </div>
          <div className="text-slate-400 font-mono text-sm text-center md:text-right">
            <p>ESTADO-MAIOR DA LSPD</p>
            <p className="text-yellow-500/70">DIRETRIZES E ESTRATÉGIA</p>
          </div>
        </div>

        <div className="space-y-16 animate-in fade-in zoom-in-95 duration-700">
          
          {/* Nível 1: CHEFE DE POLÍCIA */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-slate-900/80 border border-yellow-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.1)] backdrop-blur-xl relative group">
              
              {/* Efeito de Destaque no Topo */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-600 via-amber-400 to-yellow-600"></div>
              
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 bg-slate-950/50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-32 h-32 bg-slate-900 rounded-2xl border-2 border-yellow-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(234,179,8,0.2)] rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <Award size={64} className="text-yellow-500" />
                  </div>
                  <RenderStars count={lideranca.chief.estrelas} />
                  <h2 className="text-3xl font-black text-white mt-4 uppercase text-center tracking-tight">{lideranca.chief.nome}</h2>
                  <p className="text-yellow-500 font-bold text-sm tracking-widest uppercase mt-1 text-center">{lideranca.chief.cargo}</p>
                </div>
                
                <div className="md:w-3/5 p-8 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-400 mb-4 w-max">
                    ID: {lideranca.chief.patente} // {lideranca.chief.departamento}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Briefcase size={20} className="text-yellow-500"/>
                    Atribuições do Comando
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm mb-6">
                    {lideranca.chief.descricao}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                    <div className="flex items-center gap-3">
                      <Scale className="text-slate-500" size={18} />
                      <span className="text-xs font-bold text-slate-300 uppercase">Justiça & Lei</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileSignature className="text-slate-500" size={18} />
                      <span className="text-xs font-bold text-slate-300 uppercase">Aprovações Táticas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divisor de Hierarquia */}
          <div className="flex flex-col items-center justify-center opacity-50">
            <div className="w-px h-12 bg-gradient-to-b from-yellow-500 to-slate-800"></div>
            <Users size={24} className="text-slate-600 my-2" />
            <div className="w-px h-12 bg-gradient-to-t from-blue-500 to-slate-800"></div>
          </div>

          {/* Nível 2: SUBCHEFES (Deputy Chiefs) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {lideranca.deputys.map((deputy, index) => (
              <div key={index} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl hover:border-blue-500/50 transition-colors shadow-xl group">
                <div className="flex justify-between items-start mb-6">
                  <RenderStars count={deputy.estrelas} />
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">ID: {deputy.patente}</span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{deputy.nome}</h3>
                <p className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-4">{deputy.cargo}</p>
                
                <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 mb-4 h-24">
                  <p className="text-slate-300 text-sm leading-relaxed">{deputy.descricao}</p>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                  <GraduationCap size={14} /> {deputy.departamento}
                </div>
              </div>
            ))}
          </div>

          {/* Nível 3: COMANDANTES E CAPITÃES */}
          <div className="mt-16">
            <h3 className="text-center text-sm font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-slate-800"></span>
              Supervisores e Capitães
              <span className="w-12 h-px bg-slate-800"></span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lideranca.commanders.map((cmd, index) => (
                <div key={index} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md hover:bg-slate-800/60 transition-colors flex flex-col items-center text-center">
                  <div className="mb-3">
                    <RenderStars count={cmd.estrelas} />
                  </div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1">{cmd.nome}</h4>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">{cmd.cargo}</p>
                  <span className="text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 w-full">
                    {cmd.divisao}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Secção de Responsabilidades do Alto Comando */}
          <div className="mt-20 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-5"><Shield size={300} className="-mb-10 -mr-10 text-white" /></div>
            
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={28} />
                Deveres Oficiais do Estado-Maior
              </h2>
              <ul className="space-y-4">
                {[
                  "Garantir a integridade, disciplina e eficiência operacional de todo o Departamento de Polícia.",
                  "Aprovar mandados de busca, apreensão e operações táticas de alto risco (Risco Laranja/Vermelho).",
                  "Gerir o orçamento da corporação, alocação de viaturas e armamentos para as divisões.",
                  "Avaliar e assinar promoções, despromoções e exonerações de oficiais da LSPD."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 min-w-max"><ChevronRight size={16} className="text-yellow-500" /></div>
                    <p className="text-slate-300 leading-relaxed text-sm">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}