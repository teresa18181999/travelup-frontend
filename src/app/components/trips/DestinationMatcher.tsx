import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, ThumbsDown, Plane, Thermometer } from 'lucide-react';

const mockDestinations = [
  {
    id: 1,
    name: 'Roma, Italia',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop',
    tags: ['Historia', 'Cultura', 'Gastronomía', 'Templado']
  },
  {
    id: 2,
    name: 'París, Francia',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
    tags: ['Cultura', 'Arte', 'Gastronomía', 'Templado']
  },
  {
    id: 3,
    name: 'Barcelona, España',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop',
    tags: ['Playa', 'Cultura', 'Gastronomía', 'Cálido']
  },
  {
    id: 4,
    name: 'Ámsterdam, Países Bajos',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&auto=format&fit=crop',
    tags: ['Cultura', 'Historia', 'Natural', 'Templado']
  },
  {
    id: 5,
    name: 'Lisboa, Portugal',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop',
    tags: ['Playa', 'Cultura', 'Historia', 'Cálido']
  },
  {
    id: 6,
    name: 'Praga, República Checa',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop',
    tags: ['Historia', 'Cultura', 'Arquitectura', 'Templado']
  },
  {
    id: 7,
    name: 'Atenas, Grecia',
    image: 'https://images.unsplash.com/photo-1603565800481-e9a1e48ba1f5?w=800&auto=format&fit=crop',
    tags: ['Historia', 'Playa', 'Cultura', 'Cálido']
  },
  {
    id: 8,
    name: 'Copenhague, Dinamarca',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&auto=format&fit=crop',
    tags: ['Cultura', 'Moderno', 'Gastronomía', 'Frío']
  }
];

export default function DestinationMatcher() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [disliked, setDisliked] = useState<number[]>([]);

  const currentDestination = mockDestinations[currentIndex];
  const maxSelections = 5;

  const handleLike = () => {
    if (liked.length < maxSelections) {
      setLiked([...liked, currentDestination.id]);
    }
    nextDestination();
  };

  const handleDislike = () => {
    setDisliked([...disliked, currentDestination.id]);
    nextDestination();
  };

  const nextDestination = () => {
    if (currentIndex < mockDestinations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Simula: casi siempre va a resultados (80% de probabilidad)
      const allCompleted = Math.random() > 0.2;
      if (allCompleted) {
        navigate('/match-results/new');
      } else {
        navigate('/waiting-match/new');
      }
    }
  };

  if (!currentDestination) {
    return null;
  }

  return (
    <div className="size-full bg-white overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-sm w-full px-4">
        <p className="text-center text-sm text-gray-600 mb-6">
          Desliza para elegir tus destinos favoritos
        </p>

        <div className="relative mb-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-[500px]">
              <img
                src={currentDestination.image}
                alt={currentDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-white text-3xl mb-3">{currentDestination.name}</h2>
                <div className="flex items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-1">
                    <Plane className="w-4 h-4" />
                    <span>{currentDestination.tags[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{currentDestination.tags[1]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-4 h-4" />
                    <span>{currentDestination.tags[3]}</span>
                  </div>
                </div>
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
            disabled={liked.length >= maxSelections}
            className={`bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all ${
              liked.length >= maxSelections ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Heart className="w-8 h-8 text-pink-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
