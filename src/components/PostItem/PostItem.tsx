import { Box } from '@components';

import { IPost } from '@domains';

import { PostActions } from './components/PostActions';
import { PostHeader } from './components/PostHeader';
import { PostImage } from './components/PostImage';

interface IProps {
  post: IPost;
}

export function PostItem({ post }: IProps) {
  return (
    <Box mb="spc32">
      <PostHeader author={post.author} />
      <PostImage imageURL={post.imageURL} />
      <PostActions
        commentCount={post.commentCount}
        reactionCount={post.reactionCount}
        favoriteCount={post.favoriteCount}
      />
    </Box>
  );
}
