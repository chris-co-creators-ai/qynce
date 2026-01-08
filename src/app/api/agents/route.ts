import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Je moet ingelogd zijn' },
        { status: 401 }
      )
    }

    const agents = await prisma.agent.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        icon: true,
        category: true,
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ agents })
  } catch (error) {
    console.error('Agents fetch error:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het ophalen van agents' },
      { status: 500 }
    )
  }
}
