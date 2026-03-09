import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import './index.css';

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

// Componente para rotas padrão (Visitantes acessam)
const RotaPrivada = ({ children }) => {
  const autenticado = localStorage.getItem('autenticado');
  return autenticado ? children : <Navigate to="/login" />;
};

// NOVO: Componente para proteger rotas por Cargo (Role)
const RotaRestrita = ({ children, rolesPermitidos }) => {
  const autenticado = localStorage.getItem('autenticado');
  const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');
  
  // Se o usuário não tiver role definida no banco, consideramos como 'visitante'
  const userRole = usuarioInfo?.role || 'visitante'; 
  
  if (!autenticado) return <Navigate to="/login" />;
  
  // Se for admin, sempre tem acesso. Se não, verifica se o cargo está na lista permitida.
  const temAcesso = userRole === 'admin' || rolesPermitidos.includes(userRole);
  
  // Se não tiver acesso, joga de volta para o Início
  return temAcesso ? children : <Navigate to="/" />; 
};

// Componente para rotas exclusivas de Admin
const RotaAdmin = ({ children }) => {
  const autenticado = localStorage.getItem('autenticado');
  const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');
  const isAdmin = usuarioInfo?.role === 'admin';
  
  if (!autenticado) return <Navigate to="/login" />;
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

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen text-blue-500 font-bold">
    Carregando sistema LSPD...
  </div>
);

function App() {
  return (
    <Router>
      <LayoutComNavbar>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            
            {/* 🟢 Rotas de Visitantes (Acesso para qualquer logado) */}
            <Route path="/" element={<RotaPrivada><Home /></RotaPrivada>} />
            <Route path="/sobre" element={<RotaPrivada><Sobre /></RotaPrivada>} />
            <Route path="/recrutamento" element={<RotaPrivada><Recrutamento /></RotaPrivada>} />
            <Route path="/codigo" element={<RotaPrivada><CodigoPenal /></RotaPrivada>} />

            {/* 🔴 Rotas Exclusivas FIB */}
            <Route path="/investigacoes" element={<RotaRestrita rolesPermitidos={['fib']}><Investigacoes /></RotaRestrita>} />
            <Route path="/operacoes" element={<RotaRestrita rolesPermitidos={['fib']}><Operacoes /></RotaRestrita>} />

            {/* 🔵 Rotas Exclusivas da Polícia (LSPD) */}
            {/* Adicionei 'oficial' e 'comando' como exemplo para as outras páginas que não são de visitantes */}
            <Route path="/banco-criminal" element={<RotaRestrita rolesPermitidos={['oficial', 'comando', 'fib']}><BancoCriminal /></RotaRestrita>} />
            <Route path="/calculadora" element={<RotaRestrita rolesPermitidos={['oficial', 'comando', 'fib']}><CalculadoraPenal /></RotaRestrita>} />
            <Route path="/oficiais" element={<RotaRestrita rolesPermitidos={['oficial', 'comando']}><ControleOficiais /></RotaRestrita>} />
            <Route path="/comando" element={<RotaRestrita rolesPermitidos={['comando']}><PainelComando /></RotaRestrita>} />

            {/* 🟡 Rota Exclusiva de Administração */}
            <Route path="/admin" element={<RotaAdmin><PainelAdmin /></RotaAdmin>} />
          </Routes>
        </Suspense>
      </LayoutComNavbar>
    </Router>
  );
}

export default App;