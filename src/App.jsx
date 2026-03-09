import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Sistema de Notificações
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Sistema de Autenticação

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
import './index.css';

// Proteção blindada usando o Contexto em vez do localStorage
const RotaPrivada = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Proteção de Admin verificando diretamente no Contexto da Sessão
const RotaAdmin = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />; 
  
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

// Componente Wrapper para injetar a navegação e contexto corretamente
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
          <Route path="/oficiais" element={<RotaPrivada><ControleOficiais /></RotaPrivada>} />
          <Route path="/banco-criminal" element={<RotaPrivada><BancoCriminal /></RotaPrivada>} />
          <Route path="/investigacoes" element={<RotaPrivada><Investigacoes /></RotaPrivada>} />
          <Route path="/operacoes" element={<RotaPrivada><Operacoes /></RotaPrivada>} />
          <Route path="/comando" element={<RotaPrivada><PainelComando /></RotaPrivada>} />
          <Route path="/calculadora" element={<RotaPrivada><CalculadoraPenal /></RotaPrivada>} />
          <Route path="/admin" element={<RotaAdmin><PainelAdmin /></RotaAdmin>} />
        </Routes>
      </LayoutComNavbar>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      {/* Configuração global das Notificações para combinar com o tema do LSPD */}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f172a', // bg-slate-900
            color: '#fff',
            border: '1px solid #334155', // border-slate-700
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#0f172a' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#0f172a' } }
        }} 
      />
      <AppContent />
    </AuthProvider>
  );
}