import { TAuth } from '@domains';

import { storage } from '../storage';

const KEY_AUTH_CREDENTIALS = '@authCredentials';

async function set(ac: TAuth): Promise<void> {
  await storage.setItem(KEY_AUTH_CREDENTIALS, ac);
}

async function get(): Promise<TAuth | null> {
  const ac = await storage.getItem<TAuth>(KEY_AUTH_CREDENTIALS);
  return ac;
}

async function remove(): Promise<void> {
  await storage.removeItem(KEY_AUTH_CREDENTIALS);
}

export const authCredentialsStorage = { set, get, remove };
