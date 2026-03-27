import { useIsActiveOnboarding } from '@services';
import { useAuthCredentialsStore } from '@stores';

export type TRouteStack =
  | 'LoadingStack'
  | 'AuthStack'
  | 'AppStack'
  | 'OnboardingStack';

export function useRouter(): TRouteStack {
  const isActiveOnboarding = useIsActiveOnboarding();
  const { authCredentials, isLoading } = useAuthCredentialsStore();

  if (isLoading) {
    return 'LoadingStack';
  }

  if (isActiveOnboarding) {
    return 'OnboardingStack';
  }

  if (authCredentials) {
    return 'AppStack';
  }

  return 'AuthStack';
}
