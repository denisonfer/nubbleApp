import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useAuthCredentials } from '@services';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export function Routes() {
  const { authCredentials } = useAuthCredentials();
  const isSignedIn = authCredentials !== null;

  return (
    <NavigationContainer>
      {isSignedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
