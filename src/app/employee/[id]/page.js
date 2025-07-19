'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import RatingBar from '@/components/RatingBar';
import Badge from '@/components/Badge';
import TabsContainer from '@/components/TabsContainer';
import { fetchUserById } from '@/lib/api';
import { formatDate, getPerformanceLevel, generateEmployeeProjects, generateEmployeeFeedback } from '@/lib/utils';
import useBookmarks from '@/hooks/useBookmarks';

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  
  // Generate mock data for tabs
  const [projects] = useState(() => generateEmployeeProjects(4));
  const [feedback] = useState(() => generateEmployeeFeedback(6));

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserById(id);
        if (!userData) {
          setError('Employee not found');
        } else {
          setUser(userData);
        }
      } catch (err) {
        setError('Failed to load employee details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadUser();
    }
  }, [id]);

  const handleBookmark = () => {
    if (isBookmarked(user.id)) {
      removeBookmark(user.id);
    } else {
      addBookmark(user);
    }
  };

  const handlePromote = () => {
    // In a real app, this would trigger an API call
    alert(`${user.firstName} ${user.lastName} has been promoted!`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative my-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error || 'Employee not found'}</span>
        </div>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  // Performance level for badge
  const performanceLevel = getPerformanceLevel(user.performance);

  // Tab content
  const tabs = [
    {
      label: 'Overview',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bio</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Performance History</h3>
            <div className="mt-2 space-y-4">
              {user.performanceHistory.map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.period}</span>
                    <RatingBar rating={item.rating} />
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Projects',
      content: (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timeline</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completion</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{project.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{project.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <Badge 
                        text={project.status} 
                        type={project.status === 'Completed' ? 'success' : project.status === 'In Progress' ? 'info' : project.status === 'On Hold' ? 'warning' : 'default'} 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(project.startDate)} - {project.status === 'Completed' ? formatDate(project.endDate) : 'Present'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${project.completion >= 80 ? 'bg-green-500' : project.completion >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 inline-block">{project.completion}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      label: 'Feedback',
      content: (
        <div className="space-y-6">
          {feedback.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">{item.type}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">From: {item.from} • {formatDate(item.date)}</p>
                </div>
                <RatingBar rating={item.rating} />
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">{item.content}</p>
            </div>
          ))}
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add Feedback</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="feedback-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Feedback Type</label>
                <select 
                  id="feedback-type" 
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option>Peer Review</option>
                  <option>Manager Review</option>
                  <option>Self Assessment</option>
                  <option>Client Feedback</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
                <select 
                  id="rating" 
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Satisfactory</option>
                  <option value="2">2 - Needs Improvement</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="feedback-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Feedback</label>
                <textarea 
                  id="feedback-content" 
                  rows="4" 
                  className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your feedback here..."
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="button" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center">
            <img
              src={user.image || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-16 w-16 rounded-full mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.company?.department || 'Department'} • {user.company?.title || 'Position'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge text={performanceLevel.label} type={performanceLevel.type} />
            <button
              onClick={handleBookmark}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isBookmarked(user.id) ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              {isBookmarked(user.id) ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button
              onClick={handlePromote}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Promote
            </button>
          </div>
        </div>
        
        {/* Details */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Employee Information</h3>
              <div className="mt-4 space-y-3">
                <div className="flex">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Email:</span>
                  <span className="text-sm text-gray-900 dark:text-white">{user.email}</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Phone:</span>
                  <span className="text-sm text-gray-900 dark:text-white">{user.phone}</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Birth Date:</span>
                  <span className="text-sm text-gray-900 dark:text-white">{formatDate(user.birthDate)}</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Age:</span>
                  <span className="text-sm text-gray-900 dark:text-white">{user.age}</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Gender:</span>
                  <span className="text-sm text-gray-900 dark:text-white capitalize">{user.gender}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Address</h3>
              <div className="mt-4 space-y-3">
                <div className="flex">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Street:</span>
                  <span className="text-sm text-gray-900 dark:text-white">{user.address?.address}</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">City:</span>
                  <span className="text-sm text-gray-900 dark:text-white">{user.address?.city}</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">State:</span>
                  <span className="text-sm text-gray-900 dark:text-white">{user.address?.state}</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Postal Code:</span>
                  <span className="text-sm text-gray-900 dark:text-white">{user.address?.postalCode}</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Country:</span>
                  <span className="text-sm text-gray-900 dark:text-white">{user.address?.country}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Performance Rating</h3>
            <div className="mt-2 flex items-center">
              <RatingBar rating={user.performance} />
              <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                {performanceLevel.label}
              </span>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <TabsContainer tabs={tabs} />
      </div>
    </div>
  );
}