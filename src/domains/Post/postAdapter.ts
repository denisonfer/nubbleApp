import { IPost, IPostListApi } from './types';

function adaptToPostList(postListApi: IPostListApi): IPost {
  return {
    id: postListApi.id.toString(),
    text: postListApi.text,
    author: {
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

export const postAdapter = { adaptToPostList };
