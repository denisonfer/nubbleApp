import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable } from 'react-native';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button/Button';
import { FormInput } from '../../../components/Input/FormInput/FormInput';
import { FormPasswordInput } from '../../../components/Input/PasswordInput/FormPasswordInput/FormPasswordInput';
import { Screen } from '../../../components/Screen/Screen';
import { Text } from '../../../components/Text';
import { RootStackParamList } from '../../../routes/Routes';
import { TLoginForm } from './types';

type TScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export function LoginScreen({ navigation }: TScreenProps) {
  const { control, formState, handleSubmit } = useForm<TLoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const submitForm = useCallback(({ email, password }: TLoginForm) => {
    console.log('email', email);
    console.log('password', password);
  }, []);
  function navigateToSignUp() {
    navigation.navigate('SignUpScreen');
  }

  function navigateToForgotPassword() {
    navigation.navigate('ForgotPasswordScreen');
  }

  return (
    <Screen>
      <Box paddingHorizontal="spc24">
        <Text preset="headingLarge" mb="spc8">
          Olá!
        </Text>
        <Text preset="paragraphLarge" mb="spc40">
          Digite seu e-mail e senha para entrar{' '}
        </Text>

        <FormInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          name="email"
          control={control}
          rules={{
            required: 'E-mail obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'E-mail inválido',
            },
          }}
          boxProps={{ mb: 'spc20' }}
        />

        <FormPasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          name="password"
          control={control}
          rules={{
            required: 'Senha obrigatória',
          }}
          boxProps={{ mb: 'spc20' }}
        />

        <Pressable onPress={navigateToForgotPassword}>
          <Text preset="paragraphSmall" bold color="primary">
            Esqueci minha senha
          </Text>
        </Pressable>

        <Button
          mt="spc48"
          title="Entrar"
          onPress={handleSubmit(submitForm)}
          disabled={!formState.isValid}
        />
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
