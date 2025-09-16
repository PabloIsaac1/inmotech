import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  Home,
  Calendar,
  DollarSign,
  Users,
  Eye,
  Clock,
  MapPin,
  Building2,
  UserCheck,
  Target,
  Award,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart
} from 'react-icons/md';
import { 
  Building, 
  CalendarDays, 
  Banknote, 
  UsersRound,
  Sparkles,
  Crown,
  Gem,
  Star
} from 'lucide-react';
import DashboardLayout from '../../shared/components/dashboard/Layout/DashboardLayout';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatCard = ({ title, value, icon: Icon, trend, color, subtitle }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden border border-white/20`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
    <div className="flex items-center justify-between relative z-10">
      <div>
        <p className="text-white/80 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-white to-white/90 bg-clip-text">{value}</p>
        {subtitle && <p className="text-white/70 text-xs mt-1">{subtitle}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp size={16} />
            <span className="text-sm ml-1 font-medium">+{trend}% este mes</span>
          </div>
        )}
      </div>
      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/30">
        <Icon size={32} />
      </div>
    </div>
  </motion.div>
);

const DashboardContent = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Propiedades Activas',
      value: '156',
      icon: Building,
      trend: '12',
      color: 'from-blue-500 via-blue-600 to-indigo-700',
      subtitle: '23 nuevas este mes'
    },
    {
      title: 'Citas Programadas',
      value: '24',
      icon: CalendarDays,
      trend: '8',
      color: 'from-emerald-500 via-teal-500 to-cyan-600',
      subtitle: '8 para hoy'
    },
    {
      title: 'Ventas del Mes',
      value: '8',
      icon: TrendingUp,
      trend: '25',
      color: 'from-purple-500 via-violet-500 to-purple-700',
      subtitle: '$2.4M generados'
    },
    {
      title: 'Clientes Activos',
      value: '342',
      icon: UsersRound,
      trend: '18',
      color: 'from-orange-400 via-amber-500 to-yellow-600',
      subtitle: '45 nuevos este mes'
    }
  ];

  // Datos para gráficos
  const lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ventas',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: 'Arriendos',
        data: [8, 12, 10, 15, 18, 20],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgb(34, 197, 94)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
      }
    ],
  };

  const barChartData = {
    labels: ['Casas', 'Apartamentos', 'Locales', 'Terrenos', 'Fincas'],
    datasets: [
      {
        label: 'Propiedades por Tipo',
        data: [45, 62, 23, 18, 8],
        backgroundColor: [
          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        ],
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  const doughnutData = {
    labels: ['Vendidas', 'En Venta', 'Arrendadas', 'Disponibles'],
    datasets: [
      {
        data: [30, 45, 25, 56],
        backgroundColor: [
          '#22c55e',
          '#3b82f6',
          '#f59e0b',
          '#ef4444',
        ],
        borderWidth: 3,
        borderColor: '#fff',
        hoverBorderWidth: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const recentActivities = [
    { 
      action: 'Nueva propiedad registrada', 
      time: 'Hace 2 horas', 
      type: 'success',
      details: 'Casa en El Poblado - $850,000',
      icon: Building
    },
    { 
      action: 'Cita programada', 
      time: 'Hace 4 horas', 
      type: 'info',
      details: 'Juan Pérez - Apartamento Laureles',
      icon: CalendarDays
    },
    { 
      action: 'Venta completada', 
      time: 'Hace 6 horas', 
      type: 'success',
      details: 'Penthouse Envigado - $1,200,000',
      icon: TrendingUp
    },
    { 
      action: 'Cliente registrado', 
      time: 'Hace 8 horas', 
      type: 'info',
      details: 'María González - Interesada en casas',
      icon: UsersRound
    },
    { 
      action: 'Cita cancelada', 
      time: 'Hace 1 día', 
      type: 'warning',
      details: 'Carlos Rodríguez - Reagendada',
      icon: Clock
    }
  ];

  const upcomingAppointments = [
    {
      client: 'Ana Martínez',
      property: 'Casa Moderna El Poblado',
      time: '10:00 AM',
      date: 'Hoy',
      status: 'confirmada'
    },
    {
      client: 'Luis García',
      property: 'Apartamento Laureles',
      time: '2:30 PM',
      date: 'Hoy',
      status: 'pendiente'
    },
    {
      client: 'Carmen López',
      property: 'Penthouse Envigado',
      time: '9:00 AM',
      date: 'Mañana',
      status: 'confirmada'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Dashboard Inmobiliario
          </h1>
          <p className="text-slate-600 text-lg">
            Gestiona tu negocio inmobiliario de manera eficiente y profesional.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
          </select>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
              <LineChart className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">
              Tendencia de Ventas y Arriendos
            </h3>
          </div>
          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">
              Propiedades por Tipo
            </h3>
          </div>
          <div className="h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-2 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">
              Actividad Reciente
            </h3>
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="flex items-start justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/30 transition-all duration-300 border border-slate-100 group"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg mt-0.5 ${
                    activity.type === 'success' ? 'bg-emerald-500' :
                    activity.type === 'info' ? 'bg-blue-500' :
                    activity.type === 'warning' ? 'bg-amber-500' : 'bg-slate-400'
                  }`}>
                    <activity.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{activity.action}</p>
                    <p className="text-sm text-slate-500">{activity.details}</p>
                  </div>
                </div>
                <span className="text-slate-500 text-sm whitespace-nowrap">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Status Overview & Upcoming Appointments */}
        <div className="space-y-6">
          {/* Doughnut Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <PieChart className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Estado de Propiedades
              </h3>
            </div>
            <div className="h-48">
              <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </motion.div>

          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <CalendarDays className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Próximas Citas
              </h3>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-slate-50/50 to-blue-50/30 border border-slate-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-sm"></div>
                    <div>
                      <p className="font-medium text-sm text-slate-700">{appointment.client}</p>
                      <p className="text-xs text-slate-500">{appointment.property}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700">{appointment.time}</p>
                    <p className="text-xs text-slate-500">{appointment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default DashboardPage;