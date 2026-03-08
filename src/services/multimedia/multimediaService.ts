import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { Platform } from 'react-native';
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

async function prepareImageForUpload(
  imageUri: string,
): Promise<TImageForUpload> {
  try {
    const context = ImageManipulator.manipulate(prepareImageUri(imageUri));
    const renderedImage = await context.renderAsync();
    const result = await renderedImage.saveAsync({
      compress: 0.5,
      format: SaveFormat.JPEG,
    });
    return {
      uri: result.uri,
      name: Date.now().toString(),
      type: 'image/jpeg',
    };
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
}

function prepareImageUri(imageUri: string): string {
  if (Platform.OS !== 'android') return imageUri;

  if (imageUri.startsWith('file://')) return imageUri;

  return `file://${imageUri}`;
}

export const multimediaService = {
  getPhotoList,
  prepareImageForUpload,
  prepareImageUri,
};
