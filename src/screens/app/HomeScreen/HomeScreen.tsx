import React from 'react';
import { View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, Screen, Text } from '@components';
import { RootStackParamList, TAppStackParamList } from '@routes';

type TScreenProps = NativeStackScreenProps<TAppStackParamList, 'HomeScreen'>;
export function HomeScreen({ navigation }: TScreenProps) {
  return (
    <Screen>
      <Text preset="headingLarge">Home</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('SettingsScreen')}
      />
    </Screen>
  );
}
