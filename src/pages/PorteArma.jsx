import { FileSignature, Send } from 'lucide-react';

export default function PorteArma() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-black text-white mb-2 uppercase flex items-center gap-3">
          <FileSignature className="text-blue-500" /> Solicitação de Porte
        </h1>
        <p className="text-slate-400 mb-8">Formulário civil para requisição de licença de armamento.</p>
        
        <form className="bg-slate-900 border border-slate-800 p-8 rounded-xl space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Nome Completo</label>
              <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">RG na Cidade</label>
              <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-2">Motivo da Solicitação</label>
            <textarea rows="4" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"></textarea>
          </div>
          <button type="button" className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors">
            <Send className="w-5 h-5" /> Enviar Formulário para Análise
          </button>
        </form>
      </div>
    </div>
  );
}