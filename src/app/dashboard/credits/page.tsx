import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function CreditsPage() {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { credits: true, plan: true },
  })

  // Get recent usage
  const recentUsage = await prisma.usage.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: {
      agentName: true,
      credits: true,
      createdAt: true,
    },
  })

  const credits = user?.credits || 0
  const percentage = Math.min((credits / 50) * 100, 100)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Terug naar dashboard</span>
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Credits Overzicht</h1>

      {/* Credits Card */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="text-6xl">🪙</div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-amber-600">{credits}</h2>
            <p className="text-gray-600">credits beschikbaar</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-4 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {credits}/50 credits deze maand · Vernieuwt elke maand
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className={`p-6 rounded-2xl border-2 ${user?.plan === 'starter' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Starter</h3>
            {user?.plan === 'starter' && (
              <span className="px-3 py-1 text-sm bg-primary-500 text-white rounded-full">Huidig</span>
            )}
          </div>
          <p className="text-3xl font-bold">€12<span className="text-lg font-normal text-gray-500">/maand</span></p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 50 credits/maand</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Alle 8 agents</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Email support</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border-2 border-gray-200 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-1 text-sm font-semibold">
            COMING SOON
          </div>
          <h3 className="text-xl font-semibold mb-4">Pro</h3>
          <p className="text-3xl font-bold">€29<span className="text-lg font-normal text-gray-500">/maand</span></p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 200 credits/maand</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Alle agents + premium</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Priority support</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> API access</li>
          </ul>
        </div>
      </div>

      {/* Extra Credits */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Extra Credits Kopen</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { credits: 25, price: '€5' },
            { credits: 50, price: '€9' },
            { credits: 100, price: '€15' },
          ].map((pack) => (
            <button
              key={pack.credits}
              className="p-4 border border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
            >
              <p className="text-2xl font-bold text-gray-900">{pack.credits}</p>
              <p className="text-sm text-gray-500">credits</p>
              <p className="text-lg font-semibold text-primary-600 mt-2">{pack.price}</p>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Betaling via iDeal, creditcard of PayPal (coming soon)
        </p>
      </div>

      {/* Recent Usage */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Recente Activiteit</h3>
        {recentUsage.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nog geen activiteit. Start een gesprek met een agent!
          </p>
        ) : (
          <div className="space-y-3">
            {recentUsage.map((usage, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{usage.agentName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(usage.createdAt).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span className="text-amber-600 font-medium">-{usage.credits} credit</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
