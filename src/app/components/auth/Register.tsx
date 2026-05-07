import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Plane, Phone, User } from 'lucide-react';
import { API_BASE } from '../../../api';

export default function Register() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem('userType');
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbers = value.replace(/\D/g, '');
    let formatted = '';
    if (numbers.length <= 3) {
      formatted = numbers;
    } else if (numbers.length <= 5) {
      formatted = `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    } else if (numbers.length <= 7) {
      formatted = `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5)}`;
    } else if (numbers.length <= 9) {
      formatted = `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 7)} ${numbers.slice(7, 9)}`;
    }
    setPhone(formatted);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: name, telefono: `+34${phone.replace(/\s/g, '')}` }),
      });

      const data = await response.json();

      if (data.exito) {
        localStorage.setItem('usuarioId', String(data.id));
        localStorage.setItem('usuarioNombre', name);
        localStorage.setItem('userType', 'register');
        navigate('/verify-register');
      } else {
        setError(data.mensaje);
      }
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="size-full bg-[#E8F2FF] flex items-center justify-center p-6">
      <div className="w-full max-w-sm md:max-w-md">
        <div className="bg-white rounded-[40px] shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-[#92C0E8] p-5 rounded-full">
              <Plane className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl text-center text-[#92C0E8] mb-3">TravelUp</h1>
          <p className="text-center text-gray-600 text-sm mb-8">
            Únete a TravelUp.
          </p>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Nombre</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#92C0E8]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Número de teléfono</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-900 select-none pointer-events-none">
                  +34
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="618 94 11 68"
                  maxLength={12}
                  className="w-full pl-[5rem] pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#92C0E8] text-gray-900"
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#92C0E8] text-white py-3 rounded-full hover:bg-[#7eb3df] transition-all disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-[#92C0E8] hover:underline"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
