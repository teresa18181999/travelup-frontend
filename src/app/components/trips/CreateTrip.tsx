import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Users, Calendar, MapPin, ArrowLeft } from 'lucide-react';

export default function CreateTrip() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'auto';

  const [tripName, setTripName] = useState('');
  const [participants, setParticipants] = useState<string[]>(['']);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destination, setDestination] = useState('');

  const addParticipant = () => {
    setParticipants([...participants, '']);
  };

  const updateParticipant = (index: number, value: string) => {
    const updated = [...participants];
    updated[index] = value;
    setParticipants(updated);
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'auto') {
      navigate('/survey/new-trip');
    } else {
      navigate('/trip/new-trip');
    }
  };

  return (
    <div className="size-full overflow-y-auto bg-[#FFF9F7]">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">
              {mode === 'auto' ? 'Nuevo Viaje Automático' : 'Nuevo Viaje Manual'}
            </h1>
            <p className="text-gray-600">
              {mode === 'auto'
                ? 'Completa la información inicial y luego cada participante responderá la encuesta'
                : 'Configura los detalles básicos de tu viaje'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Nombre del viaje
              </label>
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="Ej: Verano en Europa"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#92C0E8]"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Participantes
              </label>
              <div className="space-y-3">
                {participants.map((participant, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={participant}
                      onChange={(e) => updateParticipant(index, e.target.value)}
                      placeholder={`Participante ${index + 1}`}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#92C0E8]"
                      required
                    />
                    {participants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParticipant(index)}
                        className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addParticipant}
                  className="flex items-center gap-2 text-[#EEB19A] hover:text-blue-700"
                >
                  <Users className="w-5 h-5" />
                  <span>Añadir participante</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Fecha de inicio {mode === 'auto' && '(opcional)'}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#92C0E8]"
                    required={mode === 'manual'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Fecha de fin {mode === 'auto' && '(opcional)'}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#92C0E8]"
                    required={mode === 'manual'}
                  />
                </div>
              </div>
            </div>

            {mode === 'manual' && (
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Destino
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Ej: París, Francia"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#92C0E8]"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#92C0E8] text-white py-4 rounded-xl hover:bg-[#7eb3df] hover:shadow-lg transition-all"
            >
              {mode === 'auto' ? 'Continuar a la encuesta' : 'Crear viaje'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
