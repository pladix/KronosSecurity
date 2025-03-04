import React, { useState } from 'react';
import { 
  Activity, 
  BarChart, 
  Calendar, 
  Download, 
  Filter, 
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Server,
  Database,
  Code,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

// Mock data for API usage
const dailyUsageData = [
  { date: '01/06', requests: 4500, errors: 120 },
  { date: '02/06', requests: 5200, errors: 150 },
  { date: '03/06', requests: 4800, errors: 100 },
  { date: '04/06', requests: 6100, errors: 180 },
  { date: '05/06', requests: 5700, errors: 160 },
  { date: '06/06', requests: 6500, errors: 140 },
  { date: '07/06', requests: 7200, errors: 190 }
];

const endpointUsageData = [
  { name: '/solve', requests: 25600, percentage: 56 },
  { name: '/status', requests: 12400, percentage: 27 },
  { name: '/balance', requests: 4500, percentage: 10 },
  { name: '/report', requests: 2100, percentage: 5 },
  { name: '/other', requests: 900, percentage: 2 }
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

const recentApiCalls = [
  { id: 1, endpoint: '/solve', method: 'POST', status: 200, time: '14:32:45', duration: '2.1s', ip: '192.168.1.1' },
  { id: 2, endpoint: '/status', method: 'GET', status: 200, time: '14:30:12', duration: '0.8s', ip: '192.168.1.2' },
  { id: 3, endpoint: '/solve', method: 'POST', status: 200, time: '14:28:55', duration: '2.5s', ip: '192.168.1.3' },
  { id: 4, endpoint: '/balance', method: 'GET', status: 200, time: '14:25:33', duration: '0.7s', ip: '192.168.1.4' },
  { id: 5, endpoint: '/solve', method: 'POST', status: 400, time: '14:22:18', duration: '1.9s', ip: '192.168.1.5' }
];

const ApiUsage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [expandedCall, setExpandedCall] = useState<number | null>(null);
  
  const toggleCallDetails = (id: number) => {
    setExpandedCall(expandedCall === id ? null : id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Uso da API</h1>
        
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
      
      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Total de Requisições</h2>
            <div className="p-2 rounded-full bg-blue-100">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          
          <div className="flex items-baseline">
            <p className="text-3xl font-semibold text-gray-900">45,872</p>
            <p className="ml-2 text-sm text-green-600">+12.5%</p>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Limite do plano: 100,000</span>
              <span className="text-gray-700 font-medium">45.9%</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45.9%' }}></div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Taxa de Sucesso</h2>
            <div className="p-2 rounded-full bg-green-100">
              <BarChart className="h-5 w-5 text-green-600" />
            </div>
          </div>
          
          <div className="flex items-baseline">
            <p className="text-3xl font-semibold text-gray-900">98.7%</p>
            <p className="ml-2 text-sm text-green-600">+0.5%</p>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Erros: 1.3%</span>
              <span className="text-gray-700 font-medium">597 requisições</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '98.7%' }}></div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Tempo de Resposta</h2>
            <div className="p-2 rounded-full bg-purple-100">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          
          <div className="flex items-baseline">
            <p className="text-3xl font-semibold text-gray-900">3.2s</p>
            <p className="ml-2 text-sm text-green-600">-0.3s</p>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Min: 0.8s</span>
              <span className="text-gray-700 font-medium">Max: 12.5s</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '70%' }}></div>
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
          <h2 className="text-lg font-medium text-gray-900 mb-4">Requisições Diárias</h2>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyUsageData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="requests" fill="#3B82F6" name="Requisições" />
                <Bar dataKey="errors" fill="#EF4444" name="Erros" />
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
          <h2 className="text-lg font-medium text-gray-900 mb-4">Tempo de Resposta (24h)</h2>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={responseTimeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#8B5CF6" fill="#C4B5FD" name="Tempo (s)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Endpoint Usage */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <h2 className="text-lg font-medium text-gray-900 mb-6">Uso por Endpoint</h2>
        
        <div className="space-y-4">
          {endpointUsageData.map((endpoint) => (
            <div key={endpoint.name}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <Code className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{endpoint.name}</span>
                </div>
                <span className="text-sm text-gray-500">{endpoint.requests.toLocaleString()} ({endpoint.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${endpoint.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Recent API Calls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Chamadas Recentes da API</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">Ver todas</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Endpoint
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
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
                  Detalhes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentApiCalls.map((call) => (
                <React.Fragment key={call.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {call.endpoint}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        call.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {call.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        call.status >= 200 && call.status < 300 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {call.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {call.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => toggleCallDetails(call.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {expandedCall === call.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedCall === call.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium">Detalhes da Requisição:</p>
                              <pre className="mt-2 bg-gray-100 p-3 rounded-md text-xs overflow-x-auto">
{`{
  "method": "${call.method}",
  "endpoint": "${call.endpoint}",
  "ip": "${call.ip}",
  "timestamp": "${call.time}",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer ***********"
  }
}`}
                              </pre>
                            </div>
                            <div>
                              <p className="font-medium">Resposta:</p>
                              <pre className="mt-2 bg-gray-100 p-3 rounded-md text-xs overflow-x-auto">
{`{
  "status": ${call.status},
  "duration": "${call.duration}",
  "data": {
    "success": ${call.status >= 200 && call.status < 300},
    "message": "${call.status >= 200 && call.status < 300 ? 'Operation completed successfully' : 'Error processing request'}"
  }
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
    </div>
  );
};

export default ApiUsage;