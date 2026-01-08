'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export function DashboardNav() {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-3xl">🤖</span>
            <span className="text-2xl font-bold gradient-text">Qynce</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {/* Credits Badge */}
            <Link
              href="/dashboard/credits"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full hover:from-amber-200 hover:to-orange-200 transition-colors"
            >
              <span className="text-lg">🪙</span>
              <span className="font-semibold text-amber-700">Credits</span>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center text-white font-semibold">
                  {session?.user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-gray-700 font-medium hidden sm:block">
                  {session?.user?.name || 'Gebruiker'}
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowDropdown(false)}
                  >
                    ⚙️ Instellingen
                  </Link>
                  <Link
                    href="/dashboard/history"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowDropdown(false)}
                  >
                    📜 Geschiedenis
                  </Link>
                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    🚪 Uitloggen
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
