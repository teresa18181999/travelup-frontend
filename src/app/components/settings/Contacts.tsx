import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Users, UserPlus, X, Check, RefreshCw } from 'lucide-react';
import { getContacts, saveContact, Contact } from '../../utils/contacts';

export default function Contacts() {
  const navigate = useNavigate();
  const [addedContacts, setAddedContacts] = useState<Contact[]>([]);
  const [showPhoneContacts, setShowPhoneContacts] = useState(false);
  const [allowSync, setAllowSync] = useState(
    localStorage.getItem('contacts_allowSync') !== 'false'
  );

  useEffect(() => {
    loadAddedContacts();
  }, []);

  const loadAddedContacts = () => {
    // Obtener todos los contactos guardados
    const allContacts = getContacts();
    setAddedContacts(allContacts);
  };

  const handleAddFromContacts = () => {
    setShowPhoneContacts(true);
  };

  const handleImportContact = (contact: any) => {
    saveContact(contact.name, contact.phone.replace(/\s/g, ''));
    loadAddedContacts();
    setShowPhoneContacts(false);
  };

  const handleToggleSync = () => {
    const newValue = !allowSync;
    setAllowSync(newValue);
    localStorage.setItem('contacts_allowSync', String(newValue));
  };

  // Contactos simulados del teléfono que tienen la app
  const mockPhoneContacts = [
    { id: '1', name: 'Laura García', phone: '612 34 56 78' },
    { id: '2', name: 'Miguel Torres', phone: '634 56 78 90' },
    { id: '3', name: 'Carlos Ruiz', phone: '656 89 01 23' },
    { id: '4', name: 'Javier López', phone: '678 01 23 45' },
    { id: '5', name: 'Roberto Díaz', phone: '690 23 45 67' }
  ];

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
            <h1 className="text-xl md:text-2xl">Contactos</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Botón añadir desde contactos */}
          <button
            onClick={handleAddFromContacts}
            className="w-full bg-[#92C0E8] text-white py-3 rounded-xl hover:bg-[#7eb3df] transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Añadir desde contactos</span>
          </button>

          {/* Contactos añadidos */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-medium mb-4">Contactos añadidos</h2>

            {addedContacts.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">
                No hay contactos añadidos
              </p>
            ) : (
              <div className="space-y-2">
                {addedContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="bg-[#92C0E8] p-2 rounded-full">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-gray-500">+34 {contact.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Configuración de sincronización */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#E8F2FF] p-2 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-[#92C0E8]" />
                </div>
                <div>
                  <h2 className="text-sm">Permitir sincronización con contactos</h2>
                  <p className="text-xs text-gray-500">Sincroniza tus contactos del teléfono</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowSync}
                  onChange={handleToggleSync}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#92C0E8]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de contactos del teléfono */}
      {showPhoneContacts && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Contactos con TravelUp</h3>
              <button
                onClick={() => setShowPhoneContacts(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              {mockPhoneContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-[#92C0E8]">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-gray-500">+34 {contact.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleImportContact(contact)}
                    className="p-2 bg-[#92C0E8] text-white rounded-full hover:bg-[#7eb3df] transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
