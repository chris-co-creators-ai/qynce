'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: Record<string, string> = {
    Configuration: 'Er is een configuratiefout opgetreden.',
    AccessDenied: 'Je hebt geen toegang tot deze pagina.',
    Verification: 'De verificatielink is verlopen of ongeldig.',
    Default: 'Er is een fout opgetreden bij het inloggen.',
  }

  const message = errorMessages[error || 'Default'] || errorMessages.Default

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Oeps, er ging iets mis
        </h1>
        <p className="text-gray-600 mb-8">{message}</p>
        <div className="space-x-4">
          <Link
            href="/auth/login"
            className="inline-block px-6 py-3 text-white font-semibold gradient-bg rounded-xl hover:opacity-90"
          >
            Probeer Opnieuw
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-3 text-gray-700 font-semibold bg-gray-100 rounded-xl hover:bg-gray-200"
          >
            Naar Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Laden...</div>}>
      <ErrorContent />
    </Suspense>
  )
}
