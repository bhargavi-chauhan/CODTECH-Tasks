import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCourseProgressStore } from '@/store/useCourseProgressStore'

interface LessonProgressProps {
  courseId: string
  lessonId: string
  onComplete?: () => void
}

const LessonProgress = ({ courseId, lessonId, onComplete }: LessonProgressProps) => {
  const { updateLessonProgress, updateTimeSpent, getLessonProgress } = useCourseProgressStore()
  const [timeSpent, setTimeSpent] = useState(0)
  const lessonProgress = getLessonProgress(courseId, lessonId)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
      updateTimeSpent(courseId, lessonId, timeSpent)
    }
  }, [courseId, lessonId, timeSpent, updateTimeSpent])

  const handleComplete = () => {
    updateLessonProgress(courseId, lessonId, true)
    onComplete?.()
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: timeSpent * 6 }}
              transition={{ duration: 0.5 }}
              className="w-6 h-6 text-primary"
            >
              ⏱️
            </motion.div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Time Spent</p>
            <p className="text-lg font-semibold text-gray-900">
              {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {lessonProgress?.completed ? (
            <div className="flex items-center text-green-600">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Completed
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Mark as Complete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonProgress 