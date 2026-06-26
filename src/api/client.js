import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor untuk menyisipkan Token JWT otomatis ke setiap request
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor respons untuk mendeteksi token kedaluwarsa (401/403)
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Hapus data autentikasi jika token sudah tidak valid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Memicu reload halaman agar terarah kembali ke halaman login jika berada di area terproteksi
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default client;
