/**
 * User Identity Resolution Helper
 * 
 * TODO: Replace the development fallback with authenticated Supabase user UUID (session.user.id)
 * once JWT/Supabase Auth is fully wired into the backend APIs.
 */

// Stable Development Fallback UUID for local testing / SIH hackathon prototype demo
const DEV_FALLBACK_USER_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
const DEV_USER_ID_KEY = 'sevasetu_dev_user_id';

/**
 * Resolves the active user's UUID for API requests.
 * 
 * Priority:
 * 1. Real authenticated user ID from AuthContext / localStorage ('sevasetu_user')
 * 2. Stored dev user ID from localStorage ('sevasetu_dev_user_id')
 * 3. DEV-ONLY Fallback UUID ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')
 */
export const getCurrentUserId = () => {
  // 1. Check for real authenticated user ID in local storage (never overwrite real user ID)
  const savedUser = localStorage.getItem('sevasetu_user');
  if (savedUser) {
    try {
      const parsed = JSON.parse(savedUser);
      if (parsed.id && typeof parsed.id === 'string' && parsed.id.trim().length > 0) {
        return parsed.id;
      }
    } catch (e) {
      // Ignore parse error and proceed to dev fallback
    }
  }

  // 2. Retrieve or initialize stable DEV fallback UUID (prevents generating random UUIDs per request)
  let devId = localStorage.getItem(DEV_USER_ID_KEY);
  if (!devId) {
    devId = DEV_FALLBACK_USER_ID;
    localStorage.setItem(DEV_USER_ID_KEY, devId);
  }

  return devId;
};

export default {
  getCurrentUserId,
};
