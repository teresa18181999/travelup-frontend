import { useState, useEffect } from 'react';
import { User, X, Phone, UserPlus } from 'lucide-react';
import { getContacts, saveContact, Contact } from '../../utils/contacts';
import { getUserProfile } from '../../utils/userProfile';

interface Participant {
  name: string;
  phone: string;
  isCurrentUser?: boolean;
}

interface ParticipantSelectorProps {
  participants: Participant[];
  onChange: (participants: Participant[]) => void;
}

export default function ParticipantSelector({ participants, onChange }: ParticipantSelectorProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddNew, setShowAddNew] = useState(false);
  const [showContactsList, setShowContactsList] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const handlePhoneChange = (value: string) => {
    const numbers = value.replace(/\D/g, '');

    // Formatear como XXX XX XX XX
    let formatted = '';
    if (numbers.length <= 3) {
      formatted = numbers;
    } else if (numbers.length <= 5) {
      formatted = `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    } else if (numbers.length <= 7) {
      formatted = `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5)}`;
    } else if (numbers.length <= 9) {
      formatted = `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 7)} ${numbers.slice(7, 9)}`;
    }

    setNewPhone(formatted);
  };

  const handleAddContact = (contact: Contact) => {
    if (!participants.find(p => p.phone === contact.phone)) {
      onChange([...participants, { name: contact.name, phone: contact.phone }]);
    }
    setShowContactsList(false);
  };

  const handleAddNew = () => {
    if (newName.trim() !== '' && newPhone.trim() !== '') {
      const contact = saveContact(newName.trim(), newPhone.replace(/\s/g, ''));
      onChange([...participants, { name: contact.name, phone: contact.phone }]);
      setContacts(getContacts());
      setNewName('');
      setNewPhone('');
      setShowAddNew(false);
    }
  };

  const handleRemove = (index: number) => {
    onChange(participants.filter((_, i) => i !== index));
  };

  const availableContacts = contacts.filter(
    c => !participants.find(p => p.phone === c.phone)
  );

  return (
    <div>
      <label className="text-sm text-gray-600 mb-2 block">Participantes</label>

      {/* Lista de participantes seleccionados */}
      <div className="space-y-2 mb-3">
        {participants.map((participant, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                  <p className="text-xs text-gray-500">+34 {participant.phone}</p>
                </div>
                {participant.isCurrentUser && (
                  <span className="text-xs bg-[#EEB19A] text-white px-2 py-1 rounded-full">
                    Tú
                  </span>
                )}
              </div>
            </div>
            {!participant.isCurrentUser && (
              <button
                onClick={() => handleRemove(index)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Botones de acción */}
      <div className="space-y-2">
        {/* Selector de contactos guardados */}
        {!showAddNew && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowContactsList(!showContactsList)}
              className="w-full py-2.5 border-2 border-dashed border-[#92C0E8] rounded-xl text-sm text-[#92C0E8] hover:bg-[#E8F2FF] transition-colors"
            >
              Añadir de contactos guardados
            </button>

            {showContactsList && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#92C0E8] rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
                {availableContacts.length === 0 ? (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500 mb-3">No tienes contactos guardados</p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowContactsList(false);
                        setShowAddNew(true);
                      }}
                      className="text-xs text-[#92C0E8] hover:underline"
                    >
                      Añadir nuevo contacto
                    </button>
                  </div>
                ) : (
                  availableContacts.map((contact) => (
                    <button
                      key={contact.id}
                      type="button"
                      onClick={() => handleAddContact(contact)}
                      className="w-full px-4 py-3 text-left hover:bg-[#E8F2FF] transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-[#92C0E8]" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                          <p className="text-xs text-gray-500">+34 {contact.phone}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Formulario para añadir nuevo */}
        {showAddNew ? (
          <div className="space-y-3 p-4 bg-[#E8F2FF] rounded-xl">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nombre del participante"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#92C0E8]"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-900 text-sm select-none pointer-events-none">
                +34
              </span>
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="600 000 000"
                maxLength={12}
                className="w-full pl-[4.5rem] pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#92C0E8] text-gray-900"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddNew}
                className="flex-1 bg-[#92C0E8] text-white py-2 rounded-xl text-sm hover:bg-[#7eb3df] transition-colors"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddNew(false);
                  setNewName('');
                  setNewPhone('');
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl text-sm hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddNew(true)}
            className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-[#92C0E8] hover:text-[#92C0E8] transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Añadir nuevo participante</span>
          </button>
        )}
      </div>
    </div>
  );
}
