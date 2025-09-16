import { EQueryKeys } from '@infra';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { cameraRollServices } from './cameraRollServices';
import { TPhotoListPaginated } from './cameraRollTypes';

export function useCameraRoll(
  hasPermission: boolean,
  onInitialLoad?: (imageUri: string) => void,
) {
  const query = useInfiniteQuery<TPhotoListPaginated>({
    queryKey: [EQueryKeys.CameraRollPhotoList],
    queryFn: ({ pageParam = 1 }) =>
      cameraRollServices.getPhotoList(pageParam as string),
    initialPageParam: 1,
    getNextPageParam: ({ cursor }) => {
      return cursor;
    },
    enabled: hasPermission,
  });
  const [photoList, setPhotoList] = useState<string[]>([]);

  useEffect(() => {
    if (query.data) {
      setPhotoList(query.data.pages.flatMap(page => page.photoList));

      if (query.data.pages.length === 1 && onInitialLoad) {
        onInitialLoad(query.data.pages[0].photoList[0]);
      }
    }
  }, [query.data]);

  const fetchNextPage = () => {
    if (hasPermission) {
      query.fetchNextPage();
    }
  };

  return {
    photoList,
    hasNextPage: query.hasNextPage,
    fetchNextPage,
  };
}
