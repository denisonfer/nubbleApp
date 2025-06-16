import React from 'react';

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  PostCommentScreen,
  ProfileScreen,
  SearchScreen,
  SettingsScreen,
} from '@screens';

import { AppBottomTab, TAppBottomTabParamList } from './AppBottomTab';

export type TAppStackParamList = {
  AppBottomTab: NavigatorScreenParams<TAppBottomTabParamList>;
  PostCommentScreen: {
    postId: string;
    postAuthorId: string;
  };
  ProfileScreen: {
    userId: string;
  };
  SettingsScreen: undefined;
  SearchScreen: undefined;
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
      <Stack.Screen name="PostCommentScreen" component={PostCommentScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}
