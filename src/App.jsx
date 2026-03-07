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
import PainelComando from './pages/PainelComando';
import PorteArma from './pages/PorteArma';
import Login from './pages/Login';
import './index.css';

// Componente para proteger as rotas
const RotaPrivada = ({ children }) => {
  const autenticado = localStorage.getItem('autenticado');
  return autenticado ? children : <Navigate to="/login" />;
};

// Componente para esconder a Navbar na tela de login
const LayoutComNavbar = ({ children }) => {
  const location = useLocation();
  const esconderNavbar = location.pathname === '/login';
  
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
          {/* Rota pública */}
          <Route path="/login" element={<Login />} />
          
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
          <Route path="/porte-arma" element={<RotaPrivada><PorteArma /></RotaPrivada>} />
        </Routes>
      </LayoutComNavbar>
    </Router>
  );
}

export default App;