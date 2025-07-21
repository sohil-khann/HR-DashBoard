import React from 'react';

const RatingBar = ({ rating }) => {
  // Normalize rating to be between 1 and 5
  const normalizedRating = Math.max(1, Math.min(5, rating));
  
  // Determine color based on rating
  let color = '';
  let bgColor = '';
  let label = '';
  
  if (normalizedRating <= 2) {
    color = 'text-red-500';
    bgColor = 'bg-red-100 dark:bg-red-900/30';
    label = 'Needs Improvement';
  } else if (normalizedRating <= 3) {
    color = 'text-yellow-500';
    bgColor = 'bg-yellow-100 dark:bg-yellow-900/30';
    label = 'Average';
  } else if (normalizedRating <= 4) {
    color = 'text-green-500';
    bgColor = 'bg-green-100 dark:bg-green-900/30';
    label = 'Good';
  } else {
    color = 'text-emerald-500';
    bgColor = 'bg-emerald-100 dark:bg-emerald-900/30';
    label = 'Excellent';
  }
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < normalizedRating ? color : 'text-gray-300 dark:text-gray-600'} transition-all ${i < normalizedRating ? 'scale-110' : 'scale-100'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className={`ml-3 text-sm font-semibold ${color} flex items-center`}>
            {normalizedRating.toFixed(1)}
            <span className={`ml-2 text-xs px-2 py-0.5 ${bgColor} ${color} font-medium whitespace-normal`}>
              {label}
            </span>
          </span>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Performance Rating
        </div>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-1.5 rounded-full ${color.replace('text', 'bg')}`} 
          style={{ width: `${(normalizedRating / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default RatingBar;