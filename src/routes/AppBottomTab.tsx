import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  FavoritesScreen,
  HomeScreen,
  NewPostScreen,
  ProfileScreen,
} from '@screens';

import { AppTabBar } from './AppTabBar';

export type TAppBottomTabParamList = {
  HomeScreen: undefined;
  NewPostScreen: undefined;
  FavoritesScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<TAppBottomTabParamList>();

function renderAppTabBar(props: BottomTabBarProps) {
  return <AppTabBar {...props} />;
}

export function AppBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={renderAppTabBar}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="NewPostScreen" component={NewPostScreen} />
      <Tab.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
