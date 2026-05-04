import { useState, useEffect } from 'react';
import { Archive, PlusCircle, MapPin, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import MyTrips from './MyTrips';
import CurrentTrips from './CurrentTrips';
import NewTrip from './NewTrip';

type Tab = 'my-trips' | 'new-trip' | 'current-trips';

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('my-trips');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Recargar cuando volvemos desde otra página
    const handleFocus = () => setRefreshKey(prev => prev + 1);
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="size-full flex flex-col bg-[#FFF9F7]">
      <header className="bg-white shadow-sm">
        <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-6 py-4 md:py-6 flex items-center justify-between">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-[#92C0E8]">TravelUp</h1>
          <button
            onClick={handleSettings}
            className="p-2 md:p-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Settings className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </header>

      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-6">
          <div className="flex justify-around md:justify-center md:gap-16 lg:gap-24">
            <button
              onClick={() => setActiveTab('my-trips')}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 py-3 md:py-4 px-2 md:px-6 border-b-2 transition-colors flex-1 md:flex-none ${
                activeTab === 'my-trips'
                  ? 'border-[#92C0E8] text-[#92C0E8]'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Archive className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs md:text-base font-medium">Mis viajes</span>
            </button>

            <button
              onClick={() => setActiveTab('new-trip')}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 py-3 md:py-4 px-2 md:px-6 border-b-2 transition-colors flex-1 md:flex-none ${
                activeTab === 'new-trip'
                  ? 'border-[#92C0E8] text-[#92C0E8]'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <PlusCircle className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs md:text-base font-medium">Nuevo viaje</span>
            </button>

            <button
              onClick={() => setActiveTab('current-trips')}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 py-3 md:py-4 px-2 md:px-6 border-b-2 transition-colors flex-1 md:flex-none ${
                activeTab === 'current-trips'
                  ? 'border-[#92C0E8] text-[#92C0E8]'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <MapPin className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs md:text-base font-medium">Viajes en curso</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto">
        <div className="py-6">
          {activeTab === 'my-trips' && <MyTrips key={refreshKey} onGoToNewTrip={() => setActiveTab('new-trip')} />}
          {activeTab === 'new-trip' && <NewTrip />}
          {activeTab === 'current-trips' && <CurrentTrips key={refreshKey} onGoToNewTrip={() => setActiveTab('new-trip')} />}
        </div>
      </main>
    </div>
  );
}
