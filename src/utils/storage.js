export const USER_PROFILE_KEY = 'ovula_user_profile';
export const CYCLE_LOGS_KEY = 'ovula_cycle_logs';

const safeJSONParse = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const getUserProfile = () => {
  const raw = localStorage.getItem(USER_PROFILE_KEY);
  if (!raw) return null;
  return safeJSONParse(raw, null);
};

export const setUserProfile = (profile) => {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
};

export const getCycleLogs = () => {
  const raw = localStorage.getItem(CYCLE_LOGS_KEY);
  if (!raw) return [];
  const parsed = safeJSONParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
};

export const setCycleLogs = (logs) => {
  localStorage.setItem(CYCLE_LOGS_KEY, JSON.stringify(logs));
};

export const clearAllData = () => {
  localStorage.removeItem(USER_PROFILE_KEY);
  localStorage.removeItem(CYCLE_LOGS_KEY);
};
