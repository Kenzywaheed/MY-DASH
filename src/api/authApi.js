import apiClient from './axios';

export const login = async ({ email, password }) => {
  // DummyJSON uses username and password, so we map email -> username for the mock
  // Alternatively, just pass the exact dummy credentials from the UI
  const response = await apiClient.post('/auth/login', {
    username: email, // DummyJSON uses username, but UI requirement says email input
    password,
    expiresInMins: 60,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  // This will be caught and mocked by the axios interceptor
  const response = await apiClient.post('/auth/forgot-password', { email });
  return response.data;
};

export const register = async (userData) => {
  // This will be caught and mocked by the axios interceptor
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};
