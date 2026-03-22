import {
  settingsService,
  useAppThemeScheme,
  useSettingsService,
} from '@services';
import { darkTheme, theme, TTheme } from '@theme';
import { useEffect } from 'react';
import { Appearance } from 'react-native';

export function useAppColorScheme(): TTheme {
  const appThemeScheme = useAppThemeScheme();

  const { onSystemThemeChange } = useSettingsService();
  const themeScheme = appThemeScheme === 'light' ? theme : darkTheme;

  useEffect(() => {
    onSystemThemeChange(Appearance.getColorScheme());
  }, [onSystemThemeChange]);

  useEffect(() => {
    const $theme = Appearance.addChangeListener(({ colorScheme }) => {
      onSystemThemeChange(colorScheme);
    });

    return () => $theme.remove();
  }, [onSystemThemeChange]);

  useEffect(() => {
    settingsService.handleStatusBar(appThemeScheme);
  }, [appThemeScheme]);

  return themeScheme;
}
