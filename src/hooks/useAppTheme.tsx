import { useTheme } from '@shopify/restyle';

import { TTheme } from '../theme/theme';

export function useAppTheme() {
  return useTheme<TTheme>();
}
