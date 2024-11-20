import React from 'react';

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppBottomTab, TAppBottomTabParamList } from './AppBottomTab';

export type TAppStackParamList = {
  AppBottomTab: NavigatorScreenParams<TAppBottomTabParamList>;
};

const Stack = createNativeStackNavigator<TAppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="AppBottomTab"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Stack.Screen name="AppBottomTab" component={AppBottomTab} />
    </Stack.Navigator>
  );
}
