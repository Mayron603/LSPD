import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import { AuthProvider, useAuth } from './contexts/AuthContext'; 

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Recrutamento from './pages/Recrutamento';
import CodigoPenal from './pages/CodigoPenal';
import ControleOficiais from './pages/ControleOficiais';
import BancoCriminal from './pages/BancoCriminal';
import Investigacoes from './pages/Investigacoes';
import Operacoes from './pages/Operacoes';
import PainelComando from './pages/PainelComando'; 
import Login from './pages/Login';
import Registro from './pages/Registro';
import PainelAdmin from './pages/PainelAdmin';
import CalculadoraPenal from './pages/CalculadoraPenal'; 
import MapaTatico from './pages/MapaTatico';
import './index.css';

const PATENTES = [
  "Cidadão", "Recruta", "Oficial I", "Oficial II", "Policial Senior", 
  "Sargento", "Tenente", "Capitão", "Comandante",
  "Agente FIB", "Diretor FIB"
];

const RotaPrivada = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Nível 1: Policiais (Recrutas, Oficiais I, etc)
const RotaPolicial = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!['admin', 'oficial', 'comando', 'fib'].includes(user?.role)) return <Navigate to="/" />; 
  return children;
};

// Nível 2: Sargento+, FIB, Comando, Admin (Podem VER as abas)
const RotaRestrita = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;

  const role = user?.role;
  const patenteIndex = PATENTES.indexOf(user?.patente);
  const indexSargento = PATENTES.indexOf("Sargento");

  const isAutorizado = ['admin', 'comando', 'fib'].includes(role) || (patenteIndex >= indexSargento && patenteIndex !== -1);
  if (!isAutorizado) return <Navigate to="/" />; 
  return children;
};

// Nível 3: Capitão+, Comando, Admin (Aba Comando)
const RotaComando = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;

  const role = user?.role;
  const patenteIndex = PATENTES.indexOf(user?.patente);
  const indexCapitao = PATENTES.indexOf("Capitão");

  // Autorizado se for admin/comando OU se a patente for Capitão ou superior
  const isAutorizado = ['admin', 'comando'].includes(role) || (patenteIndex >= indexCapitao && patenteIndex !== -1);
  
  if (!isAutorizado) return <Navigate to="/" />; 
  return children;
};

const RotaAdmin = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== 'admin') return <Navigate to="/" />; 
  return children;
};

const LayoutComNavbar = ({ children }) => {
  const location = useLocation();
  const esconderNavbar = location.pathname === '/login' || location.pathname === '/registro';
  
  return (
    <>
      {!esconderNavbar && <Navbar />}
      <main className="min-h-screen bg-slate-950">
        {children}
      </main>
    </>
  );
};

function AppContent() {
  return (
    <Router>
      <LayoutComNavbar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          
          <Route path="/" element={<RotaPrivada><Home /></RotaPrivada>} />
          <Route path="/sobre" element={<RotaPrivada><Sobre /></RotaPrivada>} />
          <Route path="/recrutamento" element={<RotaPrivada><Recrutamento /></RotaPrivada>} />
          <Route path="/codigo" element={<RotaPrivada><CodigoPenal /></RotaPrivada>} />
          
          {/* Acesso Policial Básico */}
          <Route path="/oficiais" element={<RotaPolicial><ControleOficiais /></RotaPolicial>} />
          <Route path="/mapa" element={<RotaPolicial><MapaTatico /></RotaPolicial>} />
          <Route path="/calculadora" element={<RotaPolicial><CalculadoraPenal /></RotaPolicial>} />
          
          {/* Acesso Intermediário (Sargento para cima - Pode acessar, mas bloqueio de botões é na página) */}
          <Route path="/banco-criminal" element={<RotaRestrita><BancoCriminal /></RotaRestrita>} />
          <Route path="/investigacoes" element={<RotaRestrita><Investigacoes /></RotaRestrita>} />
          <Route path="/operacoes" element={<RotaRestrita><Operacoes /></RotaRestrita>} />
          
          {/* Acesso Alto Escalão (Capitão para cima) */}
          <Route path="/comando" element={<RotaComando><PainelComando /></RotaComando>} />
          
          <Route path="/admin" element={<RotaAdmin><PainelAdmin /></RotaAdmin>} />
        </Routes>
      </LayoutComNavbar>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: { background: '#0f172a', color: '#fff', border: '1px solid #334155', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' },
          success: { iconTheme: { primary: '#10b981', secondary: '#0f172a' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#0f172a' } }
        }} 
      />
      <AppContent />
    </AuthProvider>
  );
}