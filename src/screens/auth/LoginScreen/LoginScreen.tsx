import React, { useCallback } from 'react';
import { Pressable } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useToastServices } from '@services';

import {
  Box,
  Button,
  FormInput,
  FormPasswordInput,
  Screen,
  Text,
} from '@components';
import { TAuthScreenProps } from '@routes';

import { useAuthSignIn } from '@domains';

import { loginSchema, TLoginForm } from './loginSchema';

export function LoginScreen({ navigation }: TAuthScreenProps<'LoginScreen'>) {
  const { control, formState, handleSubmit } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { mutate, isLoading } = useAuthSignIn();
  const { showToast } = useToastServices();

  const submitForm = useCallback(({ email, password }: TLoginForm) => {
    const credentials = {
      email,
      password,
    };

    mutate(credentials, {
      onError: () => {
        showToast({
          type: 'error',
          message: 'Credenciais inválidas',
          position: 'top',
        });
      },
    });
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
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
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
          isLoading={isLoading}
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
