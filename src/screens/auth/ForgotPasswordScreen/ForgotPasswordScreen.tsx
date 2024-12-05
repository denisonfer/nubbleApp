import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, FormInput, Screen, Text } from '@components';
import { useAppResetNavigation } from '@hooks';

import {
  forgotPasswordSchema,
  TForgotPasswordForm,
} from './forgotPasswordSchema';

export function ForgotPasswordScreen() {
  const { reset } = useAppResetNavigation();

  const { control, handleSubmit, formState } = useForm<TForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  function sendRecoverPassword({ email }: TForgotPasswordForm) {
    console.log('email: ', email);
    reset({
      title: `Enviamos as instruções ${'\n'}para seu e-mail`,
      description:
        'Clique no link enviado no seu e-mail para recuperar sua senha',
      icon: { name: 'messageRoundIcon', color: 'primary' },
    });
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
      />

      <Button
        title="Recuperar senha"
        onPress={handleSubmit(sendRecoverPassword)}
        disabled={!formState.isValid}
      />
    </Screen>
  );
}
