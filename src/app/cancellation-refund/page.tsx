import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CancellationRefundPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our policy on cancellations and refunds for course enrollments.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-4">Important Notice</h2>
                <p className="text-red-700 dark:text-red-300 leading-relaxed">
                  <strong>No cancellations or refunds are provided once a course is purchased.</strong> 
                  Please ensure you are committed to completing the course before making payment.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payment Processing</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  All payments are processed securely through Razorpay, our trusted payment gateway partner. 
                  Your payment information is encrypted and protected according to industry standards.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Failed Payment Refunds</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  In case of payment failure or technical issues during the payment process:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                  <li>If payment fails due to technical issues, no amount will be deducted from your account</li>
                  <li>If payment is deducted but enrollment fails, the amount will be automatically refunded</li>
                  <li>Refunds for failed payments will be processed within 3-5 business days</li>
                  <li>The refunded amount will be credited back to your original payment method</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Access</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Once payment is successful, you will immediately receive:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                  <li>Course enrollment confirmation via email</li>
                  <li>Access to course materials and live session links</li>
                  <li>Invitation to course WhatsApp group (if applicable)</li>
                  <li>Schedule of upcoming live sessions</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technical Support</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you experience any technical issues with course access or payment:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                  <li>Contact our support team immediately</li>
                  <li>Provide your payment reference number</li>
                  <li>We will investigate and resolve the issue within 24 hours</li>
                  <li>If the issue cannot be resolved, appropriate refunds will be processed</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Completion</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To ensure you get the most value from your investment:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                  <li>Attend all live sessions as scheduled</li>
                  <li>Complete assignments and projects</li>
                  <li>Participate actively in discussions</li>
                  <li>Take advantage of 1-on-1 mentoring sessions</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact for Payment Issues</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  For any payment-related queries or issues, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 dark:shadow-white/20 p-6 rounded-lg mt-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> hello@edumettle.com<br />
                    <strong>Phone:</strong> +91 7848843524<br />
                    <strong>WhatsApp:</strong> +91 7848843524<br />
                    <strong>Address:</strong> Rourkela, Odisha, India<br />
                    <strong>Business Hours:</strong> Monday - Friday, 10 AM - 6 PM IST
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-4">Before You Purchase</h2>
                <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
                  Please ensure you have read and understood:
                </p>
                <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-2 mt-4">
                  <li>Course schedule and timing</li>
                  <li>Technical requirements for live sessions</li>
                  <li>Your availability to attend live sessions</li>
                  <li>Course content and learning objectives</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
