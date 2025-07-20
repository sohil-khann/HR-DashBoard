import { Suspense } from 'react';
import UsersList from '@/components/UsersList';
import SearchBar from '@/components/SearchBar';
import { default as SearchBarClient } from '@/components/SearchBarClient';

export const metadata = {
  title: 'HR Dashboard - Home',
  description: 'View and manage employee performance',
};

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employee Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          View and manage employee performance, bookmarks, and insights.
        </p>
      </div>
      
      <Suspense fallback={<div className="text-center py-10">Loading search filters...</div>}>
        <SearchBarWrapper />
      </Suspense>
      
      <Suspense fallback={<div className="text-center py-20">Loading employees...</div>}>
        <UsersList />
      </Suspense>
    </div>
  );
}

const SearchBarWrapper = async () => {
  return <SearchBarClient />;
};
