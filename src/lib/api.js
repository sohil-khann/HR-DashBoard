

/**
 * Fetch users from the API
 * @param {number} limit 
 * @returns {Promise<Array>} 
 */
export const fetchUsers = async (limit = 20) => {
  try {
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.users.map(user => ({
      ...user,
      performance: Math.floor(Math.random() * 5) + 1
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

/**
 * Fetch a single user by ID
 * @param {number} userId - User ID to fetch
 * @returns {Promise<Object>} - User object
 */
export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const user = await response.json();
    
    // Add random performance rating
    return {
      ...user,
      performance: Math.floor(Math.random() * 5) + 1,
      // Add mock performance history
      performanceHistory: generatePerformanceHistory(),
      // Add mock bio
      bio: generateBio(user)
    };
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    return null;
  }
};

/**
 * Generate mock performance history
 * @returns {Array} - Array of performance objects
 */
const generatePerformanceHistory = () => {
  const periods = [
    'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023',
    'Q1 2024', 'Q2 2024'
  ];
  
  return periods.map(period => ({
    period,
    rating: Math.floor(Math.random() * 5) + 1,
    feedback: getRandomFeedback()
  }));
};

/**
 * Generate a mock bio for a user
 * @param {Object} user - User object
 * @returns {string} - Generated bio
 */
const generateBio = (user) => {
  const bios = [
    `${user.firstName} is a dedicated professional with ${user.age - 20} years of experience in the ${user.company?.department || 'industry'}. Known for attention to detail and problem-solving skills.`,
    `A results-driven ${user.company?.department || 'professional'} with expertise in strategic planning and team leadership. ${user.firstName} consistently exceeds expectations and drives innovation.`,
    `${user.firstName} brings a unique perspective to the ${user.company?.department || 'team'} with a background in ${getRandomBackground()}. Passionate about delivering high-quality results and mentoring junior team members.`,
    `With a focus on ${getRandomSkill()} and ${getRandomSkill()}, ${user.firstName} has contributed significantly to key projects and initiatives. Known for collaborative approach and analytical thinking.`
  ];
  
  return bios[Math.floor(Math.random() * bios.length)];
};

/**
 * Get a random feedback statement
 * @returns {string} - Random feedback
 */
const getRandomFeedback = () => {
  const feedbacks = [
    'Consistently meets deadlines and delivers quality work.',
    'Excellent team player with strong communication skills.',
    'Needs improvement in documentation and knowledge sharing.',
    'Exceeds expectations in problem-solving and innovation.',
    'Shows great potential but needs more focus on details.',
    'Outstanding performance in client-facing activities.',
    'Demonstrates leadership qualities and mentors junior staff.',
    'Technical skills are strong but could improve soft skills.',
    'Highly adaptable and quick to learn new technologies.',
    'Valuable contributor to team success and morale.'
  ];
  
  return feedbacks[Math.floor(Math.random() * feedbacks.length)];
};

/**
 * Get a random professional background
 * @returns {string} - Random background
 */
const getRandomBackground = () => {
  const backgrounds = [
    'finance', 'marketing', 'software development', 'data analysis',
    'project management', 'customer relations', 'operations', 'research',
    'design', 'consulting', 'education', 'healthcare'
  ];
  
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};

/**
 * Get a random professional skill
 * @returns {string} - Random skill
 */
const getRandomSkill = () => {
  const skills = [
    'strategic planning', 'team leadership', 'data analysis', 'project management',
    'communication', 'problem-solving', 'innovation', 'client relations',
    'technical expertise', 'process optimization', 'cross-functional collaboration',
    'mentoring', 'research', 'presentation skills', 'negotiation'
  ];
  
  return skills[Math.floor(Math.random() * skills.length)];
};

/**
 * Generate mock analytics data
 * @param {Array} users - Array of user objects
 * @returns {Object} - Analytics data
 */
export const generateAnalyticsData = (users) => {
  if (!users || users.length === 0) {
    return {
      averageRating: 0,
      topDepartment: 'N/A',
      totalEmployees: 0,
      departmentRatings: {},
      departmentCounts: {},
      performanceDistribution: [0, 0, 0, 0, 0],
      topPerformers: [],
      bookmarkTrends: []
    };
  }

  // Department-wise average ratings
  const departmentRatings = {};
  const departmentCounts = {};
  let totalRating = 0;
  const performanceDistribution = [0, 0, 0, 0, 0];
  
  users.forEach(user => {
    const department = user.company?.department || 'Other';
    const rating = user.performance || Math.floor(Math.random() * 5) + 1;
    
    // Update total rating
    totalRating += rating;
    
    // Update performance distribution
    if (rating >= 1 && rating <= 5) {
      performanceDistribution[rating - 1]++;
    }
    
    if (!departmentRatings[department]) {
      departmentRatings[department] = 0;
      departmentCounts[department] = 0;
    }
    
    departmentRatings[department] += rating;
    departmentCounts[department]++;
  });
  
  // Calculate average rating
  const averageRating = totalRating / users.length;
  
  // Find top department
  let topDepartment = 'N/A';
  let highestRating = 0;
  
  for (const dept in departmentRatings) {
    const avgRating = departmentRatings[dept] / departmentCounts[dept];
    departmentRatings[dept] = avgRating; // Store the average instead of sum
    
    if (avgRating > highestRating) {
      highestRating = avgRating;
      topDepartment = dept;
    }
  }
  
  // Get top performers (rating >= 4)
  const topPerformers = users
    .filter(user => user.performance >= 4)
    .sort((a, b) => b.performance - a.performance)
    .slice(0, 5);
  
  return {
    averageRating,
    topDepartment,
    totalEmployees: users.length,
    departmentRatings,
    departmentCounts,
    performanceDistribution,
    topPerformers,
    bookmarkTrends: [] // This is generated in the component
  };
};