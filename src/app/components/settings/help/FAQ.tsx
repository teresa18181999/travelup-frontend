import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Es gratis usar TravelUp?',
      answer: 'Sí, TravelUp es completamente gratuito. Puedes crear viajes ilimitados, invitar amigos y usar todas nuestras funciones sin coste alguno.'
    },
    {
      question: '¿Necesito una cuenta para usar la app?',
      answer: 'Sí, necesitas registrarte con tu número de teléfono. No necesitas contraseña, accederás mediante códigos de verificación SMS.'
    },
    {
      question: '¿Puedo usar TravelUp sin conexión a internet?',
      answer: 'Algunas funciones básicas están disponibles sin conexión, pero necesitarás internet para sincronizar cambios, invitar participantes y buscar hoteles.'
    },
    {
      question: '¿Cómo funciona el sistema de votación?',
      answer: 'Cuando creas un viaje automático o votas un hotel, todos los participantes pueden ver las opciones y votar. La opción con más votos es la seleccionada automáticamente.'
    },
    {
      question: '¿Puedo editar un viaje después de crearlo?',
      answer: 'Sí, puedes editar el nombre, fechas y participantes en cualquier momento desde la pantalla del viaje pulsando el icono de editar.'
    },
    {
      question: '¿Cómo añado fotos a mi viaje?',
      answer: 'Desde la pantalla del viaje, pulsa el botón de cámara en cada día para añadir fotos. También puedes cambiar la foto de portada del viaje.'
    },
    {
      question: '¿Puedo crear viajes privados?',
      answer: 'Todos los viajes son privados por defecto. Solo los participantes invitados pueden ver y editar el viaje.'
    },
    {
      question: '¿Qué pasa si elimino mi cuenta?',
      answer: 'Al eliminar tu cuenta se borrarán todos tus datos personales. Los viajes creados por ti se mantendrán para los otros participantes, pero ya no aparecerás como creador.'
    },
    {
      question: '¿Cómo sincronizo mis contactos?',
      answer: 'Ve a Ajustes > Contactos y activa "Permitir sincronización con contactos". Luego pulsa "Añadir desde contactos" para ver quién tiene TravelUp.'
    },
    {
      question: '¿Puedo usar TravelUp en varios dispositivos?',
      answer: 'Sí, inicia sesión con tu número de teléfono en cualquier dispositivo y todos tus viajes se sincronizarán automáticamente.'
    },
    {
      question: '¿Cómo invito a alguien que no tiene TravelUp?',
      answer: 'Cuando añades un participante, le llegará un SMS con un enlace para descargar la app. Una vez instalada, podrá unirse al viaje.'
    },
    {
      question: '¿Las reservas de hotel se hacen dentro de la app?',
      answer: 'No, TravelUp te ayuda a elegir el hotel mediante votación, pero la reserva final la realizas directamente con el proveedor (Booking, Airbnb, etc.).'
    }
  ];

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto pb-8">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 py-4 md:py-6 flex items-center gap-4">
            <button
              onClick={() => navigate('/help')}
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <h1 className="text-xl md:text-2xl">Preguntas frecuentes</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-left font-medium text-gray-900">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#92C0E8] flex-shrink-0 ml-3" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="px-6">
          <div className="bg-[#E8F2FF] rounded-2xl p-6 text-center">
            <p className="text-gray-700 mb-4">¿No encuentras lo que buscas?</p>
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
