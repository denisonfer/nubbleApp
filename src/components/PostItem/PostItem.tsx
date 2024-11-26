import { Box } from '@components';

import { IPost } from '@domains';

import { PostActions } from './components/PostActions';
import { PostBottom } from './components/PostBottom';
import { PostHeader } from './components/PostHeader';
import { PostImage } from './components/PostImage';

interface IProps {
  post: IPost;
}

export function PostItem({ post }: IProps) {
  return (
    <Box mb="spc32" paddingHorizontal="spc24">
      <PostHeader author={post.author} />
      <PostImage imageURL={post.imageURL} />
      <PostActions
        commentCount={post.commentCount}
        reactionCount={post.reactionCount}
        favoriteCount={post.favoriteCount}
      />
      <PostBottom
        author={post.author}
        text={post.text}
        commentCount={post.commentCount}
      />
    </Box>
  );
}
