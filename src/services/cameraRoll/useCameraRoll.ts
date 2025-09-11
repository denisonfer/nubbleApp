import { EQueryKeys } from '@infra';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
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

  async function hasAndroidPermission() {
    if (Platform.OS === 'ios') return true;

    const getCheckPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  return {
    photoList,
    hasNextPage: query.hasNextPage,
    fetchNextPage: () => query.fetchNextPage(),
  };
}
