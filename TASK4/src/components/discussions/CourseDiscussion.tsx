import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
  likes: number
  replies: Comment[]
}

interface CourseDiscussionProps {
  courseId: string
  lessonId: string
}

const CourseDiscussion = ({ courseId, lessonId }: CourseDiscussionProps) => {
  const { user } = useAuthStore()
  const [comments, setComments] = useState<Comment[]>([])
  const [showDiscussion, setShowDiscussion] = useState(true)

  const handleAddComment = (content: string) => {
    if (!user) return

    const newComment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || '',
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    }

    setComments((prev) => [newComment, ...prev])
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Discussion Header */}
      <div
        className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer"
        onClick={() => setShowDiscussion(!showDiscussion)}
      >
        <h2 className="text-lg font-semibold text-gray-900">Discussion</h2>
        <motion.button
          animate={{ rotate: showDiscussion ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {showDiscussion && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4">
              <CommentForm onSubmit={handleAddComment} />
              <CommentList comments={comments} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CourseDiscussion 