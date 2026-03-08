import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { TImageForUpload, TPhotoListPaginated } from './multimediaTypes';

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

function prepareImageForUpload(imageUri: string): TImageForUpload {
  return {
    uri: imageUri,
    name: 'name',
    type: 'image/jpeg',
  };
}

export const multimediaService = {
  getPhotoList,
  prepareImageForUpload,
};
