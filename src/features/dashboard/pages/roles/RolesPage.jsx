import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  X,
  Save,
  XCircle,
  Shield,
  Check,
  User,
  Crown,
  Settings,
  Lock,
  Key,
  Users,
  FileText,
  Calendar,
  Home,
  Sparkles,
  Star
} from 'lucide-react';
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
                className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-200" />
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

const PermissionCheckbox = ({ permission, isChecked, onChange, disabled = false }) => (
  <motion.div
    whileHover={!disabled ? { scale: 1.02 } : {}}
    className={`border-2 rounded-xl p-4 transition-all duration-300 cursor-pointer ${
      isChecked 
        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg' 
        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={() => !disabled && onChange(!isChecked)}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 shadow-sm ${
          isChecked 
            ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-600' 
            : 'border-slate-300 bg-white'
        }`}>
          {isChecked && <Check className="text-white" size={16} />}
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">{permission.name}</h4>
          <p className="text-sm text-slate-600">{permission.description}</p>
        </div>
      </div>
      <div className={`p-2 rounded-lg ${isChecked ? 'bg-blue-100' : 'bg-slate-100'}`}>
        <permission.icon className={`${isChecked ? 'text-blue-600' : 'text-slate-400'}`} size={20} />
      </div>
    </div>
  </motion.div>
);

const ModulePermissions = ({ module, permissions, onChange, disabled = false }) => {
  const modulePermissions = permissions[module.key] || {};
  
  const handlePermissionChange = (permissionKey, value) => {
    onChange(module.key, permissionKey, value);
  };

  return (
    <div className="border border-slate-200 rounded-xl p-6 bg-gradient-to-br from-slate-50/50 to-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
          <module.icon className="text-blue-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">{module.name}</h3>
          <p className="text-sm text-slate-600">{module.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {module.permissions.map(permission => (
          <PermissionCheckbox
            key={permission.key}
            permission={permission}
            isChecked={modulePermissions[permission.key] || false}
            onChange={(value) => handlePermissionChange(permission.key, value)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

const RoleForm = ({ role, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || {}
  });

  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const modules = [
    {
      key: 'properties',
      name: 'Gestión de Inmuebles',
      description: 'Administrar propiedades del sistema',
      icon: Home,
      permissions: [
        {
          key: 'create',
          name: 'Crear',
          description: 'Crear nuevas propiedades',
          icon: Plus
        },
        {
          key: 'edit',
          name: 'Editar',
          description: 'Modificar propiedades existentes',
          icon: Edit3
        },
        {
          key: 'delete',
          name: 'Eliminar',
          description: 'Eliminar propiedades',
          icon: Trash2
        }
      ]
    },
    {
      key: 'appointments',
      name: 'Gestión de Citas',
      description: 'Administrar citas con clientes',
      icon: Calendar,
      permissions: [
        {
          key: 'create',
          name: 'Crear',
          description: 'Programar nuevas citas',
          icon: Plus
        },
        {
          key: 'edit',
          name: 'Editar',
          description: 'Modificar citas existentes',
          icon: Edit3
        },
        {
          key: 'delete',
          name: 'Eliminar',
          description: 'Cancelar/eliminar citas',
          icon: Trash2
        }
      ]
    },
    {
      key: 'users',
      name: 'Gestión de Usuarios',
      description: 'Administrar usuarios del sistema',
      icon: Users,
      permissions: [
        {
          key: 'create',
          name: 'Crear',
          description: 'Crear nuevos usuarios',
          icon: Plus
        },
        {
          key: 'edit',
          name: 'Editar',
          description: 'Modificar usuarios existentes',
          icon: Edit3
        },
        {
          key: 'delete',
          name: 'Eliminar',
          description: 'Eliminar usuarios',
          icon: Trash2
        }
      ]
    },
    {
      key: 'reports',
      name: 'Reportes',
      description: 'Generar y visualizar reportes',
      icon: FileText,
      permissions: [
        {
          key: 'create',
          name: 'Crear',
          description: 'Generar nuevos reportes',
          icon: Plus
        },
        {
          key: 'edit',
          name: 'Editar',
          description: 'Modificar reportes existentes',
          icon: Edit3
        },
        {
          key: 'delete',
          name: 'Eliminar',
          description: 'Eliminar reportes',
          icon: Trash2
        }
      ]
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del rol es requerido';
    }
    
    // Verificar que al menos un permiso esté seleccionado
    const hasPermissions = Object.values(formData.permissions).some(modulePerms => 
      Object.values(modulePerms).some(perm => perm === true)
    );
    
    if (!hasPermissions) {
      newErrors.permissions = 'Debe seleccionar al menos un permiso';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      toast({
        title: role ? "Rol actualizado" : "Rol creado",
        description: role ? "El rol ha sido actualizado exitosamente." : "El nuevo rol ha sido creado exitosamente.",
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePermissionChange = (moduleKey, permissionKey, value) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [moduleKey]: {
          ...prev.permissions[moduleKey],
          [permissionKey]: value
        }
      }
    }));
    
    if (errors.permissions) {
      setErrors(prev => ({ ...prev, permissions: '' }));
    }
  };

  const isAdminRole = role?.name === 'Administrador';

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nombre del rol *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={isAdminRole}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-slate-300'
            } ${isAdminRole ? 'bg-slate-100 cursor-not-allowed' : ''}`}
            placeholder="Ej: Editor, Vendedor, Supervisor"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          {isAdminRole && (
            <p className="text-amber-600 text-sm mt-1">
              El rol de Administrador no puede ser modificado
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Descripción
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            disabled={isAdminRole}
            className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isAdminRole ? 'bg-slate-100 cursor-not-allowed' : ''
            }`}
            placeholder="Descripción del rol"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Permisos del Rol</h3>
          {errors.permissions && (
            <p className="text-red-500 text-sm">{errors.permissions}</p>
          )}
        </div>
        
        <div className="space-y-6">
          {modules.map(module => (
            <ModulePermissions
              key={module.key}
              module={module}
              permissions={formData.permissions}
              onChange={handlePermissionChange}
              disabled={isAdminRole}
            />
          ))}
        </div>
        
        {isAdminRole && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm">
              <Crown className="inline mr-2" />
              El rol de Administrador tiene todos los permisos habilitados por defecto y no pueden ser modificados.
            </p>
          </div>
        )}
      </div>

      {!isAdminRole && (
        <div className="flex gap-4 pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
          >
            <Save size={20} />
            {role ? 'Actualizar' : 'Crear'} Rol
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 text-slate-700 py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
          >
            <XCircle size={20} />
            Cancelar
          </button>
        </div>
      )}
    </form>
  );
};

const RoleView = ({ role }) => {
  const modules = [
    { key: 'properties', name: 'Gestión de Inmuebles', icon: Home },
    { key: 'appointments', name: 'Gestión de Citas', icon: Calendar },
    { key: 'users', name: 'Gestión de Usuarios', icon: Users },
    { key: 'reports', name: 'Reportes', icon: FileText }
  ];

  const permissions = [
    { key: 'create', name: 'Crear', icon: Plus },
    { key: 'edit', name: 'Editar', icon: Edit3 },
    { key: 'delete', name: 'Eliminar', icon: Trash2 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Información del Rol</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-slate-600">Nombre</p>
              <p className="font-medium text-slate-800">{role.name}</p>
            </div>
            {role.description && (
              <div>
                <p className="text-sm text-slate-600">Descripción</p>
                <p className="font-medium text-slate-800">{role.description}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-slate-600">Usuarios asignados</p>
              <p className="font-medium text-slate-800">{role.userCount || 0} usuarios</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Resumen de Permisos</h3>
          <div className="space-y-2">
            {modules.map(module => {
              const modulePerms = role.permissions?.[module.key] || {};
              const activePerms = Object.entries(modulePerms).filter(([_, value]) => value).length;
              return (
                <div key={module.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-slate-100 rounded">
                      <module.icon size={14} className="text-slate-600" />
                    </div>
                    <span className="text-sm text-slate-700">{module.name}</span>
                  </div>
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {activePerms}/3 permisos
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Permisos Detallados</h3>
        <div className="space-y-4">
          {modules.map(module => {
            const modulePerms = role.permissions?.[module.key] || {};
            return (
              <div key={module.key} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                    <module.icon className="text-blue-600" size={16} />
                  </div>
                  <h4 className="font-semibold text-slate-800">{module.name}</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {permissions.map(permission => {
                    const hasPermission = modulePerms[permission.key] || false;
                    return (
                      <div
                        key={permission.key}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          hasPermission ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200' : 'bg-slate-50 text-slate-500 border border-slate-200'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shadow-sm ${
                          hasPermission ? 'border-green-500 bg-gradient-to-r from-green-500 to-emerald-600' : 'border-slate-300'
                        }`}>
                          {hasPermission && <Check className="text-white" size={10} />}
                        </div>
                        <span className="text-sm font-medium">{permission.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmation = ({ role, onConfirm, onCancel }) => (
  <div className="p-6 text-center">
    <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
      <Trash2 size={32} className="text-red-600" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">¿Eliminar rol?</h3>
    <p className="text-slate-600 mb-6">
      ¿Estás seguro de que deseas eliminar el rol "{role.name}"? Esta acción no se puede deshacer.
    </p>
    <div className="flex gap-4">
      <button
        onClick={onCancel}
        className="flex-1 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 text-slate-700 py-3 px-6 rounded-lg transition-all duration-200 font-medium shadow-lg"
      >
        Cancelar
      </button>
      <button
        onClick={onConfirm}
        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium shadow-lg"
      >
        Eliminar
      </button>
    </div>
  </div>
);

const RolesPage = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Administrador',
      description: 'Acceso completo al sistema',
      userCount: 2,
      permissions: {
        properties: { create: true, edit: true, delete: true },
        appointments: { create: true, edit: true, delete: true },
        users: { create: true, edit: true, delete: true },
        reports: { create: true, edit: true, delete: true }
      },
      isSystem: true
    },
    {
      id: 2,
      name: 'Vendedor',
      description: 'Gestión de propiedades y citas',
      userCount: 5,
      permissions: {
        properties: { create: true, edit: true, delete: false },
        appointments: { create: true, edit: true, delete: true },
        users: { create: false, edit: false, delete: false },
        reports: { create: true, edit: false, delete: false }
      },
      isSystem: false
    }
  ]);

  const [filteredRoles, setFilteredRoles] = useState(roles);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const { toast } = useToast();

  useEffect(() => {
    let filtered = roles;

    if (searchTerm) {
      filtered = filtered.filter(role =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (role.description && role.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredRoles(filtered);
  }, [searchTerm, roles]);

  const handleCreateRole = (roleData) => {
    const newRole = {
      ...roleData,
      id: Date.now(),
      userCount: 0,
      isSystem: false
    };
    setRoles(prev => [...prev, newRole]);
    setShowCreateModal(false);
  };

  const handleEditRole = (roleData) => {
    setRoles(prev =>
      prev.map(r => r.id === selectedRole.id ? { ...roleData, id: selectedRole.id, userCount: selectedRole.userCount, isSystem: selectedRole.isSystem } : r)
    );
    setShowEditModal(false);
    setSelectedRole(null);
  };

  const handleDeleteRole = () => {
    setRoles(prev => prev.filter(r => r.id !== selectedRole.id));
    setShowDeleteModal(false);
    setSelectedRole(null);
    toast({
      title: "Rol eliminado",
      description: "El rol ha sido eliminado exitosamente.",
    });
  };

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
            <h1 className="text-3xl font-bold text-slate-800">Gestión de Roles</h1>
            <p className="text-slate-600 mt-1">Administra los roles y permisos del sistema</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            Nuevo Rol
          </button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
            />
          </div>
        </motion.div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    role.isSystem ? 'bg-gradient-to-r from-amber-100 to-orange-100' : 'bg-gradient-to-r from-blue-100 to-indigo-100'
                  }`}>
                    {role.isSystem ? (
                      <Crown className="text-amber-600" size={24} />
                    ) : (
                      <Shield className="text-blue-600" size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{role.name}</h3>
                    {role.description && (
                      <p className="text-sm text-slate-600">{role.description}</p>
                    )}
                  </div>
                </div>
                {role.isSystem && (
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-xs font-medium rounded-full border border-amber-200 shadow-sm">
                    Sistema
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                  <span>Usuarios asignados</span>
                  <span className="font-medium">{role.userCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Módulos con permisos</span>
                  <span className="font-medium">
                    {Object.keys(role.permissions || {}).length}/4
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedRole(role);
                    setShowViewModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md"
                >
                  <Eye size={16} />
                  Ver
                </button>
                <button
                  onClick={() => {
                    setSelectedRole(role);
                    setShowEditModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-700 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md"
                >
                  <Edit3 size={16} />
                  Editar
                </button>
                {!role.isSystem && (
                  <button
                    onClick={() => {
                      setSelectedRole(role);
                      setShowDeleteModal(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md"
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modals */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Crear Nuevo Rol"
          size="xl"
        >
          <RoleForm
            onSave={handleCreateRole}
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedRole(null);
          }}
          title="Editar Rol"
          size="xl"
        >
          {selectedRole && (
            <RoleForm
              role={selectedRole}
              onSave={handleEditRole}
              onCancel={() => {
                setShowEditModal(false);
                setSelectedRole(null);
              }}
            />
          )}
        </Modal>

        <Modal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedRole(null);
          }}
          title="Detalles del Rol"
          size="lg"
        >
          {selectedRole && <RoleView role={selectedRole} />}
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedRole(null);
          }}
          title="Confirmar Eliminación"
          size="sm"
        >
          {selectedRole && (
            <DeleteConfirmation
              role={selectedRole}
              onConfirm={handleDeleteRole}
              onCancel={() => {
                setShowDeleteModal(false);
                setSelectedRole(null);
              }}
            />
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default RolesPage;