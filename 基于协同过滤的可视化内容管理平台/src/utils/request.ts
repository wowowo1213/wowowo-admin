import axios from 'axios';
import { useUserStore } from '@/stores/user';

const service = axios.create({
  baseURL: '/api', // 这边我自己直接写出来了，调用的mockjs生成的随机数据
  // baseURL: process.env.VUE_APP_BASE_API,
  // 上面在实际开发中为 .env.development 文件中的 VUE_APP_BASE_API 变量
  // VUE_APP_BASE_API = 'http://your-backend-domain/api'

  timeout: 10000,
});

service.interceptors.request.use(
  config => {
    const userStore = useUserStore(); // 这一行得放到里面来，放到service前面去的话，会报错，因为还没有初始化
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