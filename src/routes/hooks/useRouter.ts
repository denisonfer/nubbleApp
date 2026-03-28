import { settingsService, useIsActiveOnboarding } from '@services';
import { useAuthCredentialsStore } from '@stores';
import { useEffect } from 'react';

export type TRouteStack =
  | 'LoadingStack'
  | 'AuthStack'
  | 'AppStack'
  | 'OnboardingStack';

export function useRouter(): TRouteStack {
  const isActiveOnboarding = useIsActiveOnboarding();
  const { authCredentials, isLoading } = useAuthCredentialsStore();

  useEffect(() => {
    if (!isLoading) {
      settingsService.hideSplashScreen();
    }
  }, [isLoading]);

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
