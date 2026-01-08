import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)

  const usage = await prisma.usage.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

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

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Geschiedenis</h1>

      {usage.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📜</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Nog geen geschiedenis</h2>
          <p className="text-gray-600 mb-6">
            Je hebt nog geen gesprekken gevoerd met de AI agents.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90"
          >
            Start je eerste gesprek
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {usage.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.agentName}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString('nl-NL', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className="text-amber-600 font-medium">-{item.credits} credit</span>
                </div>

                {item.input && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-400 mb-1">Jouw vraag:</p>
                    <p className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3">
                      {item.input}
                    </p>
                  </div>
                )}

                {item.output && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Antwoord:</p>
                    <p className="text-gray-600 text-sm bg-primary-50 rounded-lg p-3 line-clamp-3">
                      {item.output}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
