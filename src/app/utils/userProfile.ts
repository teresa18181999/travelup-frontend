export interface UserProfile {
  name: string;
  phone: string;
  email?: string;
}

export const getUserProfile = (): UserProfile | null => {
  try {
    const profile = localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  } catch {
    return null;
  }
};

export const saveUserProfile = (name: string, phone: string, email?: string) => {
  const profile: UserProfile = { name, phone, email };
  localStorage.setItem('userProfile', JSON.stringify(profile));
};
