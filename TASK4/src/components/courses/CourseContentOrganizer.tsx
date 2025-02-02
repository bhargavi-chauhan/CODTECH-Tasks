import { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { useCourseProgressStore } from '@/store/useCourseProgressStore'

interface Section {
  id: string
  title: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'text' | 'quiz'
}

interface CourseContentOrganizerProps {
  courseId: string
  sections: Section[]
  onSectionUpdate: (sections: Section[]) => void
  onLessonSelect: (sectionId: string, lessonId: string) => void
}

const CourseContentOrganizer = ({
  courseId,
  sections,
  onSectionUpdate,
  onLessonSelect,
}: CourseContentOrganizerProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const { getLessonProgress } = useCourseProgressStore()

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <Reorder.Group
        axis="y"
        values={sections}
        onReorder={onSectionUpdate}
        className="divide-y divide-gray-200"
      >
        {sections.map((section) => (
          <Reorder.Item
            key={section.id}
            value={section}
            className="cursor-move"
          >
            <div className="p-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center space-x-3">
                  <motion.button
                    animate={{ rotate: expandedSections.includes(section.id) ? 180 : 0 }}
                    className="text-gray-500"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.button>
                  <h3 className="font-medium text-gray-900">{section.title}</h3>
                </div>
                <div className="text-sm text-gray-500">
                  {section.lessons.length} lessons
                </div>
              </div>

              <AnimatePresence>
                {expandedSections.includes(section.id) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-2 pl-8">
                      {section.lessons.map((lesson) => {
                        const progress = getLessonProgress(courseId, lesson.id)
                        return (
                          <motion.div
                            key={lesson.id}
                            whileHover={{ x: 4 }}
                            onClick={() => onLessonSelect(section.id, lesson.id)}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-gray-500">
                                {lesson.type === 'video' && (
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
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
                                )}
                                {lesson.type === 'text' && (
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                )}
                                {lesson.type === 'quiz' && (
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span className="text-sm text-gray-700">
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-500">
                                {lesson.duration}
                              </span>
                              {progress?.completed && (
                                <svg
                                  className="w-5 h-5 text-green-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}

export default CourseContentOrganizer 