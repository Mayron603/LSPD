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
import MapaTatico from './pages/MapaTatico';
import './index.css';

// Proteção blindada usando o Contexto em vez do localStorage
const RotaPrivada = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Nova proteção: Apenas cargos autorizados podem aceder (Lista Branca)
const RotaPolicial = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Define os cargos autorizados. Se o utilizador não tiver um destes, será bloqueado.
  // IMPORTANTE: Verifica se no teu banco de dados o cargo está escrito exatamente como 'policial'
  const isAutorizado = user?.role === 'admin' || user?.role === 'policial';
  
  // Se NÃO for autorizado (for visitante, cidadão, civil, etc), manda para o Início
  if (!isAutorizado) return <Navigate to="/" />; 
  
  return children;
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
          
          {/* Rotas gerais acessíveis para todos logados (Civis, Visitantes e Policiais) */}
          <Route path="/" element={<RotaPrivada><Home /></RotaPrivada>} />
          <Route path="/sobre" element={<RotaPrivada><Sobre /></RotaPrivada>} />
          <Route path="/recrutamento" element={<RotaPrivada><Recrutamento /></RotaPrivada>} />
          <Route path="/codigo" element={<RotaPrivada><CodigoPenal /></RotaPrivada>} />
          
          {/* Rotas exclusivas bloqueadas (Usam a RotaPolicial - Lista Branca) */}
          <Route path="/oficiais" element={<RotaPolicial><ControleOficiais /></RotaPolicial>} />
          <Route path="/banco-criminal" element={<RotaPolicial><BancoCriminal /></RotaPolicial>} />
          <Route path="/investigacoes" element={<RotaPolicial><Investigacoes /></RotaPolicial>} />
          <Route path="/operacoes" element={<RotaPolicial><Operacoes /></RotaPolicial>} />
          <Route path="/mapa" element={<RotaPolicial><MapaTatico /></RotaPolicial>} />
          <Route path="/comando" element={<RotaPolicial><PainelComando /></RotaPolicial>} />
          <Route path="/calculadora" element={<RotaPolicial><CalculadoraPenal /></RotaPolicial>} />
          
          {/* Rota exclusiva para Administradores */}
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