import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, Screen, Text } from '@components';
import { TAppStackParamList } from '@routes';

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
