import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Users, Plane, MapPin, LogOut, TrendingUp, Calendar, CheckCircle, RefreshCw, Trash2, Star } from 'lucide-react';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrips: 0,
    activeTrips: 0,
    completedTrips: 0
  });
  const [users, setUsers] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'trips'>('stats');

  useEffect(() => {
    // Verificar si el usuario está autenticado como admin
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin-login');
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = () => {
    // Cargar datos de localStorage
    const userTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
    const completedTrips = JSON.parse(localStorage.getItem('completedTrips') || '[]');
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || 'null');

    // Calcular estadísticas
    const allTrips = [...userTrips, ...completedTrips];
    setStats({
      totalUsers: contacts.length + (userProfile ? 1 : 0),
      totalTrips: allTrips.length,
      activeTrips: userTrips.length,
      completedTrips: completedTrips.length
    });

    // Preparar lista de usuarios
    const usersList = contacts.map((c: any) => ({
      id: c.id,
      name: c.name,
      phone: c.phone
    }));
    if (userProfile) {
      usersList.unshift({
        id: 'current-user',
        name: userProfile.name,
        phone: userProfile.phone,
        isCurrentUser: true
      });
    }
    setUsers(usersList);

    // Preparar lista de viajes
    setTrips(allTrips);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin-login');
  };

  const handleClearAllData = () => {
    if (confirm('¿Estás seguro? Esto eliminará TODOS los datos de la aplicación.')) {
      localStorage.clear();
      alert('Datos eliminados correctamente');
      loadData();
    }
  };

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 py-4 md:py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#EEB19A] p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl">Panel de Administración</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Cerrar sesión</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === 'stats'
                  ? 'border-[#EEB19A] text-[#EEB19A]'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Estadísticas</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === 'users'
                  ? 'border-[#EEB19A] text-[#EEB19A]'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Usuarios</span>
            </button>
            <button
              onClick={() => setActiveTab('trips')}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === 'trips'
                  ? 'border-[#EEB19A] text-[#EEB19A]'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Plane className="w-5 h-5" />
              <span>Viajes</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Estadísticas */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Bienvenida */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#92C0E8]">
                <div className="flex items-center gap-4">
                  <div className="bg-[#92C0E8] p-4 rounded-2xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Panel de Administración</h2>
                    <p className="text-gray-600">Resumen general de TravelUp</p>
                  </div>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-[#E8F2FF]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#92C0E8] p-4 rounded-2xl">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm text-gray-600 mb-1">Total Usuarios</h3>
                  <p className="text-4xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-[#FFF5F0]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#EEB19A] p-4 rounded-2xl">
                      <Plane className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm text-gray-600 mb-1">Total Viajes</h3>
                  <p className="text-4xl font-bold text-gray-900">{stats.totalTrips}</p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-[#E8F2FF]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#92C0E8] p-4 rounded-2xl">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm text-gray-600 mb-1">Viajes Activos</h3>
                  <p className="text-4xl font-bold text-gray-900">{stats.activeTrips}</p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-[#FFF5F0]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#EEB19A] p-4 rounded-2xl">
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm text-gray-600 mb-1">Viajes Completados</h3>
                  <p className="text-4xl font-bold text-gray-900">{stats.completedTrips}</p>
                </div>
              </div>

              {/* Acciones de administrador */}
              <div className="bg-white rounded-3xl p-8 shadow-md border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#EEB19A] p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Acciones de Administrador</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      loadData();
                      alert('Datos recargados correctamente');
                    }}
                    className="bg-[#92C0E8] text-white py-4 px-6 rounded-2xl hover:bg-[#7eb3df] transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Recargar Datos</span>
                  </button>
                  <button
                    onClick={handleClearAllData}
                    className="bg-red-500 text-white py-4 px-6 rounded-2xl hover:bg-red-600 transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Limpiar Todos los Datos</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Usuarios */}
          {activeTab === 'users' && (
            <div>
              <div className="bg-white rounded-3xl p-6 mb-6 shadow-md border-2 border-[#92C0E8]">
                <div className="flex items-center gap-3">
                  <div className="bg-[#92C0E8] p-3 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Lista de Usuarios</h2>
                    <p className="text-gray-600 text-sm">Total: {users.length} usuarios</p>
                  </div>
                </div>
              </div>

              {users.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center shadow-md">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">No hay usuarios registrados</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {users.map((user) => (
                    <div key={user.id} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all border-2 border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="bg-[#92C0E8] p-3 rounded-xl">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 mb-1">{user.name}</p>
                          <p className="text-sm text-gray-500">+34 {user.phone}</p>
                          {user.isCurrentUser && (
                            <div className="flex items-center gap-1 mt-2 text-xs bg-[#EEB19A] text-white px-3 py-1 rounded-full font-medium w-fit">
                              <Star className="w-3 h-3" />
                              <span>Usuario actual</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Viajes */}
          {activeTab === 'trips' && (
            <div>
              <div className="bg-white rounded-3xl p-6 mb-6 shadow-md border-2 border-[#EEB19A]">
                <div className="flex items-center gap-3">
                  <div className="bg-[#EEB19A] p-3 rounded-xl">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Lista de Viajes</h2>
                    <p className="text-gray-600 text-sm">Total: {trips.length} viajes</p>
                  </div>
                </div>
              </div>

              {trips.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center shadow-md">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plane className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">No hay viajes creados</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {trips.map((trip) => (
                    <div key={trip.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#EEB19A] p-4 rounded-xl flex-shrink-0">
                          <Plane className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-lg text-gray-900">
                              {trip.name || trip.destination}
                            </h3>
                            {trip.status && (
                              <span className="text-xs bg-[#92C0E8] text-white px-3 py-1.5 rounded-full font-medium">
                                {trip.status}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <Calendar className="w-4 h-4" />
                            <p className="text-sm">{trip.dates}</p>
                          </div>
                          {trip.participants && (
                            <div className="flex items-start gap-2 text-gray-500">
                              <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <p className="text-sm">
                                {Array.isArray(trip.participants) ? trip.participants.join(', ') : trip.participants}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
