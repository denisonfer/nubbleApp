import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button } from '../../../components/Button/Button';
import { Input } from '../../../components/Input/Input';
import { Screen } from '../../../components/Screen/Screen';
import { Text } from '../../../components/Text';
import { useAppResetNavigation } from '../../../hooks/useAppResetNavigation';
import { RootStackParamList } from '../../../routes/Routes';

type TScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPasswordScreen'
>;

export function ForgotPasswordScreen({ navigation }: TScreenProps) {
  const { reset } = useAppResetNavigation();

  function sendRecoverPassword() {
    reset({
      title: `Enviamos as instruções ${'\n'}para seu e-mail`,
      description:
        'Clique no link enviado no seu e-mail para recuperar sua senha',
      icon: { name: 'messageRoundIcon', color: 'primary' },
    });
  }

  return (
    <Screen canGoBack>
      <Text preset="headingLarge" mb="spc16">
        Esqueci minha senha
      </Text>
      <Text preset="paragraphLarge" mb="spc32">
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>

      <Input
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{ mb: 'spc48' }}
      />

      <Button title="Recuperar senha" onPress={sendRecoverPassword} />
    </Screen>
  );
}
