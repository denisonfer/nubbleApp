import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TAuthCredentialsServices } from '@services';

import { TAuth } from '@domains';

import { storage } from '../services/storage';

export const useAuthCredentialsStore = create<TAuthCredentialsServices>()(
  persist(
    set => ({
      authCredentials: null,
      saveCredentials: (ac: TAuth) => set({ authCredentials: ac }),
      removeCredentials: () => set({ authCredentials: null }),
    }),
    {
      name: '@AuthCredentials',
      storage: storage,
    },
  ),
);
