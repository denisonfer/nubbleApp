import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EQueryKeys, TMutationProps } from '@infra';

import { postCommentServices } from '../postCommentServices';

export function usePostCommentRemove(options?: TMutationProps<string>) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    string,
    unknown,
    { commentId: number; postId: number }
  >({
    mutationFn: ({ commentId }) => postCommentServices.removeComment(commentId),

    onSuccess: (data, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.UsePostCommentList, postId],
      });

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },

    onError: error => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  return { mutate };
}
