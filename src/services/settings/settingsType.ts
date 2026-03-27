import { ColorSchemeName } from 'react-native';

export type TAppThemeScheme = 'light' | 'dark';

export type TThemePreference = 'system' | TAppThemeScheme;

export type TSettingsStore = {
  isActiveOnboarding: boolean;
  appThemeScheme: TAppThemeScheme;
  themePreference: TThemePreference;
  setThemePreference: (preference: TThemePreference) => void;
  onSystemThemeChange: (colorScheme: ColorSchemeName) => void;
  finishOnboarding: () => void;
};
