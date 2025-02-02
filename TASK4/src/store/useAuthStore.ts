import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          // Replace with actual API call
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })

          if (!response.ok) {
            throw new Error('Login failed')
          }

          const user = await response.json()
          set({
            user: {
              id: user.id,
              name: user.name,
              email,
              avatar: user.avatar,
            },
          })
        } catch (error) {
          set({ error: 'Invalid email or password' })
        } finally {
          set({ isLoading: false })
        }
      },

      signup: async (name, email, password) => {
        set({ isLoading: true, error: null })
        try {
          // Replace with actual API call
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          })

          if (!response.ok) {
            throw new Error('Signup failed')
          }

          const user = await response.json()
          set({
            user: {
              id: user.id,
              name,
              email,
              avatar: user.avatar,
            },
          })
        } catch (error) {
          set({ error: 'Failed to create account' })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({ user: null })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
) 