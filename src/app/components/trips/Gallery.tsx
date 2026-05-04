import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Upload } from 'lucide-react';

const galleryPhotos = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1554797589-7241bb691973?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1476900164809-ff19b8ae5968?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&auto=format&fit=crop'
];

export default function Gallery() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState(galleryPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState(galleryPhotos[0]);

  const handleUploadPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoUrl = reader.result as string;
        setPhotos([photoUrl, ...photos]);
        setSelectedPhoto(photoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = (photo: string) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      {/* Back button - Fixed en pantallas grandes */}
      <button
        onClick={() => navigate(`/trip/${tripId}`)}
        className="flex items-center gap-2 text-gray-400 px-4 md:px-6 py-4 md:py-5 hover:text-gray-600 transition-colors md:fixed md:top-4 md:left-4 md:z-10 md:bg-white md:rounded-full md:shadow-lg md:px-4 md:py-3"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="md:hidden">Volver al inicio</span>
      </button>

      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto md:pt-0">

        {/* Hero image */}
        <div className="px-4 md:px-6 lg:px-8 mb-4">
          <div className="relative h-64 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-lg">
            <img
              src={selectedPhoto}
              alt="Foto seleccionada"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title and Upload button */}
        <div className="px-4 md:px-6 lg:px-8 mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">Galería</h1>
          <button
            onClick={handleUploadPhoto}
            className="bg-[#EEB19A] text-white p-2 md:p-3 rounded-full hover:bg-[#e5a589] transition-colors"
          >
            <Upload className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Photo grid */}
        <div className="px-4 md:px-6 lg:px-8 pb-8 md:pb-12">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
            {photos.map((photo, index) => (
              <div
                key={index}
                onClick={() => handlePhotoClick(photo)}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedPhoto === photo ? 'ring-4 ring-[#EEB19A] opacity-100' : 'hover:opacity-80'
                }`}
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
