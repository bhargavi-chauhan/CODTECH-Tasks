import { motion } from 'framer-motion'
import { useCourseEnrollmentStore } from '@/store/useCourseEnrollmentStore'
import ProgressBar from '../ui/ProgressBar'

interface CourseAnalyticsProps {
  courseId: string
}

const CourseAnalytics = ({ courseId }: CourseAnalyticsProps) => {
  const { getProgress } = useCourseEnrollmentStore()
  const progress = getProgress(courseId)

  // Mock data for analytics
  const weeklyProgress = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 30 },
    { day: 'Wed', minutes: 60 },
    { day: 'Thu', minutes: 15 },
    { day: 'Fri', minutes: 45 },
    { day: 'Sat', minutes: 90 },
    { day: 'Sun', minutes: 0 },
  ]

  const maxMinutes = Math.max(...weeklyProgress.map((day) => day.minutes))

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Progress</h3>

      {/* Overall Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Overall Completion</span>
          <span className="text-sm font-medium text-primary">{progress}%</span>
        </div>
        <ProgressBar progress={progress} size="lg" />
      </div>

      {/* Weekly Activity */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Weekly Activity</h4>
        <div className="flex items-end justify-between h-32">
          {weeklyProgress.map((day) => (
            <div key={day.day} className="flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="w-4 bg-primary/20 rounded-t relative group"
              >
                {day.minutes > 0 && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.minutes} min
                  </div>
                )}
              </motion.div>
              <span className="mt-2 text-xs text-gray-500">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">4.5</div>
          <div className="text-xs text-gray-500">Hours Spent</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-xs text-gray-500">Lessons Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">5</div>
          <div className="text-xs text-gray-500">Days Streak</div>
        </div>
      </div>
    </div>
  )
}

export default CourseAnalytics 