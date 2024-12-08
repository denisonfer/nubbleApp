import { useMutation } from '@tanstack/react-query';

import { TMutationProps } from '@infra';

import { authServices } from '../authServices';

export function useAuthForgotPassword(options?: TMutationProps<void>) {
  const { forgotPassword } = authServices;

  const { mutate, isPending } = useMutation<void, Error, string>({
    mutationFn: email => forgotPassword(email),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  return { mutate, isLoading: isPending };
}
