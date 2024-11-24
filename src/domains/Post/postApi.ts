import { postListMock } from './postListMock';
import { IPost } from './types';

async function getList(): Promise<IPost[]> {
  return postListMock;
}

export const postApi = { getList };
