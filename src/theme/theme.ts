import { ViewStyle } from 'react-native';

import { createTheme } from '@shopify/restyle';
import { colors } from './colors';

export const theme = createTheme({
  colors: colors.lightTheme,
  spacing: {
    spc0: 0,
    spc4: 4,
    spc8: 8,
    spc10: 10,
    spc12: 12,
    spc14: 14,
    spc16: 16,
    spc20: 20,
    spc24: 24,
    spc32: 32,
    spc40: 40,
    spc48: 48,
    spc56: 56,
    spc64: 64,
  },
  borderRadii: {
    br8: 8,
    br12: 12,
    br16: 16,
  },
  textVariants: {
    defaults: {},
  },
});

export const $shadowProps: ViewStyle = {
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.05,
  shadowRadius: 3.84,
};

export type TTheme = typeof theme;
export type TThemeColors = keyof TTheme['colors'];
