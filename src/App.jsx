import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import './index.css';

// Transformando as importações normais em Lazy Loading
const Home = lazy(() => import('./pages/Home'));
const Sobre = lazy(() => import('./pages/Sobre'));
const Recrutamento = lazy(() => import('./pages/Recrutamento'));
const CodigoPenal = lazy(() => import('./pages/CodigoPenal'));
const ControleOficiais = lazy(() => import('./pages/ControleOficiais'));
const BancoCriminal = lazy(() => import('./pages/BancoCriminal'));
const Investigacoes = lazy(() => import('./pages/Investigacoes'));
const Operacoes = lazy(() => import('./pages/Operacoes'));
const PainelComando = lazy(() => import('./pages/PainelComando'));
const Login = lazy(() => import('./pages/Login'));
const Registro = lazy(() => import('./pages/Registro'));
const PainelAdmin = lazy(() => import('./pages/PainelAdmin'));
const CalculadoraPenal = lazy(() => import('./pages/CalculadoraPenal'));

// Componente para proteger as rotas padrão
const RotaPrivada = ({ children }) => {
  const autenticado = localStorage.getItem('autenticado');
  return autenticado ? children : <Navigate to="/login" />;
};

// Componente para proteger rotas de Administrador
const RotaAdmin = ({ children }) => {
  const autenticado = localStorage.getItem('autenticado');
  const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');
  const isAdmin = usuarioInfo?.role === 'admin';
  
  if (!autenticado) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />; 
  
  return children;
};

// Componente para esconder a Navbar na tela de login e registro
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

// Tela de carregamento enquanto a página é baixada
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen text-blue-500 font-bold">
    Carregando sistema LSPD...
  </div>
);

function App() {
  return (
    <Router>
      <LayoutComNavbar>
        {/* O Suspense mostra o fallback enquanto a página solicitada não carrega */}
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            
            {/* Rotas Privadas */}
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

            {/* Rota Exclusiva de Administração */}
            <Route path="/admin" element={<RotaAdmin><PainelAdmin /></RotaAdmin>} />
          </Routes>
        </Suspense>
      </LayoutComNavbar>
    </Router>
  );
}

export default App;