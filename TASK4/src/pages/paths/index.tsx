import MainLayout from '@/components/layout/MainLayout'
import { PageTransitionWrapper } from '@/components/ui/animations'

export default function LearningPathsPage() {
  return (
    <MainLayout>
      <PageTransitionWrapper>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900">Learning Paths</h1>
            {/* Add learning paths content */}
          </div>
        </div>
      </PageTransitionWrapper>
    </MainLayout>
  )
} 