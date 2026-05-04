import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Sparkles, MapPin, Calendar, Users, Briefcase, Heart, Dog, Car, Waves, Coffee, XCircle, Wifi, Dumbbell, Plane as PlaneIcon, Accessibility, Star, Home, Building, Hotel as HotelIcon, Mail, X } from 'lucide-react';

export default function AddHotel() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 6;
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      setShowEmailModal(true);
    }
  }, []);

  const [answers, setAnswers] = useState({
    destination: '', // ss
    checkin: '', // checkin
    checkout: '', // checkout
    adults: 2, // group_adults
    children: 0, // group_children
    rooms: 1, // no_rooms
    travelPurpose: 'leisure' as 'work' | 'leisure', // sb_travel_purpose
    budget: 100, // Presupuesto por noche
    popularFilters: [] as string[], // Desayuno, Cancelación gratis, Parking, Piscina
    stars: [] as number[], // Categoría del establecimiento
    services: [] as string[], // WiFi, Gimnasio, Traslado, Accesibilidad, Mascotas
    accommodationType: [] as string[] // Hoteles, Apartamentos, Hostales, Casas, Villas
  });

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Guardar viaje con hotel al finalizar la encuesta
      const pendingTripData = localStorage.getItem('pendingTripData');
      const pendingAutoTripData = localStorage.getItem('pendingAutoTripData');

      let createdTripId = null;

      if (pendingTripData) {
        // Flujo manual
        const tripData = JSON.parse(pendingTripData);
        const tripId = `trip_${Date.now()}`;
        createdTripId = tripId;

        const newTrip = {
          id: tripId,
          destination: tripData.destination,
          name: tripData.tripName,
          dates: `${new Date(tripData.startDate).getDate()} ${new Date(tripData.startDate).toLocaleDateString('es-ES', { month: 'short' })} - ${new Date(tripData.endDate).getDate()} ${new Date(tripData.endDate).toLocaleDateString('es-ES', { month: 'short' })} ${new Date(tripData.endDate).getFullYear()}`,
          startDate: tripData.startDate,
          endDate: tripData.endDate,
          participants: tripData.participants,
          status: 'Hotel reservado',
          daysUntil: Math.ceil((new Date(tripData.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
          image: tripData.coverImage || undefined,
          hasHotel: true,
          hotelData: {
            destination: answers.destination,
            checkin: answers.checkin,
            checkout: answers.checkout,
            adults: answers.adults,
            children: answers.children,
            rooms: answers.rooms
          },
          createdAt: new Date().toISOString()
        };

        const currentTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
        currentTrips.push(newTrip);
        localStorage.setItem('userTrips', JSON.stringify(currentTrips));
        localStorage.setItem('lastCreatedTripId', tripId);
        localStorage.removeItem('pendingTripData');
      } else if (pendingAutoTripData) {
        // Flujo automático (desde MatchResults)
        const tripData = JSON.parse(pendingAutoTripData);
        const tripId = `trip_${Date.now()}`;
        createdTripId = tripId;

        const newTrip = {
          id: tripId,
          destination: tripData.destination,
          name: tripData.destination,
          dates: answers.checkin && answers.checkout
            ? `${new Date(answers.checkin).getDate()} ${new Date(answers.checkin).toLocaleDateString('es-ES', { month: 'short' })} - ${new Date(answers.checkout).getDate()} ${new Date(answers.checkout).toLocaleDateString('es-ES', { month: 'short' })} ${new Date(answers.checkout).getFullYear()}`
            : 'Fechas por definir',
          startDate: answers.checkin,
          endDate: answers.checkout,
          participants: tripData.participants,
          status: 'Hotel reservado',
          daysUntil: answers.checkin ? Math.ceil((new Date(answers.checkin).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0,
          image: tripData.image,
          hasHotel: true,
          hotelData: {
            destination: answers.destination,
            checkin: answers.checkin,
            checkout: answers.checkout,
            adults: answers.adults,
            children: answers.children,
            rooms: answers.rooms
          },
          createdAt: new Date().toISOString()
        };

        const currentTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
        currentTrips.push(newTrip);
        localStorage.setItem('userTrips', JSON.stringify(currentTrips));
        localStorage.setItem('lastCreatedTripId', tripId);
        localStorage.removeItem('pendingAutoTripData');
      }

      const allCompleted = Math.random() > 0.2;
      if (allCompleted) {
        navigate('/match-hotels/new');
      } else {
        navigate('/waiting-hotels/new');
      }
    }
  };

  const toggleFilter = (category: 'popularFilters' | 'services' | 'accommodationType', filter: string) => {
    const current = answers[category];
    if (current.includes(filter)) {
      setAnswers({ ...answers, [category]: current.filter(f => f !== filter) });
    } else {
      setAnswers({ ...answers, [category]: [...current, filter] });
    }
  };

  const toggleStar = (star: number) => {
    const maxStar = Math.max(...answers.stars, 0);

    if (maxStar === star) {
      // Si hacemos clic en la estrella más alta seleccionada, deseleccionar todas
      setAnswers({ ...answers, stars: [] });
    } else {
      // Seleccionar todas las estrellas desde 1 hasta la que se hizo clic
      const newStars = Array.from({ length: star }, (_, i) => i + 1);
      setAnswers({ ...answers, stars: newStars });
    }
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userEmail', emailInput);
    setShowEmailModal(false);
    setShowVerificationMessage(true);
    setTimeout(() => setShowVerificationMessage(false), 5000);
  };

  return (
    <div className="size-full bg-[#E8F2FF] overflow-y-auto">
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#92C0E8]/20 p-3 rounded-2xl">
                <Mail className="w-8 h-8 text-[#92C0E8]" />
              </div>
              <h2 className="text-xl font-semibold">Conecta con Booking</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Para buscar y reservar hoteles, necesitamos tu correo electrónico para conectar con tu cuenta de Booking.com
            </p>

            <form onSubmit={handleSaveEmail} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-[#92C0E8]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#92C0E8] text-white py-3 rounded-full hover:bg-[#7eb3df] transition-colors"
              >
                Continuar
              </button>

              <button
                type="button"
                onClick={() => navigate('/home')}
                className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto min-h-full flex flex-col">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-400 px-4 md:px-6 py-4 md:py-5 hover:text-gray-600 transition-colors md:fixed md:top-4 md:left-4 md:z-10"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Salir</span>
        </button>

        {/* Verification Message */}
        {showVerificationMessage && (
          <div className="mx-4 mb-4 bg-white border-2 border-[#92C0E8] rounded-xl p-4 flex items-start gap-3 shadow-lg">
            <Mail className="w-5 h-5 text-[#92C0E8] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#92C0E8] font-medium">Correo añadido correctamente</p>
              <p className="text-xs text-gray-600 mt-1">
                Te hemos enviado un correo de verificación. Por favor, revisa tu bandeja de entrada.
              </p>
            </div>
          </div>
        )}

        <div className="flex-1 px-4 pb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg relative">
            <button
              onClick={() => navigate('/home')}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#92C0E8]/20 p-3 rounded-2xl">
                <Sparkles className="w-8 h-8 text-[#92C0E8]" />
              </div>
              <div>
                <h1 className="text-2xl">Encuesta de Hotel</h1>
                <p className="text-sm text-gray-500">Pregunta {currentQuestion} de {totalQuestions}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-[#92C0E8] transition-all"
                style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question 1: Destination (ss) */}
            {currentQuestion === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl mb-4">¿A dónde quieres ir?</h2>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={answers.destination}
                    onChange={(e) => setAnswers({ ...answers, destination: e.target.value })}
                    placeholder="Ej: Roma, Italia"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-[#92C0E8]"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Escribe la ciudad o lugar donde quieres alojarte
                </p>
              </div>
            )}

            {/* Question 2: Dates (checkin, checkout) */}
            {currentQuestion === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl mb-4">¿En qué fechas vas a viajar?</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Fecha de entrada</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={answers.checkin}
                        onChange={(e) => setAnswers({ ...answers, checkin: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-[#92C0E8]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Fecha de salida</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={answers.checkout}
                        onChange={(e) => setAnswers({ ...answers, checkout: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-[#92C0E8]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Question 3: Group composition (adults, children, rooms) */}
            {currentQuestion === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl mb-4">¿Cuántas personas van a viajar?</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-base">Adultos</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setAnswers({ ...answers, adults: Math.max(1, answers.adults - 1) })}
                          className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full text-lg hover:border-[#92C0E8] transition-colors"
                        >
                          -
                        </button>
                        <span className="text-lg font-medium w-8 text-center">{answers.adults}</span>
                        <button
                          onClick={() => setAnswers({ ...answers, adults: answers.adults + 1 })}
                          className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full text-lg hover:border-[#92C0E8] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-base">Niños</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setAnswers({ ...answers, children: Math.max(0, answers.children - 1) })}
                          className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full text-lg hover:border-[#92C0E8] transition-colors"
                        >
                          -
                        </button>
                        <span className="text-lg font-medium w-8 text-center">{answers.children}</span>
                        <button
                          onClick={() => setAnswers({ ...answers, children: answers.children + 1 })}
                          className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full text-lg hover:border-[#92C0E8] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-base">Habitaciones</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setAnswers({ ...answers, rooms: Math.max(1, answers.rooms - 1) })}
                          className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full text-lg hover:border-[#92C0E8] transition-colors"
                        >
                          -
                        </button>
                        <span className="text-lg font-medium w-8 text-center">{answers.rooms}</span>
                        <button
                          onClick={() => setAnswers({ ...answers, rooms: answers.rooms + 1 })}
                          className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full text-lg hover:border-[#92C0E8] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Question 4: Travel purpose */}
            {currentQuestion === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl mb-4">¿Es un viaje de trabajo o de ocio?</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setAnswers({ ...answers, travelPurpose: 'work' })}
                    className={`py-4 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      answers.travelPurpose === 'work'
                        ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-[#92C0E8]'
                    }`}
                  >
                    <Briefcase className="w-8 h-8" />
                    <span>Trabajo</span>
                  </button>
                  <button
                    onClick={() => setAnswers({ ...answers, travelPurpose: 'leisure' })}
                    className={`py-4 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      answers.travelPurpose === 'leisure'
                        ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-[#92C0E8]'
                    }`}
                  >
                    <Heart className="w-8 h-8" />
                    <span>Ocio</span>
                  </button>
                </div>
              </div>
            )}

            {/* Question 5: Budget + Popular Filters */}
            {currentQuestion === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl mb-4">¿Cuál es tu presupuesto por noche?</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0€</span>
                      <span className="text-[#92C0E8] text-lg font-medium">{answers.budget}€</span>
                      <span>200€+</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={answers.budget}
                      onChange={(e) => setAnswers({ ...answers, budget: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #92C0E8 0%, #92C0E8 ${(answers.budget / 200) * 100}%, #e5e7eb ${(answers.budget / 200) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-3">Filtros populares</h3>
                  <p className="text-sm text-gray-500 mb-4">Selecciona lo que prefieres (opcional)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => toggleFilter('popularFilters', 'breakfast')}
                      className={`py-3 px-4 rounded-xl border-2 transition-all flex items-center gap-2 justify-center ${
                        answers.popularFilters.includes('breakfast')
                          ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-[#92C0E8]'
                      }`}
                    >
                      <Coffee className="w-5 h-5" />
                      <span>Desayuno incluido</span>
                    </button>
                    <button
                      onClick={() => toggleFilter('popularFilters', 'freeCancellation')}
                      className={`py-3 px-4 rounded-xl border-2 transition-all flex items-center gap-2 justify-center ${
                        answers.popularFilters.includes('freeCancellation')
                          ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-[#92C0E8]'
                      }`}
                    >
                      <XCircle className="w-5 h-5" />
                      <span>Cancelación gratis</span>
                    </button>
                    <button
                      onClick={() => toggleFilter('popularFilters', 'parking')}
                      className={`py-3 px-4 rounded-xl border-2 transition-all flex items-center gap-2 justify-center ${
                        answers.popularFilters.includes('parking')
                          ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-[#92C0E8]'
                      }`}
                    >
                      <Car className="w-5 h-5" />
                      <span>Parking gratis</span>
                    </button>
                    <button
                      onClick={() => toggleFilter('popularFilters', 'pool')}
                      className={`py-3 px-4 rounded-xl border-2 transition-all flex items-center gap-2 justify-center ${
                        answers.popularFilters.includes('pool')
                          ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-[#92C0E8]'
                      }`}
                    >
                      <Waves className="w-5 h-5" />
                      <span>Piscina</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Question 6: Stars, Accommodation Type, and Services */}
            {currentQuestion === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl mb-4">Categoría del establecimiento</h2>
                  <p className="text-sm text-gray-500 mb-4">Selecciona las estrellas que prefieres</p>
                  <div className="flex gap-3 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => toggleStar(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            answers.stars.includes(star)
                              ? 'fill-[#92C0E8] text-[#92C0E8]'
                              : 'fill-gray-300 text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-3">Tipo de alojamiento</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { value: 'hotel', label: 'Hoteles', icon: HotelIcon },
                      { value: 'apartment', label: 'Apartamentos', icon: Building },
                      { value: 'hostel', label: 'Hostales', icon: Home },
                      { value: 'villa', label: 'Villas', icon: Home }
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => toggleFilter('accommodationType', value)}
                        className={`py-3 px-4 rounded-xl border-2 transition-all flex items-center gap-2 justify-center ${
                          answers.accommodationType.includes(value)
                            ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#92C0E8]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-3">Servicios adicionales</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'wifi', label: 'WiFi gratis', icon: Wifi },
                      { value: 'gym', label: 'Gimnasio', icon: Dumbbell },
                      { value: 'airport', label: 'Traslado aeropuerto', icon: PlaneIcon },
                      { value: 'accessible', label: 'Accesible', icon: Accessibility },
                      { value: 'pets', label: 'Admite mascotas', icon: Dog }
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => toggleFilter('services', value)}
                        className={`py-3 px-4 rounded-xl border-2 transition-all flex items-center gap-2 justify-center ${
                          answers.services.includes(value)
                            ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#92C0E8]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full bg-[#92C0E8] text-white py-3 rounded-xl hover:bg-[#7eb3df] transition-colors mt-8"
            >
              {currentQuestion < totalQuestions ? 'Siguiente' : 'Finalizar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
