import { TThemeColors } from '../../theme/theme';

import { TIconNames } from './Icon';

export type TBasicIconProps = {
  color?: string;
  size?: number;
};

export type TIconProps = {
  name: TIconNames;
  size?: number;
  /** @default backgroundContrast */
  color?: TThemeColors;
  onPress?: () => void;
};
