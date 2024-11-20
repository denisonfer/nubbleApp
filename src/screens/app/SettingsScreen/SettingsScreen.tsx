import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen, Text } from '@components';
import { TAppStackParamList } from '@routes';

type TScreenProps = NativeStackScreenProps<
  TAppStackParamList,
  'SettingsScreen'
>;

export function SettingsScreen({}: TScreenProps) {
  return (
    <Screen>
      <Text preset="headingLarge">Settings</Text>
      {/* <Button title="Settings"  /> */}
    </Screen>
  );
}
