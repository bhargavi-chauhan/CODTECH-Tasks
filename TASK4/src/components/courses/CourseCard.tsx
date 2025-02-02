import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface CourseCardProps {
  id: string
  title: string
  description: string
  instructor: {
    name: string
    avatar: string
  }
  thumbnail: string
  price: number
  rating: number
  totalStudents: number
  lastUpdated: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}

export default function CourseCard({
  id,
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
}: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 flex flex-col"
    >
      <Link href={`/courses/${id}`} className="block relative">
        <div className="relative aspect-video">
          <img
            src={thumbnail}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-sm font-medium">
            {level}
          </div>
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <Link href={`/courses/${id}`} className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
        </Link>

        <div className="mt-4 flex items-center space-x-2">
          <img
            src={instructor.avatar}
            alt={instructor.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm text-gray-700">{instructor.name}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-primary font-semibold">
              {rating.toFixed(1)}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">({totalStudents})</span>
          </div>
          <span className="text-lg font-bold text-gray-900">${price}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>{duration}</span>
          <span>
            Updated {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
          </span>
        </div>
      </div>
    </motion.div>
  )
} 