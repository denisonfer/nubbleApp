import { Platform } from 'react-native';

export const platform: 'android' | 'ios' | 'web' = Platform.select({
  android: 'android',
  ios: 'ios',
  web: 'web',
}) as 'android' | 'ios' | 'web';
