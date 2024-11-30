import { postCommentServices, usePaginatedList } from '@domains';

export function usePostCommentList(postId: number) {
  function getList({ page }: { page: number }) {
    return postCommentServices.getPostCommentList({ page, postId });
  }

  return usePaginatedList(getList);
}