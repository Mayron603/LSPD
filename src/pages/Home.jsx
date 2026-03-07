import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Zap, Shield, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-20">
      
      {/* Seção Hero */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Recrutamento da Academia Aberto
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            OBEDECER E <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
              SOBREVIVER
            </span>
          </h1>
          
          <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            O Departamento de Polícia de Los Santos é a principal agência de aplicação da lei da cidade Rebaixados. Junte-se à elite.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/recrutamento" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-950 px-8 py-3.5 rounded-md font-bold hover:bg-slate-200 transition-colors">
              Iniciar Aplicação
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/sobre" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 text-white px-8 py-3.5 rounded-md font-medium hover:bg-slate-800 transition-colors">
              Conheça o Departamento
            </Link>
          </div>
        </div>
      </section>

      {/* Divisões em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Divisões Especializadas</h2>
            <p className="text-slate-400">Onde a tática encontra a ação nas ruas de Rebaixados.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card SPEED */}
          <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-hidden hover:border-yellow-500/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Zap className="w-10 h-10 text-yellow-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">S.P.E.E.D.</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Unidade de interceptação rápida. Especializada em perseguições veiculares em alta velocidade, patrulhamento rodoviário e escoltas de risco.
            </p>
          </div>

          {/* Card ASD */}
          <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-hidden hover:border-blue-500/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <svg className="w-10 h-10 text-blue-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-3">A.S.D. (Air Support)</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Os olhos da LSPD no céu. Pilotos de elite fornecendo cobertura aérea vital, iluminação noturna, rastreamento de veículos e vigilância tática.
            </p>
          </div>

          {/* Card MTE */}
          <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-hidden hover:border-emerald-500/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Shield className="w-10 h-10 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">M.T.E.</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Motopatrulhamento Tático Especial. Unidade de resposta rápida e extrema mobilidade, focada em becos, áreas de difícil acesso e agilidade no trânsito.
            </p>
          </div>

          {/* Card FIB */}
          <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-hidden hover:border-slate-500/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Search className="w-10 h-10 text-slate-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">F.I.B.</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Federal Investigation Bureau. A elite da inteligência. Focada em investigações complexas, narcóticos, operações infiltradas e combate ao crime organizado.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}