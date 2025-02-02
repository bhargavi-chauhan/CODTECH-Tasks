import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number // 0 to 100
  size?: 'sm' | 'md' | 'lg'
  showPercentage?: boolean
}

const ProgressBar = ({ progress, size = 'md', showPercentage = true }: ProgressBarProps) => {
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className="w-full">
      <div className={`bg-gray-200 rounded-full overflow-hidden ${heights[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className={`bg-primary ${heights[size]}`}
        />
      </div>
      {showPercentage && (
        <p className="text-xs text-gray-600 mt-1">{progress}% Complete</p>
      )}
    </div>
  )
}

export default ProgressBar 