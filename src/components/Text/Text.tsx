import React, { ComponentProps } from 'react';
import { TextStyle } from 'react-native';

import { createText } from '@shopify/restyle';

import { TTheme } from '../../theme/theme';

const SRText = createText<TTheme>();
type TSRTextProps = ComponentProps<typeof SRText>;

type TProps = TSRTextProps & {
  children: React.ReactNode;
  preset?: TTextVariants;
  bold?: boolean;
  italic?: boolean;
  semiBold?: boolean;
};

export function Text({
  children,
  preset = 'paragraphMedium',
  style,
  bold,
  italic,
  semiBold,
  ...tSRTextProps
}: TProps) {
  const presetStyle = $fontSizes[preset];
  const fontFamily = getFontFamily(preset, bold, italic, semiBold);

  return (
    <SRText
      color="backgroundContrast"
      style={[presetStyle, { fontFamily }, style]}
      {...tSRTextProps}>
      {children}
    </SRText>
  );
}

function getFontFamily(
  preset: TTextVariants,
  bold?: boolean,
  italic?: boolean,
  semiBold?: boolean,
) {
  if (
    preset === 'headingLarge' ||
    preset === 'headingMedium' ||
    preset === 'headingSmall'
  ) {
    return italic ? $fontFamilies.boldItalic : $fontFamilies.bold;
  }

  switch (true) {
    case bold && italic:
      return $fontFamilies.boldItalic;
    case bold:
      return $fontFamilies.bold;
    case italic:
      return $fontFamilies.italic;
    case semiBold && italic:
      return $fontFamilies.mediumItalic;
    case semiBold:
      return $fontFamilies.medium;
    default:
      return $fontFamilies.regular;
  }
}

type TTextVariants =
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaption'
  | 'paragraphCaptionSmall';

export const $fontSizes: Record<TTextVariants, TextStyle> = {
  headingLarge: { fontSize: 32, lineHeight: 38.4 },
  headingMedium: { fontSize: 22, lineHeight: 26.4 },
  headingSmall: { fontSize: 18, lineHeight: 23.4 },

  paragraphLarge: { fontSize: 18, lineHeight: 25.2 },
  paragraphMedium: { fontSize: 16, lineHeight: 22.4 },
  paragraphSmall: { fontSize: 14, lineHeight: 19.6 },

  paragraphCaption: { fontSize: 12, lineHeight: 16.8 },
  paragraphCaptionSmall: { fontSize: 10, lineHeight: 14 },
};

export const $fontFamilies = {
  black: 'Satoshi-Black',
  blackItalic: 'Satoshi-BlackItalic',
  bold: 'Satoshi-Bold',
  boldItalic: 'Satoshi-BoldItalic',
  italic: 'Satoshi-Italic',
  light: 'Satoshi-Light',
  lightItalic: 'Satoshi-LightItalic',
  medium: 'Satoshi-Medium',
  mediumItalic: 'Satoshi-MediumItalic',
  regular: 'Satoshi-Regular',
};
