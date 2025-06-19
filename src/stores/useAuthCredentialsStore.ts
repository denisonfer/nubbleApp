import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TAuthCredentialsServices } from '@services';

import { TAuth, TUser } from '@domains';

import { storage } from '../services/storage';

export const useAuthCredentialsStore = create<TAuthCredentialsServices>()(
  persist(
    (set, get) => ({
      isLoading: true,
      authCredentials: null,
      saveCredentials: (ac: TAuth) => set({ authCredentials: ac }),
      removeCredentials: () => set({ authCredentials: null }),
      updateUser: (user: TUser) =>
        set({
          authCredentials: {
            ...get().authCredentials!,
            user,
          },
        }),
    }),
    {
      name: '@AuthCredentials',
      storage: storage,
    },
  ),
);
