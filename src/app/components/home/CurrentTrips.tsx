import { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Clock, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

interface CurrentTripsProps {
  onGoToNewTrip?: () => void;
}

const existingUserTrips = [
  {
    id: 'new-hotel',
    destination: 'Roma, Italia',
    dates: '1-7 Jul 2026',
    participants: ['Tú', 'Carmen', 'Saline', 'Raúl'],
    status: 'Próximamente',
    daysUntil: 70,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    destination: '???????',
    dates: '20-27 Dic 2026',
    participants: ['Tú', 'Alberto', 'Marta'],
    status: 'Eligiendo destino',
    daysUntil: 177,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    destination: 'París, Francia',
    dates: '10-15 Oct 2026',
    participants: ['Tú', 'Ana', 'Carlos'],
    status: 'Eligiendo hotel',
    daysUntil: 172,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop'
  }
];

export default function CurrentTrips({ onGoToNewTrip }: CurrentTripsProps) {
  const navigate = useNavigate();
  const [currentTrips, setCurrentTrips] = useState<any[]>([]);

  useEffect(() => {
    const loadTrips = () => {
      const userType = localStorage.getItem('userType');
      const userTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');

      // Si es usuario existente (login), mostrar viajes de ejemplo + creados
      // Si es usuario nuevo (registro), solo mostrar viajes creados
      if (userType === 'existing') {
        setCurrentTrips([...existingUserTrips, ...userTrips]);
      } else {
        setCurrentTrips(userTrips);
      }
    };

    loadTrips();

    // Actualizar cuando cambie el localStorage
    const handleStorageChange = () => loadTrips();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (currentTrips.length === 0) {
    return (
      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-[#FFE5DD] p-12 rounded-3xl mb-6">
            <MapPin className="w-20 h-20 text-[#EEB19A]" />
          </div>
          <h2 className="text-2xl md:text-3xl text-gray-900 mb-3">No tienes viajes en curso</h2>
          <p className="text-gray-600 text-center mb-8 max-w-sm md:max-w-md text-base md:text-lg">
            ¡Organiza tu próxima aventura!
          </p>
          <button
            onClick={onGoToNewTrip}
            className="flex items-center gap-2 bg-[#EEB19A] text-white px-8 py-4 rounded-xl hover:bg-[#e5a589] transition-all shadow-md"
          >
            <PlusCircle className="w-6 h-6" />
            <span className="text-lg">Organizar nuevo viaje</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-4">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl">Próximos Viajes</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {currentTrips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => navigate(`/trip/${trip.id}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="relative h-56">
              {trip.image ? (
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <MapPin className="w-20 h-20 text-gray-500 opacity-40" />
                </div>
              )}
              <div className="absolute top-3 right-3 bg-[#EEB19A] text-white px-3 py-1 rounded-full text-sm">
                {trip.status}
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5" />
                  <span>Faltan {trip.daysUntil} días</span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-xl text-gray-900 mb-3">{trip.destination}</h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{trip.dates}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{trip.participants.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
