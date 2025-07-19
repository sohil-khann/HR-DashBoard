import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, departments, selectedDepartments, onDepartmentChange, ratings, selectedRatings, onRatingChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Search Employees
        </label>
        <input
          type="text"
          id="search"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Search by name, email, or department..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Filter by Department
          </label>
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => onDepartmentChange(dept)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${selectedDepartments.includes(dept) 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Filter by Rating
          </label>
          <div className="flex flex-wrap gap-2">
            {ratings.map((rating) => (
              <button
                key={rating}
                onClick={() => onRatingChange(rating)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${selectedRatings.includes(rating) 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
              >
                {rating}★
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;