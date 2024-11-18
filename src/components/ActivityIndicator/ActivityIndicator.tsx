import React from 'react';
import {
  ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { TThemeColors } from '../../theme/theme';

type TActivityIndicatorProps = Omit<ActivityIndicatorProps, 'color'> & {
  color: TThemeColors;
};
export function ActivityIndicator({
  color,
  ...activityIndicatorProps
}: TActivityIndicatorProps) {
  const { colors } = useAppTheme();
  return (
    <RNActivityIndicator color={colors[color]} {...activityIndicatorProps} />
  );
}
