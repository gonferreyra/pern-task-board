import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response;
    return Promise.reject({
      status,
      message: data.error,
    });
  },
);

export default API;
