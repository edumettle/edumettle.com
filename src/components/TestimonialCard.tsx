import { FaQuoteLeft, FaStar } from 'react-icons/fa'

interface TestimonialCardProps {
  quote: string
  author: string
  role?: string
  rating?: number
}

export default function TestimonialCard({ quote, author, role, rating = 5 }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-primary-500 dark:border-primary-400 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="space-y-4">
        {/* Quote Icon */}
        <FaQuoteLeft className="text-primary-600 text-2xl" />
        
        {/* Rating */}
        <div className="flex space-x-1">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-sm" />
          ))}
        </div>
        
        {/* Quote */}
        <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">"{quote}"</p>
        
        {/* Author */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="font-semibold text-gray-900 dark:text-white">{author}</div>
          {role && <div className="text-sm text-gray-600 dark:text-gray-400">{role}</div>}
        </div>
      </div>
    </div>
  )
}
