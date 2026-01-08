'use client'

import Link from 'next/link'

interface CreditsBannerProps {
  credits: number
}

export function CreditsBanner({ credits }: CreditsBannerProps) {
  const percentage = Math.min((credits / 50) * 100, 100)
  const isLow = credits <= 10

  return (
    <div className={`rounded-2xl p-6 ${isLow ? 'bg-gradient-to-r from-red-50 to-orange-50' : 'bg-gradient-to-r from-amber-50 to-yellow-50'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">🪙</div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Je hebt nog <span className={isLow ? 'text-red-600' : 'text-amber-600'}>{credits} credits</span>
            </h3>
            <p className="text-gray-600 text-sm">
              {isLow
                ? 'Bijna op! Koop meer credits om door te gaan.'
                : 'Elke agent-interactie kost 1 credit.'}
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/credits"
          className={`px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 ${
            isLow ? 'bg-red-500' : 'bg-amber-500'
          }`}
        >
          {isLow ? 'Credits Kopen' : 'Bekijk Credits'}
        </Link>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 bg-white/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isLow ? 'bg-red-400' : 'bg-amber-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {credits}/50 credits deze maand
      </p>
    </div>
  )
}
