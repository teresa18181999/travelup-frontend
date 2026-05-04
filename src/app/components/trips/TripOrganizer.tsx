import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Plus,
  Clock,
  Plane,
  Hotel,
  Camera,
  FileText,
  Upload,
  X
} from 'lucide-react';

type Activity = {
  id: string;
  time: string;
  title: string;
  location: string;
  type: 'activity' | 'transport' | 'hotel' | 'document';
};

type DayData = {
  date: string;
  activities: Activity[];
  photos: string[];
};

const mockTripData: Record<string, { name: string; destination: string; dates: string; completed: boolean }> = {
  '1': {
    name: 'Verano en París',
    destination: 'París, Francia',
    dates: '15-22 Jul 2025',
    completed: true
  },
  '2': {
    name: 'Escapada a Barcelona',
    destination: 'Barcelona, España',
    dates: '1-7 Jun 2025',
    completed: true
  },
  '3': {
    name: 'Lisboa con amigos',
    destination: 'Lisboa, Portugal',
    dates: '10-15 May 2025',
    completed: true
  },
  '4': {
    name: 'Viaje a Roma',
    destination: 'Roma, Italia',
    dates: '5-12 Sep 2026',
    completed: false
  },
  '5': {
    name: 'Aventura de Navidad',
    destination: 'Por decidir',
    dates: '20-27 Dic 2026',
    completed: false
  },
  'new-trip': {
    name: 'Viaje a Roma',
    destination: 'Roma, Italia',
    dates: '5-12 Sep 2026',
    completed: false
  }
};

const initialDays: DayData[] = [
  {
    date: '5 Sep 2026',
    activities: [
      {
        id: '1',
        time: '10:30',
        title: 'Vuelo Madrid - Roma',
        location: 'Aeropuerto Fiumicino',
        type: 'transport'
      },
      {
        id: '2',
        time: '15:00',
        title: 'Check-in Hotel Colosseo',
        location: 'Via Labicana, 125',
        type: 'hotel'
      }
    ],
    photos: []
  },
  {
    date: '6 Sep 2026',
    activities: [
      {
        id: '3',
        time: '09:00',
        title: 'Visita al Coliseo',
        location: 'Piazza del Colosseo',
        type: 'activity'
      },
      {
        id: '4',
        time: '14:00',
        title: 'Foro Romano',
        location: 'Via della Salara Vecchia',
        type: 'activity'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=400&auto=format&fit=crop'
    ]
  },
  {
    date: '7 Sep 2026',
    activities: [],
    photos: []
  }
];

export default function TripOrganizer() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const trip = mockTripData[tripId as string] || {
    name: 'Nuevo Viaje',
    destination: 'Destino por confirmar',
    dates: 'Fechas por definir',
    completed: false
  };

  const [days, setDays] = useState<DayData[]>(initialDays);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  const [newActivity, setNewActivity] = useState({
    time: '',
    title: '',
    location: '',
    type: 'activity' as Activity['type']
  });

  const handleAddActivity = () => {
    if (!newActivity.time || !newActivity.title) return;

    const activity: Activity = {
      id: Date.now().toString(),
      ...newActivity
    };

    const updatedDays = [...days];
    updatedDays[selectedDay].activities.push(activity);
    updatedDays[selectedDay].activities.sort((a, b) => a.time.localeCompare(b.time));
    setDays(updatedDays);

    setNewActivity({ time: '', title: '', location: '', type: 'activity' });
    setShowAddActivity(false);
  };

  const handleRemoveActivity = (activityId: string) => {
    const updatedDays = [...days];
    updatedDays[selectedDay].activities = updatedDays[selectedDay].activities.filter(
      (a) => a.id !== activityId
    );
    setDays(updatedDays);
  };

  const handleAddPhoto = () => {
    const photoUrl = 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=400&auto=format&fit=crop';
    const updatedDays = [...days];
    updatedDays[selectedDay].photos.push(photoUrl);
    setDays(updatedDays);
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'transport':
        return <Plane className="w-5 h-5" />;
      case 'hotel':
        return <Hotel className="w-5 h-5" />;
      case 'document':
        return <FileText className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const currentDay = days[selectedDay];

  return (
    <div className="size-full overflow-y-auto bg-[#F0F7FF]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver a inicio</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-[#92C0E8] p-8 text-white">
            <h1 className="text-3xl mb-2">{trip.name}</h1>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{trip.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{trip.dates}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
                    selectedDay === index
                      ? 'bg-[#92C0E8] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Día {index + 1}
                  <div className="text-sm opacity-80">{day.date}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl text-gray-900">Actividades del día</h2>
                  <button
                    onClick={() => setShowAddActivity(!showAddActivity)}
                    className="flex items-center gap-2 bg-[#92C0E8] text-white px-4 py-2 rounded-xl hover:bg-[#e5a589]"
                  >
                    <Plus className="w-5 h-5" />
                    Añadir
                  </button>
                </div>

                {showAddActivity && (
                  <div className="bg-[#E5F1FF] rounded-2xl p-4 mb-4">
                    <h3 className="text-sm text-gray-700 mb-3">Nueva actividad</h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="time"
                        value={newActivity.time}
                        onChange={(e) =>
                          setNewActivity({ ...newActivity, time: e.target.value })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={newActivity.type}
                        onChange={(e) =>
                          setNewActivity({
                            ...newActivity,
                            type: e.target.value as Activity['type']
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="activity">Actividad</option>
                        <option value="transport">Transporte</option>
                        <option value="hotel">Hotel</option>
                        <option value="document">Documento</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      value={newActivity.title}
                      onChange={(e) =>
                        setNewActivity({ ...newActivity, title: e.target.value })
                      }
                      placeholder="Título"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    />
                    <input
                      type="text"
                      value={newActivity.location}
                      onChange={(e) =>
                        setNewActivity({ ...newActivity, location: e.target.value })
                      }
                      placeholder="Ubicación"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    />
                    <button
                      onClick={handleAddActivity}
                      className="w-full bg-[#92C0E8] text-white py-2 rounded-xl hover:bg-[#e5a589]"
                    >
                      Guardar
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  {currentDay.activities.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No hay actividades planificadas</p>
                      <p className="text-gray-400 text-sm">Añade tu primera actividad</p>
                    </div>
                  ) : (
                    currentDay.activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="bg-white border-2 border-gray-200 rounded-2xl p-4 hover:border-[#92C0E8] transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3 flex-1">
                            <div className="bg-[#E5F1FF] p-2 rounded-xl text-[#92C0E8]">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg text-gray-900 mb-1">
                                {activity.title}
                              </h3>
                              {activity.location && (
                                <p className="text-sm text-gray-600 mb-2">
                                  {activity.location}
                                </p>
                              )}
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>{activity.time}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveActivity(activity.id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl text-gray-900">Fotos del día</h2>
                  <button
                    onClick={handleAddPhoto}
                    className="flex items-center gap-2 bg-[#EEB19A] text-white px-4 py-2 rounded-xl hover:bg-[#e5a589]"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {currentDay.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setShowPhotos(true)}
                    >
                      <img
                        src={photo}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {currentDay.photos.length === 0 && (
                    <div className="col-span-2 bg-gray-50 rounded-2xl p-8 text-center">
                      <Camera className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">No hay fotos</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPhotos && (
        <div
          onClick={() => setShowPhotos(false)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-50"
        >
          <div className="max-w-4xl w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {currentDay.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
