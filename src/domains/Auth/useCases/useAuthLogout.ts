import { useMutation } from '@tanstack/react-query';

import { TMutationProps } from '@infra';

import { useAuth } from '@services';
import { authServices } from '../authServices';

export function useAuthLogout(options?: TMutationProps<void>) {
  const { logout, removeApiToken } = authServices;
  const { removeCredentials } = useAuth();

  const { mutate, isPending, isError } = useMutation<string, unknown, void>({
    retry: false,
    mutationFn: () => logout(),
    onSuccess: () => {
      removeCredentials();
      removeApiToken();
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  return { mutate, isLoading: isPending, isError };
}
