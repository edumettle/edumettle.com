import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ShippingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Shipping Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Information about our digital delivery and address collection policy.
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
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Digital Delivery Only</h2>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  <strong>We do not ship any physical items.</strong> All our courses are delivered 
                  digitally through our online platform. You will receive immediate access to course 
                  materials upon successful enrollment.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Address Collection Purpose</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We collect your address information for billing purposes only. This information is used to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                  <li>Generate proper invoices and receipts</li>
                  <li>Comply with tax and billing regulations</li>
                  <li>Provide accurate billing documentation</li>
                  <li>Maintain proper financial records</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Digital Delivery Process</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Upon successful payment, you will receive:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                  <li>Instant access to course materials</li>
                  <li>Email confirmation with course details</li>
                  <li>Access links to live session platforms</li>
                  <li>Digital certificate upon course completion</li>
                  <li>All materials shared digitally via email and online platform</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Access Timeline</h2>
                <div className="bg-gray-50 dark:bg-gray-800 dark:shadow-white/20 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Immediate Access</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Course materials available instantly after payment</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Live Session Links</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Session links sent 24 hours before each class</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Digital Certificate</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Certificate delivered via email upon completion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technical Requirements</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To access our digital courses, you will need:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                  <li>Stable internet connection for live sessions</li>
                  <li>Computer, tablet, or smartphone with camera and microphone</li>
                  <li>Email address for receiving course materials</li>
                  <li>WhatsApp for course communication (optional but recommended)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Your address and personal information are:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                  <li>Stored securely and encrypted</li>
                  <li>Used only for billing and administrative purposes</li>
                  <li>Not shared with third parties without consent</li>
                  <li>Protected according to our Privacy Policy</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Future Physical Items</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Currently, we do not offer any physical products or merchandise. If we introduce 
                  physical items in the future, we will update this policy and notify all students 
                  about the new shipping options and policies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you have any questions about our digital delivery or address collection policy:
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
