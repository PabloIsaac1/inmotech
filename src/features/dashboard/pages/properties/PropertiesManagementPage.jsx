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
  MdHome,
  MdLocationOn,
  MdAttachMoney,
  MdBed,
  MdBathtub,
  MdDirectionsCar,
  MdPhotoCamera,
  MdSave,
  MdCancel
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

const PropertyCard = ({ property, onEdit, onDelete, onView }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200"
  >
    <div className="relative h-48">
      <img
        src={property.image || "/api/placeholder/400/300"}
        alt={property.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          property.status === 'Venta' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {property.status}
        </span>
      </div>
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-slate-800">
          {property.type}
        </span>
      </div>
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-2">{property.title}</h3>
      <div className="flex items-center text-slate-600 mb-3">
        <MdLocationOn className="mr-1" size={16} />
        <span className="text-sm">{property.address}</span>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-blue-600">{property.price}</span>
        <span className="text-sm text-slate-500">{property.area} m²</span>
      </div>
      
      <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
        <div className="flex items-center">
          <MdBed className="mr-1" />
          <span>{property.bedrooms}</span>
        </div>
        <div className="flex items-center">
          <MdBathtub className="mr-1" />
          <span>{property.bathrooms}</span>
        </div>
        <div className="flex items-center">
          <MdDirectionsCar className="mr-1" />
          <span>{property.parking}</span>
        </div>
        <div className="text-center">
          <span className="font-medium">Estrato {property.stratum}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onView(property)}
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <MdVisibility size={16} />
          Ver
        </button>
        <button
          onClick={() => onEdit(property)}
          className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <MdEdit size={16} />
          Editar
        </button>
        <button
          onClick={() => onDelete(property)}
          className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <MdDelete size={16} />
          Eliminar
        </button>
      </div>
    </div>
  </motion.div>
);

const PropertyForm = ({ property, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    type: property?.type || 'Casa',
    price: property?.price || '',
    status: property?.status || 'Venta',
    bedrooms: property?.bedrooms || 1,
    bathrooms: property?.bathrooms || 1,
    parking: property?.parking || 0,
    stratum: property?.stratum || 1,
    area: property?.area || '',
    address: property?.address || '',
    image: property?.image || '',
    description: property?.description || ''
  });

  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const propertyTypes = ['Casa', 'Apartamento', 'Apartaestudio', 'Finca', 'Terreno', 'Local Comercial'];
  const statusOptions = ['Venta', 'Arriendo'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'El título es requerido';
    if (!formData.price.trim()) newErrors.price = 'El precio es requerido';
    if (!formData.area.trim()) newErrors.area = 'El área es requerida';
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      toast({
        title: property ? "Propiedad actualizada" : "Propiedad creada",
        description: property ? "La propiedad ha sido actualizada exitosamente." : "La nueva propiedad ha sido creada exitosamente.",
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Título de la propiedad *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-slate-300'
            }`}
            placeholder="Ej: Casa moderna en El Poblado"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tipo de propiedad
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Precio *
          </label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.price ? 'border-red-500' : 'border-slate-300'
            }`}
            placeholder="Ej: $850,000 o $2,500/mes"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
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

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Habitaciones
          </label>
          <input
            type="number"
            min="0"
            value={formData.bedrooms}
            onChange={(e) => handleChange('bedrooms', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Baños
          </label>
          <input
            type="number"
            min="0"
            value={formData.bathrooms}
            onChange={(e) => handleChange('bathrooms', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Parqueaderos
          </label>
          <input
            type="number"
            min="0"
            value={formData.parking}
            onChange={(e) => handleChange('parking', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Estrato
          </label>
          <select
            value={formData.stratum}
            onChange={(e) => handleChange('stratum', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6].map(stratum => (
              <option key={stratum} value={stratum}>Estrato {stratum}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Área (m²) *
          </label>
          <input
            type="number"
            value={formData.area}
            onChange={(e) => handleChange('area', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.area ? 'border-red-500' : 'border-slate-300'
            }`}
            placeholder="Ej: 280"
          />
          {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            URL de la imagen
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Dirección *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.address ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="Ej: Carrera 43A #5-15, El Poblado, Medellín"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe las características principales de la propiedad..."
        />
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-200">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <MdSave size={20} />
          {property ? 'Actualizar' : 'Crear'} Propiedad
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

const PropertyView = ({ property }) => (
  <div className="p-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <img
          src={property.image || "/api/placeholder/600/400"}
          alt={property.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">{property.title}</h3>
          <p className="text-slate-600 flex items-center mt-2">
            <MdLocationOn className="mr-1" />
            {property.address}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-slate-600">Precio</p>
            <p className="text-xl font-bold text-blue-600">{property.price}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-slate-600">Área</p>
            <p className="text-xl font-bold">{property.area} m²</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <MdBed size={24} className="mx-auto text-slate-600" />
            <p className="text-sm text-slate-600 mt-1">Habitaciones</p>
            <p className="font-bold">{property.bedrooms}</p>
          </div>
          <div className="text-center">
            <MdBathtub size={24} className="mx-auto text-slate-600" />
            <p className="text-sm text-slate-600 mt-1">Baños</p>
            <p className="font-bold">{property.bathrooms}</p>
          </div>
          <div className="text-center">
            <MdDirectionsCar size={24} className="mx-auto text-slate-600" />
            <p className="text-sm text-slate-600 mt-1">Parqueaderos</p>
            <p className="font-bold">{property.parking}</p>
          </div>
          <div className="text-center">
            <MdHome size={24} className="mx-auto text-slate-600" />
            <p className="text-sm text-slate-600 mt-1">Estrato</p>
            <p className="font-bold">{property.stratum}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            property.status === 'Venta' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {property.status}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800">
            {property.type}
          </span>
        </div>
      </div>
    </div>
    
    {property.description && (
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-2">Descripción</h4>
        <p className="text-slate-600 leading-relaxed">{property.description}</p>
      </div>
    )}
  </div>
);

const DeleteConfirmation = ({ property, onConfirm, onCancel }) => (
  <div className="p-6 text-center">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <MdDelete size={32} className="text-red-600" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">¿Eliminar propiedad?</h3>
    <p className="text-slate-600 mb-6">
      ¿Estás seguro de que deseas eliminar "{property.title}"? Esta acción no se puede deshacer.
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

const PropertiesManagementPage = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Casa Moderna en El Poblado",
      type: "Casa",
      price: "$850,000",
      status: "Venta",
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      stratum: 5,
      area: "280",
      address: "Carrera 43A #5-15, El Poblado, Medellín",
      image: "/api/placeholder/400/300",
      description: "Hermosa casa moderna con acabados de lujo y excelente ubicación."
    },
    {
      id: 2,
      title: "Apartamento de Lujo",
      type: "Apartamento",
      price: "$2,500/mes",
      status: "Arriendo",
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      stratum: 4,
      area: "150",
      address: "Calle 10 #43-25, Laureles, Medellín",
      image: "/api/placeholder/400/300",
      description: "Apartamento completamente amoblado en zona exclusiva."
    }
  ]);

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const { toast } = useToast();
  const itemsPerPage = 6;

  useEffect(() => {
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'Todos') {
      filtered = filtered.filter(property => property.type === filterType);
    }

    if (filterStatus !== 'Todos') {
      filtered = filtered.filter(property => property.status === filterStatus);
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterType, filterStatus, properties]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateProperty = (propertyData) => {
    const newProperty = {
      ...propertyData,
      id: Date.now()
    };
    setProperties(prev => [...prev, newProperty]);
    setShowCreateModal(false);
  };

  const handleEditProperty = (propertyData) => {
    setProperties(prev =>
      prev.map(p => p.id === selectedProperty.id ? { ...propertyData, id: selectedProperty.id } : p)
    );
    setShowEditModal(false);
    setSelectedProperty(null);
  };

  const handleDeleteProperty = () => {
    setProperties(prev => prev.filter(p => p.id !== selectedProperty.id));
    setShowDeleteModal(false);
    setSelectedProperty(null);
    toast({
      title: "Propiedad eliminada",
      description: "La propiedad ha sido eliminada exitosamente.",
    });
  };

  const propertyTypes = ['Todos', 'Casa', 'Apartamento', 'Apartaestudio', 'Finca', 'Terreno', 'Local Comercial'];
  const statusOptions = ['Todos', 'Venta', 'Arriendo'];

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
            <h1 className="text-3xl font-bold text-slate-800">Gestión de Inmuebles</h1>
            <p className="text-slate-600 mt-1">Administra tu portafolio de propiedades</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-medium"
          >
            <MdAdd size={20} />
            Nueva Propiedad
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
                placeholder="Buscar propiedades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            
            <div className="flex items-center text-slate-600">
              <MdFilterList className="mr-2" />
              <span>{filteredProperties.length} propiedades encontradas</span>
            </div>
          </div>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <PropertyCard
                property={property}
                onEdit={(prop) => {
                  setSelectedProperty(prop);
                  setShowEditModal(true);
                }}
                onDelete={(prop) => {
                  setSelectedProperty(prop);
                  setShowDeleteModal(true);
                }}
                onView={(prop) => {
                  setSelectedProperty(prop);
                  setShowViewModal(true);
                }}
              />
            </motion.div>
          ))}
        </div>

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
          title="Crear Nueva Propiedad"
          size="lg"
        >
          <PropertyForm
            onSave={handleCreateProperty}
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProperty(null);
          }}
          title="Editar Propiedad"
          size="lg"
        >
          {selectedProperty && (
            <PropertyForm
              property={selectedProperty}
              onSave={handleEditProperty}
              onCancel={() => {
                setShowEditModal(false);
                setSelectedProperty(null);
              }}
            />
          )}
        </Modal>

        <Modal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedProperty(null);
          }}
          title="Detalles de la Propiedad"
          size="lg"
        >
          {selectedProperty && <PropertyView property={selectedProperty} />}
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProperty(null);
          }}
          title="Confirmar Eliminación"
          size="sm"
        >
          {selectedProperty && (
            <DeleteConfirmation
              property={selectedProperty}
              onConfirm={handleDeleteProperty}
              onCancel={() => {
                setShowDeleteModal(false);
                setSelectedProperty(null);
              }}
            />
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default PropertiesManagementPage;