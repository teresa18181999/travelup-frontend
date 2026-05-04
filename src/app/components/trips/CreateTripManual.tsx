import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, PenTool, Camera } from 'lucide-react';
import ParticipantSelector from '../common/ParticipantSelector';
import { getUserProfile } from '../../utils/userProfile';

interface Participant {
  name: string;
  phone: string;
  isCurrentUser?: boolean;
}

export default function CreateTripManual() {
  const navigate = useNavigate();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
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

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleAddCover = () => {
    coverInputRef.current?.click();
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateTrip = () => {
    if (!tripName || !destination || !startDate || !endDate) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Crear nuevo viaje y guardarlo en localStorage
    const tripId = `trip_${Date.now()}`;
    const newTrip = {
      id: tripId,
      destination: destination,
      name: tripName,
      dates: `${new Date(startDate).getDate()} ${new Date(startDate).toLocaleDateString('es-ES', { month: 'short' })} - ${new Date(endDate).getDate()} ${new Date(endDate).toLocaleDateString('es-ES', { month: 'short' })} ${new Date(endDate).getFullYear()}`,
      startDate: startDate,
      endDate: endDate,
      participants: participants.map(p => p.name),
      status: 'En preparación',
      daysUntil: Math.ceil((new Date(startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      image: coverImage || undefined,
      createdAt: new Date().toISOString()
    };

    // Guardar en localStorage
    const currentTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
    currentTrips.push(newTrip);
    localStorage.setItem('userTrips', JSON.stringify(currentTrips));

    // Navegar a la pantalla del viaje creado
    navigate(`/trip/${tripId}`);
  };

  const handleVoteHotel = () => {
    if (!tripName || !destination || !startDate || !endDate) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Guardar datos del viaje temporalmente para usarlos después de la encuesta
    const tripData = {
      destination,
      tripName,
      startDate,
      endDate,
      participants: participants.map(p => p.name),
      coverImage
    };
    localStorage.setItem('pendingTripData', JSON.stringify(tripData));

    const tripId = `trip_${Date.now()}`;
    navigate(`/add-hotel/${tripId}`);
  };

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      {/* Back button - Fixed en pantallas grandes */}
      <button
        onClick={() => navigate('/home')}
        className="flex items-center gap-2 text-gray-400 px-4 md:px-6 py-4 md:py-5 hover:text-gray-600 transition-colors md:fixed md:top-4 md:left-4 md:z-10 md:bg-white md:rounded-full md:shadow-lg md:px-4 md:py-3"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="md:hidden">Volver</span>
      </button>

      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto min-h-full flex flex-col md:pt-0">

        <div className="flex-1 px-4 pb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#EEB19A]/20 p-3 rounded-2xl">
                <PenTool className="w-8 h-8 text-[#EEB19A]" />
              </div>
              <h1 className="text-2xl">Nuevo Viaje</h1>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Configura los detalles básicos de tu viaje
            </p>

            <div className="space-y-4">
              <div>
                <button
                  onClick={handleAddCover}
                  className="w-full bg-[#EEB19A] text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#e5a589] transition-colors text-sm"
                >
                  <Camera className="w-5 h-5" />
                  <span>+ Añadir portada</span>
                </button>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                />
                {coverImage && (
                  <div className="mt-3 relative h-32 rounded-xl overflow-hidden">
                    <img src={coverImage} alt="Portada" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-2">Nombre del viaje</label>
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
                <label className="block mb-2">Destino</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Ej: Madrid, España"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#92C0E8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-2 text-sm">Fecha de inicio</label>
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
                  <label className="block mb-2 text-sm">Fecha de fin</label>
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

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateTrip}
                  className="flex-1 bg-[#92C0E8] text-white py-3 rounded-xl hover:bg-[#7eb3df] transition-colors"
                >
                  Crear Viaje
                </button>
                <button
                  onClick={handleVoteHotel}
                  className="flex-1 bg-white text-[#92C0E8] py-3 rounded-xl border-2 border-[#92C0E8] hover:bg-[#92C0E8]/10 transition-colors"
                >
                  Votar Hotel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
