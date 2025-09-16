import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdAdd, 
  MdSearch, 
  MdFilterList, 
  MdEdit, 
  MdDelete, 
  MdVisibility,
  MdClose,
  MdCalendarToday,
  MdAccessTime,
  MdPerson,
  MdHome,
  MdPhone,
  MdEmail,
  MdSave,
  MdCancel,
  MdEvent,
  MdLocationOn
} from 'react-icons/md';
import DashboardLayout from '../../../../shared/components/dashboard/Layout/DashboardLayout';
import { useToast } from '../../../../shared/hooks/use-toast';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Calendar = ({ selectedDate, onDateSelect, appointments = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };
  
  const isToday = (day) => {
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
  };
  
  const isSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === month && 
           selectedDate.getFullYear() === year;
  };
  
  const hasAppointments = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.some(apt => apt.date === dateStr);
  };
  
  const handleDateClick = (day) => {
    const newDate = new Date(year, month, day);
    onDateSelect(newDate);
  };
  
  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateClick(day)}
          disabled={isPast}
          className={`
            h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 relative
            ${isPast 
              ? 'text-slate-300 cursor-not-allowed' 
              : 'hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
            }
            ${isToday(day) ? 'bg-blue-100 text-blue-600 font-bold' : ''}
            ${isSelected(day) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
            ${hasAppointments(day) && !isSelected(day) ? 'bg-green-100 text-green-700' : ''}
          `}
        >
          {day}
          {hasAppointments(day) && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
          )}
        </button>
      );
    }
    
    return days;
  };
  
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold text-slate-800">
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          →
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-slate-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
      
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-100 rounded"></div>
          <span>Hoy</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-100 rounded"></div>
          <span>Con citas</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span>Seleccionado</span>
        </div>
      </div>
    </div>
  );
};

const AppointmentForm = ({ appointment, onSave, onCancel, properties = [] }) => {
  const [formData, setFormData] = useState({
    clientName: appointment?.clientName || '',
    clientPhone: appointment?.clientPhone || '',
    clientEmail: appointment?.clientEmail || '',
    propertyId: appointment?.propertyId || '',
    date: appointment?.date || '',
    time: appointment?.time || '',
    status: appointment?.status || 'Pendiente',
    notes: appointment?.notes || ''
  });

  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    appointment?.date ? new Date(appointment.date) : new Date()
  );
  const { toast } = useToast();

  const statusOptions = ['Pendiente', 'Confirmada', 'Completada', 'Cancelada'];
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName.trim()) newErrors.clientName = 'El nombre del cliente es requerido';
    if (!formData.clientPhone.trim()) newErrors.clientPhone = 'El teléfono es requerido';
    if (!formData.clientEmail.trim()) newErrors.clientEmail = 'El email es requerido';
    if (!formData.propertyId) newErrors.propertyId = 'Debe seleccionar una propiedad';
    if (!formData.date) newErrors.date = 'La fecha es requerida';
    if (!formData.time) newErrors.time = 'La hora es requerida';
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.clientEmail && !emailRegex.test(formData.clientEmail)) {
      newErrors.clientEmail = 'El email no es válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      toast({
        title: appointment ? "Cita actualizada" : "Cita creada",
        description: appointment ? "La cita ha sido actualizada exitosamente." : "La nueva cita ha sido creada exitosamente.",
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dateStr = date.toISOString().split('T')[0];
    handleChange('date', dateStr);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nombre del cliente *
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => handleChange('clientName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.clientName ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Nombre completo"
              />
              {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => handleChange('clientPhone', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.clientPhone ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="+57 300 123 4567"
              />
              {errors.clientPhone && <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.clientEmail}
              onChange={(e) => handleChange('clientEmail', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.clientEmail ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="cliente@email.com"
            />
            {errors.clientEmail && <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Propiedad *
            </label>
            <select
              value={formData.propertyId}
              onChange={(e) => handleChange('propertyId', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.propertyId ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Seleccionar propiedad</option>
              {properties.map(property => (
                <option key={property.id} value={property.id}>
                  {property.title} - {property.address}
                </option>
              ))}
            </select>
            {errors.propertyId && <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Hora *
              </label>
              <select
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.time ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                <option value="">Seleccionar hora</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notas adicionales
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Información adicional sobre la cita..."
            />
          </div>
        </div>

        {/* Calendario */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fecha de la cita *
          </label>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
          {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date}</p>}
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-200">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <MdSave size={20} />
          {appointment ? 'Actualizar' : 'Crear'} Cita
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <MdCancel size={20} />
          Cancelar
        </button>
      </div>
    </form>
  );
};

const AppointmentView = ({ appointment, properties = [] }) => {
  const property = properties.find(p => p.id === parseInt(appointment.propertyId));
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmada': return 'bg-green-100 text-green-800';
      case 'Completada': return 'bg-blue-100 text-blue-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Información del Cliente</h3>
            <div className="bg-slate-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <MdPerson className="text-slate-600" size={20} />
                <div>
                  <p className="font-medium">{appointment.clientName}</p>
                  <p className="text-sm text-slate-600">Cliente</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="text-slate-600" size={20} />
                <div>
                  <p className="font-medium">{appointment.clientPhone}</p>
                  <p className="text-sm text-slate-600">Teléfono</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MdEmail className="text-slate-600" size={20} />
                <div>
                  <p className="font-medium">{appointment.clientEmail}</p>
                  <p className="text-sm text-slate-600">Email</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Detalles de la Cita</h3>
            <div className="bg-slate-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <MdCalendarToday className="text-slate-600" size={20} />
                <div>
                  <p className="font-medium">{new Date(appointment.date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                  <p className="text-sm text-slate-600">Fecha</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MdAccessTime className="text-slate-600" size={20} />
                <div>
                  <p className="font-medium">{appointment.time}</p>
                  <p className="text-sm text-slate-600">Hora</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MdEvent className="text-slate-600" size={20} />
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                  <p className="text-sm text-slate-600 mt-1">Estado</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Propiedad</h3>
          {property ? (
            <div className="bg-slate-50 p-4 rounded-lg">
              <img
                src={property.image || "/api/placeholder/400/200"}
                alt={property.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h4 className="font-bold text-lg">{property.title}</h4>
              <div className="flex items-center text-slate-600 mt-1 mb-2">
                <MdLocationOn size={16} className="mr-1" />
                <span className="text-sm">{property.address}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">{property.price}</span>
                <span className="text-sm text-slate-500">{property.area} m²</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-4 rounded-lg text-center text-slate-500">
              Propiedad no encontrada
            </div>
          )}
        </div>
      </div>

      {appointment.notes && (
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Notas</h3>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-slate-700">{appointment.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const DeleteConfirmation = ({ appointment, onConfirm, onCancel }) => (
  <div className="p-6 text-center">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <MdDelete size={32} className="text-red-600" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">¿Eliminar cita?</h3>
    <p className="text-slate-600 mb-6">
      ¿Estás seguro de que deseas eliminar la cita con {appointment.clientName}? Esta acción no se puede deshacer.
    </p>
    <div className="flex gap-4">
      <button
        onClick={onCancel}
        className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 px-6 rounded-lg transition-colors font-medium"
      >
        Cancelar
      </button>
      <button
        onClick={onConfirm}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors font-medium"
      >
        Eliminar
      </button>
    </div>
  </div>
);

const AppointmentsManagementPage = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: "Ana Martínez",
      clientPhone: "+57 300 123 4567",
      clientEmail: "ana.martinez@email.com",
      propertyId: "1",
      date: "2024-01-15",
      time: "10:00",
      status: "Confirmada",
      notes: "Cliente interesada en compra inmediata"
    },
    {
      id: 2,
      clientName: "Luis García",
      clientPhone: "+57 301 234 5678",
      clientEmail: "luis.garcia@email.com",
      propertyId: "2",
      date: "2024-01-16",
      time: "14:30",
      status: "Pendiente",
      notes: "Primera visita, requiere información de financiación"
    }
  ]);

  const [properties] = useState([
    {
      id: 1,
      title: "Casa Moderna en El Poblado",
      address: "Carrera 43A #5-15, El Poblado, Medellín",
      price: "$850,000",
      area: "280",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Apartamento de Lujo",
      address: "Calle 10 #43-25, Laureles, Medellín",
      price: "$2,500/mes",
      area: "150",
      image: "/api/placeholder/400/300"
    }
  ]);

  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const { toast } = useToast();
  const itemsPerPage = 10;

  useEffect(() => {
    let filtered = appointments;

    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.clientPhone.includes(searchTerm)
      );
    }

    if (filterStatus !== 'Todos') {
      filtered = filtered.filter(appointment => appointment.status === filterStatus);
    }

    if (filterDate) {
      filtered = filtered.filter(appointment => appointment.date === filterDate);
    }

    setFilteredAppointments(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterDate, appointments]);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateAppointment = (appointmentData) => {
    const newAppointment = {
      ...appointmentData,
      id: Date.now()
    };
    setAppointments(prev => [...prev, newAppointment]);
    setShowCreateModal(false);
  };

  const handleEditAppointment = (appointmentData) => {
    setAppointments(prev =>
      prev.map(a => a.id === selectedAppointment.id ? { ...appointmentData, id: selectedAppointment.id } : a)
    );
    setShowEditModal(false);
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = () => {
    setAppointments(prev => prev.filter(a => a.id !== selectedAppointment.id));
    setShowDeleteModal(false);
    setSelectedAppointment(null);
    toast({
      title: "Cita eliminada",
      description: "La cita ha sido eliminada exitosamente.",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmada': return 'bg-green-100 text-green-800';
      case 'Completada': return 'bg-blue-100 text-blue-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const statusOptions = ['Todos', 'Pendiente', 'Confirmada', 'Completada', 'Cancelada'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Gestión de Citas</h1>
            <p className="text-slate-600 mt-1">Administra las citas con tus clientes</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-medium"
          >
            <MdAdd size={20} />
            Nueva Cita
          </button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Buscar citas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="flex items-center text-slate-600">
              <MdFilterList className="mr-2" />
              <span>{filteredAppointments.length} citas encontradas</span>
            </div>
          </div>
        </motion.div>

        {/* Appointments Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Cliente</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Contacto</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Propiedad</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Fecha y Hora</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Estado</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map((appointment, index) => {
                  const property = properties.find(p => p.id === parseInt(appointment.propertyId));
                  return (
                    <motion.tr
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-slate-800">{appointment.clientName}</p>
                          <p className="text-sm text-slate-500">{appointment.clientEmail}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-slate-700">{appointment.clientPhone}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-slate-800">{property?.title || 'N/A'}</p>
                          <p className="text-sm text-slate-500">{property?.address || 'N/A'}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-slate-800">
                            {new Date(appointment.date).toLocaleDateString('es-ES')}
                          </p>
                          <p className="text-sm text-slate-500">{appointment.time}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowViewModal(true);
                            }}
                            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <MdVisibility size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowEditModal(true);
                            }}
                            className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <MdEdit size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <MdDelete size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center items-center gap-2"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Anterior
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Siguiente
            </button>
          </motion.div>
        )}

        {/* Modals */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Crear Nueva Cita"
          size="xl"
        >
          <AppointmentForm
            properties={properties}
            onSave={handleCreateAppointment}
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAppointment(null);
          }}
          title="Editar Cita"
          size="xl"
        >
          {selectedAppointment && (
            <AppointmentForm
              appointment={selectedAppointment}
              properties={properties}
              onSave={handleEditAppointment}
              onCancel={() => {
                setShowEditModal(false);
                setSelectedAppointment(null);
              }}
            />
          )}
        </Modal>

        <Modal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedAppointment(null);
          }}
          title="Detalles de la Cita"
          size="lg"
        >
          {selectedAppointment && (
            <AppointmentView 
              appointment={selectedAppointment} 
              properties={properties}
            />
          )}
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedAppointment(null);
          }}
          title="Confirmar Eliminación"
          size="sm"
        >
          {selectedAppointment && (
            <DeleteConfirmation
              appointment={selectedAppointment}
              onConfirm={handleDeleteAppointment}
              onCancel={() => {
                setShowDeleteModal(false);
                setSelectedAppointment(null);
              }}
            />
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentsManagementPage;