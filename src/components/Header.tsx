'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from './ThemeProvider'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 w-full z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* Mobile Logo - Only logo without text */}
            <div className="md:hidden">
              <Image
                src="/logo_transparent_background.png"
                alt="EduMettle Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            
            {/* Desktop Logo - Logo with text */}
            <div className="hidden md:flex items-center space-x-2">
              <Image
                src={theme === 'dark' ? "/logo+ whitetext_transparent_background.png" : "/logo+ blacktext_transparent_background.png"}
                alt="EduMettle Logo"
                width={180}
                height={40}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FaMoon className="text-gray-600" /> : <FaSun className="text-yellow-500" />}
            </button>
            <Link href="/registration" className="btn-primary">
              Join Live Batch
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-primary-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-3">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {theme === 'light' ? <FaMoon className="text-gray-600" /> : <FaSun className="text-yellow-500" />}
                  <span className="text-gray-700 dark:text-gray-300">Toggle Theme</span>
                </button>
                <Link href="/registration" className="btn-primary block text-center">
                  Join Live Batch
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
