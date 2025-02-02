import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDebounce } from '@/hooks/useDebounce'
import RangeSlider from '../ui/RangeSlider'

interface SearchFilters {
  categories: string[]
  levels: string[]
  duration: [number, number]
  price: [number, number]
  rating: number | null
  instructors: string[]
  language: string[]
  sortBy: 'popular' | 'newest' | 'rating' | 'price-low' | 'price-high'
}

interface AdvancedCourseSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void
  categories: string[]
  instructors: string[]
}

const AdvancedCourseSearch = ({
  onSearch,
  categories,
  instructors,
}: AdvancedCourseSearchProps) => {
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    levels: [],
    duration: [0, 50],
    price: [0, 200],
    rating: null,
    instructors: [],
    language: [],
    sortBy: 'popular',
  })

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    onSearch(debouncedQuery, filters)
  }, [debouncedQuery, filters, onSearch])

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mt-2 flex items-center text-sm text-gray-600 hover:text-primary"
        >
          <motion.svg
            animate={{ rotate: showFilters ? 180 : 0 }}
            className="w-4 h-4 mr-1"
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
          </motion.svg>
          Advanced Filters
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200"
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={(e) => {
                          const newCategories = e.target.checked
                            ? [...filters.categories, category]
                            : filters.categories.filter((c) => c !== category)
                          updateFilter('categories', newCategories)
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <RangeSlider
                  min={0}
                  max={200}
                  step={5}
                  value={filters.price}
                  onChange={(value) => updateFilter('price', value as [number, number])}
                  formatLabel={(value) => `$${value}`}
                />
              </div>

              {/* Duration */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Duration (hours)</h4>
                <RangeSlider
                  min={0}
                  max={50}
                  step={1}
                  value={filters.duration}
                  onChange={(value) => updateFilter('duration', value as [number, number])}
                  formatLabel={(value) => `${value}h`}
                />
              </div>

              {/* Level */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Level</h4>
                <div className="space-y-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.levels.includes(level)}
                        onChange={(e) => {
                          const newLevels = e.target.checked
                            ? [...filters.levels, level]
                            : filters.levels.filter((l) => l !== level)
                          updateFilter('levels', newLevels)
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
                <div className="flex items-center space-x-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        updateFilter('rating', filters.rating === rating ? null : rating)
                      }
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.rating === rating
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {rating}+ ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    updateFilter(
                      'sortBy',
                      e.target.value as SearchFilters['sortBy']
                    )
                  }
                  className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdvancedCourseSearch 