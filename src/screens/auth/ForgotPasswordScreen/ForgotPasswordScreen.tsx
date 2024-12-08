import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useToastServices } from '@services';

import { Button, FormInput, Screen, Text } from '@components';
import { useAppResetNavigation } from '@hooks';
import { TAuthStackParamList } from '@routes';

import { useAuthForgotPassword } from '@domains';

import {
  forgotPasswordSchema,
  TForgotPasswordForm,
} from './forgotPasswordSchema';

const RESET_SCREENS: TAuthStackParamList['SuccessScreen'] = {
  title: `Enviamos as instruções ${'\n'}para seu e-mail`,
  description: 'Clique no link enviado no seu e-mail para recuperar sua senha',
  icon: { name: 'messageRoundIcon', color: 'primary' },
};

export function ForgotPasswordScreen() {
  const { reset } = useAppResetNavigation();
  const { showToast } = useToastServices();
  const { mutate, isLoading } = useAuthForgotPassword({
    onSuccess: () => {
      reset(RESET_SCREENS);
    },
    onError: () => {
      showToast({
        type: 'error',
        message: 'Email não localizado',
        position: 'top',
      });
    },
  });

  const { control, handleSubmit, formState } = useForm<TForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  function sendRecoverPassword({ email }: TForgotPasswordForm) {
    mutate(email);
  }

  return (
    <Screen canGoBack paddingHorizontal="spc24">
      <Text preset="headingLarge" mb="spc16">
        Esqueci minha senha
      </Text>
      <Text preset="paragraphLarge" mb="spc32">
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>

      <FormInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{ mb: 'spc48' }}
        name="email"
        control={control}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button
        title="Recuperar senha"
        onPress={handleSubmit(sendRecoverPassword)}
        disabled={!formState.isValid}
        isLoading={isLoading}
      />
    </Screen>
  );
}
