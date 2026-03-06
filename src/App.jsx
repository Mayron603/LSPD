import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recrutamento from './pages/Recrutamento';
import CodigoPenal from './pages/CodigoPenal'; // <-- IMPORTANTE: Importamos a página aqui
import './index.css';

function App() {
  return (
    <Router>
      <Navbar /> 
      
      {/* Coloquei o fundo escuro aqui no main também para garantir */}
      <main className="min-h-screen bg-slate-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<div className="pt-32 text-center text-white"><h2>Página em construção...</h2></div>} />
          <Route path="/recrutamento" element={<Recrutamento />} />
          <Route path="/codigo" element={<CodigoPenal />} /> {/* <-- IMPORTANTE: Criamos a rota aqui */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;