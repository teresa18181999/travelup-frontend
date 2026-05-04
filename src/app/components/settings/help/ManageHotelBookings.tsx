import { useNavigate } from 'react-router';
import { ArrowLeft, Hotel, ThumbsUp, Calendar, MapPin, Lightbulb, ExternalLink } from 'lucide-react';

export default function ManageHotelBookings() {
  const navigate = useNavigate();

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 py-4 md:py-6 flex items-center gap-4">
            <button
              onClick={() => navigate('/help')}
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <h1 className="text-xl md:text-2xl">Gestionar reservas de hotel</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-[#E8F2FF] rounded-2xl p-6">
            <p className="text-gray-700">
              TravelUp te ayuda a elegir el hotel perfecto mediante un sistema de votación grupal. Todos los participantes pueden opinar y decidir juntos.
            </p>
          </div>

          {/* How to add hotel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#E8F2FF] p-3 rounded-lg">
                <Hotel className="w-6 h-6 text-[#92C0E8]" />
              </div>
              <h2 className="font-medium">Añadir hotel al viaje</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-[#92C0E8] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                  1
                </div>
                <p>Al crear un viaje manual, pulsa el botón "Votar Hotel"</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-[#92C0E8] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                  2
                </div>
                <p>Busca hoteles en tu destino usando nuestra búsqueda integrada</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-[#92C0E8] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                  3
                </div>
                <p>Añade tus opciones favoritas para que el grupo pueda votarlas</p>
              </div>
            </div>
          </div>

          {/* Voting system */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#E8F2FF] p-3 rounded-lg">
                <ThumbsUp className="w-6 h-6 text-[#92C0E8]" />
              </div>
              <h2 className="font-medium">Sistema de votación</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Cada participante puede votar las opciones de hotel añadidas. El hotel con más votos será el elegido para el viaje.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Todos los participantes pueden añadir opciones</li>
              <li>• Puedes votar múltiples hoteles</li>
              <li>• Los resultados se actualizan en tiempo real</li>
              <li>• El creador del viaje decide cuándo cerrar la votación</li>
            </ul>
          </div>

          {/* Add to itinerary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#E8F2FF] p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-[#92C0E8]" />
              </div>
              <h2 className="font-medium">Añadir al itinerario</h2>
            </div>
            <p className="text-sm text-gray-600">
              Una vez elegido el hotel, se añadirá automáticamente a tu itinerario con el check-in en el primer día y el check-out en el último día del viaje.
            </p>
          </div>

          {/* Tips */}
          <div className="bg-[#FFF5F0] border border-[#EEB19A] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#EEB19A] p-2 rounded-lg">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-medium text-[#EEB19A]">Consejos</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Compara precios y ubicaciones antes de votar</li>
              <li>• Lee las opiniones de otros viajeros</li>
              <li>• Verifica que las fechas coincidan con tu viaje</li>
              <li>• Comprueba la política de cancelación</li>
            </ul>
          </div>

          {/* External booking note */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#92C0E8]">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#E8F2FF] p-2 rounded-lg">
                <ExternalLink className="w-4 h-4 text-[#92C0E8]" />
              </div>
              <h3 className="font-medium">Reserva externa</h3>
            </div>
            <p className="text-sm text-gray-600">
              TravelUp te ayuda a elegir el hotel, pero la reserva final se realiza directamente con el proveedor (Booking, Airbnb, etc.). Guarda los datos de tu reserva en el itinerario del viaje.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
