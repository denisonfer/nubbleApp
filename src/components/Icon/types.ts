import { TThemeColors } from '../../theme/theme';

import { TIconNames } from './Icon';

export type TBasicIconProps = {
  color?: string;
  size?: number;
  fillColor?: string;
};

export type TIconProps = {
  name: TIconNames;
  size?: number;
  /** @default backgroundContrast */
  color?: TThemeColors;
  fillColor?: TThemeColors;
  onPress?: () => void;
};
