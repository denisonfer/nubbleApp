export type TEnv = 'development' | 'staging' | 'production';
export type TPlatform = {
  android: string;
  ios: string;
  web: string;
};

export type TBaseUrl = Record<TEnv, TPlatform>;

export const DEFAULT_ENV: TEnv = __DEV__ ? 'staging' : 'production';

export const BASE_URL: TBaseUrl = {
  development: {
    android: 'http://10.0.2.2:3333',
    ios: 'http://localhost:3333',
    web: 'http://localhost:3333',
  },
  staging: {
    android: 'http://10.0.2.2:3333',
    ios: 'http://localhost:3333',
    web: 'http://localhost:3333',
  },
  production: {
    android: 'http://10.0.2.2:3333',
    ios: 'http://localhost:3333',
    web: 'http://localhost:3333',
  },
} as const;
