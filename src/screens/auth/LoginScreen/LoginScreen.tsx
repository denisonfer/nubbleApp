import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';
import { PasswordInput } from '../../../components/Input/PasswordInput/PasswordInput';
import { Screen } from '../../../components/Screen/Screen';
import { Text } from '../../../components/Text';
import { RootStackParamList } from '../../../routes/Routes';

type TScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;
export function LoginScreen() {
  const navigation = useNavigation<TScreenProps['navigation']>();

  const navigateToSignUp = useCallback(() => {
    navigation.navigate('SignUpScreen');
  }, []);

  return (
    <Screen>
      <Box paddingHorizontal="spc24">
        <Text preset="headingLarge" mb="spc8">
          Olá!
        </Text>
        <Text preset="paragraphLarge" mb="spc40">
          Digite seu e-mail e senha para entrar{' '}
        </Text>

        <Input
          label="E-mail"
          placeholder="Digite seu e-mail"
          boxProps={{ mb: 'spc20' }}
        />

        <PasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          boxProps={{ mb: 'spc20' }}
        />

        <Text preset="paragraphSmall" bold color="primary">
          Esqueci minha senha
        </Text>

        <Button mt="spc48" title="Entrar" />
        <Button
          onPress={navigateToSignUp}
          preset="outline"
          mt="spc12"
          title="Criar uma conta"
        />
      </Box>
    </Screen>
  );
}
