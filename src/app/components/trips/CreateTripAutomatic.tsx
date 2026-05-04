import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Sparkles, X, UserPlus, Phone } from 'lucide-react';

export default function CreateTripAutomatic() {
  const navigate = useNavigate();
  const [tripName, setTripName] = useState('');
  const [participants, setParticipants] = useState<string[]>(['']);
  const [originCity, setOriginCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAddPhone, setShowAddPhone] = useState(false);
  const [selectedParticipantIndex, setSelectedParticipantIndex] = useState<number | null>(null);
  const [participantPhone, setParticipantPhone] = useState('');

  const handleAddParticipant = () => {
    setParticipants([...participants, '']);
  };

  const handleOpenPhoneModal = (index: number) => {
    setSelectedParticipantIndex(index);
    setShowAddPhone(true);
  };

  const handleConfirmParticipant = () => {
    setParticipantPhone('');
    setShowAddPhone(false);
    setSelectedParticipantIndex(null);
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

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

              <div>
                <label className="block mb-2">Participantes</label>
                <div className="space-y-2">
                  {participants.map((participant, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={participant}
                          onChange={(e) => {
                            const newParticipants = [...participants];
                            newParticipants[index] = e.target.value;
                            setParticipants(newParticipants);
                          }}
                          placeholder={`Participante ${index + 1}`}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#92C0E8]"
                        />
                      </div>
                      <button
                        onClick={() => handleOpenPhoneModal(index)}
                        className="bg-[#EEB19A] p-2.5 rounded-full hover:bg-[#e5a589] transition-colors"
                      >
                        <Phone className="w-5 h-5 text-white" />
                      </button>
                      {index > 0 && (
                        <button
                          onClick={() => handleRemoveParticipant(index)}
                          className="text-[#EEB19A]"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddParticipant}
                  className="mt-2 flex items-center gap-2 text-[#EEB19A] text-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Añadir participante</span>
                </button>
              </div>

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

      {showAddPhone && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl">
            <button
              onClick={() => setShowAddPhone(false)}
              className="float-right text-gray-400"
            >
              Salir
            </button>

            <div className="flex items-center gap-3 mb-6 clear-both">
              <div className="bg-[#92C0E8]/20 p-3 rounded-2xl">
                <UserPlus className="w-8 h-8 text-[#92C0E8]" />
              </div>
              <h2 className="text-xl">Número partcipante</h2>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Para que se añada, tendrás que esperar a que el otro participante confirme
            </p>

            <div className="relative mb-6">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={participantPhone}
                onChange={(e) => setParticipantPhone(e.target.value)}
                placeholder="+34 600 000 000"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#92C0E8]"
              />
            </div>

            <button
              onClick={handleConfirmParticipant}
              className="w-full bg-[#92C0E8] text-white py-3 rounded-full hover:bg-[#7eb3df] transition-colors"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
