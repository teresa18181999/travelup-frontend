import { useNavigate } from 'react-router';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function WaitingSurvey() {
  const navigate = useNavigate();

  return (
    <div className="size-full bg-[#E8F2FF] overflow-y-auto">
      <div className="max-w-md mx-auto min-h-full flex flex-col">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-400 px-4 md:px-6 py-4 md:py-5 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Salir</span>
        </button>

        <div className="flex-1 px-4 pb-8 flex items-center justify-center">
          <div className="w-full bg-white rounded-3xl p-8 shadow-lg text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="bg-[#92C0E8]/20 p-3 rounded-2xl">
                <Sparkles className="w-8 h-8 text-[#92C0E8]" />
              </div>
              <h1 className="text-2xl">Nuevo Viaje</h1>
            </div>

            <h2 className="text-2xl mb-8">
              ¡TIENES QUE ESPERAR A QUE LOS DEMAS PARTICIPANTES RESPONDAN LA ENCUESTA!
            </h2>

            <button
              onClick={() => navigate('/home')}
              className="bg-[#92C0E8] text-white px-8 py-3 rounded-full hover:bg-[#7eb3df] transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
