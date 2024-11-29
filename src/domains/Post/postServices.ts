import { apiAdapter } from '@api';
import { TPagination } from '@types';

import { postAdapter } from './postAdapter';
import { postApi } from './postApi';
import { IPost } from './types';

type TProps = {
  page: number;
};

async function getList({ page }: TProps): Promise<TPagination<IPost>> {
  const postListApi = await postApi.getList({ page, per_page: 10 });

  return {
    meta: apiAdapter.adaptToMetaData(postListApi.meta),
    data: postListApi.data.map(postAdapter.adaptToPostList),
  };
}

export const postServices = { getList };
