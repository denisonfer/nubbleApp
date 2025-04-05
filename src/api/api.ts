import { Platform } from 'react-native';

import axios from 'axios';

import { authServices, TAuth } from '@domains';

export const BASE_URL = Platform.select({
  ios: 'http://localhost:3333',
  android: 'http://10.0.2.2:3333',
});

export const api = axios.create({
  baseURL: BASE_URL,
});

type TRegisterInterceptor = {
  authCredentials: TAuth | null;
  refreshCredentials: () => Promise<TAuth>;
  removeCredentials: () => void;
  saveCredentials: (ac: TAuth) => void;
};

export function registerInterceptor({
  authCredentials,
  refreshCredentials,
  removeCredentials,
  saveCredentials,
}: TRegisterInterceptor) {
  const interceptor = axios.interceptors.response.use(
    response => response,
    async responseError => {
      const originalRequest = responseError.config;
      const status = responseError.response?.status;
      const hasNotAuthCredentials = !authCredentials;
      const isRefreshTokenRequest =
        authServices.isRefreshTokenRequest(originalRequest);

      if (status === 401) {
        if (
          hasNotAuthCredentials ||
          isRefreshTokenRequest ||
          originalRequest.sent
        ) {
          removeCredentials();
          return Promise.reject(responseError);
        }

        originalRequest._retry = true;

        try {
          const ac = await refreshCredentials();
          saveCredentials(ac);
          originalRequest.headers.Authorization = `Bearer ${ac.auth.token}`;

          return api(originalRequest);
        } catch (error) {
          removeCredentials();
          return Promise.reject(error);
        }
      }

      return Promise.reject(responseError);
    },
  );

  return () => {
    axios.interceptors.response.eject(interceptor);
  };
}
