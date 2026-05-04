import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, User, Phone, Mail, Camera } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    name: 'Teresa Pedrero',
    phone: '+34 600 111 222',
    email: localStorage.getItem('userEmail') || '',
    photo: localStorage.getItem('userPhoto') || ''
  });
  const [showAddEmail, setShowAddEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...profile, email: newEmail });
    localStorage.setItem('userEmail', newEmail);
    setShowAddEmail(false);
    setNewEmail('');
    setShowVerificationMessage(true);
    setTimeout(() => setShowVerificationMessage(false), 5000);
  };

  const handleUpdateEmail = () => {
    if (profile.email) {
      localStorage.setItem('userEmail', profile.email);
    }
  };

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoUrl = reader.result as string;
        setProfile({ ...profile, photo: photoUrl });
        localStorage.setItem('userPhoto', photoUrl);
      };
      reader.readAsDataURL(file);
    }
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
            <h1 className="text-xl md:text-2xl">Mi Perfil</h1>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Verification Message */}
          {showVerificationMessage && (
            <div className="mb-4 bg-[#E8F2FF] border border-[#92C0E8] rounded-xl p-4 flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#92C0E8] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-[#92C0E8] font-medium">Correo añadido correctamente</p>
                <p className="text-xs text-gray-600 mt-1">
                  Te hemos enviado un correo de verificación. Por favor, revisa tu bandeja de entrada.
                </p>
              </div>
            </div>
          )}

          {/* Photo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-[#92C0E8] rounded-full flex items-center justify-center text-white text-4xl">
                  {profile.name.charAt(0)}
                </div>
              )}
              <button
                onClick={handleChangePhoto}
                className="absolute bottom-0 right-0 bg-[#EEB19A] text-white p-3 rounded-full shadow-lg hover:bg-[#e5a589] transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
          </div>

          {/* Profile Info */}
          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="bg-[#E8F2FF] p-3 rounded-lg">
                <User className="w-5 h-5 text-[#92C0E8]" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500">Nombre</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full text-base bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="bg-[#E8F2FF] p-3 rounded-lg">
                <Phone className="w-5 h-5 text-[#92C0E8]" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500">Teléfono</label>
                <p className="text-base">{profile.phone}</p>
              </div>
            </div>

            {profile.email ? (
              <div className="flex items-center gap-4">
                <div className="bg-[#E8F2FF] p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-[#92C0E8]" />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Correo electrónico</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    onBlur={handleUpdateEmail}
                    className="w-full text-base bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div>
                {showAddEmail ? (
                  <form onSubmit={handleAddEmail} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#92C0E8]"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-[#92C0E8] text-white py-2 rounded-full hover:bg-[#7eb3df] transition-colors"
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddEmail(false);
                          setNewEmail('');
                        }}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowAddEmail(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#92C0E8] rounded-xl text-[#92C0E8] hover:bg-[#E8F2FF] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Añadir correo electrónico</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500 text-center">
              Tu número de teléfono es tu método de autenticación y no se puede cambiar aquí.
            </p>
            {!profile.email && (
              <div className="bg-[#FFF5F0] border border-[#EEB19A] rounded-xl p-3">
                <p className="text-xs text-[#EEB19A] text-center">
                  Necesitarás añadir tu correo para reservar hoteles con Booking
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
