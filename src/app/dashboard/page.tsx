import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AgentCard } from '@/components/agents/AgentCard'
import { CreditsBanner } from '@/components/dashboard/CreditsBanner'

// Agent color mapping for friendly, warm colors
const agentColors: Record<string, { bg: string; accent: string; icon: string }> = {
  'order-specialist': { bg: 'from-blue-50 to-cyan-50', accent: 'bg-blue-100 text-blue-600', icon: 'bg-blue-500' },
  'planning-assistant': { bg: 'from-purple-50 to-violet-50', accent: 'bg-purple-100 text-purple-600', icon: 'bg-purple-500' },
  'offerte-manager': { bg: 'from-emerald-50 to-green-50', accent: 'bg-emerald-100 text-emerald-600', icon: 'bg-emerald-500' },
  'email-assistant': { bg: 'from-rose-50 to-pink-50', accent: 'bg-rose-100 text-rose-600', icon: 'bg-rose-500' },
  'linkedin-creator': { bg: 'from-sky-50 to-blue-50', accent: 'bg-sky-100 text-sky-600', icon: 'bg-sky-500' },
  'customer-service': { bg: 'from-amber-50 to-yellow-50', accent: 'bg-amber-100 text-amber-600', icon: 'bg-amber-500' },
  'content-writer': { bg: 'from-indigo-50 to-purple-50', accent: 'bg-indigo-100 text-indigo-600', icon: 'bg-indigo-500' },
  'data-analyst': { bg: 'from-teal-50 to-cyan-50', accent: 'bg-teal-100 text-teal-600', icon: 'bg-teal-500' },
}

// Group agents by category
const categoryOrder = ['operations', 'productivity', 'sales', 'communication', 'marketing', 'support', 'analytics']
const categoryNames: Record<string, string> = {
  operations: '📦 Operaties',
  productivity: '⚡ Productiviteit',
  sales: '💰 Sales',
  communication: '💬 Communicatie',
  marketing: '📣 Marketing',
  support: '🎧 Support',
  analytics: '📊 Analyse',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // Get user with credits
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { credits: true, name: true },
  })

  // Get all active agents
  const agents = await prisma.agent.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  })

  // Group agents by category
  const groupedAgents = agents.reduce((acc, agent) => {
    if (!acc[agent.category]) acc[agent.category] = []
    acc[agent.category].push(agent)
    return acc
  }, {} as Record<string, typeof agents>)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Hoi {user?.name?.split(' ')[0] || 'daar'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Welkom bij je AI team. Kies een agent om mee aan de slag te gaan.
        </p>
      </div>

      {/* Credits Banner */}
      <CreditsBanner credits={user?.credits || 0} />

      {/* Agent Categories */}
      <div className="space-y-12 mt-8">
        {categoryOrder.map((category) => {
          const categoryAgents = groupedAgents[category]
          if (!categoryAgents?.length) return null

          return (
            <section key={category}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {categoryNames[category] || category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryAgents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    colors={agentColors[agent.slug] || { bg: 'from-gray-50 to-slate-50', accent: 'bg-gray-100 text-gray-600', icon: 'bg-gray-500' }}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Empty state if no agents */}
      {agents.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-xl font-semibold text-gray-900">Geen agents beschikbaar</h2>
          <p className="text-gray-600 mt-2">
            Er zijn momenteel geen AI agents beschikbaar. Neem contact op met support.
          </p>
        </div>
      )}
    </div>
  )
}
