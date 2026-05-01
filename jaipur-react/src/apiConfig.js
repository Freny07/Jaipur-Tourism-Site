export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const getAuthUrl = (provider) => {
  // Removes /api suffix to get the root for oauth paths
  const root = API_BASE_URL.replace(/\/api$/, '') || '';
  return `${root}/oauth2/authorization/${provider}`;
};
