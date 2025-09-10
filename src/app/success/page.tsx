'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { FaDownload, FaCheckCircle, FaEnvelope, FaCalendar, FaUser, FaBook } from 'react-icons/fa'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [paymentData, setPaymentData] = useState<any>(null)
  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false)

  useEffect(() => {
    // Get payment data from URL params or localStorage
    const paymentId = searchParams.get('payment_id')
    const orderId = searchParams.get('order_id')
    
    if (paymentId && orderId) {
      // Store payment data for receipt generation
      const data = {
        paymentId,
        orderId,
        timestamp: new Date().toISOString(),
        amount: searchParams.get('amount') || '1000',
        currency: searchParams.get('currency') || 'INR'
      }
      setPaymentData(data)
      localStorage.setItem('paymentData', JSON.stringify(data))
    } else {
      // Try to get from localStorage
      const stored = localStorage.getItem('paymentData')
      if (stored) {
        setPaymentData(JSON.parse(stored))
      }
    }
  }, [searchParams])

  const generateReceipt = async () => {
    if (!paymentData) return
    
    setIsGeneratingReceipt(true)
    try {
      const response = await fetch('/api/generate-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `EduMettle-Receipt-${paymentData.paymentId}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('Failed to generate receipt. Please try again.')
      }
    } catch (error) {
      console.error('Error generating receipt:', error)
      alert('Failed to generate receipt. Please try again.')
    } finally {
      setIsGeneratingReceipt(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Success Section */}
      <section className="pt-20 section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-6">
                <FaCheckCircle className="text-green-600 dark:text-green-400 text-4xl" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Payment Successful!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Welcome to EduMettle! Your registration has been confirmed and you're all set to begin your learning journey.
              </p>
            </div>

            {/* Payment Details Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <FaUser className="mr-3 text-primary-600" />
                Registration Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500" />
                    <span className="text-gray-600 dark:text-gray-300">Payment Status: <strong className="text-green-600">Completed</strong></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaBook className="text-primary-500" />
                    <span className="text-gray-600 dark:text-gray-300">Course: <strong>AI Fluency</strong></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCalendar className="text-primary-500" />
                    <span className="text-gray-600 dark:text-gray-300">Next Batch: <strong>January 15, 2025</strong></span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600 dark:text-gray-300">Payment ID: <strong className="text-sm font-mono">{paymentData?.paymentId || 'N/A'}</strong></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600 dark:text-gray-300">Amount: <strong>₹1,000</strong></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-primary-500" />
                    <span className="text-gray-600 dark:text-gray-300">Confirmation: <strong>Sent to your email</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-primary-50 dark:bg-primary-900 border border-primary-200 dark:border-primary-700 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Check Your Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">We've sent you a confirmation email with all the details and next steps.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Join WhatsApp Group</h3>
                    <p className="text-gray-600 dark:text-gray-300">You'll receive an invitation to join our course WhatsApp group for updates and support.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Prepare for Class</h3>
                    <p className="text-gray-600 dark:text-gray-300">Make sure you have a stable internet connection and are ready for the first live session.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={generateReceipt}
                disabled={isGeneratingReceipt || !paymentData}
                className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaDownload />
                <span>{isGeneratingReceipt ? 'Generating...' : 'Download Receipt'}</span>
              </button>
              
              <a
                href="/courses"
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <FaBook />
                <span>View All Courses</span>
              </a>
            </div>

            {/* Support Section */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Need help or have questions?
              </p>
              <a
                href="https://wa.me/917848843524"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                <FaEnvelope />
                <span>Contact Support</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
