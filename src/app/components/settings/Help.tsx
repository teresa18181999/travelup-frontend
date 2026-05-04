import { useNavigate } from 'react-router';
import { ArrowLeft, HelpCircle, MessageSquare, Book, Video } from 'lucide-react';

export default function Help() {
  const navigate = useNavigate();

  const helpTopics = [
    {
      icon: Book,
      title: '¿Cómo crear un viaje?',
      description: 'Aprende a organizar tu viaje paso a paso',
      route: '/help/create-trip'
    },
    {
      icon: MessageSquare,
      title: '¿Cómo invitar amigos?',
      description: 'Comparte tus planes con otros viajeros',
      route: '/help/invite-friends'
    },
    {
      icon: Video,
      title: 'Gestionar reservas de hotel',
      description: 'Conecta con Booking para reservar alojamiento',
      route: '/help/hotel-bookings'
    },
    {
      icon: HelpCircle,
      title: 'Preguntas frecuentes',
      description: 'Resuelve las dudas más comunes',
      route: '/help/faq'
    }
  ];

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 py-4 md:py-6 flex items-center gap-4">
            <button
              onClick={() => navigate('/settings')}
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <h1 className="text-xl md:text-2xl">Centro de ayuda</h1>
          </div>
        </div>

        {/* Help content */}
        <div className="p-6 md:p-8 lg:p-10 space-y-4">
          <div className="bg-[#E8F2FF] rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="w-8 h-8 text-[#92C0E8]" />
              <h2 className="text-xl text-gray-900">¿En qué podemos ayudarte?</h2>
            </div>
            <p className="text-gray-600 text-sm">
              Encuentra respuestas a tus preguntas o contacta con nuestro equipo de soporte.
            </p>
          </div>

          {/* Help topics */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {helpTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => navigate(topic.route)}
                className={`w-full px-4 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors ${
                  index !== 0 ? 'border-t border-gray-100' : ''
                }`}
              >
                <div className="bg-[#E8F2FF] p-3 rounded-lg flex-shrink-0">
                  <topic.icon className="w-5 h-5 text-[#92C0E8]" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-base font-medium mb-1">{topic.title}</h3>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Contact support CTA */}
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <p className="text-gray-600 mb-4">¿No encuentras lo que buscas?</p>
            <button
              onClick={() => navigate('/contact')}
              className="w-full bg-[#92C0E8] text-white py-3 rounded-xl hover:bg-[#7eb3df] transition-colors"
            >
              Contactar con soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
