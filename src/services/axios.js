import axios from 'axios';

// Crear una instancia de Axios con la URL base
const axiosInstance = axios.create({
  //baseURL: 'http://localhost:7501',  // URL base definida en la variable de entorno
  baseURL: 'https://quickpay.com.bo:7501',  // URL base definida en la variable de entorno
  timeout: 30000,  // Tiempo de espera para la solicitud
});

// Puedes agregar interceptores, configurar headers, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // Por ejemplo, agregar un token de autenticación si es necesario
    // config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
