import React from 'react';

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  CameraScreen,
  PostCommentScreen,
  ProfileScreen,
  PublishPostScreen,
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
  PublishPostScreen: {
    imageUri: string;
  };
  CameraScreen: undefined;
};

const Stack = createNativeStackNavigator<TAppStackParamList>();

type TAppStackProps = {
  initialRouteName?: keyof TAppStackParamList;
};

export function AppStack({
  initialRouteName = 'AppBottomTab',
}: TAppStackProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Stack.Screen name="AppBottomTab" component={AppBottomTab} />
      <Stack.Screen name="PostCommentScreen" component={PostCommentScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="PublishPostScreen" component={PublishPostScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
}
