import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import StarRating from '@/components/ui/StarRating'

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  content: string
  createdAt: string
  helpful: number
  response?: {
    instructorName: string
    content: string
    createdAt: string
  }
}

interface CourseReviewsProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
  ratingDistribution: Record<string, number>
}

export default function CourseReviews({
  reviews,
  averageRating,
  totalReviews,
  ratingDistribution,
}: CourseReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent')

  const filteredReviews = reviews.filter(
    (review) => !selectedRating || review.rating === selectedRating
  )

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return b.helpful - a.helpful
  })

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">Student Feedback</h2>
        
        {/* Rating Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-4">
              <div className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div>
                <StarRating rating={averageRating} size="lg" />
                <p className="mt-1 text-sm text-gray-500">Course Rating</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {Object.entries(ratingDistribution)
              .sort(([a], [b]) => Number(b) - Number(a))
              .map(([rating, count]) => {
                const percentage = (count / totalReviews) * 100
                return (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(selectedRating === Number(rating) ? null : Number(rating))}
                    className="w-full flex items-center space-x-2 group"
                  >
                    <span className="text-sm text-gray-600 w-3">{rating}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className={`h-full ${
                          selectedRating === Number(rating)
                            ? 'bg-primary'
                            : 'bg-yellow-400 group-hover:bg-yellow-500'
                        }`}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12">{percentage.toFixed(0)}%</span>
                  </button>
                )
              })}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSortBy('recent')}
              className={`text-sm font-medium ${
                sortBy === 'recent' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Most Recent
            </button>
            <button
              onClick={() => setSortBy('helpful')}
              className={`text-sm font-medium ${
                sortBy === 'helpful' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Most Helpful
            </button>
          </div>
          {selectedRating && (
            <button
              onClick={() => setSelectedRating(null)}
              className="text-sm text-primary hover:text-primary-600"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Reviews List */}
        <div className="mt-8 space-y-8">
          {sortedReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{review.userName}</h4>
                    <div className="mt-1 flex items-center space-x-2">
                      <StarRating rating={review.rating} size="sm" showNumber={false} />
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{review.content}</p>

              <div className="mt-4 flex items-center space-x-4">
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Helpful ({review.helpful})
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700">Report</button>
              </div>

              {/* Instructor Response */}
              {review.response && (
                <div className="mt-6 ml-12 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{review.response.instructorName}</span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(review.response.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{review.response.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 