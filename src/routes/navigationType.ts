import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TAppStackParamList } from './AppStack';
import { TAuthStackParamList } from './AuthStack';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface RootParamList extends TAuthStackParamList, TAppStackParamList {}
  }
}

export type TAppScreenProps<T extends keyof TAppStackParamList> =
  NativeStackScreenProps<TAppStackParamList, T>;
export type TAuthScreenProps<T extends keyof TAuthStackParamList> =
  NativeStackScreenProps<TAuthStackParamList, T>;
