import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
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
            className="fixed right-0 top-0 bottom-0 w-64 bg-white z-50 shadow-xl"
          >
            <div className="p-4">
              <div className="flex justify-end">
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="mt-4">
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg"
                  onClick={onClose}
                >
                  Home
                </Link>
                <Link
                  to="/courses"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg"
                  onClick={onClose}
                >
                  Courses
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg"
                  onClick={onClose}
                >
                  Dashboard
                </Link>
                <div className="border-t border-gray-200 my-4" />
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg"
                  onClick={onClose}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-primary hover:bg-primary/10 rounded-lg"
                  onClick={onClose}
                >
                  Sign Up
                </Link>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu 