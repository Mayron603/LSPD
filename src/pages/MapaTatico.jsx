import { useState, useEffect } from 'react';
import { fetchSeguro } from '../lib/api';
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Crosshair, ShieldAlert, Trash2, Shield, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Configuração do Mapa de Los Santos (GTA V)
const bounds = [[0, 0], [1000, 1000]];
// URL de um mapa do GTA V de alta qualidade (Atlas/Satélite)
// O ficheiro agora é lido diretamente da sua pasta public
const mapImageUrl = '/mapa-gta.jpg';

// Criação de Ícones Personalizados para evitar erros do Leaflet padrão
const criarIcone = (tipo) => {
  let cor = 'bg-blue-500 shadow-blue-500/50'; // Patrulha LSPD
  if (tipo === 'Gangue') cor = 'bg-red-500 shadow-red-500/50';
  if (tipo === 'Operação') cor = 'bg-yellow-500 shadow-yellow-500/50';

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div class="w-5 h-5 rounded-full ${cor} shadow-[0_0_15px_rgba(0,0,0,0.8)] border-[3px] border-white animate-pulse"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });
};

export default function MapaTatico() {
  const { user } = useAuth();
  const [marcadores, setMarcadores] = useState([]);
  const [novoPonto, setNovoPonto] = useState(null); // Coordenadas clicadas
  
  const [formData, setFormData] = useState({ tipo: 'Patrulha', descricao: '' });
  const [loading, setLoading] = useState(true);

  const carregarMarcadores = async () => {
    try {
      const res = await fetchSeguro('/api/marcadores');
      if (res.ok) setMarcadores(await res.json());
    } catch (e) {
      console.error("Erro ao carregar mapa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarMarcadores(); }, []);

  // Componente interno para detetar cliques no mapa
  const EventosDoMapa = () => {
    useMapEvents({
      click(e) {
        setNovoPonto({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    });
    return null;
  };

  const handleSalvarMarcador = async (e) => {
    e.preventDefault();
    if (!novoPonto) return;

    try {
      const res = await fetchSeguro('/api/marcadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...novoPonto, ...formData })
      });

      if (res.ok) {
        setNovoPonto(null);
        setFormData({ tipo: 'Patrulha', descricao: '' });
        carregarMarcadores();
      }
    } catch (error) {
      console.error("Erro ao salvar marcador:", error);
    }
  };

  const handleExcluirMarcador = async (id) => {
    if (!confirm("Remover este marcador tático?")) return;
    try {
      await fetchSeguro(`/api/marcadores?id=${id}`, { method: 'DELETE' });
      carregarMarcadores();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-8 px-4 flex flex-col lg:flex-row gap-6">
      
      {/* Painel Lateral (Lista de Marcadores Ativos) */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <MapPin className="text-blue-500" size={24} />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Live Map</h1>
          </div>
          <p className="text-slate-400 text-xs font-mono mb-4">Central de Posicionamento Global LSPD. Clique em qualquer local do mapa para adicionar um Ponto de Interesse (POI).</p>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-950 p-2 rounded border border-slate-800 flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mb-1"></div>
              <span className="text-[9px] uppercase font-black text-slate-500">Patrulhas</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 flex flex-col items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mb-1"></div>
              <span className="text-[9px] uppercase font-black text-slate-500">Gangues</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 flex flex-col items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mb-1"></div>
              <span className="text-[9px] uppercase font-black text-slate-500">Operações</span>
            </div>
          </div>
        </div>

        {/* Formulário (Aparece ao clicar no mapa) */}
        {novoPonto && (
          <div className="bg-blue-950/20 border border-blue-900/50 rounded-2xl p-6 shadow-[0_0_20px_rgba(37,99,235,0.1)] animate-in slide-in-from-top-4">
            <h3 className="text-blue-400 font-black uppercase text-xs mb-4 flex items-center gap-2">
              <Crosshair size={14} /> Novo Alerta Tático
            </h3>
            <form onSubmit={handleSalvarMarcador} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Tipo de Alerta</label>
                <select 
                  value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm outline-none focus:border-blue-500"
                >
                  <option value="Patrulha">Unidade em Patrulha</option>
                  <option value="Operação">Operação Tática / Blitz</option>
                  <option value="Gangue">Conflito Armado / Gangue</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Descrição Rápida</label>
                <input 
                  type="text" required value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})}
                  placeholder="Ex: Suspeitos armados..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black py-2 rounded-lg text-xs uppercase tracking-widest transition-colors">Salvar</button>
                <button type="button" onClick={() => setNovoPonto(null)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black py-2 rounded-lg text-xs uppercase tracking-widest transition-colors">Cancelar</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex-1 flex flex-col overflow-hidden">
          <h3 className="font-black uppercase text-xs text-slate-500 tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
            <ShieldAlert size={14} /> Radares Ativos ({marcadores.length})
          </h3>
          <div className="overflow-y-auto space-y-3 pr-2 flex-1 custom-scrollbar">
            {marcadores.length === 0 && <p className="text-xs text-slate-600 text-center mt-4">Nenhum marcador ativo.</p>}
            {marcadores.map(m => (
              <div key={m._id} className={`p-3 rounded-xl border ${m.tipo === 'Gangue' ? 'bg-red-950/20 border-red-900/50' : m.tipo === 'Operação' ? 'bg-yellow-950/20 border-yellow-900/50' : 'bg-slate-800/50 border-slate-700'}`}>
                <div className="flex justify-between items-start">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${m.tipo === 'Gangue' ? 'text-red-400 bg-red-500/10' : m.tipo === 'Operação' ? 'text-yellow-400 bg-yellow-500/10' : 'text-blue-400 bg-blue-500/10'}`}>
                    {m.tipo}
                  </span>
                  {(user?.role === 'admin' || user?.nome === m.autor) && (
                    <button onClick={() => handleExcluirMarcador(m._id)} className="text-slate-500 hover:text-red-500"><Trash2 size={12} /></button>
                  )}
                </div>
                <p className="text-sm text-white font-medium mt-2">{m.descricao}</p>
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-2 border-t border-slate-800/50 pt-1">Autor: {m.autor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Container do Mapa Leaflet */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-[500px] lg:h-[calc(100vh-140px)] relative z-0">
        {!loading && (
          <MapContainer 
            crs={L.CRS.Simple} 
            bounds={bounds} 
            maxZoom={4} 
            minZoom={1} 
            style={{ height: '100%', width: '100%', backgroundColor: '#0f172a' }}
            attributionControl={false}
          >
            <ImageOverlay url={mapImageUrl} bounds={bounds} />
            <EventosDoMapa />
            
            {marcadores.map(m => (
              <Marker key={m._id} position={[m.lat, m.lng]} icon={criarIcone(m.tipo)}>
                <Popup className="custom-popup">
                  <div className="p-1">
                    <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{m.tipo}</span>
                    <strong className="block text-slate-800 mb-2">{m.descricao}</strong>
                    <span className="text-[9px] text-slate-400">Por: {m.autor}</span>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Marcador Temporário (fantasma) ao clicar */}
            {novoPonto && (
              <Marker position={[novoPonto.lat, novoPonto.lng]} icon={criarIcone('Patrulha')} opacity={0.5} />
            )}
          </MapContainer>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container { font-family: inherit; }
        .custom-popup .leaflet-popup-content-wrapper { background: #f8fafc; border-radius: 8px; }
        .custom-popup .leaflet-popup-tip { background: #f8fafc; }
      `}} />
    </div>
  );
}