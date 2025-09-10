import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import CourseCard from '@/components/CourseCard'
import TestimonialCard from '@/components/TestimonialCard'
import Image from 'next/image'
import Link from 'next/link'
import { FaCheckCircle, FaUsers, FaProjectDiagram, FaCertificate, FaLaptopCode } from 'react-icons/fa'

export default function Home() {
  const featuredCourses = [
    {
      title: "AI Fluency",
      description: "Learn AI terms, tools, and workflows. Boost your productivity with practical, hands-on exercises. Designed for professionals, students, and enthusiasts.",
      duration: "1 Month",
      batchSize: "Small Batches",
      isAvailable: true,
      href: "/registration",
      featured: true
    },
    {
      title: "Data Science",
      description: "Learn Python, statistics, and data visualization with real-world datasets.",
      duration: "6 Months",
      batchSize: "15-20 Students",
      isAvailable: false,
      nextIntake: "2026",
      href: "/courses/data-science"
    },
    {
      title: "Machine Learning",
      description: "Build and deploy predictive models with live coding sessions.",
      duration: "4 Months",
      batchSize: "12-15 Students",
      isAvailable: false,
      nextIntake: "2026",
      href: "/courses/machine-learning"
    },
    {
      title: "DSA (Data Structures & Algorithms)",
      description: "Master problem-solving and ace technical interviews.",
      duration: "3 Months",
      batchSize: "20-25 Students",
      isAvailable: false,
      nextIntake: "2026",
      href: "/courses/dsa"
    }
  ]

  const whyEduMettle = [
    {
      icon: FaLaptopCode,
      title: "Live, Interactive Learning",
      description: "No boring recorded videos. Real-time interaction with expert instructors."
    },
    {
      icon: FaUsers,
      title: "Industry-Expert Trainers",
      description: "Learn from professionals with years of real-world experience."
    },
    {
      icon: FaProjectDiagram,
      title: "Real Projects & Certification",
      description: "Work on industry projects and earn certifications from top tech companies."
    },
    {
      icon: FaCertificate,
      title: "Small Batches",
      description: "Personalized attention with limited students per batch."
    }
  ]

  const testimonials = [
    {
      quote: "EduMettle's ML course helped me land an internship at a top tech firm. The live sessions and practical projects made all the difference.",
      author: "Priya Sharma",
      role: "ML Intern at HCL"
    },
    {
      quote: "The live projects made me confident for interviews. I finally understand how to implement algorithms in real scenarios.",
      author: "Rahul Kumar",
      role: "Software Developer at Tech Mahindra"
    },
    {
      quote: "Best investment I made for my career. The instructors are amazing and always available to help.",
      author: "Anita Patel",
      role: "Data Analyst at Swiggy"
    }
  ]

  const partners = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-20">
        <Hero />
      </div>

      {/* About EduMettle Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              About EduMettle
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              At EduMettle, we believe in learning by doing. Our live courses are designed to give you 
              hands-on exposure, personalized mentorship, and real-world projects. With certifications 
              powered by leading companies like Google, IBM, and Microsoft, you'll stand out in your career journey.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our comprehensive range of live, interactive courses designed 
              to accelerate your career in tech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses" className="btn-primary">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Why EduMettle Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why EduMettle?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're not just another online learning platform. Here's what makes us different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyEduMettle.map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                  <item.icon className="text-primary-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our students have to say about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Certification Partners
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Earn industry-recognized certifications from leading technology companies.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            {partners.map((partner, index) => (
              <div key={index} className="h-12 w-32 relative grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain"
                />
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
              Ready to Upgrade Your Skills?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of students who have transformed their careers with EduMettle's 
              live, interactive training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registration" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Join the Next Live Batch
              </Link>
              <Link href="/contact" className="border border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Chat with Us on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
