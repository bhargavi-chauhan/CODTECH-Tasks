import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EnrolledCourse {
  courseId: string
  enrolledAt: string
  progress: number
  lastAccessedAt: string
}

interface CourseEnrollmentState {
  enrolledCourses: EnrolledCourse[]
  isLoading: boolean
  error: string | null
  enrollInCourse: (courseId: string) => Promise<void>
  updateProgress: (courseId: string, progress: number) => void
  isEnrolled: (courseId: string) => boolean
  getProgress: (courseId: string) => number
}

export const useCourseEnrollmentStore = create<CourseEnrollmentState>()(
  persist(
    (set, get) => ({
      enrolledCourses: [],
      isLoading: false,
      error: null,

      enrollInCourse: async (courseId) => {
        set({ isLoading: true, error: null })
        try {
          // Mock API call - replace with real API
          await new Promise((resolve) => setTimeout(resolve, 1000))
          
          set((state) => ({
            enrolledCourses: [
              ...state.enrolledCourses,
              {
                courseId,
                enrolledAt: new Date().toISOString(),
                progress: 0,
                lastAccessedAt: new Date().toISOString(),
              },
            ],
          }))
        } catch (error) {
          set({ error: 'Failed to enroll in course' })
        } finally {
          set({ isLoading: false })
        }
      },

      updateProgress: (courseId, progress) => {
        set((state) => ({
          enrolledCourses: state.enrolledCourses.map((course) =>
            course.courseId === courseId
              ? {
                  ...course,
                  progress,
                  lastAccessedAt: new Date().toISOString(),
                }
              : course
          ),
        }))
      },

      isEnrolled: (courseId) => {
        return get().enrolledCourses.some((course) => course.courseId === courseId)
      },

      getProgress: (courseId) => {
        const course = get().enrolledCourses.find(
          (course) => course.courseId === courseId
        )
        return course?.progress ?? 0
      },
    }),
    {
      name: 'course-enrollment-storage',
    }
  )
) 