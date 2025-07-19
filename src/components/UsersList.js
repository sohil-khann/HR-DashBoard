'use client';

import { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { fetchUsers } from '@/lib/api';
import useBookmarks from '@/hooks/useBookmarks';
import useSearch from '@/hooks/useSearch';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { filteredUsers, searchTerm, setSearchTerm, departments, selectedDepartments, toggleDepartment, ratings, selectedRatings, toggleRating } = useSearch(users);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(20);
        setUsers(data);
      } catch (err) {
        setError('Failed to load users. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative my-4">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Employees ({filteredUsers.length})</h2>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No employees found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
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