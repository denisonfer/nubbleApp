import { EQueryKeys, TMutationProps } from '@infra';
import { multimediaService, TImageForUpload } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postServices } from '../postServices';
import { TPost } from '../types';

export function usePostCreate(options?: TMutationProps<TPost>) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation<
    TPost,
    unknown,
    { text: string; imageCover: TImageForUpload }
  >({
    mutationFn: ({ text, imageCover }) =>
      postServices.createPost(text, imageCover),
    onSuccess: post => {
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.UsePostList],
      });

      if (options?.onSuccess) {
        options.onSuccess(post);
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  async function createPost({
    description,
    imageUri,
  }: {
    description: string;
    imageUri: string;
  }) {
    const imageCover = multimediaService.prepareImageForUpload(imageUri);
    mutate({ text: description, imageCover });
  }

  return { createPost, isLoading: isPending, isError };
}
