import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Plane, Phone } from 'lucide-react';
import { API_BASE } from '../../../api';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    localStorage.removeItem('userType');
  }, []);

  useEffect(() => {
    if (clickCount >= 5) {
      navigate('/admin-login');
      setClickCount(0);
    }
  }, [clickCount, navigate]);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    setTimeout(() => setClickCount(0), 2000);
  };

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
    if (error) setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = phone.replace(/\s/g, '');
    if (numbers.length !== 9) {
      setError('El numero de telefono debe tener 9 digitos');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefono: `+34${numbers}` }),
      });
      const data = await response.json();
      if (data.exito) {
        localStorage.setItem('usuarioId', String(data.id));
        localStorage.setItem('usuarioNombre', data.nombre);
        localStorage.setItem('userType', 'existing');
        navigate('/verify-login');
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
            <div onClick={handleLogoClick} className="bg-[#92C0E8] p-5 rounded-full cursor-pointer select-none">
              <Plane className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl text-center text-[#92C0E8] mb-3">TravelUp</h1>
          <p className="text-center text-gray-600 text-sm mb-8">
            El viaje que suenas empieza con un match.
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Numero de telefono</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-900 select-none pointer-events-none">
                  +34
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="600 000 000"
                  maxLength={12}
                  className={`w-full pl-[5rem] pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 text-gray-900 ${
                    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#92C0E8]'
                  }`}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#92C0E8] text-white py-3 rounded-full hover:bg-[#7eb3df] transition-all disabled:opacity-50"
            >
              {loading ? 'Comprobando...' : 'Iniciar Sesion'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              No tienes cuenta?{' '}
              <button type="button" onClick={() => navigate('/register')} className="text-[#92C0E8] hover:underline">
                Registrate
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
