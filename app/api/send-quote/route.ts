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

const VALID_TOOLS = [
  'whatsapp', 'slack', 'google-drive', 'mailchimp', 'stripe',
  'paypal', 'discord', 'zoom', 'linkedin', 'apple', 'windows', 'android',
] as const

const quoteSchema = z.object({
  plan: z.enum(['starter', 'business']),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(320),
  phone: z.string().max(30).optional().default(''),
  company: z.string().max(200).optional().default(''),
  website: z.string().max(500).optional().default(''),
  selectedTools: z.array(z.enum(VALID_TOOLS)).max(12).default([]),
  currentProcess: z.string().max(2000).optional().default(''),
  painPoints: z.string().max(2000).optional().default(''),
  currentTools: z.string().max(1000).optional().default(''),
  teamSize: z.string().max(100).optional().default(''),
  objectives: z.string().max(1000).optional().default(''),
  specificRequests: z.string().max(5000).optional().default(''),
  budget: z.string().max(50).optional().default(''),
  timeline: z.string().max(50).optional().default(''),
  appointmentDate: z.string().max(50).optional().default(''),
  appointmentTime: z.string().max(10).optional().default(''),
  submittedAt: z.string().max(50),
})

type QuotePayload = z.infer<typeof quoteSchema>

const OWNER_EMAIL = 'contact@clyvuum.fr'
const ALLOWED_ORIGINS = ['https://clyvuum.fr', 'https://www.clyvuum.fr', 'https://clyvuum.com', 'https://www.clyvuum.com']

const toolLabels: Record<string, string> = {
  whatsapp: 'WhatsApp',
  slack: 'Slack',
  'google-drive': 'Google Drive',
  mailchimp: 'Mailchimp',
  stripe: 'Stripe',
  paypal: 'PayPal',
  discord: 'Discord',
  zoom: 'Zoom',
  linkedin: 'LinkedIn',
  apple: 'Apple',
  windows: 'Windows',
  android: 'Android',
}

function buildClientEmail(data: QuotePayload): string {
  const planName = data.plan === 'starter' ? 'Starter' : 'Business'
  const tools = data.selectedTools.map(t => toolLabels[t] || t).join(', ')
  const appointment = data.appointmentDate
    ? `\n📅 Rendez-vous prévu : ${new Date(data.appointmentDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à ${data.appointmentTime}`
    : ''

  return `Bonjour ${data.firstName},

Merci pour votre demande ! Nous avons bien reçu votre formulaire pour le plan ${planName}.

📋 Récapitulatif de votre demande :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Plan : ${planName}
• Outils sélectionnés : ${tools || 'Aucun'}
• Budget estimé : ${data.budget || 'Non précisé'}
• Délai souhaité : ${data.timeline || 'Non précisé'}
${data.specificRequests ? `• Demandes spécifiques : ${data.specificRequests}` : ''}${appointment}

${data.plan === 'starter'
    ? 'Notre équipe analyse votre projet et vous enverra un devis détaillé sous 48h.'
    : "Notre équipe vous confirmera votre créneau d'audit et vous contactera très prochainement."}

À très bientôt !
L'équipe Clyvuum`
}

function buildOwnerEmail(data: QuotePayload): string {
  const planName = data.plan === 'starter' ? 'Starter' : 'Business'
  const tools = data.selectedTools.map(t => toolLabels[t] || t).join(', ')
  const appointment = data.appointmentDate
    ? `\n📅 RDV demandé : ${new Date(data.appointmentDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à ${data.appointmentTime}`
    : ''

  return `🚀 Nouvelle demande de devis – Plan ${planName}

👤 Client :
• Nom : ${data.firstName} ${data.lastName}
• Email : ${data.email}
• Téléphone : ${data.phone || 'Non renseigné'}
• Entreprise : ${data.company || 'Non renseignée'}
• Site web : ${data.website || 'Non renseigné'}

🛠 Outils sélectionnés : ${tools || 'Aucun'}

📋 Détails :
• Budget : ${data.budget || 'Non précisé'}
• Délai : ${data.timeline || 'Non précisé'}
• Demandes spécifiques : ${data.specificRequests || 'Aucune'}
${data.plan === 'business' ? `
🔍 Audit Business :
• Processus actuels : ${data.currentProcess || 'Non renseigné'}
• Points de friction : ${data.painPoints || 'Non renseigné'}
• Outils actuels : ${data.currentTools || 'Non renseigné'}
• Taille d'équipe : ${data.teamSize || 'Non renseigné'}
• Objectif principal : ${data.objectives || 'Non renseigné'}` : ''}
${appointment}

⏰ Soumis le : ${new Date(data.submittedAt).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`
}

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
    const result = quoteSchema.safeParse(json)
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
    const fromAddress = 'Clyvuum <noreply@clyvuum.fr>'

    await resend.emails.send({
      from: fromAddress,
      to: [OWNER_EMAIL],
      replyTo: data.email,
      subject: `Nouvelle demande de devis – ${data.plan === 'starter' ? 'Starter' : 'Business'} – ${data.firstName} ${data.lastName}`,
      text: buildOwnerEmail(data),
    })

    await resend.emails.send({
      from: fromAddress,
      to: [data.email],
      subject: 'Clyvuum – Votre demande a bien été reçue !',
      text: buildClientEmail(data),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error in /api/send-quote:', err)
    return NextResponse.json(
      { ok: false, error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
