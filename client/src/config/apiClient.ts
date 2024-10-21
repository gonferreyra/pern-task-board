import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  // (response) => response, // lo dejo para ver todo lo que trae la peticion
  (response) => response.data,
  (error) => {
    // if (error.response) {
    const { status, data } = error.response;
    return Promise.reject({
      status,
      message: data.error,
    });
  },
  // return Promise.reject({ message: 'Error de red o del servidor' });
  // },
);

export default API;
