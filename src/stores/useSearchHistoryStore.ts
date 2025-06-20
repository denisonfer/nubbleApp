import { storage } from '@services';
import { TSearchHistoryService } from 'src/services/searchHistory/searchHistoryTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSearchHistoryStore = create<TSearchHistoryService>()(
  persist(
    set => ({
      usersSearchHistory: [],
      addToUsersSearchHistory: user => {
        set(state => {
          const usersList = [...state.usersSearchHistory];
          const userAlreadyExists = usersList.find(
            existingUser => existingUser.id === user.id,
          );
          if (userAlreadyExists) {
            return state;
          }
          return { usersSearchHistory: [...usersList, user] };
        });
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
