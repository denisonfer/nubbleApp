import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export function Routes() {
  const isSignedIn = false;

  return (
    <NavigationContainer>
      {isSignedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
