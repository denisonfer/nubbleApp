import React, { useCallback } from 'react';
import { Pressable } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';

import {
  Box,
  Button,
  FormInput,
  FormPasswordInput,
  Screen,
  Text,
} from '@components';
import { TAuthStackParamList } from '@routes';

import { loginSchema, TLoginForm } from './loginSchema';

type TScreenProps = NativeStackScreenProps<TAuthStackParamList, 'LoginScreen'>;

export function LoginScreen({ navigation }: TScreenProps) {
  const { control, formState, handleSubmit } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
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
          boxProps={{ mb: 'spc20' }}
        />

        <FormPasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          name="password"
          control={control}
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
