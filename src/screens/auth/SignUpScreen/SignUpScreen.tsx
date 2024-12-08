import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  ActivityIndicator,
  Button,
  FormInput,
  FormPasswordInput,
  Screen,
  Text,
} from '@components';
import { useAppResetNavigation } from '@hooks';
import { TAuthStackParamList } from '@routes';

import { useAuthSignUp } from '@domains';

import { useAsyncValidation } from './hooks/useAsyncValidator';
import { signUpSchema, TSignUpForm } from './signUpSchema';

const DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
};

const RESET_SCREENS: TAuthStackParamList['SuccessScreen'] = {
  title: 'Sua conta foi criada com sucesso!',
  description: 'Agora é só fazer login na nossa plataforma',
  icon: { name: 'checkRound', color: 'success' },
};

export function SignUpScreen() {
  const { reset } = useAppResetNavigation();
  const { mutate, isLoading } = useAuthSignUp({
    onSuccess: () => {
      reset(RESET_SCREENS);
    },
  });
  const { control, handleSubmit, formState, watch, getFieldState } =
    useForm<TSignUpForm>({
      resolver: zodResolver(signUpSchema),
      defaultValues: DEFAULT_VALUES,
      mode: 'onChange',
    });

  const { usernameValidation, emailValidation } = useAsyncValidation({
    watch,
    getFieldState,
  });

  function submitForm(data: TSignUpForm) {
    mutate(data);
  }

  return (
    <Screen canGoBack scrollable paddingHorizontal="spc24">
      <Text preset="headingLarge" mb="spc32">
        Criar uma conta
      </Text>

      <FormInput
        name="firstName"
        control={control}
        label="Nome"
        placeholder="Digite seu nome"
        boxProps={{ mb: 'spc16' }}
        autoCapitalize="words"
      />

      <FormInput
        name="lastName"
        control={control}
        label="Sobrenome"
        placeholder="Digite seu sobrenome"
        boxProps={{ mb: 'spc16' }}
        autoCapitalize="words"
      />

      <FormInput
        name="username"
        control={control}
        label="Seu username"
        placeholder="@"
        boxProps={{ mb: 'spc16' }}
        errorMessage={usernameValidation.errorMessage}
        RightComponent={
          usernameValidation.isFetching ? (
            <ActivityIndicator color="primary" size="small" />
          ) : undefined
        }
      />

      <FormInput
        name="email"
        control={control}
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{ mb: 'spc16' }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        errorMessage={emailValidation.errorMessage}
        RightComponent={
          emailValidation.isFetching ? (
            <ActivityIndicator color="primary" size="small" />
          ) : undefined
        }
      />

      <FormPasswordInput
        name="password"
        control={control}
        label="Senha"
        placeholder="Digite sua senha"
      />

      <Button
        mt="spc48"
        title="Criar minha conta"
        onPress={handleSubmit(submitForm)}
        isLoading={isLoading}
        disabled={
          !formState.isValid ||
          usernameValidation.notReady ||
          emailValidation.notReady
        }
      />
    </Screen>
  );
}
