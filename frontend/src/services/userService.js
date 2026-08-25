// Dev User Identity Helper — Provides a stable UUID for backend API requests until Supabase Auth is wired up

const DEV_USER_ID_KEY = 'sevasetu_dev_user_id';
const DEFAULT_DEV_USER_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

export const getCurrentUserId = () => {
  const savedUser = localStorage.getItem('sevasetu_user');
  if (savedUser) {
    try {
      const parsed = JSON.parse(savedUser);
      if (parsed.id && typeof parsed.id === 'string' && parsed.id.includes('-')) {
        return parsed.id;
      }
    } catch (e) {
      // Ignore parse error and fallback
    }
  }

  let devId = localStorage.getItem(DEV_USER_ID_KEY);
  if (!devId) {
    devId = DEFAULT_DEV_USER_ID;
    localStorage.setItem(DEV_USER_ID_KEY, devId);
  }
  return devId;
};

export default {
  getCurrentUserId,
};
