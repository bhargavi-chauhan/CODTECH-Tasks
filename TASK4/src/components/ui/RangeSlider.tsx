import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface RangeSliderProps {
  min: number
  max: number
  step: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  formatLabel?: (value: number) => string
}

export function RangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  formatLabel = (value) => value.toString()
}: RangeSliderProps) {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const getPercentage = (value: number) => ((value - min) / (max - min)) * 100

  const handleMouseDown = (handle: 'min' | 'max') => {
    setIsDragging(handle)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const newValue = Math.round((percentage * (max - min)) / 100 / step) * step + min

    if (isDragging === 'min') {
      onChange([Math.min(newValue, value[1] - step), value[1]])
    } else {
      onChange([value[0], Math.max(newValue, value[0] + step)])
    }
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="relative pt-6 pb-2">
      <div
        ref={sliderRef}
        className="h-2 bg-gray-200 rounded-full relative"
      >
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{
            left: `${getPercentage(value[0])}%`,
            right: `${100 - getPercentage(value[1])}%`,
          }}
        />
        {['min', 'max'].map((handle, index) => (
          <motion.button
            key={handle}
            onMouseDown={() => handleMouseDown(handle as 'min' | 'max')}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-primary shadow focus:outline-none"
            style={{
              left: `${getPercentage(value[index])}%`,
              cursor: isDragging === handle ? 'grabbing' : 'grab',
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-sm text-gray-600">{formatLabel(value[0])}</span>
        <span className="text-sm text-gray-600">{formatLabel(value[1])}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => onChange([value[0], Number(e.target.value)])}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
      />
    </div>
  )
}

export default RangeSlider 