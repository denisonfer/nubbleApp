import { EQueryKeys, usePaginatedList } from '@infra';

import { postServices } from '../postServices';

export function usePostList() {
  return usePaginatedList([EQueryKeys.UsePostList], postServices.getList);
}
