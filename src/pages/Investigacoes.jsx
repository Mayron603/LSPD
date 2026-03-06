import { Briefcase, FileSearch } from 'lucide-react';

export default function Investigacoes() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-black text-white mb-2 uppercase flex items-center gap-3">
          <Briefcase className="text-slate-400" /> Sistema de Investigações (FIB)
        </h1>
        <p className="text-slate-400 mb-8">Acesso restrito a detetives e investigadores.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl border-l-4 border-l-yellow-500">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg">Caso #042 - Desmanche</h3>
              <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded font-bold">EM ANDAMENTO</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">Investigação de furto de veículos de luxo na região de Vinewood.</p>
            <button className="text-blue-400 text-sm font-bold flex items-center gap-1 hover:text-blue-300"><FileSearch className="w-4 h-4"/> Ver Dossiê</button>
          </div>
        </div>
      </div>
    </div>
  );
}