import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Shield, 
  Menu, 
  X, 
  Home, 
  BarChart, 
  Settings as SettingsIcon, 
  Users, 
  HelpCircle, 
  Bell, 
  LogOut, 
  Search,
  ChevronDown,
  User,
  PieChart,
  Activity,
  Layers,
  FileText,
  AlertTriangle,
  Eye,
  CheckCircle,
  Clock,
  RefreshCw,
  Lock,
  Zap,
  Code,
  Server,
  Database,
  Filter,
  Download,
  Calendar,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DashboardHome from '../components/dashboard/DashboardHome';
import CaptchaMonitoring from '../components/dashboard/CaptchaMonitoring';
import SecurityAnalytics from '../components/dashboard/SecurityAnalytics';
import ApiUsage from '../components/dashboard/ApiUsage';
import SettingsComponent from '../components/dashboard/Settings';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<{ id: number; title: string; message: string; read: boolean; time: string }[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Mock notifications
    setNotifications([
      { 
        id: 1, 
        title: 'Alerta de Uso', 
        message: 'Você atingiu 80% do seu limite mensal de captchas.', 
        read: false,
        time: '10 min atrás'
      },
      { 
        id: 2, 
        title: 'Nova Atualização', 
        message: 'Nova versão da API disponível com suporte a Turnstile.', 
        read: false,
        time: '1 hora atrás'
      },
      { 
        id: 3, 
        title: 'Manutenção Programada', 
        message: 'Manutenção programada para 15/06 às 03:00 UTC.', 
        read: true,
        time: '3 horas atrás'
      }
    ]);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.info('Você saiu da sua conta');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast.success('Todas as notificações marcadas como lidas');
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowUserMenu(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Prevent propagation for menu toggles
  const handleMenuToggle = (e: React.MouseEvent, setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    e.stopPropagation();
    setter(value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="md:hidden mr-4 text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <button
                onClick={toggleSidebar}
                className="hidden md:block mr-4 text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="flex items-center">
                <Shield className="h-7 w-7 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-blue-600">Kronos Security</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="ml-2 bg-transparent border-none focus:outline-none text-sm text-gray-600 w-40 lg:w-64"
                  />
                </div>
              </div>
              
              <div className="relative">
                <button 
                  onClick={(e) => handleMenuToggle(e, setShowNotifications, !showNotifications)}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none relative"
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-700">Notificações</h3>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Marcar todas como lidas
                        </button>
                      )}
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                              </div>
                              {!notification.read && (
                                <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">
                          Nenhuma notificação
                        </div>
                      )}
                    </div>
                    
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button className="text-xs text-blue-600 hover:text-blue-800 w-full text-center">
                        Ver todas as notificações
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button 
                  onClick={(e) => handleMenuToggle(e, setShowUserMenu, !showUserMenu)}
                  className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <img 
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
                    alt={user?.name || 'User'} 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="ml-2 text-sm font-medium hidden md:block">{user?.name || 'Usuário'}</span>
                  <ChevronDown className="ml-1 h-4 w-4 hidden md:block" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuário'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'usuario@exemplo.com'}</p>
                    </div>
                    
                    <Link 
                      to="/dashboard/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Perfil
                      </div>
                    </Link>
                    
                    <Link 
                      to="/dashboard/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <div className="flex items-center">
                        <SettingsIcon className="h-4 w-4 mr-2" />
                        Configurações
                      </div>
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 transition-opacity md:hidden ${
          isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileSidebarOpen(false)}
      ></div>
      
      <div 
        className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white shadow-lg transform transition-transform md:hidden z-30 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-7 w-7 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-blue-600">Kronos</span>
          </div>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            <Link 
              to="/dashboard" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname === '/dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            
            <Link 
              to="/dashboard/captcha" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname.includes('/captcha') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <Eye className="mr-3 h-5 w-5" />
              Monitoramento de Captchas
            </Link>
            
            <Link 
              to="/dashboard/security" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname.includes('/security') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <Shield className="mr-3 h-5 w-5" />
              Análise de Segurança
            </Link>
            
            <Link 
              to="/dashboard/api" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname.includes('/api') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <Activity className="mr-3 h-5 w-5" />
              Uso da API
            </Link>
            
            <Link 
              to="/dashboard/settings" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname.includes('/settings') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <SettingsIcon className="mr-3 h-5 w-5" />
              Configurações
            </Link>
          </nav>
        </div>
        
        <div className="px-4 py-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </button>
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white shadow-lg transform transition-transform z-10 hidden md:flex ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center px-4 py-6 border-b border-gray-200">
          <Shield className="h-7 w-7 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-blue-600">Kronos Security</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            <Link 
              to="/dashboard" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname === '/dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            
            <Link 
              to="/dashboard/captcha" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname.includes('/captcha') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Eye className="mr-3 h-5 w-5" />
              Monitoramento de Captchas
            </Link>
            
            <Link 
              to="/dashboard/security" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname.includes('/security') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Shield className="mr-3 h-5 w-5" />
              Análise de Segurança
            </Link>
            
            <Link 
              to="/dashboard/api" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname.includes('/api') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Activity className="mr-3 h-5 w-5" />
              Uso da API
            </Link>
            
            <Link 
              to="/dashboard/settings" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname.includes('/settings') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SettingsIcon className="mr-3 h-5 w-5" />
              Configurações
            </Link>
          </nav>
        </div>
        
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center">
            <img 
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
              alt={user?.name || 'User'} 
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuário'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'usuario@exemplo.com'}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="mt-4 flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`pt-20 pb-10 ${isSidebarOpen ? 'md:ml-64' : ''} transition-all duration-300`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/captcha" element={<CaptchaMonitoring />} />
            <Route path="/security" element={<SecurityAnalytics />} />
            <Route path="/api" element={<ApiUsage />} />
            <Route path="/settings" element={<SettingsComponent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;