import { EQueryKeys, usePaginatedList } from '@infra';

import { postCommentServices } from '@domains';

export function usePostCommentList(postId: number) {
  function getList({ page }: { page: number }) {
    return postCommentServices.getPostCommentList({ page, postId });
  }

  return usePaginatedList([EQueryKeys.UsePostCommentList, postId], getList);
}
