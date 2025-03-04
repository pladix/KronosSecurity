import React, { useState } from 'react';
import { 
  PieChart as PieChartIcon, 
  Shield, 
  AlertTriangle, 
  Lock, 
  RefreshCw, 
  Download, 
  Calendar,
  Globe,
  Map,
  Zap,
  Server,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';

// Mock data for security analytics
const threatDistribution = [
  { name: 'Bots Simples', value: 45 },
  { name: 'Bots Avançados', value: 30 },
  { name: 'Ataques Dirigidos', value: 15 },
  { name: 'Outros', value: 10 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1'];

const monthlyThreatData = [
  { month: 'Jan', threats: 320, blocked: 315 },
  { month: 'Fev', threats: 280, blocked: 270 },
  { month: 'Mar', threats: 420, blocked: 410 },
  { month: 'Abr', threats: 380, blocked: 375 },
  { month: 'Mai', threats: 520, blocked: 510 },
  { month: 'Jun', threats: 480, blocked: 470 }
];

const geographicData = [
  { country: 'Estados Unidos', attempts: 1250, percentage: 35 },
  { country: 'China', attempts: 850, percentage: 24 },
  { country: 'Rússia', attempts: 620, percentage: 17 },
  { country: 'Brasil', attempts: 320, percentage: 9 },
  { country: 'Índia', attempts: 280, percentage: 8 },
  { country: 'Outros', attempts: 250, percentage: 7 }
];

const securityMetrics = {
  totalThreats: 3570,
  blockedThreats: 3520,
  successRate: 98.6,
  avgResponseTime: 0.8
};

const SecurityAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Análise de Segurança</h1>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="1y">Último ano</option>
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
      
      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Ameaças</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{securityMetrics.totalThreats}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Ameaças Bloqueadas</p>
              <p className="mt-1 text-2xl font-semibold text-green-600">{securityMetrics.blockedThreats}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Taxa de Sucesso</p>
              <p className="mt-1 text-2xl font-semibold text-blue-600">{securityMetrics.successRate}%</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tempo de Resposta</p>
              <p className="mt-1 text-2xl font-semibold text-purple-600">{securityMetrics.avgResponseTime}s</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Distribuição de Ameaças</h2>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {threatDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Tendência Mensal de Ameaças</h2>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyThreatData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="threats" fill="#EF4444" name="Ameaças Detectadas" />
                <Bar dataKey="blocked" fill="#10B981" name="Ameaças Bloqueadas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Geographic Distribution */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Distribuição Geográfica de Ameaças</h2>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Global</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  País
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tentativas
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Porcentagem
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distribuição
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {geographicData.map((country, index) => (
                <tr key={country.country} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {country.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {country.attempts.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {country.percentage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      {/* Security Recommendations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <h2 className="text-lg font-medium text-gray-900 mb-6">Recomendações de Segurança</h2>
        
        <div className="space-y-4">
          <div className="flex items-start p-4 bg-green-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-full mr-4">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">Proteção Atual: Excelente</h3>
              <p className="mt-1 text-sm text-green-700">
                Seu sistema está bem protegido contra a maioria das ameaças. Continue monitorando regularmente.
              </p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-yellow-50 rounded-lg">
            <div className="p-2 bg-yellow-100 rounded-full mr-4">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium text-yellow-800">Atenção: Aumento de Bots Avançados</h3>
              <p className="mt-1 text-sm text-yellow-700">
                Detectamos um aumento de 15% em tentativas de bots avançados. Considere atualizar suas regras de detecção.
              </p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-blue-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full mr-4">
              <Lock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-800">Dica: Autenticação em Duas Etapas</h3>
              <p className="mt-1 text-sm text-blue-700">
                Implementar autenticação em duas etapas pode reduzir ainda mais o risco de acesso não autorizado.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SecurityAnalytics;