import { motion } from 'framer-motion'

interface LoadingStateProps {
  message?: string
}

const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  )
}

export default LoadingState 