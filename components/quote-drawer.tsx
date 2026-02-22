"use client"

import React, { useState, useCallback } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import Stepper, { Step } from "@/components/ui/stepper"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import {
  Zap,
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  MessageSquare,
  Send,
  CalendarDays,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import { fr } from "date-fns/locale"

/* ─── Types ─── */
export type PlanType = "starter" | "business"

interface ToolOption {
  id: string
  label: string
  icon: string
  description: string
  plans: PlanType[]
}

interface FormData {
  // Step 1 – Contact info
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  website: string
  // Step 2 – Tools
  selectedTools: string[]
  // Step 3 – Details / Calendar
  specificRequests: string
  budget: string
  timeline: string
  // Business only
  appointmentDate: Date | undefined
  appointmentTime: string
  // Final
  acceptTerms: boolean
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  selectedTools: [],
  specificRequests: "",
  budget: "",
  timeline: "",
  appointmentDate: undefined,
  appointmentTime: "",
  acceptTerms: false,
}

/* ─── Tool options ─── */
const toolOptions: ToolOption[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "fa6-brands:whatsapp",
    description: "Messagerie & support client",
    plans: ["starter", "business"],
  },
  {
    id: "slack",
    label: "Slack",
    icon: "fa6-brands:slack",
    description: "Communication d'équipe",
    plans: ["business"],
  },
  {
    id: "google-drive",
    label: "Google Drive",
    icon: "fa6-brands:google-drive",
    description: "Stockage & partage de fichiers",
    plans: ["starter", "business"],
  },
  {
    id: "mailchimp",
    label: "Mailchimp",
    icon: "fa6-brands:mailchimp",
    description: "Email marketing & newsletters",
    plans: ["starter", "business"],
  },
  {
    id: "stripe",
    label: "Stripe",
    icon: "fa6-brands:stripe",
    description: "Paiements en ligne",
    plans: ["starter", "business"],
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: "fa6-brands:paypal",
    description: "Solutions de paiement",
    plans: ["starter", "business"],
  },
  {
    id: "discord",
    label: "Discord",
    icon: "fa6-brands:discord",
    description: "Communauté & support",
    plans: ["starter", "business"],
  },
  {
    id: "zoom",
    label: "Zoom",
    icon: "fa6-brands:square-font-awesome",
    description: "Visioconférence",
    plans: ["business"],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "fa6-brands:linkedin",
    description: "Réseau professionnel & CRM",
    plans: ["business"],
  },
  {
    id: "apple",
    label: "Apple",
    icon: "fa6-brands:apple",
    description: "Écosystème Apple",
    plans: ["business"],
  },
  {
    id: "windows",
    label: "Windows",
    icon: "fa6-brands:windows",
    description: "Écosystème Microsoft",
    plans: ["business"],
  },
  {
    id: "android",
    label: "Android",
    icon: "fa6-brands:android",
    description: "Application mobile Android",
    plans: ["business"],
  },
]

/* ─── Time slots ─── */
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

/* ─── Main Component ─── */
interface QuoteDrawerProps {
  plan: PlanType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuoteDrawer({ plan, open, onOpenChange }: QuoteDrawerProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setIsSubmitting(false)
    setIsSubmitted(false)
  }, [])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setTimeout(resetForm, 300)
      }
      onOpenChange(open)
    },
    [onOpenChange, resetForm]
  )

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleTool = (toolId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTools: prev.selectedTools.includes(toolId)
        ? prev.selectedTools.filter((t) => t !== toolId)
        : [...prev.selectedTools, toolId],
    }))
  }

  const availableTools = toolOptions.filter(
    (t) => plan && t.plans.includes(plan)
  )

  const isStep1Valid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)

  const isStep2Valid = formData.selectedTools.length > 0

  const isStep3Valid =
    plan === "business"
      ? formData.appointmentDate !== undefined &&
        formData.appointmentTime !== ""
      : true

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const payload = {
        plan,
        ...formData,
        appointmentDate: formData.appointmentDate?.toISOString(),
        submittedAt: new Date().toISOString(),
      }
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setIsSubmitted(true)
      }
    } catch {
      // silently handle – could add toast later
    } finally {
      setIsSubmitting(false)
    }
  }

  const planConfig = {
    starter: {
      title: "Démarrer mon projet",
      subtitle: "Configurez votre solution Starter sur mesure",
      icon: Zap,
      accent: "from-blue-500/20 to-cyan-500/20",
      steps: 3,
    },
    business: {
      title: "Optimiser ma structure",
      subtitle: "Configurez votre solution Business complète",
      icon: Building2,
      accent: "from-violet-500/20 to-purple-500/20",
      steps: 4,
    },
  }

  if (!plan) return null
  const config = planConfig[plan]
  const PlanIcon = config.icon

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className={cn(
          "w-full sm:max-w-xl md:max-w-2xl p-0 border-l border-border/50",
          "flex flex-col overflow-hidden"
        )}
      >
        {/* Header */}
        <SheetHeader
          className={cn(
            "px-6 pt-6 pb-4 border-b border-border/50",
            "bg-gradient-to-r",
            config.accent
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <PlanIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-lg font-bold">
                {config.title}
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                {config.subtitle}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isSubmitted ? (
            <SuccessScreen plan={plan} onClose={() => handleOpenChange(false)} />
          ) : (
            <Stepper
              initialStep={1}
              onFinalStepCompleted={handleSubmit}
              nextDisabled={
                isSubmitting ||
                (!isStep1Valid && true)
              }
              backButtonText="Précédent"
              nextButtonText="Suivant"
              className="h-full"
            >
              {/* Step 1 – Contact Info */}
              <Step>
                <ContactStep formData={formData} updateField={updateField} />
              </Step>

              {/* Step 2 – Tools */}
              <Step>
                <ToolsStep
                  plan={plan}
                  availableTools={availableTools}
                  selectedTools={formData.selectedTools}
                  toggleTool={toggleTool}
                />
              </Step>

              {/* Step 3 – Details / Requests */}
              <Step>
                <DetailsStep
                  plan={plan}
                  formData={formData}
                  updateField={updateField}
                />
              </Step>

              {/* Step 4 – Appointment (Business only) */}
              {plan === "business" && (
                <Step>
                  <AppointmentStep
                    formData={formData}
                    updateField={updateField}
                  />
                </Step>
              )}
            </Stepper>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

/* ═══════════════════════ STEP COMPONENTS ═══════════════════════ */

/* ─── Step 1 : Contact ─── */
function ContactStep({
  formData,
  updateField,
}: {
  formData: FormData
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Vos informations
        </h3>
      </div>
      <p className="text-sm text-muted-foreground -mt-2 mb-4">
        Dites-nous en plus sur vous pour personnaliser notre proposition.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm">
            Prénom <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder="Jean"
              className="pl-9"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm">
            Nom <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            placeholder="Dupont"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm">
          Email professionnel <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="jean@entreprise.com"
            className="pl-9"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm">
            Téléphone
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              className="pl-9"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm">
            Entreprise
          </Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="company"
              placeholder="Ma Société"
              className="pl-9"
              value={formData.company}
              onChange={(e) => updateField("company", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website" className="text-sm">
          Site web actuel
        </Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="website"
            placeholder="https://monsite.com"
            className="pl-9"
            value={formData.website}
            onChange={(e) => updateField("website", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Step 2 : Tools ─── */
function ToolsStep({
  plan,
  availableTools,
  selectedTools,
  toggleTool,
}: {
  plan: PlanType
  availableTools: ToolOption[]
  selectedTools: string[]
  toggleTool: (id: string) => void
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Vos outils & intégrations
        </h3>
      </div>
      <p className="text-sm text-muted-foreground -mt-2 mb-4">
        {plan === "starter"
          ? "Sélectionnez les outils que vous souhaitez intégrer à votre site."
          : "Choisissez toutes les intégrations nécessaires à votre écosystème digital."}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {availableTools.map((tool) => {
          const isSelected = selectedTools.includes(tool.id)
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => toggleTool(tool.id)}
              className={cn(
                "group relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 text-center",
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                  : "border-border/50 bg-card hover:border-primary/30 hover:bg-muted/50"
              )}
            >
              {/* Checkmark */}
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
              )}
              <Icon
                icon={tool.icon}
                className={cn(
                  "h-7 w-7 transition-colors",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  isSelected ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {tool.label}
              </span>
              <span className="text-[11px] text-muted-foreground/70 leading-tight">
                {tool.description}
              </span>
            </button>
          )
        })}
      </div>

      {selectedTools.length > 0 && (
        <div className="flex items-center gap-2 pt-2 text-sm text-primary">
          <CheckCircle2 className="h-4 w-4" />
          <span>
            {selectedTools.length} outil{selectedTools.length > 1 ? "s" : ""}{" "}
            sélectionné{selectedTools.length > 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  )
}

/* ─── Step 3 : Details & requests ─── */
function DetailsStep({
  plan,
  formData,
  updateField,
}: {
  plan: PlanType
  formData: FormData
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Détails du projet
        </h3>
      </div>
      <p className="text-sm text-muted-foreground -mt-2 mb-4">
        {plan === "starter"
          ? "Partagez les détails de votre projet pour recevoir un devis personnalisé."
          : "Décrivez vos besoins pour préparer votre audit personnalisé."}
      </p>

      <div className="space-y-2">
        <Label htmlFor="budget" className="text-sm">
          Budget estimé
        </Label>
        <select
          id="budget"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
          value={formData.budget}
          onChange={(e) => updateField("budget", e.target.value)}
        >
          <option value="" className="bg-background">Sélectionnez un budget</option>
          {plan === "starter" ? (
            <>
              <option value="500-1000" className="bg-background">500€ - 1 000€</option>
              <option value="1000-1500" className="bg-background">1 000€ - 1 500€</option>
              <option value="1500-2000" className="bg-background">1 500€ - 2 000€</option>
              <option value="2000+" className="bg-background">2 000€ +</option>
            </>
          ) : (
            <>
              <option value="2000-3000" className="bg-background">2 000€ - 3 000€</option>
              <option value="3000-5000" className="bg-background">3 000€ - 5 000€</option>
              <option value="5000-10000" className="bg-background">5 000€ - 10 000€</option>
              <option value="10000+" className="bg-background">10 000€ +</option>
            </>
          )}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline" className="text-sm">
          Délai souhaité
        </Label>
        <select
          id="timeline"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
          value={formData.timeline}
          onChange={(e) => updateField("timeline", e.target.value)}
        >
          <option value="" className="bg-background">Sélectionnez un délai</option>
          <option value="urgent" className="bg-background">Urgent (moins de 2 semaines)</option>
          <option value="1month" className="bg-background">1 mois</option>
          <option value="2-3months" className="bg-background">2-3 mois</option>
          <option value="flexible" className="bg-background">Flexible</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specificRequests" className="text-sm">
          Demandes spécifiques & besoins particuliers
        </Label>
        <Textarea
          id="specificRequests"
          placeholder={
            plan === "starter"
              ? "Décrivez votre projet, vos objectifs, les fonctionnalités souhaitées..."
              : "Décrivez vos processus actuels, les points de friction, vos objectifs de croissance..."
          }
          className="min-h-[120px] resize-none"
          value={formData.specificRequests}
          onChange={(e) => updateField("specificRequests", e.target.value)}
        />
      </div>

      {plan === "starter" && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <Send className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Audit de faisabilité inclus
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Nous analyserons votre projet et vous enverrons un devis
                détaillé sous 48h avec nos recommandations personnalisées.
              </p>
            </div>
          </div>
        </div>
      )}

      {plan === "business" && (
        <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
          <div className="flex items-start gap-3">
            <CalendarDays className="h-5 w-5 text-violet-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Prochaine étape : Réservez votre audit
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                À l&apos;étape suivante, choisissez un créneau pour votre audit
                initial personnalisé avec notre équipe.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 pt-2">
        <Checkbox
          id="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) =>
            updateField("acceptTerms", checked === true)
          }
        />
        <Label
          htmlFor="acceptTerms"
          className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
        >
          J&apos;accepte d&apos;être contacté concernant ma demande et je
          reconnais avoir pris connaissance de la politique de confidentialité.
        </Label>
      </div>
    </div>
  )
}

/* ─── Step 4 : Appointment (Business only) ─── */
function AppointmentStep({
  formData,
  updateField,
}: {
  formData: FormData
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void
}) {
  const disabledDays = [
    { dayOfWeek: [0, 6] }, // weekends
    { before: new Date() }, // past dates
  ]

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <CalendarDays className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Réservez votre audit
        </h3>
      </div>
      <p className="text-sm text-muted-foreground -mt-2 mb-4">
        Choisissez un créneau pour un audit initial personnalisé de vos
        processus avec notre équipe.
      </p>

      {/* Calendar */}
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={formData.appointmentDate}
          onSelect={(date) => updateField("appointmentDate", date)}
          locale={fr}
          disabled={disabledDays}
          className="rounded-xl border border-border/50 bg-card"
        />
      </div>

      {/* Time slots */}
      {formData.appointmentDate && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <Label className="text-sm font-medium">Choisissez un horaire</Label>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => updateField("appointmentTime", slot)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                  formData.appointmentTime === slot
                    ? "border-primary bg-primary/10 text-primary shadow-sm"
                    : "border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {formData.appointmentDate && formData.appointmentTime && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Créneau sélectionné
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {formData.appointmentDate.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                à {formData.appointmentTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Success Screen ─── */
function SuccessScreen({
  plan,
  onClose,
}: {
  plan: PlanType
  onClose: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-6">
      <div className="relative">
        <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
          <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-foreground">
          Demande envoyée avec succès !
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          {plan === "starter"
            ? "Nous avons bien reçu votre demande. Vous recevrez un devis détaillé dans votre boîte mail sous 48h."
            : "Votre demande d'audit a été enregistrée. Vous recevrez une confirmation de rendez-vous par email très prochainement."}
        </p>
      </div>

      <div className="rounded-xl border border-border/50 bg-muted/30 p-4 w-full max-w-sm">
        <p className="text-xs text-muted-foreground">
          📧 Un récapitulatif a été envoyé à votre adresse email.
          <br />
          Notre équipe vous contactera en priorité.
        </p>
      </div>

      <button
        onClick={onClose}
        className="rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Fermer
      </button>
    </div>
  )
}
