'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export function Navbar() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🤖</span>
            <span className="text-2xl font-bold gradient-text">Qynce</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#agents" className="text-gray-600 hover:text-gray-900 transition-colors">
              Agents
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Prijzen
            </Link>
            {session ? (
              <Link
                href="/dashboard"
                className="px-6 py-2 text-white font-semibold gradient-bg rounded-full hover:opacity-90 transition-opacity"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Inloggen
                </Link>
                <Link
                  href="/auth/register"
                  className="px-6 py-2 text-white font-semibold gradient-bg rounded-full hover:opacity-90 transition-opacity"
                >
                  Gratis Starten
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="#agents" className="block text-gray-600 hover:text-gray-900">
              Agents
            </Link>
            <Link href="#pricing" className="block text-gray-600 hover:text-gray-900">
              Prijzen
            </Link>
            {session ? (
              <Link
                href="/dashboard"
                className="block px-6 py-2 text-center text-white font-semibold gradient-bg rounded-full"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="block text-gray-600 hover:text-gray-900">
                  Inloggen
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-6 py-2 text-center text-white font-semibold gradient-bg rounded-full"
                >
                  Gratis Starten
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
