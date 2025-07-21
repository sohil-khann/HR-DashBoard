import { Suspense } from 'react';
import UserDashboardClient from '@/components/UserDashboardClient';

export const metadata = {
  title: 'HR Dashboard - Home',
  description: 'View and manage employee performance',
};

export default function Home() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-4 py-3 sm:py-10">
      <div className="mb-8 sm:mb-10 bg-gradient-to-r from-white via-blue-50 to-blue-100 dark:from-gray-800 dark:via-blue-900 dark:to-blue-950 p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-90 h-64 bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 dark:from-blue-300 dark:via-blue-400 dark:to-blue-600">Employee Dashboard</h1>
          <p className="mt-2 text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-blue-400 to-blue-600 dark:from-gray-400 dark:via-blue-300 dark:to-blue-500">
            View and manage employee performance, bookmarks, and insights.
          </p>
        </div>
      </div>
      
      <Suspense fallback={
        <div className="text-center py-24 bg-gradient-to-r from-white via-blue-50 to-blue-100 dark:from-gray-800 dark:via-blue-900 dark:to-blue-950 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mt-8 animate-pulse">
          <div className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <div className="h-5 w-48 bg-gradient-to-r from-gray-200 via-blue-200 to-blue-400 dark:from-gray-700 dark:via-blue-800 dark:to-blue-900 rounded-md mx-auto"></div>
        </div>
      }>
        <UserDashboardClient />
      </Suspense>
    </div>
  );
}
