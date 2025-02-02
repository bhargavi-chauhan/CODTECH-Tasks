import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Section {
  id: string
  title: string
  duration: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'quiz' | 'article'
  isPreview: boolean
  isCompleted?: boolean
}

interface CourseCurriculumProps {
  sections: Section[]
  onLessonClick: (sectionId: string, lessonId: string) => void
  currentLessonId?: string
}

export default function CourseCurriculum({
  sections,
  onLessonClick,
  currentLessonId,
}: CourseCurriculumProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([sections[0]?.id])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case 'quiz':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
      case 'article':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"
            />
          </svg>
        )
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
        <div className="mt-2 text-sm text-gray-500">
          {sections.length} sections • {sections.reduce((acc, section) => acc + section.lessons.length, 0)} lessons
        </div>
      </div>

      <div className="border-t border-gray-200">
        {sections.map((section) => (
          <div key={section.id} className="border-b border-gray-200 last:border-b-0">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedSections.includes(section.id) ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="font-medium text-gray-900">{section.title}</span>
              </div>
              <span className="text-sm text-gray-500">{section.duration}</span>
            </button>

            <AnimatePresence>
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 space-y-2">
                    {section.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => onLessonClick(section.id, lesson.id)}
                        className={`w-full px-4 py-3 flex items-center justify-between rounded-lg ${
                          currentLessonId === lesson.id
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-gray-500">{getLessonIcon(lesson.type)}</div>
                          <span className="text-sm font-medium">{lesson.title}</span>
                          {lesson.isPreview && (
                            <span className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded">
                              Preview
                            </span>
                          )}
                          {lesson.isCompleted && (
                            <svg
                              className="w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
} 