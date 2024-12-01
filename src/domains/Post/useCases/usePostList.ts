import { usePaginatedList } from '@infra';

import { postServices } from '../postServices';

export function usePostList() {
  return usePaginatedList(postServices.getList);
}
