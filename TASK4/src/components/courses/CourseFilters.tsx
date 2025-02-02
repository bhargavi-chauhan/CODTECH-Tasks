import { useState } from 'react'
import { motion } from 'framer-motion'
import { RangeSlider } from '@/components/ui/RangeSlider'

export interface CourseFilters {
  categories: string[]
  levels: string[]
  priceRange: [number, number]
  rating: number | null
  duration: string | null
  sortBy: string
}

interface CourseFiltersProps {
  onFilterChange: (filters: CourseFilters) => void
}

export default function CourseFilters({ onFilterChange }: CourseFiltersProps) {
  const [filters, setFilters] = useState<CourseFilters>({
    categories: [],
    levels: [],
    priceRange: [0, 200],
    rating: null,
    duration: null,
    sortBy: 'popular'
  })

  const handleFilterChange = (key: keyof CourseFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Categories</h3>
        <div className="mt-4 space-y-2">
          {['Web Development', 'Mobile Development', 'Data Science', 'Design', 'Business'].map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...filters.categories, category]
                    : filters.categories.filter((c) => c !== category)
                  handleFilterChange('categories', newCategories)
                }}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="ml-2 text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Level */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Level</h3>
        <div className="mt-4 space-y-2">
          {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.levels.includes(level)}
                onChange={(e) => {
                  const newLevels = e.target.checked
                    ? [...filters.levels, level]
                    : filters.levels.filter((l) => l !== level)
                  handleFilterChange('levels', newLevels)
                }}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="ml-2 text-gray-600">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={200}
            step={10}
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Rating</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleFilterChange('rating', filters.rating === rating ? null : rating)}
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

      {/* Duration */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Duration</h3>
        <div className="mt-4 space-y-2">
          {[
            { label: '0-2 hours', value: 'short' },
            { label: '3-6 hours', value: 'medium' },
            { label: '7-16 hours', value: 'long' },
            { label: '17+ hours', value: 'extended' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange('duration', filters.duration === option.value ? null : option.value)}
              className={`w-full text-left px-3 py-2 rounded ${
                filters.duration === option.value
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="mt-4 w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
        >
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  )
} 