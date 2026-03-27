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
      isActiveOnboarding: true,
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
      finishOnboarding: () => {
        set({ isActiveOnboarding: false });
      },
    }),
    {
      name: '@Settings',
      storage: createJSONStorage(() => storage),
    },
  ),
);

export function useIsActiveOnboarding(): boolean {
  const isActiveOnboarding = useSettingsStore(
    state => state.isActiveOnboarding,
  );
  return isActiveOnboarding;
}

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
  'setThemePreference' | 'onSystemThemeChange' | 'finishOnboarding'
> {
  const setThemePreference = useSettingsStore(
    state => state.setThemePreference,
  );
  const onSystemThemeChange = useSettingsStore(
    state => state.onSystemThemeChange,
  );
  const finishOnboarding = useSettingsStore(state => state.finishOnboarding);

  return { setThemePreference, onSystemThemeChange, finishOnboarding };
}
