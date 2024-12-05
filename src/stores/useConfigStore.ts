import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { BASE_URL, DEFAULT_ENV, TEnv, TPlatform } from '@infra';

import { storage } from '@services';

export type TConfigStore = {
  env: TEnv;
  config: TPlatform;
  setEnv: (env: TEnv) => void;
};

export const useConfigStore = create<TConfigStore>()(
  persist(
    set => ({
      env: DEFAULT_ENV,
      config: BASE_URL[DEFAULT_ENV],
      setEnv: (env: TEnv) => set({ env, config: BASE_URL[env] }),
    }),
    {
      name: '@Config',
      storage: storage,
      partialize: ({ config, ...state }) => state,
      onRehydrateStorage() {
        return state => {
          if (!state) return;
          state.config = BASE_URL[state.env];
        };
      },
    },
  ),
);
