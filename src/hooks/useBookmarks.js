'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create a Zustand store with persistence
const useBookmarksStore = create(
  persist(
    (set) => ({
      bookmarks: [],
      addBookmark: (user) => set((state) => {
        // Check if user is already bookmarked
        if (state.bookmarks.some(bookmark => bookmark.id === user.id)) {
          return state;
        }
        return { bookmarks: [...state.bookmarks, user] };
      }),
      removeBookmark: (userId) => set((state) => ({
        bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== userId)
      })),
      isBookmarked: (userId) => {
        const state = useBookmarksStore.getState();
        return state.bookmarks.some(bookmark => bookmark.id === userId);
      }
    }),
    {
      name: 'hr-dashboard-bookmarks',
    }
  )
);

const useBookmarks = () => {
  const bookmarks = useBookmarksStore((state) => state.bookmarks);
  const addBookmark = useBookmarksStore((state) => state.addBookmark);
  const removeBookmark = useBookmarksStore((state) => state.removeBookmark);
  const isBookmarked = useBookmarksStore((state) => state.isBookmarked);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  };
};

export default useBookmarks;