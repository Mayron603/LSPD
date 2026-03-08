import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Recrutamento from './pages/Recrutamento';
import CodigoPenal from './pages/CodigoPenal';
import ControleOficiais from './pages/ControleOficiais';
import BancoCriminal from './pages/BancoCriminal';
import Investigacoes from './pages/Investigacoes';
import Operacoes from './pages/Operacoes';
import PainelComando from './pages/PainelComando'; // Se usou o código do Alto Comando, pode renomear aqui se necessário
import PorteArma from './pages/PorteArma';
import Login from './pages/Login';
import Registro from './pages/Registro';
import PainelAdmin from './pages/PainelAdmin';
import CalculadoraPenal from './pages/CalculadoraPenal'; // <-- NOVA PÁGINA IMPORTADA
import './index.css';

// Componente para proteger as rotas padrão (Qualquer um logado acessa)
const RotaPrivada = ({ children }) => {
  const autenticado = localStorage.getItem('autenticado');
  return autenticado ? children : <Navigate to="/login" />;
};

// Componente para proteger rotas de Administrador (Apenas Admin acessa)
const RotaAdmin = ({ children }) => {
  const autenticado = localStorage.getItem('autenticado');
  const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');
  const isAdmin = usuarioInfo?.role === 'admin';
  
  if (!autenticado) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />; // Se tentar acessar e não for admin, volta pro Home
  
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

function App() {
  return (
    <Router>
      <LayoutComNavbar>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          
          {/* Rotas Privadas (Qualquer pessoa logada) */}
          <Route path="/" element={<RotaPrivada><Home /></RotaPrivada>} />
          <Route path="/sobre" element={<RotaPrivada><Sobre /></RotaPrivada>} />
          <Route path="/recrutamento" element={<RotaPrivada><Recrutamento /></RotaPrivada>} />
          <Route path="/codigo" element={<RotaPrivada><CodigoPenal /></RotaPrivada>} />
          <Route path="/oficiais" element={<RotaPrivada><ControleOficiais /></RotaPrivada>} />
          <Route path="/banco-criminal" element={<RotaPrivada><BancoCriminal /></RotaPrivada>} />
          <Route path="/investigacoes" element={<RotaPrivada><Investigacoes /></RotaPrivada>} />
          <Route path="/operacoes" element={<RotaPrivada><Operacoes /></RotaPrivada>} />
          <Route path="/comando" element={<RotaPrivada><PainelComando /></RotaPrivada>} />
          <Route path="/porte-arma" element={<RotaPrivada><PorteArma /></RotaPrivada>} />
          
          {/* Nova Rota da Calculadora MDT */}
          <Route path="/calculadora" element={<RotaPrivada><CalculadoraPenal /></RotaPrivada>} />

          {/* Rota Exclusiva de Administração */}
          <Route path="/admin" element={<RotaAdmin><PainelAdmin /></RotaAdmin>} />
        </Routes>
      </LayoutComNavbar>
    </Router>
  );
}

export default App;