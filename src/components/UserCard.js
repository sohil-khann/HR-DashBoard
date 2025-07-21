import React from 'react';
import Link from 'next/link';
import { useMemo } from 'react';
import RatingBar from './RatingBar';

const UserCard = ({ user, onBookmark, onPromote, isBookmarked }) => {
  const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Operations', 'Sales', 'Product'];
  const department = user.company?.department || departments[Math.floor(Math.random() * departments.length)];

  const getAvatarColor = () => {
    const str = user.id ? String(user.id) : user.firstName + user.lastName;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 60%)`;
    return color;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all hover:shadow-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 group flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-5 space-y-4 sm:space-y-0">
        <div className="flex-shrink-0 my-4 flex items-center justify-center">
          <span className="inline-block h-16 w-16 rounded-full border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors shadow-sm bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill={getAvatarColor()} />
              <text x="50%" y="50%" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold" dy=".3em">{user.firstName[0]}{user.lastName[0]}</text>
            </svg>
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {user.email}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 min-w-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
              {department}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
              Age: {user.age}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pb-4 border-b border-gray-100 dark:border-gray-700 my-4">
        <RatingBar rating={user.performance || Math.floor(Math.random() * 5) + 1} />
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full flex-wrap">
        <Link 
          href={`/employee/${user.id}`}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          View Profile
        </Link>
        <button
          type="button"
          onClick={() => onBookmark(user)}
          className={`inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md ${isBookmarked ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
        >
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button
          type="button"
          onClick={() => onPromote(user)}
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Promote
        </button>
      </div>
    </div>
  );
};

export default UserCard;