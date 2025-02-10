import { TPost } from '@domains';

export const mockedPost: TPost = {
  id: '1',
  imageURL: 'https://via.placeholder.com/150',
  commentCount: 10,
  favoriteCount: 10,
  reactionCount: 10,
  text: 'This is a post',
  author: {
    id: '1',
    profileURL: 'https://via.placeholder.com/150',
    name: 'John Doe',
    userName: 'john_doe',
  },
};
