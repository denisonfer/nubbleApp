import { useCallback, useEffect, useState } from 'react';

import { TPagination } from '@types';

export function usePaginatedList<TData>(
  getList: ({ page }: { page: number }) => Promise<TPagination<TData>>,
) {
  const [list, setList] = useState<TData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchInitialPostList = useCallback(async () => {
    try {
      setError(undefined);
      setLoading(true);
      const { data, meta } = await getList({ page: 1 });
      setList(data);

      if (meta.hasNextPage) {
        setPage(2);
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
    } catch (error) {
      console.error('fetchInitialPostList - ERROR: ', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const fetchNextPage = useCallback(async () => {
    if (loading || !hasNextPage) return;

    try {
      setLoading(true);
      const { data, meta } = await getList({ page });
      setList(prev => [...prev, ...data]);

      if (meta.hasNextPage) {
        setPage(prev => prev + 1);
      } else {
        setHasNextPage(false);
      }
    } catch (error) {
      console.error('fetchNextPage - ERROR: ', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  useEffect(() => {
    fetchInitialPostList();
  }, []);

  return {
    loading,
    error,
    list,
    refresh: fetchInitialPostList,
    fetchNextPage,
  };
}
