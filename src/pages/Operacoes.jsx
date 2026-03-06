import { Crosshair, Map } from 'lucide-react';

export default function Operacoes() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-black text-white mb-2 uppercase flex items-center gap-3">
          <Crosshair className="text-emerald-500" /> Operações Policiais
        </h1>
        <p className="text-slate-400 mb-8">Briefing tático e agendamento de operações (SWAT / MTE / ASD).</p>
        
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center">
          <Map className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Nenhuma operação ativa no momento</h2>
          <p className="text-slate-400">Aguarde ordens do Alto Comando para a próxima incursão.</p>
        </div>
      </div>
    </div>
  );
}