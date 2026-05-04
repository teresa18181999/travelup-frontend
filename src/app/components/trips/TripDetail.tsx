import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, ChevronLeft, ChevronRight, Plane, Calendar, X, Upload, Clock, Hotel, MapPin as ActivityIcon, Camera, Edit2, FileText, File, Lock } from 'lucide-react';
import ParticipantSelector from '../common/ParticipantSelector';
import { getUserProfile } from '../../utils/userProfile';

interface Participant {
  name: string;
  phone: string;
  isCurrentUser?: boolean;
}

interface ActivityDocument {
  id: string;
  name: string;
  url: string;
  type: string;
}

type Activity = {
  id: string;
  time: string;
  title: string;
  location: string;
  type: 'transport' | 'hotel' | 'activity';
  endTime?: string;
};

type DayData = {
  date: string;
  activities: Activity[];
  photos: string[];
};

const mockTrips: Record<string, { name: string; dates: string; image?: string; days: DayData[] }> = {
  'completed-1': {
    name: 'Barcelona, España',
    dates: '15-20 Ene 2026',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop',
    days: [
      {
        date: '15 Ene 2026',
        activities: [
          {
            id: 'bcn-1',
            time: '10:00',
            title: 'Visita Sagrada Familia',
            location: 'Carrer de Mallorca, 401',
            type: 'activity'
          }
        ],
        photos: [
          'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=400&auto=format&fit=crop'
        ]
      },
      {
        date: '16 Ene 2026',
        activities: [
          {
            id: 'bcn-2',
            time: '09:30',
            title: 'Park Güell',
            location: 'Carrer d\'Olot, s/n',
            type: 'activity'
          }
        ],
        photos: [
          'https://images.unsplash.com/photo-1579282240050-352db0a14c21?w=400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=400&auto=format&fit=crop'
        ]
      },
      {
        date: '17 Ene 2026',
        activities: [
          {
            id: 'bcn-3',
            time: '11:00',
            title: 'La Rambla y Mercado de La Boquería',
            location: 'La Rambla, 91',
            type: 'activity'
          }
        ],
        photos: [
          'https://images.unsplash.com/photo-1558642891-54be180ea339?w=400&auto=format&fit=crop'
        ]
      },
      { date: '18 Ene 2026', activities: [], photos: [] },
      { date: '19 Ene 2026', activities: [], photos: [] },
      { date: '20 Ene 2026', activities: [], photos: [] }
    ]
  },
  'completed-2': {
    name: 'Lisboa, Portugal',
    dates: '5-10 Mar 2026',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop',
    days: [
      {
        date: '5 Mar 2026',
        activities: [
          {
            id: 'lis-1',
            time: '14:00',
            title: 'Check-in Hotel',
            location: 'Avenida da Liberdade',
            type: 'hotel'
          }
        ],
        photos: [
          'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400&auto=format&fit=crop'
        ]
      },
      {
        date: '6 Mar 2026',
        activities: [
          {
            id: 'lis-2',
            time: '10:00',
            title: 'Torre de Belém',
            location: 'Avenida Brasília',
            type: 'activity'
          },
          {
            id: 'lis-3',
            time: '15:00',
            title: 'Monasterio de los Jerónimos',
            location: 'Praça do Império',
            type: 'activity'
          }
        ],
        photos: [
          'https://images.unsplash.com/photo-1588530825994-f1c0a2d79d58?w=400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&auto=format&fit=crop'
        ]
      },
      {
        date: '7 Mar 2026',
        activities: [
          {
            id: 'lis-4',
            time: '09:00',
            title: 'Barrio Alfama',
            location: 'Alfama',
            type: 'activity'
          }
        ],
        photos: [
          'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=400&auto=format&fit=crop'
        ]
      },
      { date: '8 Mar 2026', activities: [], photos: [] },
      { date: '9 Mar 2026', activities: [], photos: [] },
      {
        date: '10 Mar 2026',
        activities: [
          {
            id: 'lis-5',
            time: '12:00',
            title: 'Check-out Hotel',
            location: 'Avenida da Liberdade',
            type: 'hotel'
          }
        ],
        photos: []
      }
    ]
  },
  'completed-3': {
    name: 'Ámsterdam, Países Bajos',
    dates: '20-25 Feb 2026',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&auto=format&fit=crop',
    days: [
      {
        date: '20 Feb 2026',
        activities: [
          {
            id: 'ams-1',
            time: '15:00',
            title: 'Check-in Hotel',
            location: 'Canales de Ámsterdam',
            type: 'hotel'
          }
        ],
        photos: [
          'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&auto=format&fit=crop'
        ]
      },
      {
        date: '21 Feb 2026',
        activities: [
          {
            id: 'ams-2',
            time: '10:00',
            title: 'Museo Van Gogh',
            location: 'Museumplein 6',
            type: 'activity'
          },
          {
            id: 'ams-3',
            time: '15:30',
            title: 'Paseo en barco por los canales',
            location: 'Canales centrales',
            type: 'activity'
          }
        ],
        photos: [
          'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1584003564911-adb6b692ca94?w=400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1459679749680-18eb1eb37418?w=400&auto=format&fit=crop'
        ]
      },
      {
        date: '22 Feb 2026',
        activities: [
          {
            id: 'ams-4',
            time: '09:00',
            title: 'Casa de Ana Frank',
            location: 'Prinsengracht 263-267',
            type: 'activity'
          }
        ],
        photos: [
          'https://images.unsplash.com/photo-1586297098710-0382a496c814?w=400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&auto=format&fit=crop'
        ]
      },
      {
        date: '23 Feb 2026',
        activities: [
          {
            id: 'ams-5',
            time: '11:00',
            title: 'Mercado de las Flores',
            location: 'Bloemenmarkt',
            type: 'activity'
          }
        ],
        photos: [
          'https://images.unsplash.com/photo-1585211969224-3e992986159d?w=400&auto=format&fit=crop'
        ]
      },
      { date: '24 Feb 2026', activities: [], photos: [] },
      {
        date: '25 Feb 2026',
        activities: [
          {
            id: 'ams-6',
            time: '12:00',
            title: 'Check-out Hotel',
            location: 'Canales de Ámsterdam',
            type: 'hotel'
          }
        ],
        photos: []
      }
    ]
  },
  'new': {
    name: 'Roma, Italia',
    dates: '1-7 Jul 2026',
    days: [
      { date: '1 Jul 2026', activities: [], photos: [] },
      { date: '2 Jul 2026', activities: [], photos: [] },
      { date: '3 Jul 2026', activities: [], photos: [] },
      { date: '4 Jul 2026', activities: [], photos: [] },
      { date: '5 Jul 2026', activities: [], photos: [] },
      { date: '6 Jul 2026', activities: [], photos: [] },
      { date: '7 Jul 2026', activities: [], photos: [] }
    ]
  },
  'new-hotel': {
    name: 'Roma, Italia',
    dates: '1-7 Jul 2026',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop',
    days: [
      {
        date: '1 Jul 2026',
        activities: [
          {
            id: 'hotel-checkin',
            time: '14:00',
            title: 'Check-in Hotel Colosseum Roma',
            location: 'Via Capo d\'Africa, 54, 00184 Roma',
            type: 'hotel'
          }
        ],
        photos: []
      },
      { date: '2 Jul 2026', activities: [], photos: [] },
      { date: '3 Jul 2026', activities: [], photos: [] },
      { date: '4 Jul 2026', activities: [], photos: [] },
      { date: '5 Jul 2026', activities: [], photos: [] },
      { date: '6 Jul 2026', activities: [], photos: [] },
      {
        date: '7 Jul 2026',
        activities: [
          {
            id: 'hotel-checkout',
            time: '12:00',
            title: 'Check-out Hotel Colosseum Roma',
            location: 'Via Capo d\'Africa, 54, 00184 Roma',
            type: 'hotel'
          }
        ],
        photos: []
      }
    ]
  },
  '1': {
    name: 'Japón',
    dates: '1-30 Ag 2025',
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&auto=format&fit=crop',
    days: [
      {
        date: '1 Ag 2025',
        activities: [
          {
            id: '1',
            time: '04:40',
            endTime: '18:00 (+1 JPN 02:00)',
            title: 'Vuelo Madrid-Tokio',
            location: 'Aeropuerto Barajas',
            type: 'transport'
          }
        ],
        photos: [
          'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1554797589-7241bb691973?w=400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&auto=format&fit=crop'
        ]
      },
      {
        date: '2 Ag 2025',
        activities: [],
        photos: []
      },
      {
        date: '3 Ag 2025',
        activities: [],
        photos: []
      }
    ]
  },
  '2': {
    name: 'Mykonos, Italia',
    dates: '15-22 Jul 2025',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop',
    days: [
      {
        date: '15 Jul 2025',
        activities: [],
        photos: []
      }
    ]
  },
  '5': {
    name: '???????',
    dates: '20-27 Dic 2026',
    days: [
      { date: '20 Dic 2026', activities: [], photos: [] },
      { date: '21 Dic 2026', activities: [], photos: [] },
      { date: '22 Dic 2026', activities: [], photos: [] },
      { date: '23 Dic 2026', activities: [], photos: [] },
      { date: '24 Dic 2026', activities: [], photos: [] },
      { date: '25 Dic 2026', activities: [], photos: [] },
      { date: '26 Dic 2026', activities: [], photos: [] },
      { date: '27 Dic 2026', activities: [], photos: [] }
    ]
  },
  '6': {
    name: 'París, Francia',
    dates: '10-15 Oct 2026',
    days: [
      { date: '10 Oct 2026', activities: [], photos: [] },
      { date: '11 Oct 2026', activities: [], photos: [] },
      { date: '12 Oct 2026', activities: [], photos: [] },
      { date: '13 Oct 2026', activities: [], photos: [] },
      { date: '14 Oct 2026', activities: [], photos: [] },
      { date: '15 Oct 2026', activities: [], photos: [] }
    ]
  }
};

const generateDaysFromDates = (dates: string, startDate?: string, endDate?: string): DayData[] => {
  // Si tenemos fechas específicas, usarlas
  if (startDate && endDate) {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Validar fechas
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return [{ date: dates || 'Fecha por definir', activities: [], photos: [] }];
      }

      const days: DayData[] = [];
      const maxDays = 365; // Límite de seguridad
      let count = 0;

      for (let d = new Date(start); d <= end && count < maxDays; d.setDate(d.getDate() + 1)) {
        days.push({
          date: d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
          activities: [],
          photos: []
        });
        count++;
      }

      return days.length > 0 ? days : [{ date: dates || 'Fecha por definir', activities: [], photos: [] }];
    } catch (error) {
      console.error('Error generando días:', error);
      return [{ date: dates || 'Fecha por definir', activities: [], photos: [] }];
    }
  }

  // Por defecto, generar días vacíos
  return [{ date: dates || 'Fecha por definir', activities: [], photos: [] }];
};

export default function TripDetail() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const coverPhotoInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Verificar si el viaje está completado
  const isCompletedTrip = () => {
    try {
      // Verificar si está en completedTrips de localStorage
      const completedTrips = JSON.parse(localStorage.getItem('completedTrips') || '[]');
      const isInCompleted = completedTrips.some((t: any) => t.id === tripId);

      // También verificar si el ID comienza con 'completed-' (viajes de ejemplo de Mis Viajes)
      const isExampleCompleted = tripId?.startsWith('completed-');

      return isInCompleted || isExampleCompleted;
    } catch {
      return false;
    }
  };

  const isTripCompleted = isCompletedTrip();

  // Obtener viaje de forma segura
  const getTripData = () => {
    try {
      // Buscar en mockTrips
      let trip = mockTrips[tripId as string];

      if (!trip) {
        // Buscar en localStorage
        const userTripsJSON = localStorage.getItem('userTrips');
        const userTrips = userTripsJSON ? JSON.parse(userTripsJSON) : [];
        const userTrip = userTrips.find((t: any) => t.id === tripId);

        if (userTrip) {
          // Convertir el viaje del usuario al formato esperado
          trip = {
            name: userTrip.name || userTrip.destination || 'Viaje sin nombre',
            dates: userTrip.dates || 'Fechas por definir',
            image: userTrip.image,
            days: userTrip.days || generateDaysFromDates(userTrip.dates, userTrip.startDate, userTrip.endDate)
          };
        } else {
          // Fallback a un viaje por defecto
          trip = mockTrips['1'];
        }
      }

      // Asegurar que siempre tenga días válidos
      if (!trip || !trip.days || trip.days.length === 0) {
        if (!trip) {
          trip = {
            name: 'Viaje',
            dates: 'Fechas por definir',
            days: []
          };
        }
        trip.days = [{ date: trip.dates || 'Fecha por definir', activities: [], photos: [] }];
      }

      return trip;
    } catch (error) {
      console.error('Error cargando viaje:', error);
      // Retornar viaje por defecto en caso de error
      return {
        name: 'Viaje',
        dates: 'Fechas por definir',
        days: [{ date: 'Fecha por definir', activities: [], photos: [] }]
      };
    }
  };

  const trip = getTripData();
  const userProfile = getUserProfile();

  const [selectedDay, setSelectedDay] = useState(0);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showEditTrip, setShowEditTrip] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(trip.image || '');
  const [activityDocuments, setActivityDocuments] = useState<Record<string, ActivityDocument[]>>({});
  const [selectedActivityForDoc, setSelectedActivityForDoc] = useState<string | null>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  // Cargar documentos del usuario desde localStorage cuando el componente monta
  useEffect(() => {
    const userPhone = userProfile?.phone || 'default';
    const storageKey = `trip_${tripId}_docs_${userPhone}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setActivityDocuments(JSON.parse(stored));
    }
  }, [tripId, userProfile?.phone]);

  // Guardar documentos en localStorage cuando cambien
  useEffect(() => {
    const userPhone = userProfile?.phone || 'default';
    const storageKey = `trip_${tripId}_docs_${userPhone}`;
    localStorage.setItem(storageKey, JSON.stringify(activityDocuments));
  }, [activityDocuments, tripId, userProfile?.phone]);
  const [newActivity, setNewActivity] = useState({
    startTime: '',
    endTime: '',
    type: 'activity' as Activity['type'],
    title: '',
    location: ''
  });
  const [editedTrip, setEditedTrip] = useState<{
    name: string;
    dates: string;
    participants: Participant[];
  }>({
    name: trip.name,
    dates: trip.dates,
    participants: [
      {
        name: userProfile?.name || 'Tú',
        phone: userProfile?.phone || '600 111 222',
        isCurrentUser: true
      },
      { name: 'Carmen', phone: '612345678' },
      { name: 'Saline', phone: '623456789' },
      { name: 'Raúl', phone: '634567890' }
    ]
  });

  // Validar selectedDay y obtener currentDay de forma segura
  const safeSelectedDay = Math.max(0, Math.min(selectedDay, trip.days.length - 1));
  const currentDay = trip.days[safeSelectedDay] || { date: '', activities: [], photos: [] };

  const handleAddActivity = () => {
    setShowAddActivity(false);
    setNewActivity({
      startTime: '',
      endTime: '',
      type: 'activity',
      title: '',
      location: ''
    });
  };

  const handleDeleteActivity = (activityId: string) => {
    // En una app real, eliminaría la actividad
  };

  const goToGallery = () => {
    navigate(`/gallery/${tripId}`);
  };

  const handleChangeCoverPhoto = () => {
    coverPhotoInputRef.current?.click();
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoUrl = reader.result as string;
        setCoverPhoto(photoUrl);
        localStorage.setItem(`tripCover_${tripId}`, photoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = () => {
    photoInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // En una app real, se agregaría la foto al día actual
        alert('Foto agregada a la galería');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEditTrip = () => {
    // En una app real, guardaría los cambios del viaje
    setShowEditTrip(false);
  };

  const handleAddDocument = (activityId: string) => {
    setSelectedActivityForDoc(activityId);
    documentInputRef.current?.click();
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedActivityForDoc) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newDocument: ActivityDocument = {
          id: `doc_${Date.now()}`,
          name: file.name,
          url: reader.result as string,
          type: file.type
        };

        setActivityDocuments(prev => ({
          ...prev,
          [selectedActivityForDoc]: [...(prev[selectedActivityForDoc] || []), newDocument]
        }));

        setSelectedActivityForDoc(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteDocument = (activityId: string, docId: string) => {
    setActivityDocuments(prev => ({
      ...prev,
      [activityId]: prev[activityId].filter(doc => doc.id !== docId)
    }));
  };

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto pb-8 md:pb-12 lg:pb-16">
      {/* Back button - Fixed en pantallas grandes */}
      <button
        onClick={() => navigate('/home')}
        className="flex items-center gap-2 text-gray-400 px-4 md:px-6 py-4 md:py-5 hover:text-gray-600 transition-colors md:fixed md:top-4 md:left-4 md:z-10 md:bg-white md:rounded-full md:shadow-lg md:px-4 md:py-3"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="md:hidden">Volver al inicio</span>
      </button>

      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto md:pt-0">

        {/* Edit trip modal */}
        {showEditTrip && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setShowEditTrip(false)}
                className="absolute top-4 right-4 text-[#EEB19A]"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-xl mb-6">Editar viaje</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Nombre del viaje</label>
                  <input
                    type="text"
                    value={editedTrip.name}
                    onChange={(e) => setEditedTrip({ ...editedTrip, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Fechas</label>
                  <input
                    type="text"
                    value={editedTrip.dates}
                    onChange={(e) => setEditedTrip({ ...editedTrip, dates: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm"
                  />
                </div>

                <ParticipantSelector
                  participants={editedTrip.participants}
                  onChange={(participants) => setEditedTrip({ ...editedTrip, participants })}
                />

                <button
                  onClick={handleSaveEditTrip}
                  className="w-full bg-[#92C0E8] text-white py-3 rounded-full hover:bg-[#7eb3df] transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trip header section */}
        <div className="px-4 md:px-6 lg:px-8 mb-6 md:mb-8">
          <div className="rounded-3xl overflow-hidden relative">
            {coverPhoto ? (
              <div className="relative h-48">
                <img
                  src={coverPhoto}
                  alt={trip.name}
                  className="w-full h-full object-cover"
                />
                <button onClick={handleChangeCoverPhoto} className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full hover:bg-white transition-colors shadow-lg">
                  <Camera className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 opacity-50 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Aún no hay imagen de portada</p>
                </div>
                <button onClick={handleChangeCoverPhoto} className="absolute bottom-4 right-4 bg-white p-3 rounded-full hover:bg-gray-50 transition-colors shadow-lg">
                  <Camera className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
            <input
              ref={coverPhotoInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverPhotoChange}
              className="hidden"
            />
          </div>

          {/* Trip info card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mt-4">
            {isTripCompleted && (
              <div className="mb-3 pb-3 border-b border-gray-100">
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  ✓ Viaje completado
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Plane className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">{trip.name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">{trip.dates}</span>
                {!isTripCompleted && (
                  <button
                    onClick={() => setShowEditTrip(true)}
                    className="ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-[#92C0E8]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Day selector */}
        <div className="px-4 md:px-6 lg:px-8 mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
              disabled={selectedDay === 0}
              className="p-2 disabled:opacity-30"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex gap-3 overflow-x-auto">
              {trip.days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm md:text-base whitespace-nowrap transition-colors ${
                    selectedDay === index
                      ? 'bg-[#92C0E8] text-white'
                      : 'bg-[#D6E9F8] text-gray-600'
                  }`}
                >
                  <div>DÍA {index + 1}</div>
                  <div className="text-xs mt-1">{day.date}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedDay(Math.min(trip.days.length - 1, selectedDay + 1))}
              disabled={selectedDay === trip.days.length - 1}
              className="p-2 disabled:opacity-30"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Activities section */}
        <div className="px-4 md:px-6 lg:px-8 mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl lg:text-2xl">Actividades del día</h2>
            {!isTripCompleted && (
              <button
                onClick={() => setShowAddActivity(true)}
                className="bg-[#EEB19A] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-[#e5a589] transition-colors"
              >
                + Añadir
              </button>
            )}
          </div>

          {/* Add activity modal */}
          {showAddActivity && (
            <div className="bg-[#FFF5F0] rounded-3xl p-6 shadow-xl mb-4 relative border-2 border-[#FFE5DD]">
              <button
                onClick={() => setShowAddActivity(false)}
                className="absolute top-4 right-4 text-[#EEB19A]"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-lg mb-4 font-semibold">Nueva actividad</h3>

              <div className="space-y-3">
                <select
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value as Activity['type'] })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-full text-sm bg-white appearance-none pr-8"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center'
                  }}
                >
                  <option value="activity">Actividad</option>
                  <option value="transport">Transporte</option>
                </select>

                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="time"
                      value={newActivity.startTime}
                      onChange={(e) => setNewActivity({ ...newActivity, startTime: e.target.value })}
                      placeholder="--:--"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full text-sm bg-white"
                    />
                  </div>
                  <span className="self-center text-gray-400">-</span>
                  <div className="flex-1 relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="time"
                      value={newActivity.endTime}
                      onChange={(e) => setNewActivity({ ...newActivity, endTime: e.target.value })}
                      placeholder="--:--"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full text-sm bg-white"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  placeholder="Título"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-full text-sm bg-white"
                />

                <input
                  type="text"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                  placeholder="Ubicación"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-full text-sm bg-white"
                />

                <button
                  onClick={handleAddActivity}
                  className="w-full bg-[#EEB19A] text-white py-3 rounded-full hover:bg-[#e5a589] transition-colors"
                >
                  Guardar
                </button>
              </div>
            </div>
          )}

          {/* Activity cards */}
          <div className="space-y-3">
            {currentDay.activities.length === 0 && !showAddActivity && (
              <div className="text-center py-12 text-gray-400 bg-gray-100 rounded-2xl">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-base">No hay actividades planificadas</p>
                <p className="text-sm mt-1">Añade tu primera actividad</p>
              </div>
            )}

            {currentDay.activities.map((activity) => {
              const ActivityIconComponent = activity.type === 'transport' ? Plane : activity.type === 'hotel' ? Hotel : ActivityIcon;
              const docs = activityDocuments[activity.id] || [];

              return (
                <div
                  key={activity.id}
                  className="bg-white rounded-3xl p-4 shadow-md relative"
                >
                  {!isTripCompleted && (
                    <button
                      onClick={() => handleDeleteActivity(activity.id)}
                      className="absolute top-4 right-4 text-[#EEB19A]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}

                  <div className="flex gap-3 mb-3">
                    <div className="bg-[#FFE5DD] p-3 rounded-2xl self-start">
                      <ActivityIconComponent className="w-6 h-6 text-[#EEB19A]" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{activity.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{activity.location}</p>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>
                          {activity.time} {activity.endTime && `- ${activity.endTime}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Documentos y botón añadir documento */}
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    {docs.length > 0 && (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">Solo visible para ti</span>
                        </div>
                        <div className="space-y-2 mb-3">
                          {docs.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-2 bg-[#E8F2FF] p-2 rounded-xl">
                              <File className="w-4 h-4 text-[#92C0E8]" />
                              <span className="text-sm flex-1 truncate">{doc.name}</span>
                              <a
                                href={doc.url}
                                download={doc.name}
                                className="text-[#92C0E8] hover:text-[#7eb3df] text-xs"
                              >
                                Ver
                              </a>
                              {!isTripCompleted && (
                                <button
                                  onClick={() => handleDeleteDocument(activity.id, doc.id)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {!isTripCompleted && (
                      <button
                        onClick={() => handleAddDocument(activity.id)}
                        className="w-full py-2 border-2 border-dashed border-[#92C0E8] rounded-xl text-sm text-[#92C0E8] hover:bg-[#E8F2FF] transition-colors flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{activity.type === 'transport' ? 'Añadir billete' : activity.type === 'hotel' ? 'Añadir reserva' : 'Añadir documento'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Photo album section */}
        <div className="px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl lg:text-2xl">Álbum de fotos</h2>
            <button
              onClick={handleAddPhoto}
              className="bg-[#EEB19A] text-white p-2 rounded-full hover:bg-[#e5a589] transition-colors"
            >
              <Upload className="w-5 h-5" />
            </button>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <input
              ref={documentInputRef}
              type="file"
              accept="image/*,application/pdf"
              onChange={handleDocumentChange}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {currentDay.photos.length === 0 && (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-12 text-gray-400 bg-gray-100 rounded-2xl">
                <Camera className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p>No hay fotos</p>
              </div>
            )}

            {currentDay.photos.map((photo, index) => (
              <div
                key={index}
                onClick={goToGallery}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
