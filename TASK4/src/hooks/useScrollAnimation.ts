import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface ScrollAnimationOptions {
  threshold?: number
  once?: boolean
  amount?: 'some' | 'all' | number
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const { threshold = 0.1, once = true, amount = 0.5 } = options
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once,
    amount,
  })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return {
    ref,
    isInView: once ? hasAnimated : isInView,
    hasAnimated,
  }
} 