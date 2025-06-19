import { storage } from '@services';
import { TSearchHistoryService } from 'src/services/searchHistory/searchHistoryTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSearchHistoryStore = create<TSearchHistoryService>()(
  persist(
    set => ({
      usersSearchHistory: [],
      addToUsersSearchHistory: user => {
        set(state => ({
          usersSearchHistory: [...state.usersSearchHistory, user],
        }));
      },
      removeFromUsersSearchHistory: userId => {
        set(state => ({
          usersSearchHistory: state.usersSearchHistory.filter(
            user => user.id !== userId,
          ),
        }));
      },
      clearUsersSearchHistory: () => {
        set({ usersSearchHistory: [] });
      },
    }),
    {
      name: '@SearchHistory',
      storage: storage,
    },
  ),
);
