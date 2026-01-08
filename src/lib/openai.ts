import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️ OPENAI_API_KEY is not set. AI features will not work.')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function generateAgentResponse(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return 'Error: OpenAI API key is niet geconfigureerd. Voeg je API key toe aan het .env bestand.'
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || 'Geen antwoord ontvangen.'
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Er ging iets mis bij het genereren van een antwoord.')
  }
}
