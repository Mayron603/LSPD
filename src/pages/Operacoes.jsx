import { useState } from 'react';
import { Crosshair, Map, Plus, Users, Target, FileText, CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';

export default function Operacoes() {
  const [showModal, setShowModal] = useState(false);
  const [operacoes, setOperacoes] = useState([
    {
      id: 1,
      nome: "Operação Hydra",
      tipo: "Operação contra gangue",
      comandante: "Sgt. Walker",
      status: "Em andamento",
      local: "Groove Street",
      data: "2024-05-20 20:00"
    }
  ]);

  // Cores baseadas no status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Planejada': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Em andamento': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Concluída': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Cancelada': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 text-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Cabeçalho com Botão de Criar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 uppercase flex items-center gap-3">
              <Crosshair className="text-emerald-500" /> Operações Policiais
            </h1>
            <p className="text-slate-400">Briefing tático e agendamento de operações especiais.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
          >
            <Plus size={20} /> CRIAR NOVA OPERAÇÃO
          </button>
        </div>

        {/* Lista de Operações (Grid) */}
        {operacoes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operacoes.map((op) => (
              <div key={op.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(op.status)}`}>
                      {op.status.toUpperCase()}
                    </span>
                    <Clock size={16} className="text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{op.nome}</h3>
                  <p className="text-emerald-500 text-sm font-medium mb-4">{op.tipo}</p>
                  
                  <div className="space-y-3 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Users size={16} /> <span>Comandante: <b className="text-slate-200">{op.comandante}</b></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Map size={16} /> <span>Local: <b className="text-slate-200">{op.local}</b></span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/50 p-4 border-t border-slate-800 flex justify-between">
                  <button className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider">Ver Briefing</button>
                  <button className="text-xs font-bold text-emerald-500 hover:text-emerald-400 uppercase tracking-wider">Atualizar</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-xl text-center">
            <Map className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2 text-white">Nenhuma operação ativa no momento</h2>
            <p className="text-slate-400">Aguarde ordens do Alto Comando para a próxima incursão.</p>
          </div>
        )}

        {/* Modal de Criação (Exemplo Simplificado) */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Nova Operação</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white"><XCircle /></button>
              </div>
              <form className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome da Operação</label>
                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 focus:border-emerald-500 outline-none" placeholder="Ex: Tempestade" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipo de Missão</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 focus:border-emerald-500 outline-none">
                      <option>Mandado de Prisão</option>
                      <option>Operação Antidrogas</option>
                      <option>Blitz</option>
                      <option>Operação Tática</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Plano da Operação (Briefing)</label>
                  <textarea rows="4" className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 focus:border-emerald-500 outline-none" placeholder="Objetivo, estratégia e rotas..."></textarea>
                </div>
                <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg mt-4">CONFIRMAR E PUBLICAR</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}