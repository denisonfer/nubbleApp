import React, { useCallback } from 'react';

import { useAuthCredentials } from '@services';

import { Box, Icon, Screen, Text } from '@components';
import { TAppBottomTabScreenProps } from '@routes';

export function MyProfileScreen({
  navigation,
}: TAppBottomTabScreenProps<'MyProfileScreen'>) {
  const { authCredentials } = useAuthCredentials();

  const name = authCredentials?.user.fullName;

  const navigateToSettingsScreen = useCallback(() => {
    navigation.navigate('SettingsScreen');
  }, [navigation]);

  return (
    <Screen paddingHorizontal="spc24">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        {name && <Text preset="headingMedium">{name}</Text>}
        <Icon name="settings" onPress={navigateToSettingsScreen} />
      </Box>
    </Screen>
  );
}
