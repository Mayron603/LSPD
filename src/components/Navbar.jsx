import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, Users, FileText, ClipboardList, Search, 
  Briefcase, Crosshair, Crown, ShieldAlert, LogOut, Calculator 
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');
  const userRole = usuarioInfo?.role || 'visitante'; // Pega o cargo do usuário
  const isAdmin = userRole === 'admin';

  // Array configurando quais roles podem ver cada botão na Navbar
  const navLinks = [
    // Liberado para todos (Visitantes)
    { name: 'Início', path: '/', icon: <Shield size={16} />, roles: ['all'] },
    { name: 'Sobre', path: '/sobre', icon: <Users size={16} />, roles: ['all'] },
    { name: 'Penal', path: '/codigo', icon: <FileText size={16} />, roles: ['all'] },
    
    // Restritos Policiais
    { name: 'Calculadora', path: '/calculadora', icon: <Calculator size={16} />, roles: ['oficial', 'comando', 'fib'] },
    { name: 'Oficiais', path: '/oficiais', icon: <ClipboardList size={16} />, roles: ['oficial', 'comando'] },
    { name: 'Banco', path: '/banco-criminal', icon: <Search size={16} />, roles: ['oficial', 'comando', 'fib'] },
    { name: 'Comando', path: '/comando', icon: <Crown size={16} />, roles: ['comando'] },

    // Exclusivos FIB
    { name: 'FIB', path: '/investigacoes', icon: <Briefcase size={16} />, roles: ['fib'] },
    { name: 'Operações', path: '/operacoes', icon: <Crosshair size={16} />, roles: ['fib'] },
  ];

  // Filtra a Navbar antes de exibir na tela
  const linksVisiveis = navLinks.filter(link => {
    if (isAdmin) return true; // Se for admin, vê todos os botões
    if (link.roles.includes('all')) return true; // Se for 'all', todo mundo vê (inclusive visitantes)
    return link.roles.includes(userRole); // Se não, vê só se tiver a role exata
  });

  const handleLogout = () => {
    localStorage.removeItem('autenticado');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Esquerda: Logo */}
          <div className="flex items-center gap-2 min-w-fit">
            <Shield className="text-blue-500" size={24} />
            <span className="font-black text-white tracking-tighter text-lg">LSPD</span>
          </div>

          {/* Centro: Links Filtrados */}
          <div className="flex items-center gap-1 mx-4">
            {linksVisiveis.map((link) => {
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

          {/* Direita: Admin, Perfil e Logout */}
          <div className="flex items-center gap-2 min-w-fit border-l border-white/10 pl-4">
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
              <span className="text-[9px] text-blue-400 font-bold uppercase leading-none">{usuarioInfo?.patente || 'Visitante'}</span>
              <span className="text-xs font-black text-white leading-tight">{usuarioInfo?.nome || 'Anônimo'}</span>
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