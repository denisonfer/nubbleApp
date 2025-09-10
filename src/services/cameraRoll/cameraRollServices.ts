import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { TPhotoListPaginated } from './cameraRollTypes';

async function getPhotoList(cursor?: string): Promise<TPhotoListPaginated> {
  const photoListApi = await CameraRoll.getPhotos({
    first: 12,
    after: cursor,
  });

  const photoList = photoListApi.edges.map(edge => edge.node.image.uri);

  return {
    photoList,
    hasNextPage: photoListApi.page_info.has_next_page,
    cursor: photoListApi.page_info.end_cursor,
  };
}

export const cameraRollServices = {
  getPhotoList,
};
