'use client'

import Link from 'next/link'
import { Agent } from '@/types'

interface AgentCardProps {
  agent: Agent
  colors: {
    bg: string
    accent: string
    icon: string
  }
}

export function AgentCard({ agent, colors }: AgentCardProps) {
  return (
    <Link
      href={`/dashboard/agents/${agent.slug}`}
      className={`group relative block p-6 rounded-3xl bg-gradient-to-br ${colors.bg} border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
    >
      {/* Decorative blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      {/* Icon */}
      <div className="relative">
        <div className={`w-16 h-16 rounded-2xl ${colors.icon} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {agent.icon}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 relative">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
          {agent.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {agent.description}
        </p>
      </div>

      {/* Status indicator - pulsing when "active" */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <div className={`w-3 h-3 rounded-full bg-green-400`} />
          <div className={`absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75`} />
        </div>
      </div>

      {/* Action hint */}
      <div className={`mt-4 inline-flex items-center space-x-1 text-sm font-medium ${colors.accent} px-3 py-1 rounded-full`}>
        <span>Start chat</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
