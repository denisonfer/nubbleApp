import { useCallback, useState } from 'react';

export type TMutationProps<TData> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
};

/**
 * @deprecated Use useMutation from `@tanstack/react-query`
 */
export function useMutation<TArgs, TData>(
  mutationFn: (args: TArgs) => Promise<TData>,
  options?: TMutationProps<TData>,
) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(false);

  const mutate = useCallback(async (args: TArgs) => {
    try {
      setLoading(true);
      setError(null);

      const data = await mutationFn(args);

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    } catch (error) {
      if (options?.onError) {
        options.onError(error);
      }

      console.error('mutate - ERROR: ', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    mutate,
    isLoading,
    error,
  };
}
