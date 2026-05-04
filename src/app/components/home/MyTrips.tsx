import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Users, Calendar, PlusCircle, Plane, Edit3, Trash2 } from 'lucide-react';

interface MyTripsProps {
  onGoToNewTrip?: () => void;
}

const completedTripsExamples = [
  {
    id: 'completed-1',
    name: 'Barcelona, España',
    dates: '15-20 Ene 2026',
    participants: ['Tú', 'Laura', 'Miguel'],
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop'
  },
  {
    id: 'completed-2',
    name: 'Lisboa, Portugal',
    dates: '5-10 Mar 2026',
    participants: ['Tú', 'Ana'],
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop'
  },
  {
    id: 'completed-3',
    name: 'Ámsterdam, Países Bajos',
    dates: '20-25 Feb 2026',
    participants: ['Tú', 'Carlos', 'Marta', 'Javier'],
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&auto=format&fit=crop'
  }
];

export default function MyTrips({ onGoToNewTrip }: MyTripsProps) {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const loadTrips = () => {
      const userType = localStorage.getItem('userType');
      const completedTrips = JSON.parse(localStorage.getItem('completedTrips') || '[]');

      // Si es usuario existente (login), mostrar viajes de ejemplo + completados
      // Si es usuario nuevo (registro), solo mostrar viajes completados
      if (userType === 'existing') {
        setTrips([...completedTripsExamples, ...completedTrips]);
      } else {
        setTrips(completedTrips);
      }
    };

    loadTrips();

    // Actualizar cuando cambie el localStorage
    const handleStorageChange = () => loadTrips();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const hasTrips = trips.length > 0;

  const handleDeleteTrip = (tripId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este viaje?')) {
      setTrips(trips.filter(trip => trip.id !== tripId));
      if (trips.length === 1) {
        setIsEditMode(false);
      }
    }
  };

  // Estado vacío - primera vez sin viajes
  if (!hasTrips) {
    return (
      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-[#E8F2FF] p-12 rounded-3xl mb-6">
            <Plane className="w-20 h-20 text-[#92C0E8]" />
          </div>
          <h2 className="text-2xl md:text-3xl text-gray-900 mb-3">¡Bienvenido a TravelUp!</h2>
          <p className="text-gray-600 text-center mb-8 max-w-sm md:max-w-md text-base md:text-lg">
            Aún no tienes ningún viaje. Comienza a organizar tu primera aventura.
          </p>
          <button
            onClick={onGoToNewTrip}
            className="flex items-center gap-2 bg-[#92C0E8] text-white px-8 py-4 rounded-xl hover:bg-[#7eb3df] transition-all shadow-md"
          >
            <PlusCircle className="w-6 h-6" />
            <span className="text-lg">Organizar mi primer viaje</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl">Viajes Completados</h2>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className="flex items-center gap-2 text-[#92C0E8] hover:text-[#7eb3df] transition-colors"
        >
          <Edit3 className="w-5 h-5" />
          <span className="text-sm md:text-base">{isEditMode ? 'Listo' : 'Editar'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow relative"
          >
            {isEditMode && (
              <button
                onClick={() => handleDeleteTrip(trip.id)}
                className="absolute top-3 right-3 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}

            <div
              onClick={() => !isEditMode && navigate(`/trip/${trip.id}`)}
              className={isEditMode ? '' : 'cursor-pointer'}
            >
              <div className="relative h-48">
                {trip.image ? (
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Plane className="w-20 h-20 text-gray-400 opacity-50" />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg mb-3">{trip.name}</h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{trip.dates}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{trip.participants.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
