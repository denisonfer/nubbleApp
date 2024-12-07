import React from 'react';

import { ActivityIndicator, Avatar, Box, Screen, Text } from '@components';
import { TAppScreenProps } from '@routes';

import { useUserGetById } from '@domains';

export function ProfileScreen({ route }: TAppScreenProps<'ProfileScreen'>) {
  const { userId } = route.params;

  const { user, isLoading, error } = useUserGetById(parseInt(userId));

  return (
    <Screen canGoBack paddingHorizontal="spc24">
      {isLoading && <ActivityIndicator color="primary" />}
      {error && <Text>Ops! Algo deu errado 😢</Text>}
      {user && (
        <Box alignItems="center" justifyContent="center">
          <Avatar profileURL={user.profileUrl} size={64} borderRadius={24} />
          <Text
            preset="headingMedium"
            bold
            mt="spc16"
            mb="spc4"
            color="grayBlack">
            {user.fullName}
          </Text>

          <Text preset="paragraphLarge" semiBold color="gray1">
            @{user.userName}
          </Text>
        </Box>
      )}
    </Screen>
  );
}
