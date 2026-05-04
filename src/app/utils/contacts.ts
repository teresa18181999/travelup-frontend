export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export const getContacts = (): Contact[] => {
  try {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
  } catch {
    return [];
  }
};

export const saveContact = (name: string, phone: string): Contact => {
  const contacts = getContacts();

  // Verificar si ya existe por nombre o teléfono
  const existing = contacts.find(
    c => c.name.toLowerCase() === name.toLowerCase() || c.phone === phone
  );
  if (existing) {
    return existing;
  }

  // Crear nuevo contacto
  const newContact: Contact = {
    id: `contact_${Date.now()}`,
    name,
    phone
  };

  contacts.push(newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));

  return newContact;
};

export const deleteContact = (id: string) => {
  const contacts = getContacts();
  const filtered = contacts.filter(c => c.id !== id);
  localStorage.setItem('contacts', JSON.stringify(filtered));
};
