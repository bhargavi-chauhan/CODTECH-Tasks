import { useState, useCallback } from 'react'

interface UseApiStateProps<T> {
  initialData?: T
}

export function useApiState<T>({ initialData }: UseApiStateProps<T> = {}) {
  const [data, setData] = useState<T | undefined>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async <R>(
    apiCall: () => Promise<R>,
    options: {
      onSuccess?: (data: R) => void
      onError?: (error: any) => void
    } = {}
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await apiCall()
      setData(result as unknown as T)
      options.onSuccess?.(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      options.onError?.(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(initialData)
    setIsLoading(false)
    setError(null)
  }, [initialData])

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
    setData,
  }
} 