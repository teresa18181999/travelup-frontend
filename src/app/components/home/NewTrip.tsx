import { Sparkles, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function NewTrip() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl mb-8">Organiza Nuevo Viaje</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate('/create-trip/automatic')}
          className="w-full bg-[#92C0E8] rounded-3xl p-8 text-left hover:shadow-xl transition-all"
        >
          <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl text-white mb-3">Modo Automático</h3>
          <p className="text-white/90 mb-4">
            Deja que TravelUp te ayude a encontrar el viaje perfecto para ti o para tu grupo
          </p>

          <ul className="space-y-2 text-white/90 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-white mt-0.5">✓</span>
              <span>Encuesta personalizada para cada participante</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white mt-0.5">✓</span>
              <span>Encuentra el mejor Match para el mejor destino y alojamiento</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white mt-0.5">✓</span>
              <span>Más todas las funcionalidades del automático</span>
            </li>
          </ul>
        </button>

        <button
          onClick={() => navigate('/create-trip/manual')}
          className="w-full bg-white rounded-3xl p-8 text-left border-2 border-gray-200 hover:border-[#92C0E8] hover:shadow-xl transition-all"
        >
          <div className="bg-[#EEB19A] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
            <PenTool className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl text-gray-900 mb-3">Modo Manual</h3>
          <p className="text-gray-600 mb-4">
            Ya sabes donde vas, solo necesitas organizar el viaje
          </p>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#92C0E8] mt-0.5">✓</span>
              <span>Crea el viaje con destino y hotel conocido</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#92C0E8] mt-0.5">✓</span>
              <span>Organiza tus billetes, documentos y actividades</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#92C0E8] mt-0.5">✓</span>
              <span>Guarda en el album todos tus recuerdos</span>
            </li>
          </ul>
        </button>
      </div>
    </div>
  );
}
