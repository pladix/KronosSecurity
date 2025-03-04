import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Key, 
  Bell, 
  Shield, 
  CreditCard, 
  Save,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile settings
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: 'Minha Empresa Ltda.',
    phone: '+55 (11) 98765-4321',
    role: user?.role || 'Admin'
  });
  
  // Security settings
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // API settings
  const [apiSettings, setApiSettings] = useState({
    apiKey: 'kr-prod-a1b2c3d4e5f6g7h8i9j0',
    environment: 'production',
    ipWhitelist: '192.168.1.1, 192.168.1.2',
    rateLimit: '100'
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    securityAlerts: true,
    usageAlerts: true,
    marketingEmails: false,
    apiChanges: true
  });
  
  // Billing information
  const [billingInfo, setBillingInfo] = useState({
    plan: 'Profissional',
    nextBilling: '15/07/2023',
    paymentMethod: 'Visa terminando em 4242',
    autoRenew: true
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleApiSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApiSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Perfil atualizado com sucesso!');
    }, 1000);
  };
  
  const handleSaveSecurity = () => {
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    
    if (securityForm.newPassword.length < 8) {
      toast.error('A senha deve ter pelo menos 8 caracteres');
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Senha atualizada com sucesso!');
      setSecurityForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 1000);
  };
  
  const handleSaveApiSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Configurações da API atualizadas com sucesso!');
    }, 1000);
  };
  
  const handleSaveNotifications = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Preferências de notificação atualizadas com sucesso!');
    }, 1000);
  };
  
  const handleSaveBilling = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Configurações de faturamento atualizadas com sucesso!');
    }, 1000);
  };
  
  const generateNewApiKey = () => {
    const confirmed = window.confirm('Tem certeza que deseja gerar uma nova chave de API? Isso invalidará a chave atual e todas as integrações precisarão ser atualizadas.');
    
    if (confirmed) {
      setIsSaving(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSaving(false);
        const newKey = 'kr-prod-' + Math.random().toString(36).substring(2, 15);
        setApiSettings(prev => ({
          ...prev,
          apiKey: newKey
        }));
        toast.success('Nova chave de API gerada com sucesso!');
      }, 1500);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 p-6">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-3 py-2 w-full text-sm font-medium rounded-md ${
                  activeTab === 'profile' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <User className={`mr-3 h-5 w-5 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`} />
                Perfil
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-3 py-2 w-full text-sm font-medium rounded-md ${
                  activeTab === 'security' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Lock className={`mr-3 h-5 w-5 ${activeTab === 'security' ? 'text-blue-600' : 'text-gray-400'}`} />
                Segurança
              </button>
              
              <button
                onClick={() => setActiveTab('api')}
                className={`flex items-center px-3 py-2 w-full text-sm font-medium rounded-md ${
                  activeTab === 'api' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Key className={`mr-3 h-5 w-5 ${activeTab === 'api' ? 'text-blue-600' : 'text-gray-400'}`} />
                Configurações da API
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center px-3 py-2 w-full text-sm font-medium rounded-md ${
                  activeTab === 'notifications' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Bell className={`mr-3 h-5 w-5 ${activeTab === 'notifications' ? 'text-blue-600' : 'text-gray-400'}`} />
                Notificações
              </button>
              
              <button
                onClick={() => setActiveTab('billing')}
                className={`flex items-center px-3 py-2 w-full text-sm font-medium rounded-md ${
                  activeTab === 'billing' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <CreditCard className={`mr-3 h-5 w-5 ${activeTab === 'billing' ? 'text-blue-600' : 'text-gray-400'}`} />
                Faturamento
              </button>
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-medium text-gray-900 mb-6">Configurações de Perfil</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="mr-6">
                      <img 
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${profileForm.name}&background=random`} 
                        alt={profileForm.name} 
                        className="h-20 w-20 rounded-full"
                      />
                    </div>
                    <div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                        Alterar Foto
                      </button>
                      <p className="mt-2 text-sm text-gray-500">
                        JPG, GIF ou PNG. Tamanho máximo de 2MB.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={profileForm.company}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        Cargo
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={profileForm.role}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-medium text-gray-900 mb-6">Configurações de Segurança</h2>
                
                <div className="space-y-6">
                  <div className="bg-yellow-50 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Atenção</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Recomendamos alterar sua senha regularmente e usar uma senha forte com pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Senha Atual
                      </label>
                      <div className="relative">
                        <input
                          type={showApiKey ? "text" : "password"}
                          id="currentPassword"
                          name="currentPassword"
                          value={securityForm.currentPassword}
                          onChange={handleSecurityChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Nova Senha
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={securityForm.newPassword}
                        onChange={handleSecurityChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar Nova Senha
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={securityForm.confirmPassword}
                        onChange={handleSecurityChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Autenticação em Duas Etapas</h3>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="twoFactor"
                          name="twoFactor"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="twoFactor" className="font-medium text-gray-700">Habilitar autenticação em duas etapas</label>
                        <p className="text-gray-500">Adicione uma camada extra de segurança à sua conta.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Sessões Ativas</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Sessão Atual</p>
                          <p className="text-xs text-gray-500">São Paulo, Brasil • Chrome • Windows</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Ativa Agora
                        </span>
                      </div>
                    </div>
                    
                    <button className="text-sm text-red-600 font-medium hover:text-red-800">
                      Encerrar todas as outras sessões
                    </button>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveSecurity}
                      disabled={isSaving}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* API Settings */}
            {activeTab === 'api' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-medium text-gray-900 mb-6">Configurações da API</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                      Chave da API
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow">
                        <input
                          type={showApiKey ? "text" : "password"}
                          name="apiKey"
                          id="apiKey"
                          value={apiSettings.apiKey}
                          readOnly
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={generateNewApiKey}
                        className="relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        Gerar Nova
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Mantenha esta chave em segredo. Ela concede acesso total à sua conta.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="environment" className="block text-sm font-medium text-gray-700 mb-1">
                      Ambiente
                    </label>
                    <select
                      id="environment"
                      name="environment"
                      value={apiSettings.environment}
                      onChange={handleApiSettingsChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="production">Produção</option>
                      <option value="sandbox">Sandbox</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="ipWhitelist" className="block text-sm font-medium text-gray-700 mb-1">
                      Lista de IPs Permitidos
                    </label>
                    <textarea
                      id="ipWhitelist"
                      name="ipWhitelist"
                      rows={3}
                      value={apiSettings.ipWhitelist}
                      onChange={handleApiSettingsChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Separe os IPs por vírgula"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Deixe em branco para permitir todos os IPs. Separe múltiplos IPs com vírgulas.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="rateLimit" className="block text-sm font-medium text-gray-700 mb-1">
                      Limite de Requisições (por minuto)
                    </label>
                    <input
                      type="number"
                      name="rateLimit"
                      id="rateLimit"
                      value={apiSettings.rateLimit}
                      onChange={handleApiSettingsChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Webhooks</h3>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="enableWebhooks"
                          name="enableWebhooks"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="enableWebhooks" className="font-medium text-gray-700">Habilitar Webhooks</label>
                        <p className="text-gray-500">Receba notificações em tempo real sobre eventos da API.</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        URL do Webhook
                      </label>
                      <input
                        type="url"
                        name="webhookUrl"
                        id="webhookUrl"
                        placeholder="https://seu-dominio.com/webhook"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveApiSettings}
                      disabled={isSaving}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-medium text-gray-900 mb-6">Configurações de Notificações</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Notificações por Email</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="emailAlerts"
                            name="emailAlerts"
                            type="checkbox"
                            checked={notificationSettings.emailAlerts}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="emailAlerts" className="font-medium text-gray-700">Alertas por Email</label>
                          <p className="text-gray-500">Receba alertas importantes sobre sua conta por email.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="securityAlerts"
                            name="securityAlerts"
                            type="checkbox"
                            checked={notificationSettings.securityAlerts}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="securityAlerts" className="font-medium text-gray-700">Alertas de Segurança</label>
                          <p className="text-gray-500">Receba notificações sobre atividades suspeitas ou tentativas de login.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="usageAlerts"
                            name="usageAlerts"
                            type="checkbox"
                            checked={notificationSettings.usageAlerts}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="usageAlerts" className="font-medium text-gray-700">Alertas de Uso</label>
                          <p className="text-gray-500">Receba notificações quando seu uso se aproximar dos limites do plano.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="marketingEmails"
                            name="marketingEmails"
                            type="checkbox"
                            checked={notificationSettings.marketingEmails}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="marketingEmails" className="font-medium text-gray-700">Emails de Marketing</label>
                          <p className="text-gray-500">Receba atualizações sobre novos recursos, promoções e eventos.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Notificações da API</h3>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="apiChanges"
                          name="apiChanges"
                          type="checkbox"
                          checked={notificationSettings.apiChanges}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="apiChanges" className="font-medium text-gray-700">Mudanças na API</label>
                        <p className="text-gray-500">Receba notificações sobre atualizações, mudanças ou depreciações na API.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotifications}
                      disabled={isSaving}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Billing Settings */}
            {activeTab === 'billing' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-medium text-gray-900 mb-6">Configurações de Faturamento</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Plano Atual: {billingInfo.plan}</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            Próximo faturamento em {billingInfo.nextBilling}. Você pode alterar ou cancelar seu plano a qualquer momento.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Método de Pagamento</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-white p-2 rounded-md mr-3">
                            <svg className="h-6 w-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                              <path d="M32 5v22c0 2.75-2.25 5-5 5H5c-2.75 0-5-2.25-5-5V5c0-2.75 2.25-5 5-5h22c2.75 0 5 2.25 5 5z" fill="#F3F4F6"/>
                              <path d="M27.15 14.5H25.7l.9-2.2h-2.8l-.9 2.2h-4.6l-.9 2.2h4.6l-.9 2.2h2.8l.9-2.2h1.45c.65 0 1.15-.5 1.15-1.1 0-.65-.5-1.1-1.15-1.1z" fill="#1A202C"/>
                              <path d="M16.15 18.9h-2.8l.9-2.2h-4.6l-.9 2.2H7.3l.9-2.2H6.75c-.65 0-1.15-.5-1.15-1.1 0-.65.5-1.1 1.15-1.1h1.45l.9-2.2h2.8l-.9 2.2h4.6l.9-2.2h2.8l-.9 2.2h1.45c.65 0 1.15.5 1.15 1.1 0 .65-.5 1.1-1.15 1.1h-1.45l-.9 2.2z" fill="#1A202C"/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{billingInfo.paymentMethod}</p>
                            <p className="text-xs text-gray-500">Expira em 12/2025</p>
                          </div>
                        </div>
                        <button className="text-sm text-blue-600 font-medium hover:text-blue-800">
                          Editar
                        </button>
                      </div>
                    </div>
                    
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-800">
                      + Adicionar novo método de pagamento
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Histórico de Faturamento</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Descrição
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Valor
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Recibo
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              15/05/2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Plano Profissional - Maio 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              R$ 799,00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                Pago
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                              <a href="#">Download</a>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              15/04/2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Plano Profissional - Abril 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              R$ 799,00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                Pago
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                              <a href="#">Download</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="autoRenew"
                          name="autoRenew"
                          type="checkbox"
                          checked={billingInfo.autoRenew}
                          onChange={handleBillingChange}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="autoRenew" className="font-medium text-gray-700">Renovação Automática</label>
                        <p className="text-gray-500">Renovar automaticamente minha assinatura quando expirar.</p>
                      </div>
                    </div> </div>
                  
                  <div className="flex justify-between">
                    <button className="text-sm text-red-600 font-medium hover:text-red-800">
                      Cancelar Assinatura
                    </button>
                    
                    <button
                      onClick={handleSaveBilling}
                      disabled={isSaving}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;