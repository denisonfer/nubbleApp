import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/Button/Button';
import { FormInput } from '../../../components/Input/FormInput/FormInput';
import { FormPasswordInput } from '../../../components/Input/PasswordInput/FormPasswordInput/FormPasswordInput';
import { Screen } from '../../../components/Screen/Screen';
import { Text } from '../../../components/Text';
import { useAppResetNavigation } from '../../../hooks/useAppResetNavigation';
import { RootStackParamList } from '../../../routes/Routes';
import { signUpSchema, TSignUpForm } from './signUpSchema';

type TScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export function SignUpScreen({ navigation }: TScreenProps) {
  const { reset } = useAppResetNavigation();
  const { control, handleSubmit, formState } = useForm<TSignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      fullName: '',
      email: '',
    },
    mode: 'onChange',
  });

  function submitForm({ fullName, username, email, password }: TSignUpForm) {
    console.log(
      'fullName, username, email, password: ',
      fullName,
      username,
      email,
      password,
    );
    reset({
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

      <FormInput
        name="username"
        control={control}
        label="Seu username"
        placeholder="@"
        boxProps={{ mb: 'spc16' }}
      />

      <FormInput
        name="fullName"
        control={control}
        label="Nome completo"
        placeholder="Digite seu nome completo"
        boxProps={{ mb: 'spc16' }}
        autoCapitalize="words"
      />

      <FormInput
        name="email"
        control={control}
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{ mb: 'spc16' }}
        keyboardType="email-address"
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
        disabled={!formState.isValid}
      />
    </Screen>
  );
}
