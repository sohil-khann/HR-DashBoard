'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TabsContainer = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <nav className="-mb-px flex space-x-2" aria-label="Tabs">
          {tabs.map((tab, index) => {
            // Define icon based on tab label
            let icon;
            if (tab.label === 'Overview') {
              icon = (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              );
            } else if (tab.label === 'Projects') {
              icon = (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              );
            } else if (tab.label === 'Feedback') {
              icon = (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              );
            }
            
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                  relative group flex items-center whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200
                  ${activeTab === index
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                `}
              >
                {icon}
                {tab.label}
                {activeTab === index && (
                  <motion.span 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="py-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1"
        >
          {tabs[activeTab].content}
        </motion.div>
      </div>
    </div>
  );
};

export default TabsContainer;