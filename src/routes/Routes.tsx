import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { registerInterceptor } from '@api';
import { authServices } from '@domains';
import { useAuth } from '@services';
import { OnboardingStack } from './OnboardingStack';

export function Routes() {
  const { updateApiToken } = authServices;
  const { isSignedIn, credentials, user, removeCredentials, saveCredentials } =
    useAuth();

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

  return (
    <NavigationContainer>
      {/* {isSignedIn ? <AppStack /> : <AuthStack />} */}
      <OnboardingStack />
    </NavigationContainer>
  );
}
