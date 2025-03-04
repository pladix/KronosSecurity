import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  X,
  Send,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportType, setSupportType] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      toast.success('Mensagem enviada com sucesso!');
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSupportRequest = async (type: string) => {
    setSupportType(type);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowSupportModal(false);
      toast.success(`Solicitação de ${type} enviada com sucesso! Um especialista entrará em contato em breve.`);
    } catch (error) {
      toast.error('Erro ao solicitar suporte. Tente novamente.');
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para ajudar sua empresa a automatizar processos e aumentar a eficiência.
            Nossa equipe de especialistas está à disposição para responder suas dúvidas.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <div className="bg-blue-600 text-white rounded-lg p-8 h-full">
                <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-500 p-2 rounded-full mr-4">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-blue-100">contato@kronossecurity.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-500 p-2 rounded-full mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Telefone</h3>
                      <p className="text-blue-100">+55 (11) 4002-8922</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-500 p-2 rounded-full mr-4">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Endereço</h3>
                      <p className="text-blue-100">Av. Paulista, 1000 - São Paulo, SP</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-blue-500">
                  <h3 className="font-medium mb-4">Precisa de ajuda imediata?</h3>
                  <button 
                    onClick={() => setShowSupportModal(true)}
                    className="w-full bg-white text-blue-600 py-3 px-4 rounded-md font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Solicitar Suporte
                  </button>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie uma Mensagem</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nome *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Seu nome completo"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="seu@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-gray-700 font-medium mb-2">Empresa</label>
                      <input 
                        type="text" 
                        id="company" 
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telefone</label>
                      <input 
                        type="text" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Assunto</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="Informações sobre preços">Informações sobre preços</option>
                        <option value="Suporte técnico">Suporte técnico</option>
                        <option value="Demonstração">Solicitar demonstração</option>
                        <option value="Parceria">Proposta de parceria</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensagem *</label>
                      <textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Como podemos ajudar?"
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensagem
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Perguntas Frequentes sobre Contato</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Encontre respostas rápidas para as dúvidas mais comuns sobre nosso processo de contato e suporte.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Qual o tempo de resposta para mensagens?</h3>
                    <p className="text-gray-600">Respondemos todas as mensagens em até 24 horas úteis, mas geralmente nosso tempo de resposta é de 2 a 4 horas em dias úteis.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Como solicitar uma demonstração?</h3>
                    <p className="text-gray-600">Você pode solicitar uma demonstração através do formulário de contato ou diretamente pelo telefone. Nossa equipe agendará um horário conveniente.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Vocês oferecem suporte técnico 24/7?</h3>
                    <p className="text-gray-600">Sim, para clientes dos planos Profissional e Enterprise, oferecemos suporte técnico 24/7. Para o plano Básico, o suporte é disponível em horário comercial.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Como posso obter um orçamento personalizado?</h3>
                    <p className="text-gray-600">Para orçamentos personalizados, entre em contato através do formulário especificando suas necessidades ou ligue diretamente para nossa equipe comercial.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h3>
              <p className="text-gray-600 mb-6">
                Agradecemos seu contato. Nossa equipe analisará sua mensagem e responderá o mais breve possível.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="text-sm text-gray-600">
                  <strong>Tempo estimado de resposta:</strong> 2-24 horas úteis
                </p>
              </div>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Solicitar Suporte</h3>
              <button 
                onClick={() => setShowSupportModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Selecione o tipo de suporte que você precisa. Nossa equipe entrará em contato o mais rápido possível.
            </p>
            
            <div className="space-y-4 mb-6">
              <button
                onClick={() => handleSupportRequest('Suporte Técnico')}
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-lg flex items-center transition-colors"
              >
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <Code className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Suporte Técnico</h4>
                  <p className="text-sm text-gray-600">Problemas com API, integrações ou implementação</p>
                </div>
              </button>
              
              <button
                onClick={() => handleSupportRequest('Suporte Comercial')}
                className="w-full bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-lg flex items-center transition-colors"
              >
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Suporte Comercial</h4>
                  <p className="text-sm text-gray-600">Dúvidas sobre planos, preços ou faturamento</p>
                </div>
              </button>
              
              <button
                onClick={() => handleSupportRequest('Suporte Emergencial')}
                className="w-full bg-red-50 hover:bg-red-100 text-red-700 p-4 rounded-lg flex items-center transition-colors"
              >
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Suporte Emergencial</h4>
                  <p className="text-sm text-gray-600">Problemas críticos que afetam sua operação</p>
                </div>
              </button>
            </div>
            
            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;