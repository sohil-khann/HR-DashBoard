'use client';

import { useState, useEffect, useMemo } from 'react';

const useSearch = (users) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  // Get unique departments from users
  const departments = useMemo(() => {
    if (!users) return [];
    
    const deptSet = new Set();
    users.forEach(user => {
      const dept = user.company?.department || '';
      if (dept) deptSet.add(dept);
    });
    return Array.from(deptSet);
  }, [users]);

  // Available ratings for filtering
  const ratings = [1, 2, 3, 4, 5];

  // Toggle department selection
  const toggleDepartment = (department) => {
    setSelectedDepartments(prev => 
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  // Toggle rating selection
  const toggleRating = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  // Filter users based on search term and filters
  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter(user => {
      // Search term filter (case insensitive)
      const matchesSearch = searchTerm === '' || 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.company?.department || '').toLowerCase().includes(searchTerm.toLowerCase());

      // Department filter
      const matchesDepartment = selectedDepartments.length === 0 || 
        selectedDepartments.includes(user.company?.department);

      // Rating filter
      const userRating = user.performance || Math.floor(Math.random() * 5) + 1;
      const matchesRating = selectedRatings.length === 0 || 
        selectedRatings.includes(userRating);

      return matchesSearch && matchesDepartment && matchesRating;
    });
  }, [users, searchTerm, selectedDepartments, selectedRatings]);

  return {
    searchTerm,
    setSearchTerm,
    departments,
    selectedDepartments,
    toggleDepartment,
    ratings,
    selectedRatings,
    toggleRating,
    filteredUsers
  };
};

export default useSearch;