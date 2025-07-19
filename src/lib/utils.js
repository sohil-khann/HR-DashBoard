/**
 * Format a date string to a more readable format
 * @param {string} dateString - Date string in ISO format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Get performance level label based on rating
 * @param {number} rating - Performance rating (1-5)
 * @returns {Object} - Object with label and type for Badge component
 */
export const getPerformanceLevel = (rating) => {
  if (rating <= 2) {
    return { label: 'Needs Improvement', type: 'danger' };
  } else if (rating <= 3) {
    return { label: 'Satisfactory', type: 'warning' };
  } else if (rating <= 4) {
    return { label: 'Good', type: 'info' };
  } else {
    return { label: 'Excellent', type: 'success' };
  }
};

/**
 * Generate a random project for an employee
 * @returns {Object} - Project object
 */
export const generateRandomProject = () => {
  const projectNames = [
    'Website Redesign', 'Mobile App Development', 'Data Migration',
    'Cloud Infrastructure', 'Security Audit', 'Performance Optimization',
    'Customer Portal', 'Internal Dashboard', 'API Integration',
    'Automation System', 'Analytics Platform', 'Training Program'
  ];
  
  const statuses = ['Not Started', 'In Progress', 'On Hold', 'Completed'];
  
  const randomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
  
  return {
    id: Math.floor(Math.random() * 1000) + 1,
    name: projectNames[Math.floor(Math.random() * projectNames.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    startDate: randomDate(),
    endDate: randomDate(),
    role: ['Lead', 'Member', 'Consultant', 'Manager'][Math.floor(Math.random() * 4)],
    completion: Math.floor(Math.random() * 100)
  };
};

/**
 * Generate random projects for an employee
 * @param {number} count - Number of projects to generate
 * @returns {Array} - Array of project objects
 */
export const generateEmployeeProjects = (count = 3) => {
  return Array.from({ length: count }, generateRandomProject);
};

/**
 * Generate random feedback for an employee
 * @param {number} count - Number of feedback items to generate
 * @returns {Array} - Array of feedback objects
 */
export const generateEmployeeFeedback = (count = 5) => {
  const feedbackTypes = ['Peer Review', 'Manager Review', 'Self Assessment', 'Client Feedback'];
  const feedbackContent = [
    'Consistently delivers high-quality work and meets deadlines.',
    'Excellent team player who collaborates effectively with others.',
    'Strong problem-solving skills and attention to detail.',
    'Takes initiative and goes above and beyond expectations.',
    'Communicates clearly and effectively with team members and stakeholders.',
    'Demonstrates leadership qualities and mentors junior team members.',
    'Adapts quickly to changing priorities and requirements.',
    'Could improve documentation and knowledge sharing practices.',
    'Needs to work on time management and prioritization skills.',
    'Technical skills are strong but could improve soft skills.'
  ];
  
  const randomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
  
  return Array.from({ length: count }, () => ({
    id: Math.floor(Math.random() * 1000) + 1,
    type: feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)],
    content: feedbackContent[Math.floor(Math.random() * feedbackContent.length)],
    rating: Math.floor(Math.random() * 5) + 1,
    date: randomDate(),
    from: ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Wilson'][Math.floor(Math.random() * 5)]
  }));
};