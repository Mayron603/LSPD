import { Shield, Target, Award, Users, Crosshair, Clock, CheckCircle } from 'lucide-react';

export default function Sobre() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 text-slate-50 relative overflow-hidden">
      
      {/* Luzes de Fundo (Glow) para imersão */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-blue-900/20 to-transparent blur-[100px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-to-t from-indigo-900/20 to-transparent blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Departamento de Polícia de Los Santos
          </h2>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
            Nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Corporação</span>
          </h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed">
            Mais do que uma força de segurança, somos a linha de frente entre a ordem e o caos na cidade de Rebaixados. Conheça a nossa história, os nossos valores e o nosso compromisso com o cidadão.
          </p>
        </div>

        {/* Estatísticas / Números (Estéticos para dar mais realismo) */}
<div className="flex flex-wrap justify-center gap-6 mb-24">
  {[
    { icon: Clock, number: "24/7", label: "Prontidão Operacional" },
    { icon: Crosshair, number: "4", label: "Unidades" },
    { icon: Shield, number: "100%", label: "Compromisso" }
  ].map((stat, index) => (
    <div key={index} className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-slate-900/60 hover:border-blue-500/30 transition-all duration-300 min-w-[200px] flex-1 md:flex-none">
      <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-4 opacity-80" />
      <div className="text-3xl font-extrabold text-white mb-1">{stat.number}</div>
      <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">{stat.label}</div>
    </div>
  ))}
</div>

        {/* Cards Missão, Visão, Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          {/* Missão */}
          <div className="group bg-slate-900/60 border border-slate-800 p-10 rounded-3xl backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
            <Shield className="w-14 h-14 text-blue-400 mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <h3 className="font-extrabold text-2xl text-white mb-4 tracking-tight">Nossa Missão</h3>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              Proteger a vida, o patrimônio e os direitos constitucionais dos cidadãos de Rebaixados. Agimos com excelência para preservar a ordem pública, prevenindo e combatendo o crime através do uso proporcional da força e de táticas policiais avançadas.
            </p>
          </div>

          {/* Visão */}
          <div className="group bg-slate-900/60 border border-slate-800 p-10 rounded-3xl backdrop-blur-xl hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
            <Target className="w-14 h-14 text-indigo-400 mb-6 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <h3 className="font-extrabold text-2xl text-white mb-4 tracking-tight">Nossa Visão</h3>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              Ser reconhecida como a força de segurança mais tática, inovadora e implacável do estado. Buscamos servir de modelo nacional em operações de inteligência, intervenção de alto risco e integração comunitária.
            </p>
          </div>

          {/* Valores */}
          <div className="group bg-slate-900/60 border border-slate-800 p-10 rounded-3xl backdrop-blur-xl hover:shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
            <Award className="w-14 h-14 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
            <h3 className="font-extrabold text-2xl text-white mb-4 tracking-tight">Nossos Valores</h3>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              Pautamos as nossas ações em quatro pilares inegociáveis: <strong className="text-white font-medium">Honra</strong> para servir, <strong className="text-white font-medium">Coragem</strong> para enfrentar o perigo, <strong className="text-white font-medium">Disciplina</strong> tática e um <strong className="text-white font-medium">Respeito</strong> inabalável à hierarquia e às leis.
            </p>
          </div>
        </div>

        {/* História e Pilares de Atuação (Layout dividido) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Texto História */}
          <div className="bg-slate-900/40 border border-slate-800/80 p-10 md:p-12 rounded-3xl backdrop-blur-md">
            <h2 className="text-3xl font-extrabold mb-6 text-white tracking-tight flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              História da LSPD
            </h2>
            <div className="space-y-5 text-slate-300 leading-relaxed font-light">
              <p>
                Fundado em resposta ao crescimento exponencial das atividades ilícitas e do crime organizado, o Departamento de Polícia de Los Santos na cidade de Rebaixados rapidamente se tornou a principal barreira defensiva da sociedade.
              </p>
              <p>
                Nas suas primeiras décadas, a corporação focava-se apenas no patrulhamento urbano ostensivo. No entanto, com a evolução do tráfico e o aumento da violência nas ruas, a LSPD viu-se obrigada a reestruturar todo o seu comando e criar subdivisões altamente treinadas.
              </p>
              <p>
                Hoje, operamos como uma engrenagem de precisão. Desde as investigações sigilosas do F.I.B. até ao patrulhamento ágil da M.T.E. e do apoio tático aéreo da A.S.D., cada oficial que ostenta o nosso distintivo passou por rigorosos testes físicos, psicológicos e de sobrevivência.
              </p>
            </div>
          </div>

          {/* Pilares / Checklist */}
          <div className="space-y-8 px-4 lg:px-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Por que somos a Elite?</h3>
              <p className="text-slate-400 font-light">O nosso padrão de exigência garante que apenas os melhores cheguem ao topo da hierarquia.</p>
            </div>

            <ul className="space-y-6">
              {[
                { title: "Treinamento Contínuo", desc: "A nossa academia policial forma recrutas sob condições de pressão extrema." },
                { title: "Tecnologia e Inteligência", desc: "Equipamentos de última geração e bancos de dados criminais integrados." },
                { title: "Táticas de Resposta Rápida", desc: "Capacidade de mobilizar unidades S.P.E.E.D. e A.S.D. em menos de 3 minutos." },
                { title: "Tolerância Zero", desc: "Combatemos a corrupção interna e o crime nas ruas com o mesmo rigor." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

      </div>
    </div>
  );
}