import { useTheme } from '@shopify/restyle';
import React from 'react';
import {
  ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native';
import { TTheme, TThemeColors } from '../../theme/theme';

type TActivityIndicatorProps = Omit<ActivityIndicatorProps, 'color'> & {
  color: TThemeColors;
};
export function ActivityIndicator({
  color,
  ...activityIndicatorProps
}: TActivityIndicatorProps) {
  const { colors } = useTheme<TTheme>();
  return (
    <RNActivityIndicator color={colors[color]} {...activityIndicatorProps} />
  );
}
