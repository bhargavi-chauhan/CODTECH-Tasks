import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

interface NavigationDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentSection: string
}

const NavigationDrawer = ({ isOpen, onClose, currentSection }: NavigationDrawerProps) => {
  const { user } = useAuthStore()

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'content', title: 'Course Content' },
    { id: 'reviews', title: 'Reviews' },
    { id: 'analytics', title: 'Your Progress' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 bottom-0 w-64 bg-white z-50"
          >
            <div className="p-4">
              {user && (
                <div className="flex items-center space-x-3 mb-6">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              )}

              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      onClose()
                      // Implement scroll to section logic here
                    }}
                    className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                      currentSection === section.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={onClose}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={onClose}
                >
                  Profile
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default NavigationDrawer 