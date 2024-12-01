import { postCommentServices } from '@domains';
import { usePaginatedList } from '@infra';

export function usePostCommentList(postId: number) {
  function getList({ page }: { page: number }) {
    return postCommentServices.getPostCommentList({ page, postId });
  }

  return usePaginatedList(getList);
}
