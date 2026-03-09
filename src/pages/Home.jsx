import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Search, Map, ExternalLink } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-16 overflow-x-hidden">
      
      {/* Seção Hero com VÍDEO DE FUNDO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-24 overflow-hidden">
        
        {/* === Container do Vídeo de Fundo === */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video 
            className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-70"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay de Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950"></div>
          
          {/* Overlay de cor azul/roxa sutil */}
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
        </div>

        {/* === Conteúdo da Seção Hero (Texto) === */}
        <div className="relative z-10 text-center px-6 mt-10">
          
          {/* Lema Principal */}
          <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl">
            <span className="text-white">PROTEGER</span> <span className="text-slate-400">E</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_40px_rgba(79,70,229,0.4)]">
              SERVIR
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed tracking-wide drop-shadow-lg">
            A principal agência de aplicação da lei da cidade Rebaixados. <br /> Protegendo o futuro com integridade e coragem.
          </p>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/recrutamento" className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-blue-900/50 hover:from-blue-500 hover:to-indigo-600 transition-all hover:-translate-y-0.5 group backdrop-blur-sm">
              Iniciar Aplicação
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/sobre" className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-slate-900/50 border border-slate-700/50 text-white px-10 py-4 rounded-full font-medium hover:bg-slate-800/80 transition-colors backdrop-blur-md group">
              <Shield className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              Conheça o Departamento
            </Link>
          </div>
        </div>
      </section>

      {/* Divisões em Destaque */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 z-10">
        
        {/* Textos de Divisão */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">Conheça o Departamento</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Unidades de Elite</p>
          <p className="text-xl text-slate-400 mt-5 max-w-2xl mx-auto font-light">
            Grupamentos altamente treinados para garantir a ordem e a segurança em nossa cidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card SPEED - Transformado em Link */}
          <a 
            href="https://speed-theta-seven.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 overflow-hidden hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 block cursor-pointer"
          >
            <div className="absolute -inset-20 bg-radial from-yellow-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-3xl rounded-full"></div>
            <Zap className="relative w-16 h-16 text-yellow-400 mb-8 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
            
            <div className="relative flex items-center justify-between mb-4">
              <h3 className="text-3xl font-extrabold text-white tracking-tight">S.P.E.E.D.</h3>
              <ExternalLink size={24} className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
            </div>

            <p className="relative text-slate-300 leading-relaxed font-light text-lg">
              Unidade de interceptação rápida. Especializada em perseguições veiculares em alta velocidade, patrulhamento rodoviário e escoltas de risco.
            </p>
          </a>

          {/* Card ASD - Transformado em Link */}
          <a 
            href="https://asd-eight-alpha.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 overflow-hidden hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 block cursor-pointer"
          >
            <div className="absolute -inset-20 bg-radial from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-3xl rounded-full"></div>
            <Map className="relative w-16 h-16 text-blue-400 mb-8 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            
            <div className="relative flex items-center justify-between mb-4">
              <h3 className="text-3xl font-extrabold text-white tracking-tight">A.S.D. (Air Support)</h3>
              <ExternalLink size={24} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
            </div>

            <p className="relative text-slate-300 leading-relaxed font-light text-lg">
              Os olhos da LSPD no céu. Pilotos de elite fornecendo cobertura aérea vital, iluminação noturna, rastreamento de veículos e vigilância tática.
            </p>
          </a>

          {/* Card MTE - Continua como div */}
          <div className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 overflow-hidden hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
            <div className="absolute -inset-20 bg-radial from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-3xl rounded-full"></div>
            <Shield className="relative w-16 h-16 text-emerald-400 mb-8 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <h3 className="relative text-3xl font-extrabold text-white mb-4 tracking-tight">M.T.E.</h3>
            <p className="relative text-slate-300 leading-relaxed font-light text-lg">
              Motopatrulhamento Tático Especial. Unidade de resposta rápida e extrema mobilidade, focada em becos, áreas de difícil acesso e agilidade no trânsito.
            </p>
          </div>

          {/* Card FIB - Continua como div */}
          <div className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 overflow-hidden hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
            <div className="absolute -inset-20 bg-radial from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-3xl rounded-full"></div>
            <Search className="relative w-16 h-16 text-purple-400 mb-8 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <h3 className="relative text-3xl font-extrabold text-white mb-4 tracking-tight">F.I.B.</h3>
            <p className="relative text-slate-300 leading-relaxed font-light text-lg">
              Federal Investigation Bureau. A elite da inteligência. Focada em investigações complexas, narcóticos, operações infiltradas e combate ao crime organizado.
            </p>
          </div>

        </div>
      </section>

      <div className="pb-20"></div>
    </div>
  );
}