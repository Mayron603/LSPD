import { Shield, Target, Award } from 'lucide-react';

export default function Sobre() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Título principal */}
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 mb-12 uppercase tracking-tight drop-shadow-lg">
          Nossa Corporação
        </h1>

        {/* Cards Missão, Visão, Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="group bg-slate-900/80 border border-slate-700/50 p-8 rounded-2xl text-center backdrop-blur-md hover:shadow-xl hover:shadow-blue-500/20 transition-all">
            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4 drop-shadow-md" />
            <h3 className="font-bold text-xl text-white mb-2">Missão</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Proteger a vida e a propriedade na cidade de Rebaixados com excelência.
            </p>
          </div>

          <div className="group bg-slate-900/80 border border-slate-700/50 p-8 rounded-2xl text-center backdrop-blur-md hover:shadow-xl hover:shadow-red-500/20 transition-all">
            <Target className="w-12 h-12 text-red-400 mx-auto mb-4 drop-shadow-md" />
            <h3 className="font-bold text-xl text-white mb-2">Visão</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ser a força policial mais tática, respeitada e eficiente do estado.
            </p>
          </div>

          <div className="group bg-slate-900/80 border border-slate-700/50 p-8 rounded-2xl text-center backdrop-blur-md hover:shadow-xl hover:shadow-yellow-500/20 transition-all">
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4 drop-shadow-md" />
            <h3 className="font-bold text-xl text-white mb-2">Valores</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Honra, Coragem, Disciplina e Respeito inabalável à hierarquia.
            </p>
          </div>
        </div>

        {/* História */}
        <div className="bg-slate-900/80 border border-slate-700/50 p-10 rounded-2xl backdrop-blur-md hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
          <h2 className="text-3xl font-bold mb-6 text-white border-b border-slate-700 pb-4">
            História da LSPD
          </h2>
          <p className="text-slate-300 leading-relaxed">
            O Departamento de Polícia de Los Santos atua na linha de frente contra o crime organizado, tráfico e infrações de trânsito. Nossa corporação é dividida em unidades de elite, garantindo que cada oficial atue na sua especialidade para manter a paz nas ruas de Rebaixados.
          </p>
        </div>
      </div>
    </div>
  );
}
