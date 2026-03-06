import { Crown, AlertTriangle } from 'lucide-react';

export default function PainelComando() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-black text-white mb-2 uppercase flex items-center gap-3">
          <Crown className="text-yellow-500" /> Painel do Alto Comando
        </h1>
        
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex items-start gap-3 mb-8">
          <AlertTriangle className="text-red-500 w-6 h-6 shrink-0 mt-1" />
          <div>
            <h3 className="text-red-500 font-bold">ÁREA RESTRITA (NÍVEL 5)</h3>
            <p className="text-red-400/80 text-sm">O acesso a este painel é monitorado. Apenas o Coronel, Major e Capitães têm autorização para gerenciar a tesouraria e o arsenal.</p>
          </div>
        </div>

        <div className="text-center p-12 bg-slate-900 border border-slate-800 rounded-xl text-slate-500">
          Módulo de gestão financeira e aprovação de patentes em desenvolvimento...
        </div>
      </div>
    </div>
  );
}