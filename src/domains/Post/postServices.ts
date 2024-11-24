import { postApi } from './postApi';
import { IPost } from './types';

async function getList(): Promise<IPost[]> {
  return await postApi.getList();
}

export const postServices = { getList };
