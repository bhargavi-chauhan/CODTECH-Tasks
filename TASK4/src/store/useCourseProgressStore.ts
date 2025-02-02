import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LessonProgress {
  lessonId: string
  completed: boolean
  lastAccessedAt: string
  timeSpent: number // in seconds
}

interface CourseProgress {
  courseId: string
  lessons: LessonProgress[]
  lastAccessedAt: string
  currentLessonId: string | null
}

interface CourseProgressState {
  coursesProgress: Record<string, CourseProgress>
  updateLessonProgress: (courseId: string, lessonId: string, completed: boolean) => void
  updateTimeSpent: (courseId: string, lessonId: string, timeSpent: number) => void
  setCurrentLesson: (courseId: string, lessonId: string) => void
  getCourseProgress: (courseId: string) => number
  getLessonProgress: (courseId: string, lessonId: string) => LessonProgress | null
  getCurrentLesson: (courseId: string) => string | null
}

export const useCourseProgressStore = create<CourseProgressState>()(
  persist(
    (set, get) => ({
      coursesProgress: {},

      updateLessonProgress: (courseId, lessonId, completed) => {
        set((state) => {
          const courseProgress = state.coursesProgress[courseId] || {
            courseId,
            lessons: [],
            lastAccessedAt: new Date().toISOString(),
            currentLessonId: null,
          }

          const updatedLessons = [...courseProgress.lessons]
          const lessonIndex = updatedLessons.findIndex((l) => l.lessonId === lessonId)

          if (lessonIndex >= 0) {
            updatedLessons[lessonIndex] = {
              ...updatedLessons[lessonIndex],
              completed,
              lastAccessedAt: new Date().toISOString(),
            }
          } else {
            updatedLessons.push({
              lessonId,
              completed,
              lastAccessedAt: new Date().toISOString(),
              timeSpent: 0,
            })
          }

          return {
            coursesProgress: {
              ...state.coursesProgress,
              [courseId]: {
                ...courseProgress,
                lessons: updatedLessons,
                lastAccessedAt: new Date().toISOString(),
              },
            },
          }
        })
      },

      updateTimeSpent: (courseId, lessonId, timeSpent) => {
        set((state) => {
          const courseProgress = state.coursesProgress[courseId]
          if (!courseProgress) return state

          const updatedLessons = courseProgress.lessons.map((lesson) =>
            lesson.lessonId === lessonId
              ? { ...lesson, timeSpent: lesson.timeSpent + timeSpent }
              : lesson
          )

          return {
            coursesProgress: {
              ...state.coursesProgress,
              [courseId]: {
                ...courseProgress,
                lessons: updatedLessons,
                lastAccessedAt: new Date().toISOString(),
              },
            },
          }
        })
      },

      setCurrentLesson: (courseId, lessonId) => {
        set((state) => ({
          coursesProgress: {
            ...state.coursesProgress,
            [courseId]: {
              ...(state.coursesProgress[courseId] || {
                courseId,
                lessons: [],
                lastAccessedAt: new Date().toISOString(),
              }),
              currentLessonId: lessonId,
              lastAccessedAt: new Date().toISOString(),
            },
          },
        }))
      },

      getCourseProgress: (courseId) => {
        const courseProgress = get().coursesProgress[courseId]
        if (!courseProgress || courseProgress.lessons.length === 0) return 0

        const completedLessons = courseProgress.lessons.filter((l) => l.completed).length
        return Math.round((completedLessons / courseProgress.lessons.length) * 100)
      },

      getLessonProgress: (courseId, lessonId) => {
        const courseProgress = get().coursesProgress[courseId]
        if (!courseProgress) return null

        return (
          courseProgress.lessons.find((l) => l.lessonId === lessonId) || null
        )
      },

      getCurrentLesson: (courseId) => {
        const courseProgress = get().coursesProgress[courseId]
        return courseProgress?.currentLessonId || null
      },
    }),
    {
      name: 'course-progress-storage',
    }
  )
) 