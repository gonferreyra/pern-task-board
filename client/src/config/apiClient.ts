import axios from 'axios';
import queryClient from './queryClient';
import { getNavigate } from '../lib/navigation';

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response);

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    // try to refresh access token behind the scene
    if (status === 401 && data?.errorCode === 'InvalidAccessToken') {
      try {
        await TokenRefreshClient.get('/auth/refresh');
        return TokenRefreshClient(config);
      } catch (error) {
        queryClient.clear();

        // redirect to login
        const navigate = getNavigate();
        navigate('/login', {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
      }
    }

    return Promise.reject({
      status,
      message: data.error,
    });
  },
);

export default API;
