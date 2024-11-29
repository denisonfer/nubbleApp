import { Platform } from 'react-native';

import axios from 'axios';

export const api = axios.create({
  baseURL: Platform.select({
    ios: 'http://localhost:3333',
    android: 'http://10.0.2.2:3333',
  }),
  headers: {
    Authorization: `Bearer Mw.t7ev3KeeJGdHQpbFOOG5Ol_V9kg7XHHhBevnwAJU2Dy85o8mNfNkHTzTjVFI`,
  },
});
