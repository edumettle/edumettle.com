import Link from 'next/link'
import { FaClock, FaUsers, FaCertificate, FaArrowRight } from 'react-icons/fa'

interface CourseCardProps {
  title: string
  description: string
  duration: string
  batchSize: string
  isAvailable: boolean
  nextIntake?: string
  href: string
  featured?: boolean
}

export default function CourseCard({
  title,
  description,
  duration,
  batchSize,
  isAvailable,
  nextIntake,
  href,
  featured = false
}: CourseCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
      featured ? 'ring-2 ring-primary-500' : ''
    }`}>
      {featured && (
        <div className="bg-primary-600 text-white text-center py-2">
          <span className="font-semibold">🔥 Featured Course - Now Open!</span>
        </div>
      )}
      
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <FaClock />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaUsers />
              <span>{batchSize}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaCertificate />
              <span>Certified</span>
            </div>
          </div>

          {!isAvailable && nextIntake && (
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg text-sm">
              Next intake: {nextIntake}
            </div>
          )}

          <div className="pt-4">
            {isAvailable ? (
              <Link 
                href={href}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <span>Enroll Now</span>
                <FaArrowRight size={14} />
              </Link>
            ) : (
              <button 
                className="w-full py-3 px-6 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-semibold rounded-lg cursor-not-allowed"
                disabled
              >
                Coming Soon
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
