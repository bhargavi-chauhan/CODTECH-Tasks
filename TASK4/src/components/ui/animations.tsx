import { motion } from 'framer-motion'

// Fade in animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

// Slide up animation variants
export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

// Scale animation variants
export const scale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

// Stagger children animation
export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// List item animation
export const listItem = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

// Card hover animation
export const cardHover = {
  whileHover: { y: -5, transition: { duration: 0.2 } },
  whileTap: { y: 0 },
}

// Button hover animation
export const buttonHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
}

// Container for animated items
export const AnimatedContainer = motion.div

// Animated list item
export const AnimatedListItem = ({ children, delay = 0 }) => (
  <motion.div
    variants={listItem}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ delay }}
  >
    {children}
  </motion.div>
)

// Animated card
export const AnimatedCard = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={cardHover}
    whileHover="whileHover"
    whileTap="whileTap"
  >
    {children}
  </motion.div>
)

// Animated button
export const AnimatedButton = ({ children, onClick, className = '', disabled = false }) => (
  <motion.button
    onClick={onClick}
    className={className}
    variants={buttonHover}
    whileHover="whileHover"
    whileTap="whileTap"
    disabled={disabled}
  >
    {children}
  </motion.button>
)

// Page transition wrapper
export const PageTransitionWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={slideUp}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
)

// Modal animation wrapper
export const ModalWrapper = ({ children, isOpen, onClose }) => (
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed inset-x-4 bottom-0 top-auto md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50"
        >
          {children}
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

// Loading spinner animation
export const LoadingSpinner = () => (
  <motion.div
    className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  />
)

// Progress bar animation
export const AnimatedProgressBar = ({ progress, className = '' }) => (
  <div className={`h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <motion.div
      className="h-full bg-primary"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    />
  </div>
)

// Notification toast animation
export const NotificationToast = ({ message, type = 'info', onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white`}
  >
    <div className="flex items-center space-x-2">
      <span>{message}</span>
      <button onClick={onClose} className="hover:opacity-80">
        ✕
      </button>
    </div>
  </motion.div>
) 