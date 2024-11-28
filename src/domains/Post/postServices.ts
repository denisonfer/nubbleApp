import { postAdapter } from './postAdapter';
import { postApi } from './postApi';
import { IPost } from './types';

async function getList(): Promise<IPost[]> {
  const postListApi = await postApi.getList();

  return postListApi.data.map(postAdapter.adaptPostList);
}

export const postServices = { getList };
