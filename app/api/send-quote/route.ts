import { NextResponse } from 'next/server'

interface QuotePayload {
  plan: 'starter' | 'business'
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  website?: string
  selectedTools: string[]
  specificRequests?: string
  budget?: string
  timeline?: string
  appointmentDate?: string
  appointmentTime?: string
  submittedAt: string
}

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

  return `
Bonjour ${data.firstName},

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
    : 'Notre équipe vous confirmera votre créneau d\'audit et vous contactera très prochainement.'}

À très bientôt !
L'équipe Clyvuum
`
}

function buildOwnerEmail(data: QuotePayload): string {
  const planName = data.plan === 'starter' ? 'Starter' : 'Business'
  const tools = data.selectedTools.map(t => toolLabels[t] || t).join(', ')
  const appointment = data.appointmentDate
    ? `\n📅 RDV demandé : ${new Date(data.appointmentDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à ${data.appointmentTime}`
    : ''

  return `
🚀 Nouvelle demande de devis – Plan ${planName}

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
${appointment}

⏰ Soumis le : ${new Date(data.submittedAt).toLocaleString('fr-FR')}
`
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuotePayload

    // TODO: integrate email provider (e.g. Resend, Formspree) to send these
    void buildClientEmail(body)
    void buildOwnerEmail(body)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error in /api/send-quote', err)
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    )
  }
}
