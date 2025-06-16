import { apiAdapter } from '@api';
import { TPagination } from '@types';

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

export const postServices = { getList };
