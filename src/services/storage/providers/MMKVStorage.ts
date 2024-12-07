import { MMKV } from 'react-native-mmkv';

import { TStorage } from '../storageTypes';

export const storageMMKV = new MMKV({ id: 'NubbleApp' });

export const MMKVStorage: TStorage = {
  getItem: key => {
    const value = storageMMKV.getString(key);
    if (!value) return null;
    return JSON.parse(value);
  },
  setItem: async (key, value) => {
    storageMMKV.set(key, JSON.stringify(value));
  },
  removeItem: key => {
    storageMMKV.delete(key);
  },

  getAllKeys: async () => {
    return storageMMKV.getAllKeys();
  },
};
