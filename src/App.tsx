import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { 
  Shield, 
  Zap, 
  Clock, 
  CheckCircle, 
  Code, 
  Globe, 
  Users, 
  BarChart, 
  Lock, 
  Headphones, 
  ChevronRight, 
  Menu, 
  X,
  ArrowRight,
  CheckSquare,
  Server,
  Cpu,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  LogOut,
  Home,
  Settings,
  Bell,
  User,
  HelpCircle,
  PieChart,
  Activity,
  Layers,
  FileText,
  AlertTriangle,
  Eye
} from 'lucide-react';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showNavbar = !location.pathname.includes('/dashboard') && location.pathname !== '/login';

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
        {/* Navigation - Only show on non-dashboard pages */}
        {showNavbar && (
          <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-blue-600">Kronos Security</span>
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
                  <a href="/#features" className="text-gray-700 hover:text-blue-600 transition-colors">Recursos</a>
                  <a href="/#solutions" className="text-gray-700 hover:text-blue-600 transition-colors">Soluções</a>
                  <a href="/#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Preços</a>
                  <a href="/#faq" className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>
                  <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contato</a>
                  <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Login</a>
                </div>
                
                {/* Mobile Navigation Toggle */}
                <div className="md:hidden">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
              
              {/* Mobile Navigation Menu */}
              {isMenuOpen && (
                <div className="md:hidden mt-4 pb-4">
                  <div className="flex flex-col space-y-4">
                    <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a>
                    <a href="/#features" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Recursos</a>
                    <a href="/#solutions" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Soluções</a>
                    <a href="/#pricing" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Preços</a>
                    <a href="/#faq" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                    <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Contato</a>
                    <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block">Login</a>
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;