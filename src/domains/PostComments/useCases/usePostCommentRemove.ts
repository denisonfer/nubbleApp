import { TMutationProps, useMutation } from '@infra';

import { postCommentServices } from '../postCommentServices';

export function usePostCommentRemove(options?: TMutationProps<string>) {
  return useMutation<{ commentId: number }, string>(
    ({ commentId }) => postCommentServices.removeComment(commentId),
    options,
  );
}
