import { UseFormGetFieldState, UseFormWatch } from 'react-hook-form';

import { useEmailIsAvailable, useUsernameIsAvailable } from '@domains';

import { TSignUpForm } from '../signUpSchema';

type TProps = {
  watch: UseFormWatch<TSignUpForm>;
  getFieldState: UseFormGetFieldState<TSignUpForm>;
};

type TReturnValues = {
  errorMessage?: string;
  notReady: boolean;
  isFetching: boolean;
};

export function useAsyncValidation({ watch, getFieldState }: TProps): {
  usernameValidation: TReturnValues;
  emailValidation: TReturnValues;
} {
  const username = watch('username');
  const usernameState = getFieldState('username');
  const usernameIsValid = !usernameState.invalid && usernameState.isDirty;
  const usernameQuery = useUsernameIsAvailable({
    username,
    enabled: usernameIsValid,
  });

  const email = watch('email');
  const emailState = getFieldState('email');
  const emailIsValid = !emailState.invalid && emailState.isDirty;
  const emailQuery = useEmailIsAvailable({
    email,
    enabled: emailIsValid,
  });

  return {
    usernameValidation: {
      errorMessage: usernameQuery.isUnavailable
        ? 'username indisponível'
        : undefined,
      notReady: usernameQuery.isFetching || usernameQuery.isUnavailable,
      isFetching: usernameQuery.isFetching,
    },
    emailValidation: {
      errorMessage: emailQuery.isUnavailable
        ? 'e-mail indisponível'
        : undefined,
      notReady: emailQuery.isFetching || emailQuery.isUnavailable,
      isFetching: emailQuery.isFetching,
    },
  };
}
