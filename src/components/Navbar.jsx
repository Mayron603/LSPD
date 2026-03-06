import { Link, useLocation } from 'react-router-dom';
import { Shield, Users, FileText, ChevronRight, Menu } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Início', path: '/', icon: <Shield className="w-4 h-4" /> },
    { name: 'Corporação', path: '/sobre', icon: <Users className="w-4 h-4" /> },
    { name: 'Código Penal', path: '/codigo', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo LSPD */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest text-white leading-none">
                LSPD
              </span>
              <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">
                Rebaixados
              </span>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/10 text-white shadow-sm border border-white/5' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Botão de Alistamento + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link 
              to="/recrutamento" 
              className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-md text-sm font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all"
            >
              Alistar-se
              <ChevronRight className="w-4 h-4" />
            </Link>
            <button className="md:hidden p-2 text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}