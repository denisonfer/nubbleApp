import { useMutation } from '@tanstack/react-query';

import { TMutationProps } from '@infra';

import { useAuth } from '@services';
import { authServices } from '../authServices';
import { TAuth } from '../authTypes';

type TSignInDTO = {
  email: string;
  password: string;
};

export function useAuthSignIn(options?: TMutationProps<TAuth>) {
  const { signIn, updateApiToken } = authServices;
  const { saveCredentials } = useAuth();

  const { mutate, isPending, isSuccess, isError } = useMutation<
    TAuth,
    unknown,
    TSignInDTO
  >({
    mutationFn: ({ email, password }) => signIn(email, password),
    retry: false,
    onSuccess: data => {
      saveCredentials(data);
      updateApiToken(data.auth.token);
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  return { mutate, isLoading: isPending, isSuccess, isError };
}
