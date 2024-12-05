import { useMutation } from '@tanstack/react-query';

import { TMutationProps } from '@infra';

import { useAuthCredentials } from '@services';

import { authServices } from '../authServices';

export function useAuthLogout(options?: TMutationProps<void>) {
  const { logout } = authServices;
  const { removeCredentials } = useAuthCredentials();

  const { mutate, isPending, isError } = useMutation<string, unknown, void>({
    retry: false,
    mutationFn: () => logout(),
    onSuccess: () => {
      removeCredentials();
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  return { mutate, loading: isPending, isError };
}
