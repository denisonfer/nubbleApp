import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TAppBottomTabParamList } from './AppBottomTab';
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

export type TAppBottomTabScreenProps<T extends keyof TAppBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TAppBottomTabParamList, T>,
    NativeStackScreenProps<TAppStackParamList, 'AppBottomTab'>
  >;
