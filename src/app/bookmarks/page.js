'use client';

import { useState } from 'react';
import UserCard from '@/components/UserCard';
import useBookmarks from '@/hooks/useBookmarks';
import Modal from '@/components/Modal';

export default function bookmarksPage() {
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
    if (actionType === 'promote') {
      alert(`${selectedUser.firstName} ${selectedUser.lastName} has been promoted!`);
    } else if (actionType === 'assign') {
      alert(`${selectedUser.firstName} ${selectedUser.lastName} has been assigned to a new project!`);
    }
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-5 bg-gray-50 min-h-screen"
    
          style={{
        boxShadow: '0 8px 12px 0 rgba(31, 38, 135, 0.2), 0 0.5px 3px 0 rgba(0,0,0,0.01)',
        background: 'linear-gradient(135deg, #cfe0e6 0%, #ffffff 50%)',
        border: '1px solid rgba(255,255,255,0.18)',
        overflow: 'hidden',
      }}
    >
      {/* Page Title and Description */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400 mb-3">
          My Bookmarked Employees
        </h1>
        <p className="text-gray-300 text-lg">
          Manage your favorite employees here
        </p>
      </div>

      {/* Show a message if no employees are bookmarked */}
      {bookmarks.length === 0 ? (
        <div className="bg-gray-50 rounded-lg shadow-lg p-8 text-center max-w-md mx-auto border border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2 text-white">No Bookmarks Yet</h3>
          <p className="text-gray-400">
            Go to the dashboard to bookmark some employees
          </p>
        </div>
      ) : (
        // Show the list of bookmarked employees
        <div>
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Saved Employees ({bookmarks.length})
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Assign Project
            </button>
          </div>

          {/* Grid of employee cards */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-lg  hover:shadow-xl border border-gray-200">
                <UserCard
                  user={user}
                  onBookmark={() => removeBookmark(user.id)}
                  onPromote={() => handlePromote(user)}
                  isBookmarked={true}
                />
                <button
                  onClick={() => handleAssignProject(user)}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                >
                  Assign Project
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popup window for actions */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={actionType === 'promote' ? '🌟 Promote Employee' : '📋 Assign Project'}
      >
        {selectedUser && (
          <div className="p-6 bg-gray-800 text-white">
            <p className="text-lg mb-4">
              {actionType === 'promote'
                ? `Do you want to promote ${selectedUser.firstName} ${selectedUser.lastName}?`
                : `Assign a project to ${selectedUser.firstName} ${selectedUser.lastName}`}
            </p>

            {actionType === 'assign' && (
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Choose a Project:</label>
                <select className="w-full p-2 border rounded-md bg-gray-700 text-white border-gray-600">
                  <option>Website Redesign</option>
                  <option>Mobile App Development</option>
                  <option>Data Migration</option>
                  <option>Cloud Infrastructure</option>
                  <option>Security Audit</option>
                </select>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleAction}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md border border-gray-600"
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