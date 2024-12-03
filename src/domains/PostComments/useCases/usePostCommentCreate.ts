import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EQueryKeys, TMutationProps } from '@infra';

import { postCommentServices, TPostComment } from '@domains';

type TCreateCommentDTO = {
  postId: number;
  message: string;
};

export function usePostCommentCreate(options?: TMutationProps<TPostComment>) {
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending: isLoading,
    isError,
  } = useMutation<TPostComment, unknown, TCreateCommentDTO>({
    mutationFn: ({ postId, message }) =>
      postCommentServices.createComment(postId, message),

    onSuccess: (postCommentData, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.UsePostCommentList, postId],
      });

      if (options?.onSuccess) {
        options.onSuccess(postCommentData);
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  async function createComment({ postId, message }: TCreateCommentDTO) {
    mutate({ postId, message });
  }

  return { createComment, isLoading, isError };
}
