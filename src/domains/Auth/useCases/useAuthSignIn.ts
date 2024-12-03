import { useMutation } from '@tanstack/react-query';

import { TMutationProps } from '@infra';

import { authServices } from '../authServices';
import { TAuth } from '../authTypes';

type TSignInDTO = {
  email: string;
  password: string;
};

export function useAuthSignIn(options?: TMutationProps<TAuth>) {
  const { mutate } = useMutation<TAuth, unknown, TSignInDTO>({
    mutationFn: ({ email, password }) => authServices.signIn(email, password),
    retry: false,
    onSuccess: data => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  return { mutate };
}
