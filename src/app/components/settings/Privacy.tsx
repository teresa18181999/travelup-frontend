import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Lock } from 'lucide-react';

export default function Privacy() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    profileVisibility: localStorage.getItem('privacy_profileVisibility') !== 'false',
    showEmail: localStorage.getItem('privacy_showEmail') === 'true',
    showPhone: localStorage.getItem('privacy_showPhone') === 'true',
    allowInvitations: localStorage.getItem('privacy_allowInvitations') !== 'false'
  });

  const handleToggle = (key: keyof typeof settings) => {
    const newValue = !settings[key];
    setSettings({
      ...settings,
      [key]: newValue
    });
    localStorage.setItem(`privacy_${key}`, String(newValue));
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
            <h1 className="text-xl md:text-2xl">Privacidad y seguridad</h1>
          </div>
        </div>

        {/* Privacy settings */}
        <div className="p-6 md:p-8 lg:p-10 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-[#E8F2FF] p-2 rounded-lg">
                  <Lock className="w-5 h-5 text-[#92C0E8]" />
                </div>
                <div>
                  <h2 className="text-sm">Perfil visible</h2>
                  <p className="text-xs text-gray-500">Otros usuarios pueden ver tu perfil</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.profileVisibility}
                  onChange={() => handleToggle('profileVisibility')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#92C0E8]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-sm">Mostrar email</h2>
                <p className="text-xs text-gray-500">Visible en tu perfil público</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showEmail}
                  onChange={() => handleToggle('showEmail')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#92C0E8]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-sm">Mostrar teléfono</h2>
                <p className="text-xs text-gray-500">Visible en tu perfil público</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showPhone}
                  onChange={() => handleToggle('showPhone')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#92C0E8]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm">Permitir invitaciones</h2>
                <p className="text-xs text-gray-500">Otros usuarios pueden invitarte a viajes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowInvitations}
                  onChange={() => handleToggle('allowInvitations')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#92C0E8]"></div>
              </label>
            </div>
          </div>

          <div className="bg-[#FFF5F0] border border-[#EEB19A] rounded-2xl p-4 mt-4">
            <p className="text-xs text-gray-600 text-center">
              Tu número de teléfono es tu método de autenticación principal. No necesitas contraseña para acceder a tu cuenta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
