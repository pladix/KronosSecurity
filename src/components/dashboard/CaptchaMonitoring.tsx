import React, { useState } from 'react';
import { 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  Filter, 
  Download, 
  Calendar,
  ChevronDown,
  ChevronUp,
  Shield,
  Lock,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

// Mock data for captcha monitoring
const captchaStats = {
  total: 45872,
  solved: 45231,
  failed: 641,
  successRate: 98.6,
  trend: 'up',
  trendValue: 2.4
};

const captchaTypes = [
  { name: 'reCAPTCHA v2', value: 22546 },
  { name: 'reCAPTCHA v3', value: 12453 },
  { name: 'hCaptcha', value: 6234 },
  { name: 'FunCaptcha', value: 2987 },
  { name: 'Outros', value: 1652 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EC4899'];

const dailyData = [
  { date: '01/06', solved: 5200, failed: 120 },
  { date: '02/06', solved: 5800, failed: 150 },
  { date: '03/06', solved: 5400, failed: 100 },
  { date: '04/06', solved: 6700, failed: 180 },
  { date: '05/06', solved: 6200, failed: 160 },
  { date: '06/06', solved: 7100, failed: 140 },
  { date: '07/06', solved: 8100, failed: 190 }
];

const responseTimeData = [
  { time: '00:00', value: 2.8 },
  { time: '04:00', value: 2.5 },
  { time: '08:00', value: 3.2 },
  { time: '12:00', value: 4.1 },
  { time: '16:00', value: 3.8 },
  { time: '20:00', value: 3.0 },
  { time: '23:59', value: 2.7 }
];

const recentCaptchas = [
  { id: 1, type: 'reCAPTCHA v2', status: 'success', time: '14:32:45', duration: '2.1s', website: 'example.com' },
  { id: 2, type: 'hCaptcha', status: 'success', time: '14:30:12', duration: '3.5s', website: 'test-site.org' },
  { id: 3, type: 'reCAPTCHA v3', status: 'success', time: '14:28:55', duration: '1.2s', website: 'shop.example.com' },
  { id: 4, type: 'FunCaptcha', status: 'failed', time: '14:25:33', duration: '12.0s', website: 'secure-portal.com' },
  { id: 5, type: 'reCAPTCHA v2', status: 'success', time: '14:22:18', duration: '2.8s', website: 'login.example.org' }
];

const CaptchaMonitoring: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [expandedCaptcha, setExpandedCaptcha] = useState<number | null>(null);
  
  const toggleCaptchaDetails = (id: number) => {
    setExpandedCaptcha(expandedCaptcha === id ? null : id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Monitoramento de Captchas</h1>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="24h">Últimas 24 horas</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </button>
          
          <button className="bg-white p-2 rounded-md border border-gray-300 text-gray-500 hover:text-gray-700">
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Captchas Resolvidos</p>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-gray-900">{captchaStats.solved.toLocaleString()}</p>
                <p className="ml-2 text-sm text-gray-500">de {captchaStats.total.toLocaleString()}</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${captchaStats.successRate}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">{captchaStats.successRate}%</span>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Captchas Falhos</p>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-red-600">{captchaStats.failed.toLocaleString()}</p>
                <p className="ml-2 text-sm text-gray-500">de {captchaStats.total.toLocaleString()}</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${100 - captchaStats.successRate}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">{(100 - captchaStats.successRate).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tempo Médio de Resposta</p>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-gray-900">3.2s</p>
                <p className="ml-2 text-sm text-gray-500">min: 0.8s / max: 12.5s</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500">Rápido</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-500">Lento</span>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Captchas Resolvidos por Dia</h2>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="solved" fill="#10B981" name="Resolvidos" />
                <Bar dataKey="failed" fill="#EF4444" name="Falhos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Distribuição por Tipo de Captcha</h2>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={captchaTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {captchaTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Response Time Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <h2 className="text-lg font-medium text-gray-900 mb-4">Tempo de Resposta (24h)</h2>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={responseTimeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" name="Tempo (s)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      
      {/* Recent Captchas */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Captchas Recentes</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">Ver todos</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hora
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duração
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detalhes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCaptchas.map((captcha) => (
                <React.Fragment key={captcha.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {captcha.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        captcha.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {captcha.status === 'success' ? 'Resolvido' : 'Falha'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {captcha.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {captcha.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {captcha.website}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => toggleCaptchaDetails(captcha.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {expandedCaptcha === captcha.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedCaptcha === captcha.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium">Detalhes do Captcha:</p>
                              <pre className="mt-2 bg-gray-100 p-3 rounded-md text-xs overflow-x-auto">
{`{
  "type": "${captcha.type}",
  "website": "${captcha.website}",
  "timestamp": "${captcha.time}",
  "duration": "${captcha.duration}",
  "status": "${captcha.status}",
  "sitekey": "6LcR_V8UAAAAALEzyfMKT_yHU72_5xOPQzZD-UW7"
}`}
                              </pre>
                            </div>
                            <div>
                              <p className="font-medium">Resposta:</p>
                              <pre className="mt-2 bg-gray-100 p-3 rounded-md text-xs overflow-x-auto">
{`{
  "success": ${captcha.status === 'success'},
  "solution": "${captcha.status === 'success' ? '03AGdBq24a8EuCQCGe...' : ''}",
  "error": ${captcha.status === 'success' ? 'null' : '"Timeout exceeded"'},
  "processing_time": "${captcha.duration}"
}`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <h2 className="text-lg font-medium text-gray-900 mb-6">Ações Rápidas</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="p-3 bg-blue-100 rounded-full mb-3">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Testar Captcha</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="p-3 bg-green-100 rounded-full mb-3">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Verificar Status</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="p-3 bg-purple-100 rounded-full mb-3">
              <Lock className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Configurar Regras</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <div className="p-3 bg-yellow-100 rounded-full mb-3">
              <Zap className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Otimizar Desempenho</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CaptchaMonitoring;