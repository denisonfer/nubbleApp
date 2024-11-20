import { TAuthStackParamList } from './AuthStack';

declare global {
  namespace ReactNavigation {
    interface IRootParamList extends TAuthStackParamList {}
  }
}
