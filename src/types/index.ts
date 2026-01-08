export interface Agent {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  category: string
  prompt: string
  isActive: boolean
}

export interface User {
  id: string
  email: string
  name: string | null
  company: string | null
  credits: number
  plan: string
}

export interface Usage {
  id: string
  userId: string
  agentId: string
  agentName: string
  credits: number
  input: string | null
  output: string | null
  createdAt: Date
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
