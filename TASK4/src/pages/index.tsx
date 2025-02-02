import { PageTransitionWrapper } from '@/components/ui/animations'
import MainLayout from '@/components/layout/MainLayout'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CourseCard from '@/components/courses/CourseCard'

export default function Home() {
  const featuredCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn web development from scratch. Master HTML, CSS, JavaScript, React, and Node.js.',
      instructor: {
        name: 'Sarah Johnson',
        avatar: '/images/instructors/sarah.jpg',
      },
      thumbnail: '/images/courses/webdev.png',
      price: 99.99,
      rating: 4.8,
      totalStudents: 15420,
      lastUpdated: '2023-12-01',
      duration: '42 hours',
      level: 'Beginner',
    },
    // Add more courses...
  ]

  return (
    <MainLayout>
      <PageTransitionWrapper>
        {/* Hero Section */}
        <section className="relative bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 lg:max-w-2xl lg:w-full">
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8">
                  <div className="sm:text-center lg:text-left">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                    >
                      <span className="block xl:inline">Learn and grow with</span>{' '}
                      <span className="block text-primary xl:inline">ThriveTeach</span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                    >
                      Access high-quality courses, expert instructors, and a supportive community.
                      Start your learning journey today.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                    >
                      <div className="rounded-md shadow">
                        <Link
                          href="/courses"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-600 md:py-4 md:text-lg md:px-10"
                        >
                          Get Started
                        </Link>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link
                          href="/about"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-50 hover:bg-primary-100 md:py-4 md:text-lg md:px-10"
                        >
                          Learn More
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </main>
              </div>
            </div>
          </div>
          <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="h-56 w-full sm:h-72 md:h-96 lg:h-full relative">
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <img
                className="h-full w-full object-cover"
                src="/images/bgDesk.jpg"
                alt="Online learning"
              />
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Featured Courses
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Start learning from our most popular courses
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/courses"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 transition-colors"
              >
                Browse All Courses
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </PageTransitionWrapper>
    </MainLayout>
  )
} 