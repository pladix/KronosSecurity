import React, { useState } from 'react';
import { 
  BarChart, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  Shield,
  Eye,
  RefreshCw,
  Calendar,
  ChevronRight,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for charts
const captchaStats = {
  total: 45872,
  solved: 45231,
  failed: 641,
  successRate: 98.6,
  trend: 'up',
  trendValue: 2.4
};

const responseTimeStats = {
  average: 3.2,
  min: 0.8,
  max: 12.5,
  trend: 'down',
  trendValue: 0.5
};

const usageStats = {
  current: 45872,
  limit: 100000,
  percentage: 45.9,
  daysLeft: 12
};

const recentActivity = [
  { id: 1, type: 'reCAPTCHA v2', status: 'success', time: '2 minutos atrás', duration: '2.1s' },
  { id: 2, type: 'hCaptcha', status: 'success', time: '5 minutos atrás', duration: '3.5s' },
  { id: 3, type: 'reCAPTCHA v3', status: 'success', time: '8 minutos atrás', duration: '1.2s' },
  { id: 4, type: 'FunCaptcha', status: 'failed', time: '15 minutos atrás', duration: '12.0s' },
  { id: 5, type: 'Text Captcha', status: 'success', time: '22 minutos atrás', duration: '0.9s' }
];

const captchaTypeDistribution = [
  { type: 'reCAPTCHA v2', count: 22546, percentage: 49.2 },
  { type: 'reCAPTCHA v3', count: 12453, percentage: 27.1 },
  { type: 'hCaptcha', count: 6234, percentage: 13.6 },
  { type: 'FunCaptcha', count: 2987, percentage: 6.5 },
  { type: 'Outros', count: 1652, percentage: 3.6 }
];

const DashboardHome: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        
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
            <div className={`p-3 rounded-full ${captchaStats.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {captchaStats.trend === 'up' ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${captchaStats.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {captchaStats.trendValue}% em relação ao período anterior
            </span>
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
              <p className="text-sm font-medium text-gray-500">Tempo Médio de Resposta</p>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-gray-900">{responseTimeStats.average}s</p>
                <p className="ml-2 text-sm text-gray-500">min: {responseTimeStats.min}s / max: {responseTimeStats.max}s</p>
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
          <div className="mt-4 flex items-center">
            {responseTimeStats.trend === 'down' ? (
              <ArrowDown className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowUp className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${responseTimeStats.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
              {responseTimeStats.trendValue}s mais rápido que o período anterior
            </span>
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
              <p className="text-sm font-medium text-gray-500">Uso do Plano</p>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-gray-900">{usageStats.current.toLocaleString()}</p>
                <p className="ml-2 text-sm text-gray-500">de {usageStats.limit.toLocaleString()}</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${usageStats.percentage > 80 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                      style={{ width: `${usageStats.percentage}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">{usageStats.percentage}%</span>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <BarChart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm font-medium text-gray-600">
              {usageStats.daysLeft} dias restantes no ciclo de faturamento
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Captcha Type Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Distribuição por Tipo de Captcha</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              Ver detalhes <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {captchaTypeDistribution.map((item) => (
              <div key={item.type}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.type}</span>
                  <span className="text-sm text-gray-500">{item.count.toLocaleString()} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Atividade Recente</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              Ver tudo <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${activity.status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {activity.status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      activity.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.status === 'success' ? 'Resolvido' : 'Falha'}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{activity.time}</span>
                    <span className="text-xs text-gray-500 ml-2">{activity.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <h2 className="text-lg font-medium text-gray-900 mb-6">Ações Rápidas</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="p-3 bg-blue-100 rounded-full mb-3">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Ver Relatórios</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="p-3 bg-green-100 rounded-full mb-3">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Gerar Nova API Key</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="p-3 bg-purple-100 rounded-full mb-3">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Testar Integração</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <div className="p-3 bg-yellow-100 rounded-full mb-3">
              <RefreshCw className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Atualizar Plano</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;