import { Search, UserX, Car } from 'lucide-react';

export default function BancoCriminal() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-black text-white mb-2 uppercase flex items-center gap-3">
          <Search className="text-blue-500" /> Banco de Dados Criminal
        </h1>
        <p className="text-slate-400 mb-8">Pesquise o histórico de civis e veículos da cidade.</p>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex gap-4 mb-8">
          <input type="text" placeholder="Digite o RG, Nome ou Placa..." className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 text-white focus:border-blue-500 outline-none" />
          <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-bold transition-colors">Pesquisar</button>
        </div>

        <div className="text-center p-12 border border-dashed border-slate-700 rounded-xl text-slate-500">
          Utilize a barra acima para iniciar uma busca no sistema do Governo.
        </div>
      </div>
    </div>
  );
}