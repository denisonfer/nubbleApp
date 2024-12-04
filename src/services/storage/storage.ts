import { asyncStorage } from './providers/asyncStorage';
import { TStorage } from './storageTypes';

export const storage: TStorage = asyncStorage;
