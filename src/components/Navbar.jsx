import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, Users, FileText, ClipboardList, Search, 
  Briefcase, Crosshair, Crown, FileSignature, ShieldAlert, LogOut, User 
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Puxamos as informações do usuário logado do cache do navegador
  const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');
  const isAdmin = usuarioInfo?.role === 'admin';

  // Lista padrão de links (para todos os logados)
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

  // Se for Admin, injetamos o link do Painel no meio do menu
  if (isAdmin) {
    navLinks.push({ 
      name: 'Painel Admin', 
      path: '/admin', 
      icon: <ShieldAlert className="w-4 h-4 text-red-500" /> 
    });
  }

  // Função para limpar a sessão e deslogar
  const handleLogout = () => {
    localStorage.removeItem('autenticado');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

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

          {/* Menu Central (Scrollável em telas menores) */}
          <div className="flex-1 overflow-x-auto no-scrollbar flex items-center justify-center">
            <div className="flex items-center space-x-1 whitespace-nowrap px-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const isAdminLink = link.path === '/admin';

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all duration-300 ${
                      isActive && !isAdminLink ? 'bg-white/10 text-white shadow-sm border border-white/5' : 
                      isActive && isAdminLink ? 'bg-red-900/30 text-red-500 border border-red-500/30' :
                      isAdminLink ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' :
                      'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.icon}
                    <span className="hidden lg:block">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Área Direita: Perfil e Logout */}
          <div className="flex-shrink-0 flex items-center gap-3">
            
            {/* Textos de Patente e Nome */}
            <div className="hidden md:flex flex-col items-end mr-1">
              <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">
                {usuarioInfo?.patente || 'Sem Patente'}
              </span>
              <span className="text-sm font-black text-white leading-tight">
                {usuarioInfo?.nome || 'Cidadão'}
              </span>
            </div>
            
            {/* Botão de Perfil */}
            <button 
              className="flex items-center justify-center w-10 h-10 bg-slate-900 hover:bg-blue-900/30 border border-slate-800 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 rounded-lg transition-all"
              title="Meu Perfil"
              // Se quiser criar uma página de perfil depois, pode usar: onClick={() => navigate('/perfil')}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Botão de Logout */}
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center w-10 h-10 bg-slate-900 hover:bg-red-900/50 border border-slate-800 hover:border-red-900 text-slate-400 hover:text-red-400 rounded-lg transition-all shadow-[0_0_10px_rgba(0,0,0,0.2)]"
              title="Sair do Sistema"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}