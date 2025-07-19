'use client';

import { useState } from 'react';
import UserCard from '@/components/UserCard';
import useBookmarks from '@/hooks/useBookmarks';
import Modal from '@/components/Modal';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState('');

  const handlePromote = (user) => {
    setSelectedUser(user);
    setActionType('promote');
    setShowModal(true);
  };

  const handleAssignProject = (user) => {
    setSelectedUser(user);
    setActionType('assign');
    setShowModal(true);
  };

  const handleAction = () => {
    // In a real app, this would trigger an API call
    if (actionType === 'promote') {
      alert(`${selectedUser.firstName} ${selectedUser.lastName} has been promoted!`);
    } else if (actionType === 'assign') {
      alert(`${selectedUser.firstName} ${selectedUser.lastName} has been assigned to a new project!`);
    }
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bookmarked Employees</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage your bookmarked employees and take actions.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-10 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No bookmarks yet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Start bookmarking employees from the dashboard to see them here.
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Bookmarked ({bookmarks.length})</h2>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Assign to Project
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarks.map((user) => (
              <div key={user.id} className="relative">
                <UserCard
                  user={user}
                  onBookmark={() => removeBookmark(user.id)}
                  onPromote={() => handlePromote(user)}
                  isBookmarked={true}
                />
                <button
                  onClick={() => handleAssignProject(user)}
                  className="mt-2 w-full bg-purple-500 hover:bg-purple-600 text-white text-xs py-2 px-3 rounded-md text-center transition-colors"
                >
                  Assign to Project
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for actions */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={actionType === 'promote' ? 'Promote Employee' : 'Assign to Project'}
      >
        {selectedUser && (
          <div className="p-4">
            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {actionType === 'promote'
                  ? `Are you sure you want to promote ${selectedUser.firstName} ${selectedUser.lastName}?`
                  : `Assign ${selectedUser.firstName} ${selectedUser.lastName} to a project:`}
              </p>
            </div>

            {actionType === 'assign' && (
              <div className="mb-4">
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Project
                </label>
                <select
                  id="project"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option>Website Redesign</option>
                  <option>Mobile App Development</option>
                  <option>Data Migration</option>
                  <option>Cloud Infrastructure</option>
                  <option>Security Audit</option>
                </select>
              </div>
            )}

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                onClick={handleAction}
              >
                Confirm
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}