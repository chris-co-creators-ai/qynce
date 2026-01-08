import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { generateAgentResponse } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Je moet ingelogd zijn' },
        { status: 401 }
      )
    }

    const { agentId, agentSlug, message } = await request.json()

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Bericht mag niet leeg zijn' },
        { status: 400 }
      )
    }

    // Get user and check credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    })

    if (!user || user.credits <= 0) {
      return NextResponse.json(
        { error: 'Je hebt geen credits meer. Koop meer credits om door te gaan.' },
        { status: 402 }
      )
    }

    // Get agent
    const agent = await prisma.agent.findFirst({
      where: {
        OR: [
          { id: agentId },
          { slug: agentSlug },
        ],
        isActive: true,
      },
    })

    if (!agent) {
      return NextResponse.json(
        { error: 'Agent niet gevonden' },
        { status: 404 }
      )
    }

    // Generate response using OpenAI
    const response = await generateAgentResponse(agent.prompt, message)

    // Deduct credit and log usage
    const [updatedUser] = await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: { credits: { decrement: 1 } },
        select: { credits: true },
      }),
      prisma.usage.create({
        data: {
          userId: session.user.id,
          agentId: agent.id,
          agentName: agent.name,
          credits: 1,
          input: message.substring(0, 500), // Truncate for storage
          output: response.substring(0, 1000), // Truncate for storage
        },
      }),
    ])

    return NextResponse.json({
      response,
      remainingCredits: updatedUser.credits,
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het verwerken van je bericht' },
      { status: 500 }
    )
  }
}
