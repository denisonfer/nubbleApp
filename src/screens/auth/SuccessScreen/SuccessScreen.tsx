import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button } from '../../../components/Button/Button';
import { Icon } from '../../../components/Icon/Icon';
import { Screen } from '../../../components/Screen/Screen';
import { Text } from '../../../components/Text';
import { RootStackParamList } from '../../../routes/Routes';

type TScreenProps = NativeStackScreenProps<RootStackParamList, 'SuccessScreen'>;

export function SuccessScreen({ navigation, route }: TScreenProps) {
  const params = route.params;

  function navigateToLogin() {
    navigation.goBack();
  }

  return (
    <Screen>
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
