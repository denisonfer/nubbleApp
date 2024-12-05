import React from 'react';

import { Button, Icon, Screen, Text } from '@components';
import { TAuthScreenProps } from '@routes';

export function SuccessScreen({
  navigation,
  route,
}: TAuthScreenProps<'SuccessScreen'>) {
  const params = route.params;

  function navigateToLogin() {
    navigation.goBack();
  }

  return (
    <Screen paddingHorizontal="spc24">
      <Icon {...params.icon} size={48} />

      <Text preset="headingLarge" mt="spc24" mb="spc16">
        {params.title}
      </Text>

      <Text preset="paragraphLarge" mb="spc40">
        {params.description}
      </Text>

      <Button title="Voltar ao início" onPress={navigateToLogin} />
    </Screen>
  );
}
