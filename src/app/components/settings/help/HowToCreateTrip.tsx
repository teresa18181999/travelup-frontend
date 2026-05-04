import { useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Users, Calendar, Sparkles, Lightbulb } from 'lucide-react';

export default function HowToCreateTrip() {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      icon: Sparkles,
      title: 'Elige el tipo de viaje',
      description: 'Desde la pantalla principal, selecciona "Crear viaje manual" si ya tienes el destino definido, o "Crear viaje automático" para usar nuestra encuesta y hacer match con destinos.'
    },
    {
      number: 2,
      icon: Users,
      title: 'Añade participantes',
      description: 'Invita a tus amigos desde tus contactos guardados o añade nuevos participantes manualmente. El usuario actual se añade automáticamente al viaje.'
    },
    {
      number: 3,
      icon: MapPin,
      title: 'Configura el destino y fechas',
      description: 'Indica el destino de tu viaje y las fechas de inicio y fin. También puedes añadir una imagen de portada personalizada.'
    },
    {
      number: 4,
      icon: Calendar,
      title: 'Organiza actividades',
      description: 'Una vez creado el viaje, añade actividades, reservas de hotel y transporte para cada día del itinerario.'
    }
  ];

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
            <h1 className="text-xl md:text-2xl">¿Cómo crear un viaje?</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-[#E8F2FF] rounded-2xl p-6">
            <p className="text-gray-700">
              Crear un viaje en TravelUp es fácil y rápido. Sigue estos pasos para empezar a organizar tu próxima aventura.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.number} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[#92C0E8] text-white rounded-full flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-5 h-5 text-[#92C0E8]" />
                      <h3 className="font-medium">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
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
              <li>• Añade una foto de portada para personalizar tu viaje</li>
              <li>• Invita a todos los participantes desde el principio</li>
              <li>• Usa el modo automático si aún no sabes a dónde ir</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
