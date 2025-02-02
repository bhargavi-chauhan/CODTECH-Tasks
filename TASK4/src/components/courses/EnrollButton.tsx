import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useCourseEnrollmentStore } from '@/store/useCourseEnrollmentStore'

interface EnrollButtonProps {
  courseId: string
}

const EnrollButton = ({ courseId }: EnrollButtonProps) => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const { enrollInCourse, isEnrolled, isLoading } = useCourseEnrollmentStore()

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/courses/${courseId}` } })
      return
    }

    try {
      await enrollInCourse(courseId)
      navigate(`/courses/${courseId}/learn`)
    } catch (error) {
      // Error is handled by the store
    }
  }

  if (isEnrolled(courseId)) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/courses/${courseId}/learn`)}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Continue Learning
      </motion.button>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleEnroll}
      disabled={isLoading}
      className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Enrolling...' : 'Enroll Now'}
    </motion.button>
  )
}

export default EnrollButton 