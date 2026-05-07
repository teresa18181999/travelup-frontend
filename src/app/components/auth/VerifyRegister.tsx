import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plane } from 'lucide-react';
import { API_BASE } from '../../../api';

export default function VerifyRegister() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) {
      setCode(numbers);
    } else if (numbers.length <= 6) {
      setCode(`${numbers.slice(0, 3)}-${numbers.slice(3)}`);
    }
    if (error) setError('');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/verificar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: code }),
      });

      const data = await response.json();

      if (data.exito) {
        localStorage.setItem('userType', 'new');
        if (rememberMe) localStorage.setItem('rememberMe', 'true');
        navigate('/home');
      } else {
        setError('Código incorrecto. Por favor, verifica el código que has recibido por SMS.');
      }
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    alert('Código reenviado');
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
            El viaje que sueñas empieza con un match.
          </p>
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Código de confirmación</label>
              <input
                type="text"
                value={code}
                onChange={handleCodeChange}
                placeholder="XXX-XXX"
                maxLength={7}
                className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 text-center tracking-widest text-lg ${
                  error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#92C0E8]'
                }`}
                required
              />
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#92C0E8] focus:ring-[#92C0E8]"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
                Mantener sesión iniciada en este dispositivo
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#92C0E8] text-white py-3 rounded-full hover:bg-[#7eb3df] transition-all disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Registrarse'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ¿No te ha llegado?{' '}
              <button type="button" onClick={handleResend} className="text-[#92C0E8] hover:underline">
                Reenviar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
