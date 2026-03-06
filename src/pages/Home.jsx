import { Link } from 'react-router-dom';
import { ShieldAlert, Crosshair, Users, Activity, FileWarning, ArrowRight, ChevronRight } from 'lucide-react';
import InfoCard from '../components/ui/InfoCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-20">
      
      {/* Seção Hero */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        {/* Efeitos de Luz de Fundo (Glow) */}
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

      {/* Seção de Status da Cidade (Dashboard Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard 
            icon={<Users className="w-6 h-6" />}
            title="Oficiais em Patrulha"
            value="24"
            trend="Ativo agora"
            subtitle="Unidades ADAM, LINCOLN e MARY"
          />
          <InfoCard 
            icon={<Activity className="w-6 h-6" />}
            title="Nível de Ameaça"
            value="AMARELO"
            subtitle="Atenção redobrada no Centro"
          />
          <InfoCard 
            icon={<FileWarning className="w-6 h-6" />}
            title="Mandados Ativos"
            value="12"
            trend="+3 hoje"
            subtitle="Atualizado há 5 minutos"
          />
          <InfoCard 
            icon={<ShieldAlert className="w-6 h-6" />}
            title="Prisões (24h)"
            value="47"
            subtitle="Estatística do servidor"
          />
        </div>
      </section>

      {/* Divisões em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800/50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Divisões Especializadas</h2>
            <p className="text-slate-400">Onde a tática encontra a ação.</p>
          </div>
          <Link to="/divisoes" className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 mt-4 md:mt-0">
            Ver todas as unidades <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card SWAT */}
          <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Crosshair className="w-10 h-10 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">S.W.A.T.</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Armas e Táticas Especiais. Nossa equipe de resposta a incidentes críticos, especializada em resgate de reféns, barricadas e terrorismo.
            </p>
            <button className="text-sm font-bold text-white flex items-center gap-2">
              Ver Manual Tático <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card ASD (Seu favorito do FiveM) */}
          <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <svg className="w-10 h-10 text-indigo-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-3">Air Support Division (ASD)</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Os olhos da LSPD no céu. Pilotos de elite fornecendo cobertura aérea vital, rastreamento de veículos e vigilância tática.
            </p>
            <button className="text-sm font-bold text-white flex items-center gap-2">
              Requisitos para Piloto <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}