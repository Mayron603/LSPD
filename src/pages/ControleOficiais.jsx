import { ShieldAlert } from 'lucide-react';

export default function ControleOficiais() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 border-b border-slate-800 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 uppercase flex items-center gap-3">
              Controle de Efetivo
            </h1>
            <p className="text-slate-400 text-lg">
              Painel de gestão de oficiais, patentes e advertências da LSPD.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg font-bold">
            <ShieldAlert className="w-5 h-5" />
            Acesso Restrito
          </div>
        </div>

        {/* iFrame contendo a planilha de Controle de Oficiais */}
        <div className="w-full h-[700px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10 text-slate-500">
            Conectando ao banco de dados interno da LSPD...
          </div>
          
          <iframe 
            src="https://docs.google.com/spreadsheets/d/1UVYDEMoC8IxR8D7zc_yy217CmVhVebseFUx2v44wQeY/htmlembed?widget=true&headers=false"
            width="100%" 
            height="100%" 
            className="border-none z-10 bg-white/5"
            title="Controle de Oficiais LSPD"
          ></iframe>
        </div>

      </div>
    </div>
  );
}