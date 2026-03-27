import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { registerInterceptor } from '@api';
import { authServices } from '@domains';
import { useAuth } from '@services';
import { OnboardingStack } from './OnboardingStack';
import { TRouteStack, useRouter } from './hooks/useRouter';
import { LoadingScreen } from '@screens';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

const stackMapper: Record<TRouteStack, React.ReactNode> = {
  OnboardingStack: <OnboardingStack />,
  AuthStack: <AuthStack />,
  AppStack: <AppStack />,
  LoadingStack: <LoadingScreen />,
};

export function Routes() {
  const { updateApiToken } = authServices;
  const { credentials, user, removeCredentials, saveCredentials } = useAuth();
  const stack = useRouter();

  const Stack = stackMapper[stack];

  useEffect(() => {
    if (credentials) {
      updateApiToken(credentials.token);

      const interceptor = registerInterceptor({
        authCredentials: {
          auth: credentials,
          user: user!,
        },
        removeCredentials,
        saveCredentials,
      });

      return () => {
        interceptor();
      };
    }
  }, [credentials, user, removeCredentials, saveCredentials]);

  return <NavigationContainer>{Stack}</NavigationContainer>;
}
