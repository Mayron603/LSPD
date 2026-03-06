import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recrutamento from './pages/Recrutamento';
import './index.css';

function App() {
  return (
    <Router>
      {/* O Navbar fica fora do Routes para aparecer em todas as telas */}
      <Navbar /> 
      
      <main style={{ minHeight: '100vh', backgroundColor: '#242424' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<div style={{padding: '40px', color: 'white', textAlign: 'center'}}><h2>Página em construção...</h2></div>} />
          <Route path="/recrutamento" element={<Recrutamento />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;