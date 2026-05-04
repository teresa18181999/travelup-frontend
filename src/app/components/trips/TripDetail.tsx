import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, ChevronLeft, ChevronRight, Plane, Calendar, X, Upload, Clock, Hotel, MapPin as ActivityIcon, Camera, Edit2, User } from 'lucide-react';

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

  const [selectedDay, setSelectedDay] = useState(0);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showEditTrip, setShowEditTrip] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(trip.image || '');
  const [newActivity, setNewActivity] = useState({
    startTime: '',
    endTime: '',
    type: 'activity' as Activity['type'],
    title: '',
    location: ''
  });
  const [editedTrip, setEditedTrip] = useState({
    name: trip.name,
    dates: trip.dates,
    participants: ['Tú', 'Carmen', 'Saline', 'Raúl']
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

  const handleAddParticipant = () => {
    setEditedTrip({
      ...editedTrip,
      participants: [...editedTrip.participants, '']
    });
  };

  const handleRemoveParticipant = (index: number) => {
    const newParticipants = editedTrip.participants.filter((_, i) => i !== index);
    setEditedTrip({
      ...editedTrip,
      participants: newParticipants
    });
  };

  const handleUpdateParticipant = (index: number, value: string) => {
    const newParticipants = [...editedTrip.participants];
    newParticipants[index] = value;
    setEditedTrip({
      ...editedTrip,
      participants: newParticipants
    });
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

                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Participantes</label>
                  <div className="space-y-2">
                    {editedTrip.participants.map((participant, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-1 relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={participant}
                            onChange={(e) => handleUpdateParticipant(index, e.target.value)}
                            placeholder="Nombre del participante"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full text-sm"
                          />
                        </div>
                        {editedTrip.participants.length > 1 && (
                          <button
                            onClick={() => handleRemoveParticipant(index)}
                            className="p-2 text-gray-400 hover:text-[#EEB19A] transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={handleAddParticipant}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:border-[#92C0E8] hover:text-[#92C0E8] transition-colors"
                    >
                      + Añadir participante
                    </button>
                  </div>
                </div>

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
              <div className="relative h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-500 opacity-40 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">Aún no hay imagen de portada</p>
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
          <div className="bg-white rounded-2xl p-4 shadow-sm mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Plane className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">{trip.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400">{trip.dates}</span>
              <button
                onClick={() => setShowEditTrip(true)}
                className="ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Edit2 className="w-4 h-4 text-[#92C0E8]" />
              </button>
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
            <button
              onClick={() => setShowAddActivity(true)}
              className="bg-[#EEB19A] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-[#e5a589] transition-colors"
            >
              + Añadir
            </button>
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

              return (
                <div
                  key={activity.id}
                  className="bg-white rounded-3xl p-4 shadow-md relative"
                >
                  <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="absolute top-4 right-4 text-[#EEB19A]"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex gap-3">
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
