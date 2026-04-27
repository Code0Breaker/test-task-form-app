import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './constants';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (import.meta.env.DEV) {
    console.debug(`[api] → ${config.method?.toUpperCase()} ${config.url}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ??
      error.message ??
      'Сетевая ошибка. Проверьте соединение и попробуйте снова.';

    return Promise.reject(
      Object.assign(new Error(message), { status, cause: error }),
    );
  },
);
