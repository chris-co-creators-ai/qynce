import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AgentChat } from '@/components/agents/AgentChat'
import Link from 'next/link'

// Agent color mapping
const agentColors: Record<string, { bg: string; accent: string; light: string }> = {
  'order-specialist': { bg: 'bg-blue-500', accent: 'text-blue-600', light: 'bg-blue-50' },
  'planning-assistant': { bg: 'bg-purple-500', accent: 'text-purple-600', light: 'bg-purple-50' },
  'offerte-manager': { bg: 'bg-emerald-500', accent: 'text-emerald-600', light: 'bg-emerald-50' },
  'email-assistant': { bg: 'bg-rose-500', accent: 'text-rose-600', light: 'bg-rose-50' },
  'linkedin-creator': { bg: 'bg-sky-500', accent: 'text-sky-600', light: 'bg-sky-50' },
  'customer-service': { bg: 'bg-amber-500', accent: 'text-amber-600', light: 'bg-amber-50' },
  'content-writer': { bg: 'bg-indigo-500', accent: 'text-indigo-600', light: 'bg-indigo-50' },
  'data-analyst': { bg: 'bg-teal-500', accent: 'text-teal-600', light: 'bg-teal-50' },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function AgentPage({ params }: PageProps) {
  const { slug } = await params
  const session = await getServerSession(authOptions)

  const agent = await prisma.agent.findUnique({
    where: { slug },
  })

  if (!agent) {
    notFound()
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { credits: true },
  })

  const colors = agentColors[agent.slug] || { bg: 'bg-gray-500', accent: 'text-gray-600', light: 'bg-gray-50' }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Terug naar dashboard</span>
      </Link>

      {/* Agent Header */}
      <div className={`rounded-3xl p-6 ${colors.light} mb-6`}>
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center text-3xl shadow-lg`}>
            {agent.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
            <p className="text-gray-600 mt-1">{agent.description}</p>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm">
            <span className="text-lg">🪙</span>
            <span className="font-semibold text-gray-700">{user?.credits || 0} credits</span>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <AgentChat
        agent={agent}
        userCredits={user?.credits || 0}
        colors={colors}
      />
    </div>
  )
}
