import { useNavigate } from 'react-router';
import { Plane, Users, Thermometer } from 'lucide-react';

const mockResults = [
  {
    id: 1,
    name: 'Roma, Italia',
    description: 'Historia, cultura y gastronomía italiana',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop',
    budget: '650 (aprox) €',
    distance: '1450km',
    climate: 'Templado',
    votes: 3,
    totalVotes: 4,
    isTopMatch: true
  },
  {
    id: 2,
    name: 'Praga, República Checa',
    description: 'Ciudad medieval con encanto europeo',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop',
    budget: '550 (aprox) €',
    distance: '1775 km',
    climate: 'Frío',
    votes: 3,
    totalVotes: 4,
    isTopMatch: false
  },
  {
    id: 3,
    name: 'Barcelona, España',
    description: 'Playa, arquitectura y gastronomía catalana',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop',
    budget: '700 (aprox) €',
    distance: '630 km',
    climate: 'Cálido',
    votes: 2,
    totalVotes: 4,
    isTopMatch: false
  }
];

export default function MatchResults() {
  const navigate = useNavigate();

  const handleContinueWithHotel = () => {
    // Guardar destino elegido para usar después de la encuesta de hotel
    const tripData = {
      destination: mockResults[0].name,
      image: mockResults[0].image,
      participants: ['Tú']
    };
    localStorage.setItem('pendingAutoTripData', JSON.stringify(tripData));
    navigate('/add-hotel/new');
  };

  const handleAlreadyHaveHotel = () => {
    // Crear viaje sin hotel
    const tripId = `trip_${Date.now()}`;
    const newTrip = {
      id: tripId,
      destination: mockResults[0].name,
      name: mockResults[0].name,
      dates: 'Fechas por definir',
      participants: ['Tú'],
      status: 'Destino confirmado',
      daysUntil: 0,
      image: mockResults[0].image,
      createdAt: new Date().toISOString()
    };

    const currentTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
    currentTrips.push(newTrip);
    localStorage.setItem('userTrips', JSON.stringify(currentTrips));

    navigate('/home');
  };

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">¡RESULTADOS</h1>
          <p className="text-gray-600">Estos son los destinos favoritos</p>
        </div>

        <div className="space-y-4 mb-6">
          {mockResults.map((result) => (
            <div
              key={result.id}
              className={`bg-white rounded-3xl p-4 shadow-md relative ${
                result.isTopMatch ? 'border-2 border-[#92C0E8]' : ''
              }`}
            >
              {result.isTopMatch && (
                <div className="absolute top-4 right-4 bg-[#EEB19A] text-white px-4 py-1 rounded-full text-sm">
                  TOP MATCH
                </div>
              )}

              <div className="flex gap-4 mb-4">
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl mb-1">{result.name}</h3>
                  <p className="text-gray-600 text-sm">{result.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-sm text-gray-600">
                  <div>{result.budget}</div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Plane className="w-4 h-4" />
                  <span>{result.distance}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Thermometer className="w-4 h-4" />
                  <span>{result.climate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span className="text-sm">{result.votes} de {result.totalVotes} VOTOS</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleContinueWithHotel}
            className="flex-1 bg-[#92C0E8] text-white py-3 rounded-xl hover:bg-[#7eb3df] transition-colors"
          >
            Continuar con el hotel
          </button>
          <button
            onClick={handleAlreadyHaveHotel}
            className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Ya lo tengo elegido
          </button>
        </div>
      </div>
    </div>
  );
}
