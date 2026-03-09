import { MMKVStorage } from './providers/MMKVStorage';
import { TStorage } from './storageTypes';

// Initialize with MMKVStorage by default so the variable is never undefined
// when Zustand stores are created (which happens before initStorage() is
// called in index.js due to the @services → useAuth → stores require chain).
// initStorage() is still available to inject a different provider in tests.
export let storage: TStorage = MMKVStorage;

export function initStorage(storageProvider: TStorage) {
  storage = storageProvider;
}
