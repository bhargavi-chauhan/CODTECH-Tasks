import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'

interface CommentFormProps {
  onSubmit: (content: string) => void
  placeholder?: string
  buttonText?: string
}

const CommentForm = ({
  onSubmit,
  placeholder = 'Add to the discussion...',
  buttonText = 'Post Comment',
}: CommentFormProps) => {
  const { user } = useAuthStore()
  const [content, setContent] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !user) return

    onSubmit(content.trim())
    setContent('')
  }

  if (!user) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600">Please log in to join the discussion.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
        />
        <motion.div
          initial={false}
          animate={{
            height: isFocused ? 2 : 0,
            backgroundColor: content ? '#4F46E5' : '#E5E7EB',
          }}
          className="absolute bottom-0 left-0 right-0 origin-bottom"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-600">{user.name}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!content.trim()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonText}
        </motion.button>
      </div>
    </form>
  )
}

export default CommentForm 