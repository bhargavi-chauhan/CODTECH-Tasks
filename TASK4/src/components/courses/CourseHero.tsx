import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'

interface CourseHeroProps {
  title: string
  description: string
  instructor: {
    name: string
    avatar: string
    title: string
  }
  thumbnail: string
  price: number
  rating: number
  totalStudents: number
  lastUpdated: string
  duration: string
  level: string
  onEnroll: () => void
}

export default function CourseHero({
  title,
  description,
  instructor,
  thumbnail,
  price,
  rating,
  totalStudents,
  lastUpdated,
  duration,
  level,
  onEnroll,
}: CourseHeroProps) {
  const { user } = useAuthStore()

  return (
    <div className="relative bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Course Info */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-xl text-gray-300"
            >
              {description}
            </motion.p>

            <div className="mt-8 flex items-center">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <p className="text-lg font-medium text-white">{instructor.name}</p>
                <p className="text-gray-400">{instructor.title}</p>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8">
              <div>
                <dt className="text-sm font-medium text-gray-400">Level</dt>
                <dd className="mt-1 text-2xl font-extrabold text-white">{level}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Duration</dt>
                <dd className="mt-1 text-2xl font-extrabold text-white">{duration}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Students</dt>
                <dd className="mt-1 text-2xl font-extrabold text-white">{totalStudents.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Rating</dt>
                <dd className="mt-1 text-2xl font-extrabold text-white">{rating.toFixed(1)}</dd>
              </div>
            </dl>
          </div>

          {/* Enrollment Card */}
          <div className="mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="px-6 py-8">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-gray-900">${price}</span>
                  {user ? (
                    <button
                      onClick={onEnroll}
                      className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-600 transition-colors"
                    >
                      Enroll Now
                    </button>
                  ) : (
                    <button
                      onClick={onEnroll}
                      className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-600 transition-colors"
                    >
                      Sign in to Enroll
                    </button>
                  )}
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Full lifetime access
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Certificate of completion
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    Access on mobile and TV
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 