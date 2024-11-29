import { useCallback, useEffect, useState } from 'react';

import { postServices } from '../postServices';
import { TPost } from '../types';

export function usePostList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [postList, setPostList] = useState<TPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchInitialPostList = useCallback(async () => {
    try {
      setError(undefined);
      setLoading(true);
      const { data, meta } = await postServices.getList({ page: 1 });
      setPostList(data);

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
      const { data, meta } = await postServices.getList({ page });
      setPostList(prev => [...prev, ...data]);

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
    postList,
    refresh: fetchInitialPostList,
    fetchNextPage,
  };
}
