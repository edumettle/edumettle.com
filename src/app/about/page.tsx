import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { FaLinkedin, FaEnvelope, FaInstagram, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Abhisek Ganguly",
      role: "CEO & Founder",
      bio: "Visionary leader with MTech in Computer Science specializing in Data Science. Brings 5+ years of industry expertise and has contributed to groundbreaking research in Deep Learning and Computer Vision, including collaborative projects with ISRO and NASA.",
      image: "/abhisek.jpeg",
      linkedin: "https://www.linkedin.com/in/abhisekganguly16/",
      email: "abhisek@edumettle.com"
    },
    {
      name: "Manasvi Kirti",
      role: "HR Executive",
      bio: "Strategic HR professional with 4+ years of expertise in tech recruitment and talent acquisition. Specializes in career development, communication enhancement, and innovative AI-driven job placement strategies that help students secure their ideal positions.",
      image: "/manasvi.jpeg",
      linkedin: "https://www.linkedin.com/in/manasvi-kirti/",
      email: "manasvi@edumettle.com"
    },
    {
      name: "Eeman Majumder",
      role: "ML Engineer",
      bio: "Experienced Machine Learning Engineer with a strong foundation in building and deploying scalable ML pipelines. Combines 4+ years of DevOps expertise with advanced knowledge in CI/CD implementations for machine learning and deep learning systems.",
      image: "/eeman.jpeg",
      linkedin: "https://www.linkedin.com/in/eeman-majumder-2184331a2/",
      email: "support@edumettle.com"
    }
  ]

  const values = [
    {
      title: "Practical Learning",
      description: "We believe in learning by doing. Every concept is taught through hands-on projects and real-world applications."
    },
    {
      title: "Industry Relevance",
      description: "Our curriculum is constantly updated to match current industry demands and emerging technologies."
    },
    {
      title: "Personal Growth",
      description: "We focus not just on technical skills, but also on building confidence and problem-solving abilities."
    },
    {
      title: "Community Support",
      description: "Our students become part of a supportive community that continues long after course completion."
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                About EduMettle
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Bridging the gap between learning and industry needs through 
                live, hands-on training that directly impacts careers.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600 dark:text-gray-300">
              <p className="text-lg leading-relaxed mb-6">
                EduMettle was founded with a simple yet powerful vision: to transform how people learn 
                technology skills. We noticed a significant gap between traditional education and what 
                the industry actually needs. Most learning platforms offer pre-recorded content that 
                lacks the personal touch and real-time interaction that makes learning truly effective.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our founder, Abhisek Ganguly, with his MTech in CSE specializing in Data Science and 
                5+ years of industry experience, including research work with ISRO and NASA, understood 
                firsthand what skills matter most in the real world. He saw talented individuals struggle 
                not because they lacked potential, but because they lacked access to quality, practical training.
              </p>
              <p className="text-lg leading-relaxed">
                That's why we created EduMettle - a platform that combines the best of live instruction, 
                hands-on projects, and industry mentorship. Every course is designed to not just teach 
                concepts, but to build confidence and practical skills that translate directly to career success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              To empower students and professionals with the skills of tomorrow through 
              practical, live-based learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Location
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Based in the heart of Odisha, we're proud to serve students and professionals across India and beyond.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <FaMapMarkerAlt className="text-primary-600 text-2xl mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Rourkela, Odisha, India</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                While we're physically located in Rourkela, our live online courses reach students 
                across the globe, making quality tech education accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our instructors are industry veterans who bring real-world experience 
              and passion for teaching to every live session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  <div className="flex space-x-3">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin}
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <FaEnvelope size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Since our founding, we've been proud to make a real difference in our students' careers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Job Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Live Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8/5</div>
              <div className="text-lg opacity-90">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join our community of learners and take the first step towards 
              transforming your career with live, hands-on training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/registration" className="btn-primary">
                Join the Next Live Batch
              </a>
              <a href="/contact" className="btn-secondary">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
