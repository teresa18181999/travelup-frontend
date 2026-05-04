import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bell } from 'lucide-react';

export default function Notifications() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    tripUpdates: true,
    newMessages: true,
    invitations: true,
    reminders: true,
    emailNotifications: false
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 py-4 md:py-6 flex items-center gap-4">
            <button
              onClick={() => navigate('/settings')}
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <h1 className="text-xl md:text-2xl">Notificaciones</h1>
          </div>
        </div>

        {/* Notification settings */}
        <div className="p-6 md:p-8 lg:p-10 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-[#E8F2FF] p-2 rounded-lg">
                  <Bell className="w-5 h-5 text-[#92C0E8]" />
                </div>
                <div>
                  <h2 className="text-sm">Actualizaciones de viaje</h2>
                  <p className="text-xs text-gray-500">Cambios en tus viajes planificados</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.tripUpdates}
                  onChange={() => handleToggle('tripUpdates')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#92C0E8]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-sm">Mensajes nuevos</h2>
                <p className="text-xs text-gray-500">Mensajes de otros participantes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.newMessages}
                  onChange={() => handleToggle('newMessages')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#92C0E8]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-sm">Invitaciones</h2>
                <p className="text-xs text-gray-500">Invitaciones a nuevos viajes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.invitations}
                  onChange={() => handleToggle('invitations')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#92C0E8]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-sm">Recordatorios</h2>
                <p className="text-xs text-gray-500">Recordatorios de actividades y fechas</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.reminders}
                  onChange={() => handleToggle('reminders')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#92C0E8]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm">Notificaciones por email</h2>
                <p className="text-xs text-gray-500">Recibe notificaciones en tu correo</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#92C0E8]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
