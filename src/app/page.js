import { Suspense } from 'react';
import UserDashboardClient from '@/components/UserDashboardClient';

export const metadata = {
  title: 'HR Dashboard - Home',
  description: 'View and manage employee performance',
};

export default function Home() {
  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-4 py-3 sm:py-10">
      <div className="mb-8 sm:mb-10 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-90 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Employee Dashboard</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            View and manage employee performance, bookmarks, and insights.
          </p>
        </div>
      </div>
      
      <Suspense fallback={
        <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mt-8 animate-pulse">
          <div className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mx-auto"></div>
        </div>
      }>
        <UserDashboardClient />
      </Suspense>
    </div>
  );
}
