import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MdTrendingUp, 
  MdHome, 
  MdCalendarToday, 
  MdAttachMoney,
  MdPeople,
  MdVisibility,
  MdSchedule,
  MdLocationOn
} from 'react-icons/md';
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
    className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
    <div className="flex items-center justify-between relative z-10">
      <div>
        <p className="text-white/80 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        {subtitle && <p className="text-white/70 text-xs mt-1">{subtitle}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <MdTrendingUp size={16} />
            <span className="text-sm ml-1">+{trend}% este mes</span>
          </div>
        )}
      </div>
      <div className="bg-white/20 p-3 rounded-xl">
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
      icon: MdHome,
      trend: '12',
      color: 'from-blue-600 to-blue-700',
      subtitle: '23 nuevas este mes'
    },
    {
      title: 'Citas Programadas',
      value: '24',
      icon: MdCalendarToday,
      trend: '8',
      color: 'from-emerald-500 to-emerald-600',
      subtitle: '8 para hoy'
    },
    {
      title: 'Ventas del Mes',
      value: '8',
      icon: MdTrendingUp,
      trend: '25',
      color: 'from-purple-500 to-purple-600',
      subtitle: '$2.4M generados'
    },
    {
      title: 'Clientes Activos',
      value: '342',
      icon: MdPeople,
      trend: '18',
      color: 'from-amber-500 to-amber-600',
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
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Arriendos',
        data: [8, 12, 10, 15, 18, 20],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
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
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ['Vendidas', 'En Venta', 'Arrendadas', 'Disponibles'],
    datasets: [
      {
        data: [30, 45, 25, 56],
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#F59E0B',
          '#EF4444',
        ],
        borderWidth: 0,
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
      details: 'Casa en El Poblado - $850,000'
    },
    { 
      action: 'Cita programada', 
      time: 'Hace 4 horas', 
      type: 'info',
      details: 'Juan Pérez - Apartamento Laureles'
    },
    { 
      action: 'Venta completada', 
      time: 'Hace 6 horas', 
      type: 'success',
      details: 'Penthouse Envigado - $1,200,000'
    },
    { 
      action: 'Cliente registrado', 
      time: 'Hace 8 horas', 
      type: 'info',
      details: 'María González - Interesada en casas'
    },
    { 
      action: 'Cita cancelada', 
      time: 'Hace 1 día', 
      type: 'warning',
      details: 'Carlos Rodríguez - Reagendada'
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
          className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Tendencia de Ventas y Arriendos
          </h3>
          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Propiedades por Tipo
          </h3>
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
          className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Actividad Reciente
          </h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="flex items-start justify-between p-4 rounded-xl hover:bg-slate-50/80 transition-all duration-300 border border-slate-100"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-emerald-500' :
                    activity.type === 'info' ? 'bg-blue-500' :
                    activity.type === 'warning' ? 'bg-amber-500' : 'bg-slate-400'
                  }`} />
                  <div>
                    <p className="font-medium text-slate-700">{activity.action}</p>
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
            className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Estado de Propiedades
            </h3>
            <div className="h-48">
              <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </motion.div>

          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Próximas Citas
            </h3>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
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