import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, X, Check, MapPin, Calendar, Users } from 'lucide-react';

const existingUserInvitations = [
  {
    id: '1',
    tripName: 'Bali, Indonesia',
    dates: '10-20 Nov 2026',
    invitedBy: 'Carlos Pérez',
    participants: ['Carlos', 'Ana', 'Miguel'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
    type: 'manual' as const,
    status: 'confirmed'
  },
  {
    id: '2',
    tripName: '???????',
    dates: 'Por definir',
    invitedBy: 'María Sánchez',
    participants: ['María', 'Laura'],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
    type: 'automatic' as const,
    status: 'choosing_destination'
  },
  {
    id: '3',
    tripName: 'Nueva York, USA',
    dates: '5-12 Dic 2026',
    invitedBy: 'Roberto García',
    participants: ['Roberto', 'Elena', 'Pedro'],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop',
    type: 'manual' as const,
    status: 'confirmed'
  }
];

const getInitialInvitations = () => {
  const userType = localStorage.getItem('userType');
  return userType === 'existing' ? existingUserInvitations : [];
};

export default function Friends() {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState(getInitialInvitations());

  const handleAcceptInvitation = (invitation: typeof mockTripInvitations[0]) => {
    setInvitations(invitations.filter(inv => inv.id !== invitation.id));

    if (invitation.type === 'automatic') {
      // Si es modo automático, llevar a la encuesta
      navigate(`/survey/${invitation.id}`);
    } else {
      // Si es manual, llevar al viaje
      navigate(`/trip/${invitation.id}`);
    }
  };

  const handleRejectInvitation = (invitationId: string) => {
    setInvitations(invitations.filter(inv => inv.id !== invitationId));
  };

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
            <h1 className="text-xl md:text-2xl">Invitaciones a viajes</h1>
          </div>
        </div>

        {/* Trip invitations */}
        <div className="p-6">
          {invitations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-[#E8F2FF] p-10 rounded-3xl mb-6">
                <MapPin className="w-16 h-16 text-[#92C0E8]" />
              </div>
              <h2 className="text-xl text-gray-900 mb-2">No tienes invitaciones</h2>
              <p className="text-gray-500 text-center text-sm">
                Cuando alguien te invite a un viaje aparecerá aquí
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {invitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md"
                >
                  <div className="relative h-40">
                    {invitation.type === 'automatic' ? (
                      <div className="w-full h-full bg-gradient-to-br from-[#92C0E8] to-[#EEB19A] flex items-center justify-center">
                        <div className="text-center text-white">
                          <MapPin className="w-16 h-16 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Destino por decidir</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={invitation.image}
                        alt={invitation.tripName}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-3 right-3 bg-[#EEB19A] text-white px-3 py-1 rounded-full text-sm">
                      Invitación
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg mb-3">{invitation.tripName}</h3>

                    {invitation.type === 'automatic' && (
                      <div className="bg-[#E8F2FF] rounded-lg p-3 mb-3">
                        <p className="text-sm text-[#92C0E8]">
                          Viaje en modo automático - Eligiendo destino
                        </p>
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{invitation.dates}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{invitation.participants.join(', ')}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                      Te invitó: <span className="font-medium text-gray-700">{invitation.invitedBy}</span>
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAcceptInvitation(invitation)}
                        className="flex-1 bg-[#92C0E8] text-white py-2 rounded-full hover:bg-[#7eb3df] transition-colors flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        <span>Aceptar</span>
                      </button>
                      <button
                        onClick={() => handleRejectInvitation(invitation.id)}
                        className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                      >
                        <X className="w-5 h-5" />
                        <span>Rechazar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
