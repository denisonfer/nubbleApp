import { Platform } from 'react-native';

import axios from 'axios';

export const api = axios.create({
  baseURL: Platform.select({
    ios: 'http://localhost:3333',
    android: 'http://10.0.2.2:3333',
  }),
});
