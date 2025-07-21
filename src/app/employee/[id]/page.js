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

// Main component for displaying employee details
export default function EmployeeDetailsPage() {
  // Get employee ID from URL parameters
  const { id } = useParams();

  // State variables to manage data and UI
  const [user, setUser] = useState(null);          // Stores employee data
  const [loading, setLoading] = useState(true);    // Tracks loading state
  const [error, setError] = useState(null);        // Stores error messages
  
  // Get bookmark functions from custom hook
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  
  // Generate sample data for projects and feedback
  const [projects] = useState(() => generateEmployeeProjects(4));
  const [feedback] = useState(() => generateEmployeeFeedback(6));

  // Load employee data when component mounts or ID changes
  useEffect(() => {
    async function getEmployeeData() {
      try {
        setLoading(true);
        const employeeData = await fetchUserById(id);
        
        if (!employeeData) {
          setError('Employee not found');
        } else {
          setUser(employeeData);
        }
      } catch (err) {
        setError('Failed to load employee details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getEmployeeData();
    }
  }, [id]);

  // Handle bookmark toggle
  function handleBookmark() {
    if (isBookmarked(user.id)) {
      removeBookmark(user.id);
    } else {
      addBookmark(user);
    }
  }

  // Handle promote button click
  function handlePromote() {
    alert(`${user.firstName} ${user.lastName} has been promoted!`);
  }

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col justify-center items-center py-20 space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 absolute top-0 left-0"></div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 animate-pulse">Loading employee data...</p>
        </div>
      </div>
    );
  }

  // Show error message if something went wrong
  if (error || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg shadow-sm my-6 flex items-start">
          <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <strong className="font-bold text-lg block mb-1">Error!</strong>
            <span className="block"> {error || 'Employee not found'}</span>
          </div>
        </div>
        <Link href="/" className="text-blue-500 hover:text-blue-600 mt-4 inline-flex items-center group transition-colors">
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // Get performance level for badge display
  const performanceLevel = getPerformanceLevel(user.performance);

  // Define tab content sections
  const tabs = [
    {
      label: 'Overview',
      content: (
        <div className="p-4">
          {/* Bio Section */}
          <div className="mb-8 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Professional Bio</h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border-l-4 border-blue-500 dark:border-blue-400">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {user.bio || 'No bio information available for this employee.'}
              </p>
            </div>
          </div>
          
          {/* Performance History Section */}
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Performance History</h3>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full">
                Quarterly Reviews
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Period</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Feedback</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                  {user.performanceHistory.map((item, index) => {
                    // Determine badge type based on rating
                    let badgeType = 'info';
                    let status = 'Satisfactory';
                    
                    if (item.rating >= 4.5) {
                      badgeType = 'success';
                      status = 'Excellent';
                    } else if (item.rating >= 4) {
                      badgeType = 'info';
                      status = 'Good';
                    } else if (item.rating >= 3) {
                      badgeType = 'warning';
                      status = 'Satisfactory';
                    } else {
                      badgeType = 'danger';
                      status = 'Needs Improvement';
                    }
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="whitespace-nowrap py-4 pl-6 pr-3">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{item.period}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          <div className="flex items-center">
                            <RatingBar rating={item.rating} />
                            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{item.rating}</span>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <p className="text-sm text-gray-700 dark:text-gray-300 max-w-md">{item.feedback}</p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          <Badge text={status} type={badgeType} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Performance reviews are conducted quarterly by the department manager
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Projects',
      content: (
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Project Portfolio</h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full">
              {projects.length} Projects
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              {/* Table Header */}
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Timeline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Completion</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          {project.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{project.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">ID: {String(project.id).substring(0, 8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{project.role}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {project.role.includes('Lead') ? 'Leadership' : project.role.includes('Developer') ? 'Development' : 'Support'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge 
                        text={project.status} 
                        type={project.status === 'Completed' ? 'success' : project.status === 'In Progress' ? 'info' : 'warning'} 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white flex items-center">
                        <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(project.startDate)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {project.status === 'Completed' ? formatDate(project.endDate) : 'Present'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-2.5 rounded-full ${project.completion >= 80 ? 'bg-green-500' : project.completion >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{project.completion}%</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {project.completion < 40 && 'Early stage'}
                          {project.completion >= 40 && project.completion < 80 && 'In progress'}
                          {project.completion >= 80 && 'Almost done'}
                        </span>
                      </div>
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
          {/* Feedback List */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Feedback History</h3>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full">
                {feedback.length} Entries
              </div>
            </div>
          </div>
          
          {feedback.map((item) => {
            // Determine badge type based on feedback type
            let badgeType = 'info';
            if (item.type === 'Performance') badgeType = 'success';
            if (item.type === 'Behavior') badgeType = 'warning';
            if (item.type === 'Skills') badgeType = 'info';
            
            return (
              <div key={item.id} className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden rounded-xl transition-all hover:shadow-md">
                <div className="px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center">
                        <Badge text={item.type} type={badgeType} />
                        <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                          ID: {String(item.id).substring(0, 8)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center">
                        <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.from}</span>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                        <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(item.date)}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
                      <RatingBar rating={item.rating} />
                      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                    "{item.content}"
                  </p>
                </div>
              </div>
            );
          })}
          
          {/* Feedback Form */}
          <div className="mt-10 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Feedback</h3>
            </div>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="feedback-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Feedback Type
                  </label>
                  <div className="relative">
                    <select
                      id="feedback-type"
                      name="feedback-type"
                      className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg transition-colors"
                    >
                      <option>Performance</option>
                      <option>Behavior</option>
                      <option>Skills</option>
                      <option>Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rating
                  </label>
                  <div className="relative">
                    <select
                      id="rating"
                      name="rating"
                      className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg transition-colors"
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Satisfactory</option>
                      <option value="2">2 - Needs Improvement</option>
                      <option value="1">1 - Poor</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="feedback-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Feedback Content
                </label>
                <textarea
                  id="feedback-content"
                  rows="4"
                  className="block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  placeholder="Enter your feedback here..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      ),
    },
  ];

  // Main component render
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/" className="text-blue-500 hover:text-blue-600 inline-flex items-center group transition-colors">
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>
      
      {/* Employee Details Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* Header Section */}
        <div className="px-6 py-6 sm:px-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750">
          {/* Employee Basic Info */}
          <div className="flex items-center">
            <div className="relative">
              <img
                src={user.image || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-20 w-20 rounded-full mr-5 object-cover border-4 border-white dark:border-gray-700 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
                <Badge text={performanceLevel.label} type={performanceLevel.type} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {user.company?.department || 'Department'} 
                <span className="mx-2">•</span> 
                <svg className="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {user.company?.title || 'Position'}
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleBookmark}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow ${
                isBookmarked(user.id) 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill={isBookmarked(user.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {isBookmarked(user.id) ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button
              onClick={handlePromote}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 transition-all shadow-sm hover:shadow hover:bg-green-200 dark:hover:bg-green-900/50"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
              </svg>
              Promote
            </button>
          </div>
        </div>
        
        {/* Employee Details Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Employee Information
              </h3>
              <div className="mt-4 space-y-4">
                {[
                  { 
                    label: 'Email', 
                    value: user.email,
                    icon: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                  { 
                    label: 'Phone', 
                    value: user.phone,
                    icon: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    )
                  },
                  { 
                    label: 'Birth Date', 
                    value: formatDate(user.birthDate),
                    icon: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                  { 
                    label: 'Age', 
                    value: user.age,
                    icon: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  { 
                    label: 'Gender', 
                    value: user.gender,
                    icon: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">{item.label}:</span>
                    <span className="text-sm text-gray-900 dark:text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Address Information */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Address
              </h3>
              <div className="mt-4 space-y-4">
                {[
                  { 
                    label: 'Street', 
                    value: user.address?.address,
                    icon: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    )
                  },
                  { 
                    label: 'City', 
                    value: user.address?.city,
                    icon: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )
                  },
                  { 
                    label: 'State', 
                    value: user.address?.state,
                    icon: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                    )
                  },
                  { 
                    label: 'Postal Code', 
                    value: user.address?.postalCode,
                    icon: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    )
                  },
                  { 
                    label: 'Country', 
                    value: user.address?.country,
                    icon: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">{item.label}:</span>
                    <span className="text-sm text-gray-900 dark:text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Performance Rating */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Performance Rating
            </h3>
            <div className="mt-4">
              <RatingBar rating={user.performance} />
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <TabsContainer tabs={tabs} />
      </div>
    </div>
  );
}