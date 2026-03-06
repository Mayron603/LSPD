import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './index.css';

function App() {
  return (
    <Router>
      <Navbar /> 
      <main className="min-h-screen bg-slate-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/recrutamento" element={<Recrutamento />} />
          <Route path="/codigo" element={<CodigoPenal />} />
          <Route path="/oficiais" element={<ControleOficiais />} />
          <Route path="/banco-criminal" element={<BancoCriminal />} />
          <Route path="/investigacoes" element={<Investigacoes />} />
          <Route path="/operacoes" element={<Operacoes />} />
          <Route path="/comando" element={<PainelComando />} />
          <Route path="/porte-arma" element={<PorteArma />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;