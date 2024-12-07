import { useQuery } from '@tanstack/react-query';

import { EQueryKeys } from '@infra';

import { userServices } from '../userServices';

export function useUserGetById(userId: number) {
  const {
    data: user,
    isLoading: isLoading,
    error,
  } = useQuery({
    queryKey: [EQueryKeys.UserGetById, userId],
    queryFn: () => userServices.getById(userId),
  });

  return { user, isLoading, error };
}
