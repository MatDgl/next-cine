import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 secondes de timeout
});

// Interceptor pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - vérifiez que votre API backend est démarrée sur le port 3000');
    }
    
    return Promise.reject(error);
  }
);

export default api;
