import { create } from 'zustand';

import { TAuthCredentialsServices } from '@services';

import { TAuth } from '@domains';

export const useAuthCredentialsStore = create<TAuthCredentialsServices>(
  set => ({
    authCredentials: null,
    saveCredentials: (ac: TAuth) => set({ authCredentials: ac }),
    removeCredentials: () => set({ authCredentials: null }),
  }),
);
