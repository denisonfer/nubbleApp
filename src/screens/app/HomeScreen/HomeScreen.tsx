import React from 'react';

import { Button, Screen, Text } from '@components';
import { TAppScreenProps } from '@routes';

export function HomeScreen({ navigation }: TAppScreenProps<'HomeScreen'>) {
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
