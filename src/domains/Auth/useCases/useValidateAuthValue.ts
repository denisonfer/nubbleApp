import { useQuery } from '@tanstack/react-query';

import { EQueryKeys } from '@infra';

import { useAppDebounce } from '@hooks';

import { authServices } from '../authServices';

type TParams<TData> = {
  value: TData;
  enabled: boolean;
  queryKey: EQueryKeys.UsernameIsAvailable | EQueryKeys.EmailIsAvailable;
  verifyFn: (value: TData) => Promise<boolean>;
};

function useIsValueAvailable({
  value,
  enabled,
  queryKey,
  verifyFn,
}: TParams<string>) {
  const debouncedValue = useAppDebounce(value, 1500);

  const { data, isFetching } = useQuery({
    queryKey: [queryKey, debouncedValue],
    queryFn: () => verifyFn(debouncedValue),
    retry: false,
    staleTime: 30000,
    enabled: enabled && debouncedValue.length > 0,
  });

  const isDebouncing = debouncedValue !== value;

  return {
    isUnavailable: data === false,
    isFetching: isFetching || isDebouncing,
  };
}

export function useUsernameIsAvailable({
  username,
  enabled,
}: {
  username: string;
  enabled: boolean;
}) {
  return useIsValueAvailable({
    value: username,
    enabled,
    verifyFn: authServices.isUserNameAvailable,
    queryKey: EQueryKeys.UsernameIsAvailable,
  });
}

export function useEmailIsAvailable({
  email,
  enabled,
}: {
  email: string;
  enabled: boolean;
}) {
  return useIsValueAvailable({
    value: email,
    enabled,
    verifyFn: authServices.isEmailAvailable,
    queryKey: EQueryKeys.EmailIsAvailable,
  });
}
