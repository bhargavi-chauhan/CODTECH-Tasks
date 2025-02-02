import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '@/components/layout/MainLayout'
import { PageTransitionWrapper } from '@/components/ui/animations'
import CourseSearch from '@/components/courses/CourseSearch'
import CourseFilters from '@/components/courses/CourseFilters'
import CourseCard from '@/components/courses/CourseCard'
import type { CourseFilters as FilterTypes } from '@/components/courses/CourseFilters'

// Mock data - replace with API call
const mockCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn web development from scratch. Master HTML, CSS, JavaScript, React, and Node.js.',
    instructor: {
      name: 'Sarah Johnson',
      avatar: '/images/instructors/sarah.jpg',
    },
    thumbnail: '/images/courses/web-dev.jpg',
    price: 99.99,
    rating: 4.8,
    totalStudents: 15420,
    lastUpdated: '2023-12-01',
    duration: '42 hours',
    level: 'Beginner',
    category: 'Web Development',
  },
  {
    id: '2',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps using React Native and modern JavaScript.',
    instructor: {
      name: 'Mike Chen',
      avatar: '/images/instructors/mike.jpg',
    },
    thumbnail: '/images/courses/mobile-dev.jpg',
    price: 89.99,
    rating: 4.7,
    totalStudents: 8750,
    lastUpdated: '2024-01-15',
    duration: '38 hours',
    level: 'Intermediate',
    category: 'Mobile Development',
  },
  {
    id: '3',
    title: 'Data Science and Machine Learning',
    description: 'Master data analysis, visualization, and machine learning with Python.',
    instructor: {
      name: 'Emily Brown',
      avatar: '/images/instructors/emily.jpg',
    },
    thumbnail: '/images/courses/data-science.jpg',
    price: 129.99,
    rating: 4.9,
    totalStudents: 12300,
    lastUpdated: '2024-02-01',
    duration: '52 hours',
    level: 'Advanced',
    category: 'Data Science',
  },
]

export default function CoursesPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<FilterTypes>({
    categories: [],
    levels: [],
    priceRange: [0, 200],
    rating: null,
    duration: null,
    sortBy: 'popular',
  })

  // Filter courses based on search query and filters
  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeFilters.categories.length === 0 ||
      activeFilters.categories.includes(course.category)

    const matchesLevel = activeFilters.levels.length === 0 ||
      activeFilters.levels.includes(course.level)

    const matchesPrice = course.price >= activeFilters.priceRange[0] &&
      course.price <= activeFilters.priceRange[1]

    const matchesRating = !activeFilters.rating ||
      course.rating >= activeFilters.rating

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesRating
  })

  // Sort courses based on active sort option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (activeFilters.sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      default: // 'popular'
        return b.totalStudents - a.totalStudents
    }
  })

  return (
    <MainLayout>
      <PageTransitionWrapper>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
                <p className="mt-1 text-sm text-gray-500">
                  {filteredCourses.length} courses available
                </p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mt-6">
              <CourseSearch onSearch={setSearchQuery} />
              
              {/* Mobile filter dialog */}
              <div className="md:hidden mt-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Filters
                </button>
              </div>
            </div>

            <div className="mt-8 lg:grid lg:grid-cols-4 lg:gap-x-8">
              {/* Filters */}
              <div className="hidden lg:block">
                <CourseFilters onFilterChange={setActiveFilters} />
              </div>

              {/* Course grid */}
              <div className="mt-6 lg:mt-0 lg:col-span-3">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {sortedCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CourseCard {...course} />
                    </motion.div>
                  ))}
                </div>

                {filteredCourses.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile filters */}
        <AnimatePresence>
          {showFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-25 z-40"
                onClick={() => setShowFilters(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50 overflow-y-auto"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close filters</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4">
                    <CourseFilters onFilterChange={setActiveFilters} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </PageTransitionWrapper>
    </MainLayout>
  )
} 