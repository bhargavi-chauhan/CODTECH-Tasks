import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCourseProgressStore } from '@/store/useCourseProgressStore'
import LessonProgress from './LessonProgress'

interface CourseContentViewerProps {
  courseId: string
  lessonId: string
  content: {
    title: string
    type: 'video' | 'text' | 'quiz'
    videoUrl?: string
    textContent?: string
    quizQuestions?: Array<{
      question: string
      options: string[]
      correctAnswer: number
    }>
  }
}

const CourseContentViewer = ({ courseId, lessonId, content }: CourseContentViewerProps) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { setCurrentLesson } = useCourseProgressStore()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setShowSidebar(window.innerWidth >= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setCurrentLesson(courseId, lessonId)
  }, [courseId, lessonId, setCurrentLesson])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar Toggle for Mobile */}
        {isMobile && (
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={showSidebar ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        )}

        {/* Content Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={isMobile ? { x: '-100%' } : false}
              animate={{ x: 0 }}
              exit={isMobile ? { x: '-100%' } : undefined}
              className={`${
                isMobile ? 'fixed inset-y-0 left-0 z-40' : 'sticky top-0'
              } w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto`}
            >
              {/* Sidebar content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Content</h2>
                {/* Add course navigation here */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{content.title}</h1>

            {/* Content based on type */}
            {content.type === 'video' && (
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                <iframe
                  src={content.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}

            {content.type === 'text' && (
              <div className="prose max-w-none">
                {content.textContent}
              </div>
            )}

            {content.type === 'quiz' && (
              <div className="space-y-6">
                {content.quizQuestions?.map((question, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg border border-gray-200"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <LessonProgress courseId={courseId} lessonId={lessonId} />
    </div>
  )
}

export default CourseContentViewer 