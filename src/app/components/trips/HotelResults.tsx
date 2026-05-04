import { useNavigate } from 'react-router';
import { MapPin, Calendar, Star, Users } from 'lucide-react';

const mockResults = [
  {
    id: 1,
    name: 'BH Hotel',
    location: 'Estacion Termini, Roma',
    dates: '1-7 Jul 2026',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
    stars: 4,
    price: '120€/noche (aprox)',
    votes: 4,
    totalVotes: 4,
    amenities: ['WiFi', 'Piscina', 'Desayuno'],
    isTopMatch: true
  },
  {
    id: 2,
    name: 'Grand Roma Luxury',
    location: 'Via Veneto, Roma',
    dates: '1-7 Jul 2026',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
    stars: 5,
    price: '180€/noche (aprox)',
    votes: 2,
    totalVotes: 4,
    amenities: ['WiFi', 'Spa', 'Todo incluido'],
    isTopMatch: false
  }
];

export default function HotelResults() {
  const navigate = useNavigate();

  const handleGoToTrip = () => {
    const lastCreatedTripId = localStorage.getItem('lastCreatedTripId');
    if (lastCreatedTripId) {
      localStorage.removeItem('lastCreatedTripId');
      navigate(`/trip/${lastCreatedTripId}`);
    } else {
      navigate('/trip/new-hotel');
    }
  };

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">¡RESULTADOS</h1>
          <p className="text-gray-600">Estos son los hoteles favoritos</p>
        </div>

        <div className="space-y-4 mb-6">
          {mockResults.map((result) => (
            <div
              key={result.id}
              className={`bg-white rounded-3xl p-5 shadow-md relative ${
                result.isTopMatch ? 'border-2 border-[#92C0E8]' : ''
              }`}
            >
              {result.isTopMatch && (
                <div className="absolute top-5 right-5 bg-[#EEB19A] text-white px-4 py-1 rounded-full text-sm">
                  TOP MATCH
                </div>
              )}

              <div className="flex gap-4 mb-4">
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-28 h-28 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl mb-2">{result.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{result.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{result.dates}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-[#92C0E8] text-[#92C0E8]" />
                  <span className="text-sm">{result.stars}</span>
                </div>
                <span className="text-sm text-gray-600">{result.price}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <Users className="w-5 h-5" />
                <span className="text-sm">{result.votes} de {result.totalVotes} votos</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {result.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleGoToTrip}
          className="w-full bg-[#92C0E8] text-white py-3 rounded-xl hover:bg-[#7eb3df] transition-colors"
        >
          Ir al viaje
        </button>
      </div>
    </div>
  );
}
