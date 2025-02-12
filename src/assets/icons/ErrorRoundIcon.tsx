import React from 'react';

import { Circle, Path, Svg } from 'react-native-svg';

import { TBasicIconProps } from '../../components/Icon/types';
import { palette } from '../../theme/theme';

export function ErrorRoundIcon({
  size = 20,
  color = palette.redError,
}: TBasicIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Circle cx="24" cy="24" r="24" fill={color} />
      <Path
        d="M15 15.0004L31.2279 31.9996M15.7728 32L32 15"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
      />
    </Svg>
  );
}
