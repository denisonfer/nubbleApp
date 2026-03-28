import { colors } from '@theme';
import { Appearance, ColorSchemeName, Platform, StatusBar } from 'react-native';
import { TAppThemeScheme, TThemePreference } from './settingsType';
import RNBootSplash from 'react-native-bootsplash';

function onThemePreferenceChange(
  preference: TThemePreference,
): TAppThemeScheme {
  if (preference === 'system') {
    const currentSystemTheme = Appearance.getColorScheme();
    return currentSystemTheme ? currentSystemTheme : 'light';
  }
  return preference;
}

function onSystemThemeChange(
  colorScheme: ColorSchemeName,
  themePreference: TThemePreference,
): TAppThemeScheme | null {
  if (themePreference === 'system') {
    return colorScheme ? colorScheme : 'light';
  }
  return null;
}

function handleStatusBar(appColorScheme: TAppThemeScheme) {
  StatusBar.setBarStyle(
    appColorScheme === 'light' ? 'dark-content' : 'light-content',
    true,
  );
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(
      appColorScheme === 'dark'
        ? colors.darkTheme.grayBlack
        : colors.lightTheme.grayWhite,
    );
  }
}

async function hideSplashScreen() {
  try {
    const isVisible = await RNBootSplash.isVisible();
    if (isVisible) {
      await RNBootSplash.hide({ fade: true });
    }
  } catch (error) {
    console.error(error);
    await RNBootSplash.hide({ fade: true });
  }
}

export const settingsService = {
  onThemePreferenceChange,
  onSystemThemeChange,
  handleStatusBar,
  hideSplashScreen,
};
