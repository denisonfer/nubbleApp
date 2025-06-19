import { useSearchHistoryStore } from '@stores';
import { TSearchHistoryService } from '../searchHistoryTypes';

export function useSearchHistory(): TSearchHistoryService['usersSearchHistory'] {
  const usersSearchHistory = useSearchHistoryStore(
    state => state.usersSearchHistory,
  );

  return usersSearchHistory;
}

export function useSearchHistoryServices(): Omit<
  TSearchHistoryService,
  'usersSearchHistory'
> {
  const addToUsersSearchHistory = useSearchHistoryStore(
    state => state.addToUsersSearchHistory,
  );
  const removeFromUsersSearchHistory = useSearchHistoryStore(
    state => state.removeFromUsersSearchHistory,
  );
  const clearUsersSearchHistory = useSearchHistoryStore(
    state => state.clearUsersSearchHistory,
  );

  return {
    addToUsersSearchHistory,
    removeFromUsersSearchHistory,
    clearUsersSearchHistory,
  };
}
