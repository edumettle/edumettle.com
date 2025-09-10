'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { FaCalendar, FaClock, FaUsers, FaCheckCircle, FaShieldAlt, FaCertificate, FaWhatsapp } from 'react-icons/fa'
import Notification, { useNotification } from '@/components/Notification'

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RegistrationPage() {
  const [selectedCourse, setSelectedCourse] = useState('ai-fluency')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const { notification, showNotification, hideNotification } = useNotification()

  // Function to get next Monday
  const getNextMonday = () => {
    const today = new Date()
    const dayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7 // If Sunday, next day is Monday (1), otherwise calculate days until next Monday
    const nextMonday = new Date(today)
    nextMonday.setDate(today.getDate() + daysUntilMonday)
    return nextMonday.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const courses = [
    {
      id: 'ai-fluency',
      title: 'AI Fluency',
      price: '₹1,000',
      originalPrice: '₹6,000',
      discount: '83% OFF',
      duration: '1 Month',
      format: 'Live Online',
      batchSize: '10-12 Students',
      nextBatch: getNextMonday(),
      timing: 'Weekends: 10 AM - 1 PM IST',
      instructor: 'Abhisek Ganguly',
      available: true,
      features: [
        'Live interactive sessions with AI experts',
        'Hands-on exercises with real AI tools',
        'Industry-relevant project portfolio',
        'Certificate of completion',
        'Career guidance and placement support',
        'Lifetime access to course materials',
        '1-on-1 mentoring sessions'
      ]
    }
  ]

  const selectedCourseData = courses.find(course => course.id === selectedCourse) || courses[0]

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, '')) && phone.replace(/\s/g, '').length >= 10
  }

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {}
    
    // Required field validation
    if (!formData.name.trim()) {
      errors.name = 'Full name is required'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email address is required'
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (minimum 10 digits)'
    }
    
    if (!formData.experience) {
      errors.experience = 'Please select your experience level'
    }
    
    if (formData.goals.trim() && formData.goals.trim().length < 50) {
      errors.goals = 'Career goals must be at least 50 characters long'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isFormValid = (): boolean => {
    const nameValid = formData.name.trim() !== ''
    const emailValid = formData.email.trim() !== '' && validateEmail(formData.email)
    const phoneValid = formData.phone.trim() !== '' && validatePhone(formData.phone)
    const experienceValid = formData.experience !== ''
    const goalsValid = formData.goals.trim() === '' || formData.goals.trim().length >= 50
    
    return nameValid && emailValid && phoneValid && experienceValid && goalsValid
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      showNotification('Please fill in all required fields correctly.', 'error')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Submit registration data to API
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          courseId: selectedCourse,
          courseTitle: selectedCourseData.title,
          amount: 1000, // ₹1,000 for AI Fluency course
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (result.paymentOrder) {
          // Check if Razorpay key is available
          const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
          if (!razorpayKey) {
            showNotification('Payment configuration error. Please contact support.', 'error');
            return;
          }

          // Open Razorpay payment modal
          const options = {
            key: razorpayKey,
            amount: result.paymentOrder.amount,
            currency: result.paymentOrder.currency,
            name: 'EduMettle',
            description: `${selectedCourseData.title} Course Registration`,
            order_id: result.paymentOrder.id,
            handler: async function (response: any) {
              // Verify payment
              const verifyResponse = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                }),
              });

              const verifyResult = await verifyResponse.json();

              if (verifyResult.success) {
                // Send confirmation email
                try {
                  await fetch('/api/send-confirmation-email', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: formData.name,
                      email: formData.email,
                      paymentId: response.razorpay_payment_id,
                      orderId: response.razorpay_order_id,
                      amount: 1000,
                    }),
                  });
                } catch (emailError) {
                  console.error('Failed to send confirmation email:', emailError);
                }

                // Redirect to success page
                // Encode customer information for the success page
                const customerInfo = encodeURIComponent(JSON.stringify({
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone
                }));
                
                window.location.href = `/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&amount=1000&currency=INR&customer=${customerInfo}`;
              } else {
                showNotification('Payment verification failed. Please contact support.', 'error');
              }
            },
            prefill: {
              name: formData.name,
              email: formData.email,
              contact: formData.phone,
            },
            theme: {
              color: '#8b5cf6',
            },
          };

          try {
            const razorpay = new window.Razorpay(options);
            razorpay.open();
          } catch (error) {
            console.error('Razorpay initialization error:', error);
            showNotification('Payment system error. Please try again or contact support.', 'error');
          }
        } else {
          showNotification('Registration submitted successfully!', 'success');
          setFormData({ name: '', email: '', phone: '', experience: '', goals: '' });
        }
      } else {
        showNotification('Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showNotification('Something went wrong. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-12">
        <div className="container-custom">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Join the Next Live Batch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Secure your spot in our upcoming live courses and transform your career 
              with hands-on training from industry experts.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <FaShieldAlt className="text-secondary-500" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <FaCertificate className="text-secondary-500" />
                <span>Industry Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <FaUsers className="text-secondary-500" />
                <span>500+ Students Trained</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Course Selection & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Your Course</h2>
                
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                        selectedCourse === course.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedCourse(course.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <input
                              type="radio"
                              name="course"
                              value={course.id}
                              checked={selectedCourse === course.id}
                              onChange={() => setSelectedCourse(course.id)}
                              className="text-primary-600"
                            />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.title}</h3>
                            {course.available && (
                              <span className="bg-green-100 dark:bg-transparent border border-green-500 dark:border-green-400 text-green-800 dark:text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
                                Available Now
                              </span>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                            <div className="flex items-center space-x-2">
                              <FaClock className="text-gray-500 dark:text-gray-400" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaUsers className="text-gray-500 dark:text-gray-400" />
                              <span>{course.batchSize}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaCalendar className="text-gray-500 dark:text-gray-400" />
                              <span>{course.format}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaCertificate className="text-gray-500 dark:text-gray-400" />
                              <span>Certified</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">{course.price}</span>
                            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">{course.originalPrice}</span>
                          </div>
                          <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-sm font-semibold">
                            {course.discount}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registration Form */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          formErrors.name 
                            ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' 
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } text-gray-900 dark:text-white`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          formErrors.email 
                            ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' 
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } text-gray-900 dark:text-white`}
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        formErrors.phone 
                          ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                      placeholder="+91 9876543210"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Experience Level *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        formErrors.experience 
                          ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">Complete Beginner</option>
                      <option value="some-knowledge">Some Knowledge</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    {formErrors.experience && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.experience}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="goals" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Career Goals (Optional - Min 50 characters)
                    </label>
                    <textarea
                      id="goals"
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        formErrors.goals 
                          ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                      placeholder="Tell us about your career goals and what you hope to achieve... (minimum 50 characters)"
                    />
                    {formErrors.goals && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.goals}</p>
                    )}
                    {formData.goals.trim() && !formErrors.goals && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {formData.goals.trim().length}/50 characters minimum
                      </p>
                    )}
                  </div>
                </form>
              </div>

              {/* What's Included */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">What's Included</h4>
                <div className="space-y-3">
                  {selectedCourseData.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <FaCheckCircle className="text-secondary-500 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-primary-50 dark:bg-primary-900 border border-primary-200 dark:border-primary-700 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Need Help?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Have questions about the course or registration process? Reach out to us on WhatsApp for instant support!
                </p>
                <a
                  href="https://wa.me/917848843524"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <FaWhatsapp />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Course Details Sidebar */}
            <div className="space-y-6">
              {/* Course Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
                <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Online learning webinar"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{selectedCourseData.title}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedCourseData.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Format:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedCourseData.format}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Batch Size:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedCourseData.batchSize}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Next Batch:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedCourseData.nextBatch}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Timing:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedCourseData.timing}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Instructor:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedCourseData.instructor}</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCourseData.price}</span>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through">{selectedCourseData.originalPrice}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-semibold">
                      You Save ₹5,000!
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isFormValid()}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : !isFormValid() ? 'Fill Required Fields' : 'Proceed to Payment'}
                </button>

                <div className="text-center mt-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Secure payment powered by Razorpay
                  </p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
