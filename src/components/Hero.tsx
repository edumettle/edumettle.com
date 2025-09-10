import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Upgrade Your Mind with{' '}
                <span className="text-primary-600">EduMettle</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Live, interactive training in Data Science, Machine Learning, DSA, 
                DevOps & Web Development.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/registration" className="btn-primary text-center">
                Join the Next Live Batch
              </Link>
              <Link href="/courses" className="btn-secondary text-center">
                View All Courses
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div>
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-gray-600 dark:text-gray-300">Students Trained</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">95%</div>
                <div className="text-gray-600 dark:text-gray-300">Job Placement Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">50+</div>
                <div className="text-gray-600 dark:text-gray-300">Live Projects</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Students in modern coding workspace"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LIVE</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Interactive Learning</div>
                  <div className="text-sm text-gray-600">Real-time feedback</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">CERT</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Industry Certified</div>
                  <div className="text-sm text-gray-600">Google, IBM, Microsoft</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
