'use client';

import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { fetchUsers } from '@/lib/api';
import useSearch from '@/hooks/useSearch';

const SearchBarClient = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(20);
        setUsers(data);
      } catch (err) {
        console.error('Error loading users for search:', err);
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
    toggleRating 
  } = useSearch(users);

  return (
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
  );
};

export default SearchBarClient;