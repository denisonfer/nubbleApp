import { ViewStyle } from 'react-native';

import { createTheme } from '@shopify/restyle';

export const palette = {
  greenPrimary: '#074C4E',
  greenPrimaryLight: '#EAF6F6',
  carrotSecondary: '#F86F2D',
  carrotSecondaryLight: '#FAE6DD',
  greenSuccess: '#4ABC86',
  greenSuccessLight: '#D8FFEC',
  redError: '#EA3838',
  redErrorLight: '#FBECEC',

  grayBlack: '#000000',
  gray1: '#636363',
  gray2: '#8E8E8E',
  gray3: '#B3B3B3',
  gray4: '#E1E1E1',
  gray5: '#F5F5F5',
  grayWhite: '#FFFFFF',
};

export const theme = createTheme({
  colors: {
    ...palette,
    primary: palette.greenPrimary,
    primaryContrast: palette.grayWhite,

    buttonPrimary: palette.greenPrimary,

    background: palette.grayWhite,
    backgroundContrast: palette.grayBlack,

    error: palette.redError,
    errorLight: palette.redErrorLight,

    success: palette.greenSuccess,
    successLight: palette.greenSuccessLight,
  },
  spacing: {
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
