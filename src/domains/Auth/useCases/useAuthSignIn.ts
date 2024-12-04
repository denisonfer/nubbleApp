import { useMutation } from '@tanstack/react-query';

import { TMutationProps } from '@infra';

import { useAuthCredentials } from '@services';

import { authServices } from '../authServices';
import { TAuth } from '../authTypes';

type TSignInDTO = {
  email: string;
  password: string;
};

export function useAuthSignIn(options?: TMutationProps<TAuth>) {
  const { signIn, updateApiToken } = authServices;
  const { saveCredentials } = useAuthCredentials();

  const { mutate, isPending } = useMutation<TAuth, unknown, TSignInDTO>({
    mutationFn: ({ email, password }) => signIn(email, password),
    retry: false,
    onSuccess: data => {
      updateApiToken(data.auth.token);
      saveCredentials(data);
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  return { mutate, loading: isPending };
}
