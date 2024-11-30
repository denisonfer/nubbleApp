import { useState } from 'react';

import { postCommentServices, TPostComment } from '@domains';

type TProps = {
  onSuccess?: (data: TPostComment) => void;
  onError?: (error: unknown) => void;
};

export function usePostCommentCreate(options?: TProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(false);

  async function createComment(postId: number, message: string) {
    try {
      setLoading(true);
      setError(null);
      const postComment = await postCommentServices.createComment(
        postId,
        message,
      );

      if (options?.onSuccess) {
        options?.onSuccess(postComment);
      }
    } catch (error) {
      console.error('createComment - ERROR: ', error);
      setError(error);

      if (options?.onError) {
        options?.onError(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return { createComment, loading, error };
}
