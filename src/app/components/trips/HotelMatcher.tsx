import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, ThumbsDown, MapPin, Calendar, Star } from 'lucide-react';

const mockHotels = [
  {
    id: 1,
    name: 'BH Hotel',
    location: 'Estacion Termini, Roma',
    dates: '1-7 Jul 2026',
    price: '120 €/noche (aprox)',
    stars: 4,
    amenities: ['WiFi', 'Piscina', 'Desayuno'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Grand Roma Luxury',
    location: 'Via Veneto, Roma',
    dates: '1-7 Jul 2026',
    price: '180 €/noche (aprox)',
    stars: 5,
    amenities: ['WiFi', 'Spa', 'Todo incluido'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Roma Boutique',
    location: 'Trastevere, Roma',
    dates: '1-7 Jul 2026',
    price: '95 €/noche (aprox)',
    stars: 4,
    amenities: ['WiFi', 'Terraza', 'Bar'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop'
  }
];

export default function HotelMatcher() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [disliked, setDisliked] = useState<number[]>([]);

  const currentHotel = mockHotels[currentIndex];

  const handleLike = () => {
    setLiked([...liked, currentHotel.id]);
    nextHotel();
  };

  const handleDislike = () => {
    setDisliked([...disliked, currentHotel.id]);
    nextHotel();
  };

  const nextHotel = () => {
    if (currentIndex < mockHotels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Simula: casi siempre va a resultados (80% de probabilidad)
      const allCompleted = Math.random() > 0.2;
      if (allCompleted) {
        navigate('/hotel-results/new');
      } else {
        navigate('/waiting-hotels/new');
      }
    }
  };

  if (!currentHotel) {
    return null;
  }

  return (
    <div className="size-full bg-white overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-sm w-full px-4">
        <p className="text-center text-sm text-gray-600 mb-6">
          Desliza para elegir tus hoteles favoritos
        </p>
        <p className="text-center text-xs text-gray-500 mb-6">
          1 de {mockHotels.length}
        </p>

        <div className="relative mb-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-64">
              <img
                src={currentHotel.image}
                alt={currentHotel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-lg flex items-center gap-1 shadow-md">
                <Star className="w-5 h-5 fill-[#92C0E8] text-[#92C0E8]" />
                <span className="text-sm">{currentHotel.stars}</span>
              </div>
            </div>

            <div className="p-6 bg-white">
              <h3 className="text-2xl mb-3">{currentHotel.name}</h3>

              <div className="flex items-center gap-2 text-gray-600 mb-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{currentHotel.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-3 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{currentHotel.dates}</span>
              </div>

              <div className="text-[#92C0E8] text-lg mb-4">
                {currentHotel.price}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {currentHotel.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <button
            onClick={handleDislike}
            className="bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all"
          >
            <ThumbsDown className="w-8 h-8 text-gray-600" />
          </button>
          <button
            onClick={handleLike}
            className="bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all"
          >
            <Heart className="w-8 h-8 text-pink-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
