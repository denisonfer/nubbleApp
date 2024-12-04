import AsyncStorage from '@react-native-async-storage/async-storage';

import { TStorage } from '../storageTypes';

export const asyncStorage: TStorage = {
  getItem: async key => {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  },

  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  removeItem: async key => {
    await AsyncStorage.removeItem(key);
  },
};
