import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Learn Without Limits
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Start, switch, or advance your career with our online courses
          </p>
          <div className="mt-8">
            <Link
              to="/courses"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Courses
            </Link>
          </div>
        </motion.div>

        {/* Featured Categories */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Development',
              icon: '💻',
              description: 'Learn to code and build applications',
            },
            {
              title: 'Design',
              icon: '🎨',
              description: 'Master UI/UX and graphic design',
            },
            {
              title: 'Business',
              icon: '📈',
              description: 'Develop business and management skills',
            },
          ].map((category) => (
            <motion.div
              key={category.title}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">
                {category.title}
              </h3>
              <p className="mt-2 text-gray-600">{category.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Course',
                description: 'Browse our catalog and find your perfect course',
              },
              {
                step: '02',
                title: 'Learn at Your Pace',
                description: 'Access course content anytime, anywhere',
              },
              {
                step: '03',
                title: 'Get Certified',
                description: 'Complete courses and earn certificates',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-block bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage 