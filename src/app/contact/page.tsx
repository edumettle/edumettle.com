'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import Notification, { useNotification } from '@/components/Notification'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { notification, showNotification, hideNotification } = useNotification()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.whatsapp,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success')
        setFormData({ name: '', whatsapp: '', email: '', message: '' })
      } else {
        showNotification('Failed to submit your message. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      showNotification('An error occurred. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "+91 7848843524",
      link: "https://wa.me/917848843524",
      description: "Quick responses during business hours"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      value: "hello@edumettle.com",
      link: "mailto:hello@edumettle.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+91 7848843524",
      link: "tel:+917848843524",
      description: "Mon-Fri, 10 AM - 6 PM IST"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Rourkela, Odisha, India",
      link: "#",
      description: "Serving students globally"
    }
  ]

  const faqs = [
    {
      question: "What makes EduMettle different from other online courses?",
      answer: "We focus on live, interactive sessions with small batch sizes for personalized attention. No pre-recorded videos - just real-time learning with industry experts."
    },
    {
      question: "Do you provide job placement assistance?",
      answer: "Yes! We offer career guidance, resume reviews, interview preparation, and have partnerships with companies for job placements."
    },
    {
      question: "What are the batch sizes?",
      answer: "We keep our batches small (12-25 students) to ensure personalized attention and meaningful interaction with instructors."
    },
    {
      question: "Are the certifications industry-recognized?",
      answer: "Absolutely! Our certifications are powered by leading companies like Google, IBM, and Microsoft, making them highly valuable in the job market."
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                We'd love to hear from you. Whether you have questions about our courses, 
                certifications, or upcoming batches — reach out anytime.
              </p>
              
              {/* Quick WhatsApp CTA */}
              <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Need immediate help?</h3>
                    <p className="text-sm text-gray-600">Chat with us on WhatsApp for instant responses</p>
                  </div>
                  <a 
                    href="https://wa.me/917848843524"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Chat Now
                  </a>
                </div>
              </div>
            </div>
            
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Student and mentor collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                  <info.icon className="text-primary-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                  <a 
                    href={info.link}
                    className="text-primary-600 hover:text-primary-700 font-medium block mb-1"
                    {...(info.link.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {info.value}
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Send us a Message
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder="+91 9876543210"
                    />
                  </div>
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Tell us about your interest in our courses, any specific questions, or how we can help you..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Quick answers to common questions about our courses and programs.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaClock className="text-2xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Office Hours</h2>
            <p className="text-lg mb-2">Monday - Friday: 10:00 AM - 6:00 PM (IST)</p>
            <p className="text-lg mb-6">Saturday: 10:00 AM - 2:00 PM (IST)</p>
            <p className="opacity-90">We typically respond to messages within a few hours during business hours.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
