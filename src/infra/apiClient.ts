/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

import { authServices } from '@domains';
import { useAuthCredentialsStore, useConfigStore } from '@stores';
import { platform } from '@utils';

type THeaders = Record<string, string>;
type TApiClientRequestOptions<TData> = {
  method: Method;
  url: string;
  data: TData;
  headers?: THeaders;
  isRefresh?: boolean;
  isPaginated?: boolean;
};

axios.interceptors.response.use(
  response => response,
  err => {
    const removeCredentials =
      useAuthCredentialsStore.getState().removeCredentials;
    const { logout } = authServices;

    const axiosError: AxiosError = err;

    if (!axiosError?.isAxiosError) {
      throw err;
    }

    if (err.response.status === 401) {
      try {
        logout();
        removeCredentials();
      } catch (error) {
        throw error;
      }
    }

    throw err;
  },
);

async function getHeaders(data?: any, isRefresh?: boolean): Promise<THeaders> {
  const authToken =
    useAuthCredentialsStore.getState().authCredentials?.auth.token;

  const headers: THeaders = {
    'Content-Type':
      data instanceof FormData ? 'multipart/form-data' : 'application/json',
    Origin: useConfigStore.getState().config[platform],
  };

  if (isRefresh) {
    return headers;
  }

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  return headers;
}

export const request = async <T = any>({
  method,
  url,
  data,
  headers,
  isRefresh,
  isPaginated,
  ...params
}: TApiClientRequestOptions<T>): Promise<T> => {
  const formattedParams = { ...params };

  // Remove campos não definidos
  Object.entries(formattedParams).forEach(([key, item]) => {
    if (item === undefined) delete (formattedParams as any)[key];
  });

  const axiosConfig: AxiosRequestConfig = {
    baseURL: useConfigStore.getState().config[platform],
    method,
    url,
    headers: { ...(headers ?? {}), ...(await getHeaders(data, isRefresh)) },
    ...formattedParams,
    params: method === 'GET' ? formattedParams : undefined,
    data: method === 'POST' || method === 'PUT' ? data : undefined,
  };

  const response = await axios.request<T>(axiosConfig);

  if (isPaginated) {
    return response.data;
  }

  return response.data;
};

export const createApiClient = () => {
  return {
    get: <T = any>(url: string, params?: any) =>
      request<T>({ method: 'GET', url, ...params }),
    post: <T = any>(url: string, body?: any, params?: any) =>
      request<T>({ method: 'POST', url, data: body, ...params }),
    put: <T = any>(url: string, body?: any) =>
      request<T>({ method: 'PUT', url, data: body }),
    del: <T = any>(url: string, params?: any) =>
      request<T>({ method: 'DELETE', url, data: params }),
  };
};
