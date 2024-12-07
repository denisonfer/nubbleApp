import { TStorage } from './storageTypes';

export let storage: TStorage;

export function initStorage(storageProvider: TStorage) {
  storage = storageProvider;
}
