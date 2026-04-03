import { apiAdapter } from '@api';
import { postReactionApi } from './postReactionApi';
import { postReactionAdapter } from './postReactionAdapter';
import {
  TPostReaction,
  TPostReactionBase,
  TPostReactionType,
} from './postReactionType';
import { TPagination } from '@types';

const PER_PAGE = 10;

async function getMyReactions({
  reactionType,
  page,
}: {
  reactionType: TPostReactionType;
  page: number;
}): Promise<TPagination<TPostReaction>> {
  const postReactionListApi = await postReactionApi.getMyReactions({
    page,
    per_page: PER_PAGE,
    reaction_type: reactionType,
  });
  return apiAdapter.toPageModel(
    postReactionListApi,
    postReactionAdapter.toPostReaction,
  );
}

async function reactToPost({
  postId,
  reactionType,
}: {
  postId: number;
  reactionType: TPostReactionType;
}): Promise<TPostReactionBase> {
  const postReactionBaseApi = await postReactionApi.createOrUpdateReaction(
    postId,
    reactionType,
  );
  return postReactionAdapter.toPostReactionBase(postReactionBaseApi);
}

export const postReactionService = {
  getMyReactions,
  reactToPost,
};
