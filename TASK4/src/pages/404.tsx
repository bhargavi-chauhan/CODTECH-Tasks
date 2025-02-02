import Link from 'next/link'
import { PageTransitionWrapper } from '@/components/ui/animations'

export default function NotFound() {
  return (
    <PageTransitionWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="mt-4 text-xl text-gray-600">Page not found</p>
          <Link 
            href="/"
            className="mt-6 inline-block btn-primary"
          >
            Go back home
          </Link>
        </div>
      </div>
    </PageTransitionWrapper>
  )
} 