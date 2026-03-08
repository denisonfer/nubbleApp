import { api, IApiPaginated, IPageParams } from '@api';

import { TImageForUpload } from '@services';
import { IPostListApi } from './types';

async function getList(
  params?: IPageParams,
): Promise<IApiPaginated<IPostListApi>> {
  const response = await api.get<IApiPaginated<IPostListApi>>('/user/post', {
    params,
  });

  return response.data;
}

async function createPost(
  text: string,
  imageCover: TImageForUpload,
): Promise<IPostListApi> {
  const formData = new FormData();
  formData.append('text', text);
  formData.append('imageCover', imageCover);

  const response = await api.postForm<IPostListApi>('/user/post', formData);
  return response.data;
}

export const postApi = { getList, createPost };
