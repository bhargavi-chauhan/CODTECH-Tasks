import { useState } from 'react'
import { GetServerSideProps } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import { PageTransitionWrapper } from '@/components/ui/animations'
import CourseHero from '@/components/courses/CourseHero'
import CourseCurriculum from '@/components/courses/CourseCurriculum'
import CourseReviews from '@/components/courses/CourseReviews'
import VideoPlayer from '@/components/courses/VideoPlayer'
import { useAuthStore } from '@/store/useAuthStore'

// Mock data - replace with API call
const courseData = {
  id: '1',
  title: 'Complete Web Development Bootcamp',
  description: 'Learn web development from scratch. Master HTML, CSS, JavaScript, React, and Node.js.',
  instructor: {
    name: 'Sarah Johnson',
    avatar: '/images/instructors/sarah.jpg',
    title: 'Senior Web Developer',
  },
  thumbnail: '/images/courses/web-dev.jpg',
  price: 99.99,
  rating: 4.8,
  totalStudents: 15420,
  lastUpdated: '2023-12-01',
  duration: '42 hours',
  level: 'Beginner',
  sections: [
    {
      id: 's1',
      title: 'Introduction to Web Development',
      duration: '2 hours',
      lessons: [
        {
          id: 'l1',
          title: 'Welcome to the Course',
          duration: '5:00',
          type: 'video',
          isPreview: true,
        },
        // Add more lessons...
      ],
    },
    // Add more sections...
  ],
  reviews: [
    {
      id: 'r1',
      userId: 'u1',
      userName: 'John Doe',
      userAvatar: '/images/avatars/john.jpg',
      rating: 5,
      content: 'Excellent course! Very comprehensive and well-structured.',
      createdAt: '2024-01-15',
      helpful: 42,
      response: {
        instructorName: 'Sarah Johnson',
        content: 'Thank you for your kind words, John! I\'m glad you found the course helpful.',
        createdAt: '2024-01-16',
      },
    },
    // Add more reviews...
  ],
  ratingDistribution: {
    '5': 1200,
    '4': 800,
    '3': 200,
    '2': 50,
    '1': 20,
  },
}

export default function CourseDetailPage() {
  const [currentLessonId, setCurrentLessonId] = useState<string>()
  const { user } = useAuthStore()

  const handleLessonClick = (sectionId: string, lessonId: string) => {
    setCurrentLessonId(lessonId)
  }

  const handleEnroll = () => {
    // Implement enrollment logic
  }

  return (
    <MainLayout>
      <PageTransitionWrapper>
        <CourseHero
          title={courseData.title}
          description={courseData.description}
          instructor={courseData.instructor}
          thumbnail={courseData.thumbnail}
          price={courseData.price}
          rating={courseData.rating}
          totalStudents={courseData.totalStudents}
          lastUpdated={courseData.lastUpdated}
          duration={courseData.duration}
          level={courseData.level}
          onEnroll={handleEnroll}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {currentLessonId && (
                <VideoPlayer
                  videoUrl="/videos/lesson.mp4"
                  thumbnailUrl={courseData.thumbnail}
                  title="Current Lesson"
                  onProgress={(progress) => {
                    // Handle progress update
                  }}
                />
              )}

              <CourseCurriculum
                sections={courseData.sections}
                onLessonClick={handleLessonClick}
                currentLessonId={currentLessonId}
              />

              <CourseReviews
                reviews={courseData.reviews}
                averageRating={courseData.rating}
                totalReviews={courseData.reviews.length}
                ratingDistribution={courseData.ratingDistribution}
              />
            </div>

            <div className="lg:col-span-1">
              {/* Additional course information or related courses can go here */}
            </div>
          </div>
        </div>
      </PageTransitionWrapper>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Fetch course data based on params.id
  return {
    props: {
      // courseData
    },
  }
} 