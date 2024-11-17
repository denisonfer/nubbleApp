import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  createBox,
  createRestyleComponent,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  spacingShorthand,
  SpacingShorthandProps,
} from '@shopify/restyle';
import { ComponentProps } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { TTheme } from '../../theme/theme';

export const Box = createBox<TTheme>();
export type TBoxProps = ComponentProps<typeof Box>;

export type TTouchableOpacityBoxProps = BackgroundColorProps<TTheme> &
  LayoutProps<TTheme> &
  SpacingProps<TTheme> &
  SpacingShorthandProps<TTheme> &
  BorderProps<TTheme> &
  TouchableOpacityProps;

export const TouchableOpacityBox = createRestyleComponent<
  TTouchableOpacityBoxProps,
  TTheme
>(
  [backgroundColor, layout, spacing, spacingShorthand, border],
  TouchableOpacity,
);
