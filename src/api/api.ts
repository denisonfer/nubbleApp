import { Platform } from 'react-native';

import axios from 'axios';

import { authServices, TAuth } from '@domains';

export const BASE_URL = Platform.select({
  ios: `http://${process.env.IP_ADDRESS}:3333`,
  android: 'http://10.0.2.2:3333',
});

/** Base URL do MinIO/S3 em dev (localhost no device não resolve para o Mac) */
export const STORAGE_BASE_URL = Platform.select({
  ios: `http://${process.env.IP_ADDRESS}:9000`,
  android: 'http://10.0.2.2:9000',
});

/**
 * Converte URLs com localhost para o host acessível no device/simulator.
 * No iOS físico, localhost é o próprio aparelho; no Android emulador, 10.0.2.2 é o host.
 */
export function normalizeStorageURL(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return url ?? '';
  if (!url.includes('localhost')) return url;
  const base = STORAGE_BASE_URL ?? 'http://localhost:9000';
  return url.replace(/^https?:\/\/localhost(:\d+)?/, base.replace(/\/$/, ''));
}

export const api = axios.create({
  baseURL: BASE_URL,
});

type TRegisterInterceptor = {
  authCredentials: TAuth | null;
  removeCredentials: () => void;
  saveCredentials: (ac: TAuth) => void;
};

export function registerInterceptor({
  authCredentials,
  removeCredentials,
  saveCredentials,
}: TRegisterInterceptor) {
  const interceptor = api.interceptors.response.use(
    response => {
      return response;
    },
    async responseError => {
      const originalRequest = responseError.config;

      const status = responseError.response?.status;

      const hasNotAuthCredentials = !authCredentials;
      const hasNotRefreshToken = !authCredentials?.auth.refreshToken;

      const isRefreshTokenRequest =
        authServices.isRefreshTokenRequest(originalRequest);

      if (status === 401) {
        if (
          hasNotAuthCredentials ||
          hasNotRefreshToken ||
          isRefreshTokenRequest ||
          originalRequest.sent
        ) {
          removeCredentials();
          return Promise.reject(responseError);
        }

        originalRequest.sent = true;

        try {
          const newAuthCredentials = await authServices.refreshCredentials(
            authCredentials.auth.refreshToken,
          );

          saveCredentials(newAuthCredentials);
          originalRequest.headers.Authorization = `Bearer ${newAuthCredentials.auth.token}`;
          return api(originalRequest);
        } catch (error) {
          removeCredentials();
          return Promise.reject(responseError);
        }
      }

      return Promise.reject(responseError);
    },
  );

  return () => {
    api.interceptors.response.eject(interceptor);
  };
}
