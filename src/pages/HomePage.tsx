import React, { useState, useEffect } from 'react';
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
  Github
} from 'lucide-react';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Carlos Mendes",
    position: "CTO, TechFlow Solutions",
    content: "A Kronos Security transformou completamente nosso processo de automação. A taxa de sucesso na resolução de captchas aumentou em 95%, e o tempo de processamento foi reduzido drasticamente.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Mariana Costa",
    position: "Diretora de Operações, E-commerce Express",
    content: "Implementamos as soluções da Kronos há 6 meses e os resultados são impressionantes. O suporte técnico é excepcional, sempre disponível para resolver qualquer questão.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Ricardo Oliveira",
    position: "Desenvolvedor Sênior, DataHarvest",
    content: "A API da Kronos é simplesmente a melhor do mercado. Documentação clara, integração simples e performance excepcional. Recomendo fortemente para qualquer empresa que precise de soluções de captcha.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
  }
];

// Pricing plans
const pricingPlans = [
  {
    name: "Básico",
    price: "R$ 299",
    period: "/mês",
    description: "Ideal para pequenas empresas e startups",
    features: [
      "Até 10.000 captchas/mês",
      "Suporte a reCAPTCHA v2 e v3",
      "Suporte por email",
      "API REST",
      "99.5% de uptime garantido"
    ],
    cta: "Começar Agora",
    popular: false
  },
  {
    name: "Profissional",
    price: "R$ 799",
    period: "/mês",
    description: "Perfeito para empresas em crescimento",
    features: [
      "Até 50.000 captchas/mês",
      "Todos os tipos de captcha",
      "Suporte prioritário 24/5",
      "API REST e SDK",
      "99.9% de uptime garantido",
      "Dashboard de análise"
    ],
    cta: "Escolher Plano",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Personalizado",
    period: "",
    description: "Para grandes operações e necessidades específicas",
    features: [
      "Volume ilimitado de captchas",
      "Soluções personalizadas",
      "Suporte dedicado 24/7",
      "API REST, SDK e integrações",
      "99.99% de uptime garantido",
      "Dashboard avançado",
      "Gerente de conta exclusivo"
    ],
    cta: "Falar com Consultor",
    popular: false
  }
];

// FAQ items
const faqItems = [
  {
    question: "Como funciona o serviço de resolução de captchas?",
    answer: "Nossa tecnologia combina algoritmos avançados de inteligência artificial com uma rede de solucionadores humanos quando necessário (human-in-the-loop). Quando você envia um captcha através de nossa API, nosso sistema o processa, resolve e retorna a solução em segundos."
  },
  {
    question: "Quais tipos de captcha vocês conseguem resolver?",
    answer: "Suportamos mais de 150 tipos de captchas, incluindo reCAPTCHA v2, v3 e Enterprise, hCaptcha, FunCaptcha (Arkose Labs), Text Captchas, Image Captchas, Audio Captchas e Turnstile (Cloudflare), entre outros."
  },
  {
    question: "Quanto tempo leva para resolver um captcha?",
    answer: "O tempo médio de resolução varia de acordo com o tipo de captcha, mas geralmente fica entre 2 e 15 segundos. Captchas mais simples são resolvidos quase instantaneamente, enquanto os mais complexos podem levar alguns segundos a mais."
  },
  {
    question: "Como posso integrar o serviço ao meu sistema?",
    answer: "Oferecemos documentação detalhada e SDKs para várias linguagens de programação, incluindo PHP, Python, Node.js, Java, C# e Ruby. A integração é simples e pode ser feita em poucas linhas de código."
  },
  {
    question: "O serviço é legal?",
    answer: "Sim. Nosso serviço é utilizado para automatizar processos legítimos e não viola os termos de serviço dos provedores de captcha quando utilizado de acordo com nossas diretrizes. Recomendamos sempre verificar os termos de uso dos sites que você está acessando."
  },
  {
    question: "Vocês oferecem teste gratuito?",
    answer: "Sim, oferecemos um período de teste gratuito de 7 dias com um limite de 100 captchas para que você possa avaliar nosso serviço antes de se comprometer com um plano."
  }
];

// Captcha types
const captchaTypes = [
  { name: "reCAPTCHA v2", icon: <Shield className="h-8 w-8 text-blue-500" /> },
  { name: "reCAPTCHA v3", icon: <Shield className="h-8 w-8 text-blue-500" /> },
  { name: "hCaptcha", icon: <CheckCircle className="h-8 w-8 text-green-500" /> },
  { name: "FunCaptcha", icon: <CheckCircle className="h-8 w-8 text-green-500" /> },
  { name: "Text Captcha", icon: <Code className="h-8 w-8 text-purple-500" /> },
  { name: "Image Captcha", icon: <Code className="h-8 w-8 text-purple-500" /> },
  { name: "Audio Captcha", icon: <Headphones className="h-8 w-8 text-yellow-500" /> },
  { name: "Turnstile", icon: <Lock className="h-8 w-8 text-red-500" /> }
];

// Integration languages
const integrationLanguages = [
  "PHP", "Python", "Node.js", "Java", "C#", "Ruby", "Go", "JavaScript"
];

function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                Soluções Avançadas para <span className="text-blue-600">Resolução de Captchas</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Automatize seus processos com a tecnologia mais avançada do mercado. Suporte para mais de 150 tipos de captchas com alta taxa de sucesso.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a href="#demo" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
                  Ver Demonstração
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-blue-100 rounded-lg p-6 shadow-lg">
                  <div className="bg-white rounded-md p-4 shadow-sm">
                    <div className="flex items-center mb-4">
                      <Shield className="h-6 w-6 text-blue-600 mr-2" />
                      <h3 className="text-lg font-semibold">Resolução de Captcha em Tempo Real</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-100 rounded p-3 flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-3">1</div>
                        <div>Envio do captcha via API</div>
                      </div>
                      <div className="bg-gray-100 rounded p-3 flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-3">2</div>
                        <div>Processamento pela IA avançada</div>
                      </div>
                      <div className="bg-gray-100 rounded p-3 flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-3">3</div>
                        <div>Retorno da solução em segundos</div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded-md text-green-800 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Taxa de sucesso de 98.7%</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 py-1 px-3 rounded-full font-bold text-sm">
                  Resposta em segundos!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Tipos de Captchas</div>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98.7%</div>
              <div className="text-gray-600">Taxa de Sucesso</div>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">2-15s</div>
              <div className="text-gray-600">Tempo de Resposta</div>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Suporte Técnico</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por que escolher a Kronos Security?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa tecnologia de ponta oferece soluções completas para automatizar processos que envolvem captchas, com foco em eficiência e precisão.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Velocidade Incomparável</h3>
              <p className="text-gray-600">
                Resolução de captchas em segundos, permitindo que seus processos automatizados funcionem sem interrupções.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 p-3 rounded-full inline-block mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Alta Precisão</h3>
              <p className="text-gray-600">
                Taxa de sucesso de 98.7% na resolução de captchas, garantindo eficiência em seus processos.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-purple-100 p-3 rounded-full inline-block mb-4">
                <Code className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integração Simples</h3>
              <p className="text-gray-600">
                APIs modernas e SDKs para diversas linguagens de programação, facilitando a implementação.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-yellow-100 p-3 rounded-full inline-block mb-4">
                <Globe className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compatibilidade Ampla</h3>
              <p className="text-gray-600">
                Suporte para mais de 150 tipos de captchas, incluindo os mais recentes e complexos do mercado.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-red-100 p-3 rounded-full inline-block mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Suporte Especializado</h3>
              <p className="text-gray-600">
                Equipe técnica disponível 24/7 para auxiliar em qualquer questão relacionada ao serviço.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full inline-block mb-4">
                <BarChart className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Análise Detalhada</h3>
              <p className="text-gray-600">
                Dashboard completo com métricas de desempenho e uso para otimizar seus processos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Captcha Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tipos de Captchas Suportados</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma suporta mais de 150 tipos de captchas, incluindo os mais populares e complexos do mercado.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {captchaTypes.map((captcha, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center">
                  {captcha.icon}
                  <h3 className="mt-4 text-lg font-medium">{captcha.name}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">E muitos outros tipos de captchas suportados...</p>
            <a href="/contact" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Ver lista completa <ChevronRight className="h-5 w-5 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossas Soluções</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções personalizadas para diversos cenários e necessidades, sempre com foco em eficiência e segurança.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Server className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">API de Resolução de Captchas</h3>
                    <p className="text-gray-600">
                      Nossa API principal permite enviar captchas e receber soluções em segundos, com suporte para todos os tipos populares de captchas.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <Cpu className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Soluções Human-in-the-Loop</h3>
                    <p className="text-gray-600">
                      Para captchas mais complexos, combinamos inteligência artificial com revisão humana para garantir resultados precisos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <RefreshCw className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Integração Contínua</h3>
                    <p className="text-gray-600">
                      SDKs e bibliotecas para diversas linguagens de programação, facilitando a integração com seus sistemas existentes.
                    </p>
                  </div>
                </div>
              </div>
              
              <a href="/contact" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Solicitar Demonstração <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Exemplo de Integração</h3>
                <p className="text-gray-600 text-sm">Veja como é simples integrar nossa API em seu código</p>
              </div>
              
              <div className="bg-gray-900 rounded-md p-4 text-white font-mono text-sm overflow-x-auto">
                <pre>{`// Exemplo em Node.js
const KronosCaptcha = require('kronos-captcha');

// Inicializar com sua chave de API
const captchaSolver = new KronosCaptcha({
  apiKey: 'sua_chave_api'
});

// Resolver um reCAPTCHA v2
async function solveCaptcha() {
  try {
    const result = await captchaSolver.solve({
      type: 'recaptcha_v2',
      siteKey: '6LcR_V8UAAAAALEzyfMKT_yHU72_5xOPQzZD-UW7',
      url: 'https://www.example.com/login'
    });
    
    console.log('Solução:', result.solution);
    return result.solution;
  } catch (error) {
    console.error('Erro:', error.message);
  }
}`}</pre>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">Também disponível em PHP, Python, Java e outras linguagens</div>
                <a href="#" className="text-blue-600 text-sm hover:text-blue-800">Ver documentação</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Languages */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900">Compatível com Diversas Linguagens</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {integrationLanguages.map((language, index) => (
              <div key={index} className="bg-white px-6 py-3 rounded-md shadow-sm">
                <span className="font-medium">{language}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">O que Nossos Clientes Dizem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empresas de diversos setores confiam na Kronos Security para suas necessidades de automação.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 shadow-md relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Depoimento em Destaque
              </div>
              
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className={`transition-opacity duration-500 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}
                  style={{ display: index === activeTestimonial ? 'block' : 'none' }}
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start">
                    <div className="mb-6 md:mb-0 md:mr-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                      />
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg italic mb-6">"{testimonial.content}"</p>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-8">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full mx-1 ${index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'}`}
                    aria-label={`Testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Planos e Preços</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para suas necessidades. Todos os planos incluem acesso à nossa API e suporte técnico.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${plan.popular ? 'ring-2 ring-blue-600 transform scale-105 md:scale-110' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-blue-600 text-white py-2 px-4 text-center">
                    <span className="font-medium">Mais Popular</span>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckSquare className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href="/contact" 
                    className={`block text-center py-3 px-4 rounded-md font-medium ${
                      plan.popular 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Precisa de um plano personalizado para sua empresa?</p>
            <a href="/contact" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Entre em contato para uma proposta sob medida
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                    <span className="ml-4">
                      {activeFaq === index ? (
                        <ChevronRight className="h-5 w-5 text-gray-500 transform rotate-90" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </span>
                  </button>
                  
                  {activeFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Não encontrou o que procurava?</p>
            <a href="/contact" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Entre em contato com nossa equipe
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para automatizar seus processos?</h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a centenas de empresas que já otimizaram seus fluxos de trabalho com a Kronos Security.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors">
                Falar com um Consultor
              </a>
              <a href="#demo" className="border-2 border-white text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors">
                Solicitar Demonstração
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold">Kronos Security</span>
              </div>
              <p className="text-gray-400 mb-4">
                Soluções avançadas para resolução de captchas e automação de processos.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Carreiras</a></li> 
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Imprensa</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Serviço</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Kronos Security. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;