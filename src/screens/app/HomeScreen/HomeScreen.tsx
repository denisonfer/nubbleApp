import React from 'react';

import { Button, Screen, Text } from '@components';
import { TAppBottomTabScreenProps } from '@routes';

export function HomeScreen({
  navigation,
}: TAppBottomTabScreenProps<'HomeScreen'>) {
  return (
    <Screen>
      <Text preset="headingLarge">Home Screen</Text>
      <Button
        title="Favoritos"
        onPress={() => navigation.navigate('FavoritesScreen')}
      />
    </Screen>
  );
}
