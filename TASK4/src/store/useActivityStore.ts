import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ActivityEvent {
  id: string
  userId: string
  type: 'course_view' | 'lesson_complete' | 'quiz_attempt' | 'comment' | 'like'
  targetId: string
  metadata?: Record<string, any>
  timestamp: string
}

interface ActivityState {
  events: ActivityEvent[]
  addEvent: (event: Omit<ActivityEvent, 'id' | 'timestamp'>) => void
  getEventsByUser: (userId: string) => ActivityEvent[]
  getEventsByType: (type: ActivityEvent['type']) => ActivityEvent[]
  getEventsByTarget: (targetId: string) => ActivityEvent[]
  clearEvents: () => void
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set, get) => ({
      events: [],

      addEvent: (event) => {
        set((state) => ({
          events: [
            {
              ...event,
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
            },
            ...state.events,
          ],
        }))
      },

      getEventsByUser: (userId) => {
        return get().events.filter((event) => event.userId === userId)
      },

      getEventsByType: (type) => {
        return get().events.filter((event) => event.type === type)
      },

      getEventsByTarget: (targetId) => {
        return get().events.filter((event) => event.targetId === targetId)
      },

      clearEvents: () => {
        set({ events: [] })
      },
    }),
    {
      name: 'activity-storage',
    }
  )
) 