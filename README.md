# HR Performance Dashboard

# HR Dashboard: Empowering Your Workforce Management

Welcome to the HR Dashboard, a powerful and intuitive application designed to revolutionize how HR professionals manage and analyze employee data. Built with cutting-edge technologies like Next.js and Tailwind CSS, this dashboard provides a comprehensive suite of tools to enhance employee performance tracking, streamline talent management, and deliver actionable insights.

## Why This Dashboard?

In today's dynamic work environment, effective human resource management is crucial. This HR Dashboard addresses key challenges faced by HR departments by offering:

-   **Centralized Employee Data**: Access all essential employee information in one secure location.
-   **Performance at a Glance**: Easily monitor and evaluate employee performance with visual aids and detailed metrics.
-   **Streamlined Talent Management**: Identify top performers, manage talent pools, and facilitate career development.
-   **Data-Driven Decisions**: Leverage analytics to gain deeper insights into your workforce and make informed strategic decisions.
-   **User-Friendly Experience**: An intuitive and responsive interface ensures HR professionals can efficiently navigate and utilize all features.

This dashboard is your partner in fostering a productive, engaged, and high-performing workforce.
## Link: https://hr-dash-board-nu.vercel.app/
## Key Features Designed for HR Success

### 📊 Comprehensive Dashboard Homepage
-   **Employee Overview**: Quickly view key employee information through intuitive user cards.
-   **Performance Visualization**: Understand performance at a glance with clear rating bars and indicators.
-   **Talent Identification**: Easily bookmark and promote high-potential employees for future opportunities.
-   **Efficient Search & Filter**: Rapidly find specific employees or groups using robust search and filtering capabilities.

### 👤 Detailed Employee Profiles
-   **Complete Employee Information**: Access personal details, contact information, and employment history.
-   **Performance History**: Track individual performance trends and historical ratings over time.
-   **Integrated Views**: Navigate seamlessly through employee overviews, project assignments, and feedback records via a tabbed interface.
-   **Feedback Management**: Submit and review constructive feedback directly within the employee's profile.

### ⭐ Smart Bookmarking System
-   **Curated Talent Pools**: Maintain a personalized list of bookmarked employees for quick reference.
-   **Flexible Management**: Easily add or remove employees from your bookmarks.
-   **Actionable Insights**: Directly initiate promotion processes or project assignments from your bookmarked list.

### 📈 Advanced Analytics & Reporting
-   **Departmental Performance**: Gain insights into average performance ratings across different departments.
-   **Performance Distribution**: Visualize the overall distribution of employee performance ratings.
-   **Engagement Trends**: Monitor bookmarking trends to understand employee interest and engagement over time.
-   **Top Performer Recognition**: Identify and highlight your organization's top-performing individuals.

## Tech Stack

- **React** with Next.js App Router
- **Tailwind CSS** for styling
- **JavaScript (ES6+)**
- **Zustand** for state management
- **Chart.js** and **react-chartjs-2** for analytics


## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/sohil-khann/hr-dashboard.git
   cd hr-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
hr-dashboard/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── analytics/  # Analytics page
│   │   ├── bookmarks/  # Bookmarks page
│   │   ├── employee/   # Employee details page
│   │   ├── layout.js   # Root layout
│   │   └── page.js     # Homepage
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom hooks
│   └── lib/            # Utilities and API functions
├── .eslintrc.json      # ESLint configuration
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Custom Hooks (For Developers)

-   **useBookmarks**: Manages bookmarked employees with Zustand, ensuring consistent state across the application.
-   **useSearch**: Handles all search and filtering functionality, providing dynamic data views.
-   **useTheme**: Controls the dark/light mode switching, enhancing user accessibility.

## Data & API (For Developers)

The application currently utilizes [DummyJSON](https://dummyjson.com/users) for fetching user data. To provide a richer HR context, additional mock data is generated for:

-   Department information
-   Performance ratings
-   Project assignments
-   Feedback history

This setup allows for easy integration with real HR APIs in the future.

## Support & Contact

For any questions, issues, or feature requests, please contact Sohil khan at sohilkhann164@gmail.com.

Thank you for using the HR Dashboard!

