import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useAuthStore } from '@/store/auth';
import { router } from './router';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token');
    if (token) {
      req.headers.Authorization = token;
    }
    return req;
  },
  (err) => Promise.reject(err),
);

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    if (err.response) {
      if (
        err.response.status === HttpStatusCode.Unauthorized &&
        window.location.pathname !== '/login'
      ) {
        const store = useAuthStore();
        store.logout();
        router.push('/login');
      }
    }
    return Promise.reject(err);
  },
);
