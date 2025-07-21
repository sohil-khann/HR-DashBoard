'use client';

import { useState, useEffect } from 'react';
import { fetchUsers } from '@/lib/api';
import useSearch from '@/hooks/useSearch';
import SearchBar from './SearchBar';
import UsersList from './UsersList';

const UserDashboardClient = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(20);
        setUsers(data);
      } catch (err) {
        console.error('Error loading users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const { 
    searchTerm, 
    setSearchTerm, 
    departments, 
    selectedDepartments, 
    toggleDepartment, 
    ratings, 
    selectedRatings, 
    toggleRating,
    filteredUsers
  } = useSearch(users);

  if (loading) {
    return (
      <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mt-8 animate-pulse">
        <div className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl shadow-md border border-red-200 dark:border-red-800 mt-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        departments={departments}
        selectedDepartments={selectedDepartments}
        onDepartmentChange={toggleDepartment}
        ratings={ratings}
        selectedRatings={selectedRatings}
        onRatingChange={toggleRating}
      />
      <UsersList users={filteredUsers} />
    </>
  );
};

export default UserDashboardClient;