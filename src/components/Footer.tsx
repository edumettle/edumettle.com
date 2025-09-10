'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaYoutube } from 'react-icons/fa'
import { useTheme } from './ThemeProvider'

export default function Footer() {
  const { theme } = useTheme()
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cancellation & Refund', href: '/cancellation-refund' },
    { name: 'Shipping Policy', href: '/shipping' },
  ]

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/edumettle', icon: FaLinkedin },
    { name: 'Twitter', href: 'https://x.com/edumettle', icon: FaTwitter },
    { name: 'Instagram', href: 'http://instagram.com/edumettle', icon: FaInstagram },
    { name: 'YouTube', href: 'https://www.youtube.com/@edumettlecs', icon: FaYoutube },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
                     <Image
                       src="/logo+ whitetext_transparent_background.png"
                       alt="EduMettle Logo"
                       width={200}
                       height={50}
                       className="object-contain"
                     />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering students and professionals with live, hands-on training in Data Science, 
              Machine Learning, DevOps, DSA, and Web Development.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <FaWhatsapp className="text-secondary-500" />
                <span>+91 7848843524</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-secondary-500" />
                <span>hello@edumettle.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 EduMettle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
