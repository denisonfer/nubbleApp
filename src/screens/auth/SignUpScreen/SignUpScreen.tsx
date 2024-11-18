import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';
import { PasswordInput } from '../../../components/Input/PasswordInput/PasswordInput';
import { Screen } from '../../../components/Screen/Screen';
import { Text } from '../../../components/Text';
import { RootStackParamList } from '../../../routes/Routes';

type TScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export function SignUpScreen() {
  const navigation = useNavigation<TScreenProps['navigation']>();
  function submitForm() {
    navigation.navigate('SuccessScreen', {
      title: 'Sua conta foi criada com sucesso!',
      description: 'Agora é só fazer login na nossa plataforma',
      icon: { name: 'checkRound', color: 'success' },
    });
  }

  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="spc32">
        Criar uma conta
      </Text>

      <Input label="Seu username" placeholder="@" boxProps={{ mb: 'spc16' }} />

      <Input
        label="Nome completo"
        placeholder="Digite seu nome completo"
        boxProps={{ mb: 'spc16' }}
      />

      <Input
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{ mb: 'spc16' }}
      />

      <PasswordInput label="Senha" placeholder="Digite sua senha" />

      <Button mt="spc48" title="Criar minha conta" onPress={submitForm} />
    </Screen>
  );
}
