import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CourseCard from '@/components/CourseCard'
import Image from 'next/image'
import Link from 'next/link'
import { FaRocket, FaClock, FaUsers, FaCertificate } from 'react-icons/fa'

export default function CoursesPage() {
  const featuredCourse = {
    title: "AI Fluency",
    description: "Learn AI terms, tools, and workflows. Boost your productivity with practical, hands-on exercises. Designed for professionals, students, and enthusiasts.",
    duration: "1 Month (Live Online)",
    batchSize: "Limited Seats",
    features: [
      "Live interactive sessions with AI experts",
      "Hands-on exercises with real AI tools",
      "Industry-relevant project portfolio",
      "Certificate of completion",
      "Career guidance and placement support"
    ],
    price: "₹1,000",
    originalPrice: "₹6,000",
    nextBatch: "Starting January 15, 2025",
    isAvailable: true,
    href: "/registration"
  }

  const upcomingCourses = [
    {
      title: "Data Science",
      description: "Learn Python, statistics, and data visualization with real-world datasets. Master the complete data science pipeline from data collection to deployment.",
      duration: "6 Months",
      batchSize: "15-20 Students",
      isAvailable: false,
      nextIntake: "2026",
      href: "/courses/data-science",
      topics: ["Python Programming", "Statistics", "Data Visualization", "Machine Learning Basics", "SQL & Databases"]
    },
    {
      title: "Machine Learning",
      description: "Build and deploy predictive models with live coding sessions. Learn supervised and unsupervised learning algorithms.",
      duration: "4 Months",
      batchSize: "12-15 Students",
      isAvailable: false,
      nextIntake: "2026",
      href: "/courses/machine-learning",
      topics: ["Supervised Learning", "Unsupervised Learning", "Deep Learning", "Model Deployment", "MLOps"]
    },
    {
      title: "DSA (Data Structures & Algorithms)",
      description: "Master problem-solving and ace technical interviews. Comprehensive coverage of all important data structures and algorithms.",
      duration: "3 Months",
      batchSize: "20-25 Students",
      isAvailable: false,
      nextIntake: "2026",
      href: "/courses/dsa",
      topics: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "System Design", "Interview Prep"]
    },
    {
      title: "DevOps",
      description: "Hands-on training with CI/CD, Docker, Kubernetes, and cloud platforms. Learn modern DevOps practices and tools.",
      duration: "4 Months",
      batchSize: "15-18 Students",
      isAvailable: false,
      nextIntake: "2026",
      href: "/courses/devops",
      topics: ["Docker & Containers", "Kubernetes", "CI/CD Pipelines", "AWS/Azure", "Monitoring & Logging"]
    },
    {
      title: "Web Development",
      description: "Create responsive apps using modern frameworks. Full-stack development with React, Node.js, and databases.",
      duration: "5 Months",
      batchSize: "12-16 Students",
      isAvailable: false,
      nextIntake: "2026",
      href: "/courses/web-development",
      topics: ["HTML/CSS/JavaScript", "React.js", "Node.js", "Databases", "Deployment"]
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 section-padding">
        <div className="container-custom">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Live Interactive Courses
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transform your career with hands-on training in the most in-demand tech skills. 
              Learn from industry experts through live, interactive sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Course - AI Fluency */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Content */}
              <div className="p-8 lg:p-12 text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <FaRocket className="text-yellow-400" />
                  <span className="bg-yellow-400 text-primary-900 px-3 py-1 rounded-full text-sm font-semibold">
                    NOW OPEN!
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {featuredCourse.title}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {featuredCourse.description}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <FaClock className="text-yellow-400" />
                    <span>{featuredCourse.duration}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaUsers className="text-yellow-400" />
                    <span>{featuredCourse.batchSize}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCertificate className="text-yellow-400" />
                    <span>Industry Certified</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {featuredCourse.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-3xl font-bold">{featuredCourse.price}</span>
                  <span className="text-lg line-through opacity-60">{featuredCourse.originalPrice}</span>
                  <span className="bg-yellow-400 text-primary-900 px-2 py-1 rounded text-sm font-semibold">
                    Save 83%
                  </span>
                </div>

                <div className="space-y-4">
                  <Link 
                    href={featuredCourse.href}
                    className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-block"
                  >
                    Enroll Now - Limited Seats!
                  </Link>
                  <div className="text-sm opacity-90">
                    🗓️ {featuredCourse.nextBatch}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="AI and technology workspace"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary-600/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Tracks Coming in 2026 */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Other Tracks (Coming in 2026)
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're expanding our course offerings! These comprehensive tracks will be available in 2026. 
              Register your interest to get early access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingCourses.map((course, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{course.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <FaClock />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaUsers />
                        <span>{course.batchSize}</span>
                      </div>
                    </div>

                    {course.topics && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">What You'll Learn:</h4>
                        <div className="flex flex-wrap gap-1">
                          {course.topics.slice(0, 3).map((topic, topicIndex) => (
                            <span key={topicIndex} className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded">
                              {topic}
                            </span>
                          ))}
                          {course.topics.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">+{course.topics.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg text-sm">
                      Next intake: {course.nextIntake}
                    </div>

                    <button 
                      className="w-full py-3 px-6 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-semibold rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Notify Me When Available
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Don't Miss Out on AI Fluency!
            </h2>
            <p className="text-xl opacity-90">
              Limited seats available for our inaugural AI Fluency course. 
              Secure your spot today and be among the first to master AI tools and workflows.
            </p>
            <Link 
              href="/registration"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Enroll in AI Fluency Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
