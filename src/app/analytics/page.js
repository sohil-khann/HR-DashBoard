'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'
import { Bar, Pie, Line } from 'react-chartjs-2'
import { fetchUsers, generateAnalyticsData } from '@/lib/api'
import useBookmarks from '@/hooks/useBookmarks'

ChartJS.register(
  CategoryScale,
  LinearScale, 
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [analyticsData, setAnalyticsData] = useState(null)
  const { bookmarks } = useBookmarks()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const users = await fetchUsers()
        const data = generateAnalyticsData(users)
        setAnalyticsData(data)
      } catch (err) {
        setError('Failed to load analytics data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const getBookmarkTrendsData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonth = new Date().getMonth()
    const lastSixMonths = months.slice(currentMonth - 5, currentMonth + 1)
    const previousData = Array(5).fill(0).map(() => Math.floor(Math.random() * 10))

    return {
      labels: lastSixMonths,
      datasets: [{
        label: 'Bookmarked Employees',
        data: [...previousData, bookmarks.length],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      }]
    }
  }

  const chartOptions = {
    bar: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { 
          display: true,
          text: 'Department Performance Ratings',
          font: { size: 16, weight: 'bold' }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: { stepSize: 1 }
        }
      }
    },
    pie: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: 'Performance Rating Distribution',
          font: { size: 16, weight: 'bold' }
        }
      }
    },
    line: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: 'Bookmark Trends (Last 6 Months)',
          font: { size: 16, weight: 'bold' }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 bg-zinc-700 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Analytics Dashboard</h1>
        <div className="flex justify-center py-20">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 rounded-full border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (error || !analyticsData) {
    return (
      <div className="max-w-full mx-auto px-4 py-8 bg-zinc-700 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Analytics Dashboard</h1>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <strong>Error!</strong>
            <span className="ml-2">{error || 'Failed to load analytics data'}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Performance Summary</h2>
          <div className="grid grid-cols-2 gap-6">
            <SummaryCard 
              title="Average Rating"
              value={analyticsData.averageRating.toFixed(1)}
              color="blue"
            />
            <SummaryCard 
              title="Top Department"
              value={analyticsData.topDepartment}
              color="green"
            />
            <SummaryCard 
              title="Total Employees"
              value={analyticsData.totalEmployees}
              color="purple"
            />
            <SummaryCard 
              title="Bookmarked"
              value={bookmarks.length}
              color="yellow"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Department Breakdown</h2>
          <div className="h-64">
            <Pie 
              data={{
                labels: Object.keys(analyticsData.departmentCounts),
                datasets: [{
                  label: 'Employees',
                  data: Object.values(analyticsData.departmentCounts),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)', 
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                  ]
                }]
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard 
          title="Performance Distribution"
          chart={
            <Pie 
              data={{
                labels: ['Poor (1)', 'Needs Improvement (2)', 'Average (3)', 'Good (4)', 'Excellent (5)'],
                datasets: [{
                  data: analyticsData.performanceDistribution,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                  ]
                }]
              }}
              options={chartOptions.pie}
            />
          }
        />

        <ChartCard 
          title="Bookmark Trends"
          chart={
            <Line 
              data={getBookmarkTrendsData()}
              options={chartOptions.line}
            />
          }
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Top Performers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.topPerformers.map(employee => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Image 
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                        src={employee.image || `https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}&background=random`}
                        alt=""
                        width={48}
                        height={48}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.firstName} {employee.lastName}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.company?.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.performance.toFixed(1)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Top Performer
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ title, value, color }) {
  const gradients = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600'
  }

  return (
    <div className={`rounded-xl p-6 bg-gradient-to-br ${gradients[color]} shadow-lg`}>
      <p className="text-sm font-medium text-white/80">{title}</p>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </div>
  )
}

function ChartCard({ title, chart }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{title}</h2>
      <div className="h-64">
        {chart}
      </div>
    </div>
  )
}

export default AnalyticsPage
