export default function CodigoPenal() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-4xl font-black text-white mb-4 uppercase">Código Penal</h1>
          <p className="text-slate-400 text-lg">
            Legislação oficial da cidade Rebaixados. Consulte a tabela abaixo para verificar artigos, meses de prisão e multas.
          </p>
        </div>

        {/* iFrame contendo a planilha do Google */}
        <div className="w-full h-[700px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
          {/* Um aviso caso a internet do jogador demore a carregar a planilha */}
          <div className="absolute inset-0 flex items-center justify-center -z-10 text-slate-500">
            Carregando banco de dados do sistema policial...
          </div>
          
          <iframe 
            src="https://docs.google.com/spreadsheets/d/1Y69lxUBFC702MOYvJOilfrUHWrpeXUWiPJvFsBzcysU/htmlembed?widget=true&headers=false"
            width="100%" 
            height="100%" 
            className="border-none z-10 bg-white/5"
            title="Código Penal LSPD"
          ></iframe>
        </div>

      </div>
    </div>
  );
}