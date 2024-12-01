import { IPostListApi, TPost } from './types';

function toPostList(postListApi: IPostListApi): TPost {
  return {
    id: postListApi.id.toString(),
    text: postListApi.text,
    author: {
      id: postListApi.user.id.toString(),
      profileURL: postListApi.user.profile_url,
      name: postListApi.user.first_name,
      userName: postListApi.user.username,
    },
    imageURL: postListApi.image_url,
    reactionCount: parseInt(postListApi.meta.like_count, 10),
    commentCount: parseInt(postListApi.meta.comments_count, 10),
    favoriteCount: parseInt(postListApi.meta.favorite_count, 10),
  };
}

export const postAdapter = { toPostList };
