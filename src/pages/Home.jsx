import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Search, Map, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const [comunicados, setComunicados] = useState([]);
  
  // Puxa os dados do utilizador e se ele está logado
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    carregarComunicados();
  }, []);

  const carregarComunicados = async () => {
    try {
      const res = await fetch('/api/comunicados');
      if (res.ok) {
        const data = await res.json();
        setComunicados(data);
      }
    } catch (error) {
      console.error("Erro ao carregar diretrizes:", error);
    }
  };

  // ==========================================
  // LÓGICA DE PERMISSÃO DE VISUALIZAÇÃO
  // ==========================================
  const role = user?.role?.toLowerCase() || '';
  const patente = user?.patente?.toLowerCase() || '';

  const temCargoPolicial = 
    role.includes('oficial') || role.includes('comando') || role.includes('fib') || role.includes('admin') ||
    patente.includes('oficial') || patente.includes('comando') || patente.includes('agente') || patente.includes('fib');

  const podeVerAvisos = isAuthenticated && temCargoPolicial;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-16 overflow-x-hidden relative">
      
      {/* =========================================
          AVISOS OFICIAIS FLUTUANTES 
          (Só aparece para Oficial LSPD, Alto Comando ou Agente FIB)
          ========================================= */}
      {podeVerAvisos && comunicados.length > 0 && (
        <div className="fixed top-24 right-6 z-50 flex flex-col gap-4 items-end pointer-events-none">
          {comunicados.map((com) => {
            // Verifica a prioridade que foi cadastrada
            const isCritico = com.prioridade === 'Crítico';
            const isImportante = com.prioridade === 'Importante';
            
            // Cores dinâmicas para a bolha
            const borderColor = isCritico ? 'border-red-500/50 hover:border-red-400' : isImportante ? 'border-yellow-500/50 hover:border-yellow-400' : 'border-blue-500/30 hover:border-blue-400';
            const sideColor = isCritico ? 'bg-red-500/50 group-hover:bg-red-400' : isImportante ? 'bg-yellow-500/50 group-hover:bg-yellow-400' : 'bg-blue-500/50 group-hover:bg-blue-400';
            const textColor = isCritico ? 'text-red-400' : isImportante ? 'text-yellow-400' : 'text-blue-400';
            const pingColor = isCritico ? 'bg-red-500' : isImportante ? 'bg-yellow-500' : 'bg-blue-500';

            return (
              <div 
                key={com._id} 
                className={`w-80 sm:w-96 bg-slate-900/70 backdrop-blur-xl border ${borderColor} shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-2xl rounded-tr-sm p-5 pointer-events-auto transform transition-all hover:-translate-y-1 group relative overflow-hidden`}
              >
                <div className={`absolute left-0 top-0 w-1 h-full ${sideColor} transition-colors`}></div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingColor}`}></span>
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${pingColor}`}></span>
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${textColor}`}>
                      Aviso Oficial
                    </span>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${isCritico ? 'bg-red-500/10 border-red-500/30 text-red-400' : isImportante ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
                    {com.prioridade || 'Normal'}
                  </span>
                </div>
                
                <p className="text-sm text-slate-200 font-light leading-relaxed italic mb-4">
                  "{com.texto}"
                </p>
                
                <div className="text-right border-t border-slate-700/50 pt-3">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center justify-end gap-1.5">
                    <Shield size={12} className="text-slate-600" />
                    {com.autor}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- SEÇÃO HERO COM VÍDEO DE FUNDO --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <video 
            className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-70"
            autoPlay loop muted playsInline
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950"></div>
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 text-center px-6 mt-10">
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

      {/* --- DIVISÕES EM DESTAQUE --- */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">Conheça o Departamento</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Unidades de Elite</p>
          <p className="text-xl text-slate-400 mt-5 max-w-2xl mx-auto font-light">
            Grupamentos altamente treinados para garantir a ordem e a segurança em nossa cidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <a href="https://speed-theta-seven.vercel.app/" target="_blank" rel="noopener noreferrer" className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 overflow-hidden hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 block cursor-pointer">
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

          <a href="https://asd-eight-alpha.vercel.app/" target="_blank" rel="noopener noreferrer" className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 overflow-hidden hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 block cursor-pointer">
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

          <div className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 overflow-hidden hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
            <div className="absolute -inset-20 bg-radial from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-3xl rounded-full"></div>
            <Shield className="relative w-16 h-16 text-emerald-400 mb-8 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <h3 className="relative text-3xl font-extrabold text-white mb-4 tracking-tight">M.T.E.</h3>
            <p className="relative text-slate-300 leading-relaxed font-light text-lg">
              Motopatrulhamento Tático Especial. Unidade de resposta rápida e extrema mobilidade, focada em becos, áreas de difícil acesso e agilidade no trânsito.
            </p>
          </div>

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