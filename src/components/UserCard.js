import React from 'react';
import Link from 'next/link';
import RatingBar from './RatingBar';

const UserCard = ({ user, onBookmark, onPromote, isBookmarked }) => {
  // Generate a random department if not provided
  const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Operations', 'Sales', 'Product'];
  const department = user.company?.department || departments[Math.floor(Math.random() * departments.length)];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all hover:shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img 
            src={user.image || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`} 
            alt={`${user.firstName} ${user.lastName}`}
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {user.email}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {department} • Age: {user.age}
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <RatingBar rating={user.performance || Math.floor(Math.random() * 5) + 1} />
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Link 
          href={`/employee/${user.id}`}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded-md text-center transition-colors"
        >
          View
        </Link>
        <button 
          onClick={() => onBookmark(user)}
          className={`flex-1 ${isBookmarked ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'} text-xs py-2 px-3 rounded-md text-center transition-colors`}
        >
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button 
          onClick={() => onPromote(user)}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-3 rounded-md text-center transition-colors"
        >
          Promote
        </button>
      </div>
    </div>
  );
};

export default UserCard;