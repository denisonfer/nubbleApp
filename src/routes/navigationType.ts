import { TAuthStackParamList } from './AuthStack';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IRootParamList extends TAuthStackParamList {}
  }
}
