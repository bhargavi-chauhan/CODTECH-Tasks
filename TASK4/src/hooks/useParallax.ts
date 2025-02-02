import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxOptions {
  speed?: number
  offset?: [number, number]
  clamp?: boolean
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 1, offset = [-100, 100], clamp = true } = options
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    offset,
    { clamp }
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 1, 0]
  )

  return { ref, y, opacity }
} 