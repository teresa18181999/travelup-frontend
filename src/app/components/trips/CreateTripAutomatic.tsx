import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Sparkles } from 'lucide-react';
import ParticipantSelector from '../common/ParticipantSelector';
import { getUserProfile } from '../../utils/userProfile';

interface Participant {
  name: string;
  phone: string;
  isCurrentUser?: boolean;
}

export default function CreateTripAutomatic() {
  const navigate = useNavigate();
  const [tripName, setTripName] = useState('');

  // Inicializar con el usuario actual
  const userProfile = getUserProfile();
  const [participants, setParticipants] = useState<Participant[]>([
    {
      name: userProfile?.name || 'Teresa Pedrero',
      phone: userProfile?.phone || '600 111 222',
      isCurrentUser: true
    }
  ]);

  const [originCity, setOriginCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleContinue = () => {
    navigate('/survey/new');
  };

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto min-h-full flex flex-col">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-400 px-4 md:px-6 py-4 md:py-5 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="flex-1 px-4 pb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#92C0E8]/20 p-3 rounded-2xl">
                <Sparkles className="w-8 h-8 text-[#92C0E8]" />
              </div>
              <h1 className="text-2xl">Nuevo Viaje</h1>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Completa la encuesta para recopilar destinos y luego poder hacer Match ;)
            </p>

            <div className="space-y-4">
              <div>
                <label className="block mb-2">Nombre del viaje (provisional)</label>
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  placeholder="Ej: Viaje de Verano"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#92C0E8]"
                />
              </div>

              <ParticipantSelector
                participants={participants}
                onChange={setParticipants}
              />

              <div>
                <label className="block mb-2">Ciudad de origen</label>
                <input
                  type="text"
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  placeholder="Ej: Madrid, España"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#92C0E8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-2 text-sm">Fecha de inicio (opcional)</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#92C0E8]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm">Fecha de fin (opcional)</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#92C0E8]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleContinue}
                  className="w-full bg-[#92C0E8] text-white py-3 rounded-xl hover:bg-[#7eb3df] transition-colors"
                >
                  Continuar con la encuesta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
