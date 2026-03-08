export type TImageForUpload = {
  uri: string;
  name: string;
  type: 'image/jpeg' | 'image/png' | 'image/jpg';
};

export type TPhotoListPaginated = {
  photoList: string[];
  hasNextPage: boolean;
  cursor?: string;
};
