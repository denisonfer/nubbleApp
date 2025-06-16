import { ReactNode } from 'react';

import { TBoxProps } from '../Box/Box';

export type TScreenProps = TBoxProps & {
  children: ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
  title?: string;
  HeaderComponent?: ReactNode;
};
