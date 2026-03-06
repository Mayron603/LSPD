import { Link, useLocation } from 'react-router-dom';
import { Shield, Users, FileText, ChevronRight, ClipboardList, Search, Briefcase, Crosshair, Crown, FileSignature } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Início', path: '/', icon: <Shield className="w-4 h-4" /> },
    { name: 'Corporação', path: '/sobre', icon: <Users className="w-4 h-4" /> },
    { name: 'Código Penal', path: '/codigo', icon: <FileText className="w-4 h-4" /> },
    { name: 'Oficiais', path: '/oficiais', icon: <ClipboardList className="w-4 h-4" /> },
    { name: 'Banco Criminal', path: '/banco-criminal', icon: <Search className="w-4 h-4" /> },
    { name: 'FIB', path: '/investigacoes', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Operações', path: '/operacoes', icon: <Crosshair className="w-4 h-4" /> },
    { name: 'Comando', path: '/comando', icon: <Crown className="w-4 h-4" /> },
    { name: 'Porte de Arma', path: '/porte-arma', icon: <FileSignature className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/60">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo LSPD */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xl font-black tracking-widest text-white leading-none">LSPD</span>
              <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Rebaixados</span>
            </div>
          </div>

          {/* Menu Desktop (Scrollável se necessário) */}
          <div className="flex-1 overflow-x-auto no-scrollbar flex items-center justify-center">
            <div className="flex items-center space-x-1 whitespace-nowrap px-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/10 text-white shadow-sm border border-white/5' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.icon}
                    <span className="hidden lg:block">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Botão de Alistamento */}
          <div className="flex-shrink-0">
            <Link 
              to="/recrutamento" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all"
            >
              Alistar<span className="hidden sm:inline">-se</span>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}