import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useActivityStore } from '@/store/useActivityStore'
import { useCourseProgressStore } from '@/store/useCourseProgressStore'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface UserAnalyticsDashboardProps {
  userId: string
}

const UserAnalyticsDashboard = ({ userId }: UserAnalyticsDashboardProps) => {
  const { getEventsByUser, getEventsByType } = useActivityStore()
  const userEvents = getEventsByUser(userId)

  const stats = useMemo(() => {
    const lessonCompletions = getEventsByType('lesson_complete')
    const quizAttempts = getEventsByType('quiz_attempt')
    const courseViews = getEventsByType('course_view')

    return {
      totalLessonsCompleted: lessonCompletions.length,
      totalQuizAttempts: quizAttempts.length,
      totalCourseViews: courseViews.length,
      averageQuizScore: quizAttempts.reduce((acc, event) => {
        return acc + (event.metadata?.score || 0)
      }, 0) / quizAttempts.length || 0,
    }
  }, [userEvents])

  const activityData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split('T')[0]
    }).reverse()

    const dailyActivity = last7Days.map((date) => ({
      date,
      count: userEvents.filter((event) => 
        event.timestamp.startsWith(date)
      ).length,
    }))

    return {
      labels: dailyActivity.map((d) => new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })),
      datasets: [
        {
          label: 'Daily Activity',
          data: dailyActivity.map((d) => d.count),
          borderColor: 'rgb(79, 70, 229)',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
        },
      ],
    }
  }, [userEvents])

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-sm font-medium text-gray-500">Lessons Completed</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats.totalLessonsCompleted}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-sm font-medium text-gray-500">Quiz Attempts</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats.totalQuizAttempts}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-sm font-medium text-gray-500">Average Quiz Score</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats.averageQuizScore.toFixed(1)}%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-sm font-medium text-gray-500">Course Views</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats.totalCourseViews}
          </p>
        </motion.div>
      </div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-6">Activity Overview</h3>
        <div className="h-64">
          <Line
            data={activityData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {userEvents.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    {event.type === 'lesson_complete' && '📚'}
                    {event.type === 'quiz_attempt' && '✍️'}
                    {event.type === 'course_view' && '👀'}
                    {event.type === 'comment' && '💬'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {event.type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                {event.metadata?.score && (
                  <span className="text-sm font-medium text-primary">
                    Score: {event.metadata.score}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserAnalyticsDashboard 