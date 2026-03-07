import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-20">
      
      {/* Seção Hero */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 opacity-70 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 text-sm font-medium mb-8 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            Recrutamento da Academia Aberto
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-tight">
            OBEDECER E <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 drop-shadow-lg">
              SOBREVIVER
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            O Departamento de Polícia de Los Santos é a principal agência de aplicação da lei da cidade Rebaixados. Junte-se à elite.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/recrutamento" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">
              Iniciar Aplicação
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/sobre" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800/80 border border-slate-700 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-slate-700 transition-colors backdrop-blur-md">
              Conheça o Departamento
            </Link>
          </div>
        </div>
      </section>

      {/* Divisões em Destaque */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Divisões Especializadas</h2>
            <p className="text-slate-400">Onde a tática encontra a ação nas ruas de Rebaixados.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card SPEED */}
          <div className="group relative bg-slate-900/80 border border-slate-700/50 rounded-2xl p-8 overflow-hidden hover:shadow-xl hover:shadow-yellow-500/20 transition-all backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Zap className="w-12 h-12 text-yellow-400 mb-6 drop-shadow-md" />
            <h3 className="text-2xl font-bold text-white mb-3">S.P.E.E.D.</h3>
            <p className="text-slate-300 leading-relaxed">
              Unidade de interceptação rápida. Especializada em perseguições veiculares em alta velocidade, patrulhamento rodoviário e escoltas de risco.
            </p>
          </div>

          {/* Card ASD */}
          <div className="group relative bg-slate-900/80 border border-slate-700/50 rounded-2xl p-8 overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <svg className="w-12 h-12 text-blue-400 mb-6 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-3">A.S.D. (Air Support)</h3>
            <p className="text-slate-300 leading-relaxed">
              Os olhos da LSPD no céu. Pilotos de elite fornecendo cobertura aérea vital, iluminação noturna, rastreamento de veículos e vigilância tática.
            </p>
          </div>

          {/* Card MTE */}
          <div className="group relative bg-slate-900/80 border border-slate-700/50 rounded-2xl p-8 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/20 transition-all backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Shield className="w-12 h-12 text-emerald-400 mb-6 drop-shadow-md" />
            <h3 className="text-2xl font-bold text-white mb-3">M.T.E.</h3>
            <p className="text-slate-300 leading-relaxed">
              Motopatrulhamento Tático Especial. Unidade de resposta rápida e extrema mobilidade, focada em becos, áreas de difícil acesso e agilidade no trânsito.
            </p>
          </div>

          {/* Card FIB */}
          <div className="group relative bg-slate-900/80 border border-slate-700/50 rounded-2xl p-8 overflow-hidden hover:shadow-xl hover:shadow-slate-500/20 transition-all backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Search className="w-12 h-12 text-slate-400 mb-6 drop-shadow-md" />
            <h3 className="text-2xl font-bold text-white mb-3">F.I.B.</h3>
            <p className="text-slate-300 leading-relaxed">
              Federal Investigation Bureau. A elite da inteligência. Focada em investigações complexas, narcóticos, operações infiltradas e combate ao crime organizado.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
