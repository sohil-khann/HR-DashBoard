import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, departments, selectedDepartments, onDepartmentChange, ratings, selectedRatings, onRatingChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-7 rounded-xl shadow-md mb-8 border border-gray-100 dark:border-gray-700">
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Search Employees
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all shadow-sm focus:shadow-md"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Filter by Department
          </label>
          <div className="flex flex-wrap gap-2.5">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => onDepartmentChange(dept)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${selectedDepartments.includes(dept) 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm'}`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Filter by Rating
          </label>
          <div className="flex flex-wrap gap-2.5">
            {ratings.map((rating) => {
              // Generate color based on rating
              const getColor = (rating) => {
                if (rating <= 2) return selectedRatings.includes(rating) ? 'bg-red-500' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
                if (rating <= 3) return selectedRatings.includes(rating) ? 'bg-yellow-500' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
                return selectedRatings.includes(rating) ? 'bg-green-500' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
              };
              
              return (
                <button
                  key={rating}
                  onClick={() => onRatingChange(rating)}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all flex items-center space-x-1 ${selectedRatings.includes(rating) 
                    ? `${getColor(rating)} text-white shadow-md` 
                    : `${getColor(rating)} hover:shadow-sm`}`}
                >
                  <span>{rating}</span>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;