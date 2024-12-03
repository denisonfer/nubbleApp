import { useQuery } from '@tanstack/react-query';

import { EQueryKeys } from '@infra';

import { authServices } from '../authServices';

export function useAuthLogout() {
  const { isSuccess, isError, isLoading } = useQuery({
    queryKey: [EQueryKeys.Auth],
    queryFn: () => authServices.logout(),
  });

  return { isSuccess, isError, isLoading };
}
