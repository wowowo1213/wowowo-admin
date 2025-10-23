import axios from 'axios';
import { useUserStore } from '@/stores/user';

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

service.interceptors.request.use(
  config => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
)

service.interceptors.response.use(
  response => {
    return response.data;
  },

  error => {
    console.error("API Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default service;