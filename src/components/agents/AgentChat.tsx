'use client'

import { useState, useRef, useEffect } from 'react'
import { Agent, ChatMessage } from '@/types'

interface AgentChatProps {
  agent: Agent
  userCredits: number
  colors: {
    bg: string
    accent: string
    light: string
  }
}

export function AgentChat({ agent, userCredits, colors }: AgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState(userCredits)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    if (credits <= 0) {
      setError('Je hebt geen credits meer. Koop meer credits om door te gaan.')
      return
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: agent.id,
          agentSlug: agent.slug,
          message: userMessage.content,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Er ging iets mis')
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setCredits(data.remainingCredits)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis')
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Suggested prompts per agent
  const suggestions: Record<string, string[]> = {
    'order-specialist': [
      'Analyseer mijn orderdata van deze maand',
      'Welke orders hebben de meeste problemen?',
      'Maak een rapport van mijn top 10 klanten',
    ],
    'planning-assistant': [
      'Help me mijn dag plannen',
      'Prioriteer deze taken voor mij',
      'Hoe kan ik mijn tijd beter indelen?',
    ],
    'offerte-manager': [
      'Schrijf een offerte voor een website project',
      'Maak een prijsopgave voor 10 uur consultancy',
      'Hoe formuleer ik een goede value proposition?',
    ],
    'email-assistant': [
      'Schrijf een follow-up email naar een klant',
      'Hoe reageer ik professioneel op een klacht?',
      'Maak een nieuwsbrief over onze nieuwe dienst',
    ],
    'linkedin-creator': [
      'Schrijf een post over AI in business',
      'Maak een engaging post over mijn nieuwe project',
      'Geef me 5 ideeën voor LinkedIn content',
    ],
    'customer-service': [
      'Hoe reageer ik op een ontevreden klant?',
      'Maak een FAQ over ons retourbeleid',
      'Schrijf een antwoord op een productklacht',
    ],
    'content-writer': [
      'Schrijf een blog over productiviteit',
      'Maak een landing page tekst voor onze app',
      'Geef me SEO tips voor mijn website',
    ],
    'data-analyst': [
      'Welke metrics zijn belangrijk voor mijn business?',
      'Hoe interpreteer ik deze sales data?',
      'Maak een analyse van mijn website traffic',
    ],
  }

  const agentSuggestions = suggestions[agent.slug] || [
    'Stel je vraag aan de agent',
    'Beschrijf wat je nodig hebt',
    'Vraag om hulp met een specifieke taak',
  ]

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Chat Messages */}
      <div className="h-[500px] overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className={`w-20 h-20 rounded-3xl ${colors.bg} flex items-center justify-center text-4xl shadow-lg mb-4`}>
              {agent.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Start een gesprek met {agent.name}
            </h3>
            <p className="text-gray-500 mt-2 max-w-md">
              Elk bericht kost 1 credit. Je hebt nog {credits} credits.
            </p>

            {/* Suggestions */}
            <div className="mt-6 space-y-2 w-full max-w-md">
              <p className="text-sm text-gray-400">Probeer bijvoorbeeld:</p>
              {agentSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInput(suggestion)}
                  className={`w-full text-left px-4 py-3 rounded-xl ${colors.light} hover:opacity-80 transition-opacity text-gray-700`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                      : `${colors.light} text-gray-800`
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className={`px-4 py-3 rounded-2xl ${colors.light}`}>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="px-6 py-3 bg-red-50 border-t border-red-100">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex space-x-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Vraag ${agent.name} iets...`}
            rows={1}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            disabled={loading || credits <= 0}
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || credits <= 0}
            className={`px-6 py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${colors.bg} hover:opacity-90`}
          >
            {loading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          1 credit per bericht · Shift+Enter voor nieuwe regel
        </p>
      </form>
    </div>
  )
}
