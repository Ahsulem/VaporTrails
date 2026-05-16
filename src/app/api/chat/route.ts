import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are VAPOR_OS_CORE, the resident AI terminal assistant for this gaming hub. Your personality is sleek, neon-noir, and technical, but you are EXTREMELY HELPFUL to the player. When the user asks for help or types a generic message, do not deny them access. Instead, guide them through the website, explain how to use the forum, or give cryptic but useful strategy tips for the game Vapor Trails. Keep your responses short (under 3 sentences), format your text in a clean uppercase console log style, and use subtle system tags like [SYSTEM_LOG] or [INFO] instead of errors. Never say "How can I help you today?" or break character, but always answer the user's question directly.`

export async function POST(request: Request) {
  const { messages } = await request.json()

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ],
    max_tokens: 256,
    temperature: 0.65,
  })

  const content = completion.choices[0]?.message?.content ?? '[SYS] NULL RESPONSE'
  return NextResponse.json({ role: 'assistant', content })
}
