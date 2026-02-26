import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const rateMap = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(320),
  message: z.string().min(1).max(5000),
})

const OWNER_EMAIL = 'contact@clyvuum.fr'
const ALLOWED_ORIGINS = ['https://clyvuum.fr', 'https://www.clyvuum.fr', 'https://clyvuum.com', 'https://www.clyvuum.com']

export async function POST(request: Request) {
  const origin = request.headers.get('origin') ?? ''
  const isDev = process.env.NODE_ENV === 'development'
  if (!isDev && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ ok: false }, { status: 403 })
  }

  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Trop de requêtes. Réessayez dans une minute.' },
      { status: 429 }
    )
  }

  try {
    const raw = await request.text()
    if (raw.length > 16_384) {
      return NextResponse.json(
        { ok: false, error: 'Requête trop volumineuse.' },
        { status: 413 }
      )
    }

    const json: unknown = JSON.parse(raw)
    const result = contactSchema.safeParse(json)
    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: 'Données invalides.' },
        { status: 400 }
      )
    }
    const data = result.data

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { ok: false, error: 'Service email indisponible.' },
        { status: 503 }
      )
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'Clyvuum <noreply@clyvuum.fr>',
      to: [OWNER_EMAIL],
      replyTo: data.email,
      subject: `Nouveau message de contact – ${data.name}`,
      text: `📩 Nouveau message de contact

👤 Nom : ${data.name}
📧 Email : ${data.email}

💬 Message :
${data.message}

⏰ Reçu le : ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error in /api/send-contact:', err)
    return NextResponse.json(
      { ok: false, error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
