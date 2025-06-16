import { useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { TPagination } from '@types';

type TUsePaginatedListResult<TData> = {
  list: TData[];
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
};

type TUsePaginatedListOptions = {
  enabled?: boolean;
  staleTime?: number;
};

export function usePaginatedList<TData>(
  queryKey: readonly unknown[],
  getList: ({ page }: { page: number }) => Promise<TPagination<TData>>,
  options?: TUsePaginatedListOptions,
): TUsePaginatedListResult<TData> {
  const [list, setList] = useState<TData[]>([]);

  const query = useInfiniteQuery<TPagination<TData>>({
    queryKey,
    queryFn: ({ pageParam = 1 }) => getList({ page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: ({ meta }) => {
      if (meta.hasNextPage) {
        return meta.currentPage + 1;
      }

      return undefined;
    },
    staleTime: options?.staleTime ?? 1000 * 30, // 30 seconds
    enabled: options?.enabled ?? true,
  });

  const { isLoading, isError, refetch, fetchNextPage, hasNextPage } = query;

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.flatMap(page => page.data);

      setList(newList);
    }
  }, [query.data]);

  return {
    list,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
  };
}
