import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Search, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 pt-20 overflow-hidden">
      {/* Background Decorativo */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-blue-400 text-sm font-medium tracking-wide uppercase">Servidor Oficial LSPD</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight">
            PROTEGER E <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">SERVIR LOS SANTOS</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-10 leading-relaxed">
            Sistema integrado de inteligência e gestão para a Los Santos Police Department. 
            Tecnologia de ponta a serviço da segurança pública.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/sobre" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 group shadow-lg shadow-blue-500/20">
              Conhecer Corporação <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/codigo" className="px-8 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-xl font-bold transition-all">
              Código Penal
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Shield className="text-blue-400" />}
            title="Banco Criminal"
            desc="Acesso instantâneo ao histórico completo de cidadãos e fichas criminais detalhadas."
          />
          <FeatureCard 
            icon={<Zap className="text-yellow-400" />}
            title="Painel de Comando"
            desc="Gestão em tempo real de unidades em patrulhamento e operações especiais em curso."
          />
          <FeatureCard 
            icon={<Search className="text-indigo-400" />}
            title="Investigações"
            desc="Módulo avançado para catalogação de evidências, depoimentos e monitoramento de suspeitos."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group p-8 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}