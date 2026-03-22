import { ColorSchemeName } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { storage } from '../storage';
import { settingsService } from './settingsService';
import {
  TAppThemeScheme,
  TSettingsStore,
  TThemePreference,
} from './settingsType';

const useSettingsStore = create<TSettingsStore>()(
  persist(
    (set, get) => ({
      appThemeScheme: 'light',
      themePreference: 'system',
      setThemePreference: (newThemePreference: TThemePreference) => {
        const updatedAppTheme =
          settingsService.onThemePreferenceChange(newThemePreference);
        set({
          appThemeScheme: updatedAppTheme,
          themePreference: newThemePreference,
        });
      },
      onSystemThemeChange: (colorScheme: ColorSchemeName) => {
        const updatedAppTheme = settingsService.onSystemThemeChange(
          colorScheme,
          get().themePreference,
        );

        if (updatedAppTheme) {
          set({ appThemeScheme: updatedAppTheme });
        }
      },
    }),
    {
      name: '@Settings',
      storage: createJSONStorage(() => storage),
    },
  ),
);

export function useAppThemeScheme(): TAppThemeScheme {
  const appTheme = useSettingsStore(state => state.appThemeScheme);
  return appTheme;
}

export function useThemePreference(): TThemePreference {
  const themePreference = useSettingsStore(state => state.themePreference);
  return themePreference;
}

export function useSettingsService(): Pick<
  TSettingsStore,
  'setThemePreference' | 'onSystemThemeChange'
> {
  const setThemePreference = useSettingsStore(
    state => state.setThemePreference,
  );
  const onSystemThemeChange = useSettingsStore(
    state => state.onSystemThemeChange,
  );
  return { setThemePreference, onSystemThemeChange };
}
