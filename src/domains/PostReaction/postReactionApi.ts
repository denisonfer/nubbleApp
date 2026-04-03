import { api, IApiPaginated, IPageParams } from '@api';
import {
  IPostReactionApi,
  IPostReactionBaseApi,
  TPostReactionType,
} from './postReactionType';

export const POST_REACTION_PATH = '/user/reactions';

type TMyReactionsParams = IPageParams & {
  post_id?: number;
  reaction_type?: TPostReactionType;
};

async function getMyReactions(
  myReactionsParams?: TMyReactionsParams,
): Promise<IApiPaginated<IPostReactionApi>> {
  const response = await api.get<IApiPaginated<IPostReactionApi>>(
    `${POST_REACTION_PATH}/my-reactions`,
    {
      params: {
        ...myReactionsParams,
      },
    },
  );

  return response.data;
}

async function createOrUpdateReaction(
  postId: number,
  reactionType: TPostReactionType,
): Promise<IPostReactionBaseApi> {
  const path = `${POST_REACTION_PATH}/${postId}/${reactionType}`;
  const response = await api.post<IPostReactionBaseApi>(path);

  return response.data;
}
export const postReactionApi = { getMyReactions, createOrUpdateReaction };
