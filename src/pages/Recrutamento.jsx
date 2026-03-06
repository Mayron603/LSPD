import { CheckCircle2, AlertTriangle, ChevronRight, FileText } from 'lucide-react';

export default function Recrutamento() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase">
            Academia de Polícia
          </h1>
          <p className="text-xl text-slate-400">
            Sua jornada para se tornar um oficial da LSPD de Rebaixados começa aqui.
          </p>
        </div>

        {/* Requisitos */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="text-yellow-500 w-6 h-6" /> Requisitos Mínimos
          </h2>
          <ul className="space-y-4">
            {[
              'Ter microfone de boa qualidade e clareza na comunicação (Rádio).',
              'Conhecimento avançado das regras da cidade (Safezone, RDM, VDM, Amor à vida).',
              'Maturidade, disciplina e respeito absoluto à hierarquia.',
              'Disponibilidade para cumprir a carga horária mínima semanal em patrulha.',
              'Ficha criminal limpa na cidade.'
            ].map((req, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Como Funciona / Discord */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-10 shadow-lg text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center md:justify-start gap-2">
            <FileText className="text-blue-500 w-6 h-6" /> Processo Seletivo (Edital)
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Todo o nosso processo de recrutamento é feito através do nosso Discord oficial. Lá você encontrará o Edital aberto, material de estudo e as datas para a entrevista com o Alto Comando.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="https://discord.gg/7pmDad9yPp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all"
            >
              Acessar Discord da LSPD
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}