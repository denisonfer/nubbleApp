import { useMutation } from '@tanstack/react-query';

import { TMutationProps } from '@infra';

import { authServices } from '../authServices';
import { TAuthSignUpDTO } from '../authTypes';

export function useAuthSignUp(options?: TMutationProps<void>) {
  const { signUp } = authServices;

  const { mutate, isPending } = useMutation<void, Error, TAuthSignUpDTO>({
    mutationFn: data => signUp(data),
    retry: false,
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  return { mutate, isLoading: isPending };
}
