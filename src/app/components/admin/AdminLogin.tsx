import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Lock } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Contraseña simple para admin (en producción esto sería más seguro)
    if (password === '4225') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="size-full bg-[#FFF9F7] flex items-center justify-center p-6">
      <div className="w-full max-w-sm md:max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-[#EEB19A] p-5 rounded-full">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl text-center text-[#EEB19A] mb-3">Panel Admin</h1>
          <p className="text-center text-gray-600 text-sm mb-8">
            Accede al panel de administración
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Introduce la contraseña"
                  className={`w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 ${
                    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEB19A]'
                  }`}
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#EEB19A] text-white py-3 rounded-full hover:bg-[#e5a589] transition-all"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Volver */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#92C0E8] hover:underline text-sm"
            >
              ← Volver al login de usuarios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
