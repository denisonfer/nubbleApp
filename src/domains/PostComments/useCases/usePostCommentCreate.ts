import { TMutationProps, useMutation } from '@infra';

import { postCommentServices, TPostComment } from '@domains';

export function usePostCommentCreate(options?: TMutationProps<TPostComment>) {
  const { mutate, loading, error } = useMutation<
    { postId: number; message: string },
    TPostComment
  >(
    ({ postId, message }) => postCommentServices.createComment(postId, message),
    options,
  );

  async function createComment(postId: number, message: string) {
    await mutate({ postId, message });
  }

  return { createComment, loading, error };
}
