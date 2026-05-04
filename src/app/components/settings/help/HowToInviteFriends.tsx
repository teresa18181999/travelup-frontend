import { useNavigate } from 'react-router';
import { ArrowLeft, UserPlus, Users, Phone, Share2, Smartphone, Lock } from 'lucide-react';

export default function HowToInviteFriends() {
  const navigate = useNavigate();

  const methods = [
    {
      icon: Users,
      title: 'Desde contactos guardados',
      description: 'Al crear o editar un viaje, pulsa "Añadir de contactos guardados" para seleccionar amigos que ya tienes en tu lista de contactos de TravelUp.'
    },
    {
      icon: Phone,
      title: 'Añadir manualmente',
      description: 'Pulsa "Añadir nuevo participante" e introduce el nombre y teléfono de tu amigo. Se guardará automáticamente en tus contactos.'
    },
    {
      icon: UserPlus,
      title: 'Sincronizar contactos',
      description: 'Ve a Ajustes > Contactos y pulsa "Añadir desde contactos" para ver qué amigos de tu teléfono ya tienen TravelUp instalado.'
    },
    {
      icon: Share2,
      title: 'Compartir invitación',
      description: 'Los participantes recibirán una notificación para confirmar su participación en el viaje. Una vez acepten, podrán ver y colaborar en la planificación.'
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
            <h1 className="text-xl md:text-2xl">¿Cómo invitar amigos?</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-[#E8F2FF] rounded-2xl p-6">
            <p className="text-gray-700">
              Viajar con amigos es más divertido. Aquí te explicamos todas las formas de añadir participantes a tus viajes.
            </p>
          </div>

          {/* Methods */}
          <div className="space-y-4">
            {methods.map((method, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-[#E8F2FF] p-3 rounded-lg">
                      <method.icon className="w-6 h-6 text-[#92C0E8]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Important note */}
          <div className="bg-[#FFF5F0] border border-[#EEB19A] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#EEB19A] p-2 rounded-lg">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-medium text-[#EEB19A]">Importante</h3>
            </div>
            <p className="text-sm text-gray-700">
              Los participantes deben tener TravelUp instalado en su teléfono para poder unirse al viaje. Cuando añades un amigo, le llegará una invitación que debe aceptar.
            </p>
          </div>

          {/* Permissions reminder */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#E8F2FF] p-2 rounded-lg">
                <Lock className="w-4 h-4 text-[#92C0E8]" />
              </div>
              <h3 className="font-medium">Permisos de contactos</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Para sincronizar tus contactos, ve a:
            </p>
            <p className="text-sm text-gray-700 font-medium">
              Ajustes → Contactos → Permitir sincronización con contactos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
