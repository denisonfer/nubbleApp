import { usePaginatedList } from '@domains';

import { postServices } from '../postServices';

export function usePostList() {
  return usePaginatedList(postServices.getList);
}
