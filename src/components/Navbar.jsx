import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, Users, FileText, ClipboardList, Search, 
  Briefcase, Crosshair, Crown, FileSignature, ShieldAlert, LogOut, Calculator, Sun, Moon 
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');
  const isAdmin = usuarioInfo?.role === 'admin';

  // Sistema de Tema Claro/Escuro
  const [isLightMode, setIsLightMode] = useState(localStorage.getItem('theme') === 'light');

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightMode]);

  const toggleTheme = () => setIsLightMode(!isLightMode);

  const navLinks = [
    { name: 'Início', path: '/', icon: <Shield size={16} /> },
    { name: 'Sobre', path: '/sobre', icon: <Users size={16} /> },
    { name: 'Penal', path: '/codigo', icon: <FileText size={16} /> },
    { name: 'Calculadora', path: '/calculadora', icon: <Calculator size={16} /> },
    { name: 'Oficiais', path: '/oficiais', icon: <ClipboardList size={16} /> },
    { name: 'Banco', path: '/banco-criminal', icon: <Search size={16} /> },
    { name: 'FIB', path: '/investigacoes', icon: <Briefcase size={16} /> },
    { name: 'Operações', path: '/operacoes', icon: <Crosshair size={16} /> },
    { name: 'Comando', path: '/comando', icon: <Crown size={16} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('autenticado');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center gap-2 min-w-fit">
            <Shield className="text-blue-500" size={24} />
            <span className="font-black text-white tracking-tighter text-lg">LSPD</span>
          </div>

          <div className="flex items-center gap-1 mx-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  <span className="hidden xl:block">{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 min-w-fit border-l border-white/10 pl-4">
            
            {/* BOTÃO TEMA CLARO/ESCURO */}
            <button 
              onClick={toggleTheme}
              className="p-2 bg-slate-900 hover:bg-blue-900/30 text-slate-400 hover:text-blue-400 rounded-lg border border-slate-800 transition-all mr-2"
              title="Alternar Tema (Claro/Escuro)"
            >
              {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${
                  location.pathname === '/admin' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-red-900/20 text-red-500 border border-red-500/20 hover:bg-red-900/40'
                }`}
              >
                <ShieldAlert size={16} />
                <span className="hidden lg:block">Admin</span>
              </Link>
            )}

            <div className="hidden lg:flex flex-col items-end px-2">
              <span className="text-[9px] text-blue-400 font-bold uppercase leading-none">{usuarioInfo?.patente}</span>
              <span className="text-xs font-black text-white leading-tight">{usuarioInfo?.nome}</span>
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-500 rounded-lg border border-slate-800 transition-all"
            >
              <LogOut size={18} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}