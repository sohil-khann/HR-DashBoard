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
    const color = `hsl(${hash % 360}, 80%, 60%)`;
    return color;
  };

  return (
    <div
      className="relative rounded-xl p-5 transition-all duration-500 group flex flex-col"
      style={{
        boxShadow: '0 8px 12px 0 rgba(31, 38, 135, 0.2), 0 0.5px 3px 0 rgba(0,0,0,0.01)',
        background: 'linear-gradient(135deg, #cfe0e6 0%, #ffffff 50%)',
        border: '1px solid rgba(255,255,255,0.18)',
        overflow: 'hidden',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(120deg, rgba(59,130,246,0.12) 0%, rgba(16,185,129,0.10) 100%)',
          filter: 'blur(18px)',
        }}
      />
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:space-x-5 space-y-4 sm:space-y-0">
        <div className="flex-shrink-0 my-4 flex items-center justify-center">
          <span className="inline-block h-16 w-16 rounded-full border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors shadow-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden"
            style={{
              boxShadow: '0 4px 16px 0 rgba(59,130,246,0.18)',
              transition: 'box-shadow 0.4s cubic-bezier(.4,0,.2,1)',
            }}
          >
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
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 shadow"
              style={{
                background: 'linear-gradient(90deg, #93c5fd 0%, #a7f3d0 100%)',
                boxShadow: '0 2px 8px 0 rgba(59,130,246,0.08)',
              }}
            >
              {department}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 shadow"
              style={{
                background: 'linear-gradient(90deg, #f3f4f6 0%, #e0e7ff 100%)',
                boxShadow: '0 2px 8px 0 rgba(31,38,135,0.08)',
              }}
            >
              Age: {user.age}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pb-4 border-b border-gray-100 dark:border-gray-700 my-4 relative z-10 animate-fadein">
        <RatingBar rating={user.performance || Math.floor(Math.random() * 5) + 1} />
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full flex-wrap relative z-10">
        <Link 
          href={`/employee/${user.id}`}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
          style={{
            boxShadow: '0 2px 8px 0 rgba(59,130,246,0.18)',
            transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)',
          }}
        >
          View Profile
        </Link>
        <button
          type="button"
          onClick={() => onBookmark(user)}
          className={`inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-md text-sm font-medium rounded-md ${isBookmarked ? 'bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-900 hover:from-yellow-300 hover:to-yellow-500 dark:from-yellow-900/30 dark:to-yellow-700 dark:text-yellow-300 dark:hover:from-yellow-900/50 dark:hover:to-yellow-800' : 'bg-gradient-to-r from-gray-100 to-blue-100 text-gray-700 hover:from-gray-200 hover:to-blue-200 dark:from-gray-700 dark:to-blue-900 dark:text-gray-200 dark:hover:from-gray-600 dark:hover:to-blue-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300`}
          style={{
            boxShadow: '0 2px 8px 0 rgba(251,191,36,0.12)',
            transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button
          type="button"
          onClick={() => onPromote(user)}
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-md text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-700 dark:to-blue-900 hover:from-gray-200 hover:to-blue-200 dark:hover:from-gray-600 dark:hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
          style={{
            boxShadow: '0 2px 8px 0 rgba(59,130,246,0.12)',
            transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)',
          }}
        >
          Promote
        </button>
      </div>
      <style jsx>{`
        .animate-fadein {
          animation: fadein 0.8s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(16px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .group:hover {
          box-shadow: 0 12px 40px 0 rgba(59,130,246,0.18), 0 2px 12px 0 rgba(0,0,0,0.10);
          transform: translateY(-2px) scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default UserCard;