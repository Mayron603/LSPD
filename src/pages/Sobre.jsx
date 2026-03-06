import { Shield, Target, Award } from 'lucide-react';

export default function Sobre() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-black text-white mb-8 uppercase">Nossa Corporação</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center">
            <Shield className="w-10 h-10 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Missão</h3>
            <p className="text-slate-400 text-sm">Proteger a vida e a propriedade na cidade de Rebaixados com excelência.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center">
            <Target className="w-10 h-10 text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Visão</h3>
            <p className="text-slate-400 text-sm">Ser a força policial mais tática, respeitada e eficiente do estado.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center">
            <Award className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Valores</h3>
            <p className="text-slate-400 text-sm">Honra, Coragem, Disciplina e Respeito inabalável à hierarquia.</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-800 pb-4">História da LSPD</h2>
          <p className="text-slate-400 leading-relaxed">
            O Departamento de Polícia de Los Santos atua na linha de frente contra o crime organizado, tráfico e infrações de trânsito. Nossa corporação é dividida em unidades de elite, garantindo que cada oficial atue na sua especialidade para manter a paz nas ruas de Rebaixados.
          </p>
        </div>
      </div>
    </div>
  );
}