import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCourseEnrollmentStore } from '@/store/useCourseEnrollmentStore'

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  instructor: string
  level: string
  rating: number
  category: string
}

interface CourseRecommendationsProps {
  currentCourseId: string
  courses: Course[]
}

const CourseRecommendations = ({ currentCourseId, courses }: CourseRecommendationsProps) => {
  const { isEnrolled } = useCourseEnrollmentStore()

  // Filter out current course and get recommendations based on category and level
  const currentCourse = courses.find((course) => course.id === currentCourseId)
  const recommendations = courses
    .filter((course) => course.id !== currentCourseId)
    .filter(
      (course) =>
        course.category === currentCourse?.category ||
        course.level === currentCourse?.level
    )
    .slice(0, 3)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/courses/${course.id}`}
              className="block group hover:no-underline"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                />
                {isEnrolled(course.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Enrolled
                  </div>
                )}
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{course.instructor}</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(course.rating) ? 'fill-current' : 'fill-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {course.rating.toFixed(1)}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CourseRecommendations 