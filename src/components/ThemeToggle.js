'use client';

import { useEffect } from 'react';
import useTheme from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Ensure the theme class is set on mount
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 relative overflow-hidden"
      aria-label="Toggle dark mode"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className={`absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 ${theme === 'dark' ? 'dark:opacity-30' : ''} transition-opacity duration-300`}></div>
      <div className="relative z-10">
        {theme === 'dark' ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;