import { ShieldCheck, ExternalLink, Users, Eye, Lock } from 'lucide-react';

export default function ControleOficiais() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50 relative overflow-hidden">
      {/* Efeitos de Fundo (Glow) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-800/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho Profissional */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/60 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Eye size={14} />
              Modo de Apenas Visualização
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase">
              Controle de <span className="text-red-500">Efetivo</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Painel de transparência e gestão de oficiais. A listagem abaixo é <span className="text-white font-semibold">pública para consulta</span>, 
              porém as alterações são restritas aos <span className="text-red-400 font-semibold">administradores autorizados</span>.
            </p>
          </div>

          <div className="flex gap-3">
            <a 
              href="https://docs.google.com/spreadsheets/d/1UVYDEMoC8IxR8D7zc_yy217CmVhVebseFUx2v44wQeY/edit" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl font-bold transition-all border border-slate-700 text-sm"
            >
              <ExternalLink size={18} />
              SOLICITAR ACESSO
            </a>
          </div>
        </div>

        {/* Content Viewer (O Iframe) */}
        <div className="group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-red-500/20">
          
          {/* Barra Superior Estilo Terminal */}
          <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-800 flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/40 group-hover:bg-red-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-slate-600 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-slate-600 transition-colors"></div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">
              <Users size={12} className="text-red-500" />
              internal_personnel_list.db
            </div>
            <div className="w-12"></div>
          </div>

          <div className="w-full h-[750px] relative">
            {/* Overlay de carregamento */}
            <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 bg-slate-950">
              <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 font-mono text-xs uppercase animate-pulse">Sincronizando Banco de Dados de Oficiais...</p>
            </div>
            
            <iframe 
              src="https://docs.google.com/spreadsheets/d/1UVYDEMoC8IxR8D7zc_yy217CmVhVebseFUx2v44wQeY/htmlembed?widget=true&headers=false"
              className="w-full h-full grayscale-[0.3] contrast-[1.1]"
              title="Controle de Oficiais Planilha"
            />
          </div>
        </div>

        {/* Rodapé de Aviso */}
        <div className="mt-8 flex items-center justify-center gap-8 text-slate-600">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-800"></div>
          <div className="flex items-center gap-2 opacity-50">
             <Lock size={14} />
             <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Sistema de Leitura LSPD - Permissões de Edição via Google Workspace</p>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-800"></div>
        </div>
      </div>
    </div>
  );
}