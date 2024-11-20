import { TAuthStackParamList } from './AuthStack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TAuthStackParamList {}
  }
}
