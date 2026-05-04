import { useNavigate } from 'react-router';
import { ArrowLeft, User, Users, Bell, Lock, Trash2, LogOut, ChevronRight } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('userType');
      navigate('/login');
    }
  };

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 py-4 md:py-6 flex items-center gap-4">
            <button
              onClick={() => navigate('/home')}
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <h1 className="text-xl md:text-2xl">Ajustes</h1>
          </div>
        </div>

        {/* Settings sections */}
        <div className="p-6 md:p-8 lg:p-10 space-y-6">
          {/* Account section */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-sm text-gray-500">Cuenta</h2>
            </div>

            <button
              onClick={() => navigate('/profile')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#E8F2FF] p-2 rounded-lg">
                  <User className="w-5 h-5 text-[#92C0E8]" />
                </div>
                <span>Mi Perfil</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => navigate('/friends')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-t border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#E8F2FF] p-2 rounded-lg">
                  <Users className="w-5 h-5 text-[#92C0E8]" />
                </div>
                <span>Invitaciones</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => navigate('/notifications')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-t border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#E8F2FF] p-2 rounded-lg">
                  <Bell className="w-5 h-5 text-[#92C0E8]" />
                </div>
                <span>Notificaciones</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => navigate('/privacy')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-t border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#E8F2FF] p-2 rounded-lg">
                  <Lock className="w-5 h-5 text-[#92C0E8]" />
                </div>
                <span>Privacidad y seguridad</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Actions section */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-sm text-gray-500">Acciones</h2>
            </div>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <LogOut className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-orange-600">Cerrar sesión</span>
              </div>
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-t border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-red-600">Eliminar cuenta</span>
              </div>
            </button>
          </div>

          {/* App info */}
          <div className="text-center text-sm text-gray-400">
            <p>TravelUp v1.0.0</p>
            <p className="mt-1">© 2025 TravelUp</p>
          </div>
        </div>
      </div>
    </div>
  );
}
