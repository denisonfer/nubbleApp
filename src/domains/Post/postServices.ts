import { apiAdapter } from '@api';
import { TPagination } from '@types';

import { TImageForUpload } from '@services';
import { postAdapter } from './postAdapter';
import { postApi } from './postApi';
import { TPost } from './types';

type TProps = {
  page: number;
};

async function getList({ page }: TProps): Promise<TPagination<TPost>> {
  const postListApi = await postApi.getList({ page, per_page: 10 });

  return apiAdapter.toPageModel(postListApi, postAdapter.toPostList);
}

async function createPost(
  text: string,
  imageCover: TImageForUpload,
): Promise<TPost> {
  const postListApi = await postApi.createPost(text, imageCover);

  return postAdapter.toPostList(postListApi);
}

export const postServices = { getList, createPost };
