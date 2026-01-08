import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  })

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Terug naar dashboard</span>
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Instellingen</h1>

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profiel</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
            <input
              type="text"
              defaultValue={user?.name || ''}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijf</label>
            <input
              type="text"
              defaultValue={user?.company || ''}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled
            />
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Neem contact op met support om je gegevens te wijzigen.
        </p>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Abonnement</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 capitalize">{user?.plan || 'starter'} Plan</p>
            <p className="text-sm text-gray-500">€12/maand · 50 credits/maand</p>
          </div>
          <Link
            href="/dashboard/credits"
            className="px-4 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition-colors"
          >
            Beheren
          </Link>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Lid sinds</span>
            <span className="text-gray-900">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('nl-NL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : '-'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Credits</span>
            <span className="text-amber-600 font-medium">{user?.credits || 0}</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
        <h2 className="text-lg font-semibold text-red-900 mb-4">Gevaarlijke Zone</h2>
        <p className="text-sm text-red-700 mb-4">
          Het verwijderen van je account is permanent en kan niet ongedaan worden gemaakt.
        </p>
        <button
          className="px-4 py-2 text-red-600 font-medium border border-red-300 rounded-lg hover:bg-red-100 transition-colors"
          disabled
        >
          Account Verwijderen (Neem contact op)
        </button>
      </div>
    </div>
  )
}
