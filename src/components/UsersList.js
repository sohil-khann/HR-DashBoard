'use client';

'use client';

import UserCard from './UserCard';
import useBookmarks from '@/hooks/useBookmarks';

const UsersList = ({ users }) => {
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const handleBookmark = (user) => {
    if (isBookmarked(user.id)) {
      removeBookmark(user.id);
    } else {
      addBookmark(user);
    }
  };

  const handlePromote = (user) => {
    // In a real app, this would trigger an API call or state update
    alert(`${user.firstName} ${user.lastName} has been promoted!`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
      <div className="mb-8 flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Employees <span className="ml-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">{users.length}</span>
        </h2>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-700/30 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No employees found matching your criteria.</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onBookmark={handleBookmark}
              onPromote={handlePromote}
              isBookmarked={isBookmarked(user.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;