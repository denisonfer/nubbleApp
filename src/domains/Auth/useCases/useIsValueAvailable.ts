import { useQuery } from '@tanstack/react-query';

import { EQueryKeys } from '@infra';

import { useAppDebounce } from '@hooks';

import { authServices } from '../authServices';

export function useIsValueAvailable(value: string) {
  const debouncedValue = useAppDebounce(value);

  const { data, isFetching } = useQuery({
    queryKey: [EQueryKeys.IsValueAvailable, debouncedValue],
    queryFn: () => authServices.isUserNameAvailable(debouncedValue),
    retry: false,
    staleTime: 30000,
  });

  return { isAvailable: !!data, isFetching };
}
