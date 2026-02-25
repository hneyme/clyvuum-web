import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })

const siteUrl = "https://clyvuum.fr"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Clyvuum | Solutions Digitales & Performance",
    template: "%s | Clyvuum",
  },
  description:
    "Clyvuum accompagne les entreprises dans leur transformation digitale avec des solutions fluides, rapides et sur-mesure. Sites web, automatisations et applications sur-mesure.",
  keywords: [
    "transformation digitale",
    "solutions digitales",
    "agence web",
    "automatisation",
    "site web performant",
    "CRM",
    "application sur-mesure",
    "SEO",
    "Paris",
    "France",
    "Clyvuum",
  ],
  authors: [{ name: "Clyvuum" }],
  creator: "Clyvuum",
  publisher: "Clyvuum",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Clyvuum",
    title: "Clyvuum | Solutions Digitales & Performance",
    description:
      "Clyvuum accompagne les entreprises dans leur transformation digitale avec des solutions fluides, rapides et sur-mesure.",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "Clyvuum Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Clyvuum | Solutions Digitales & Performance",
    description:
      "Solutions digitales sur-mesure : sites web, automatisations et applications pour les entreprises.",
    images: ["/icon-512.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${_geist.className} font-sans antialiased`}>
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold"
        >
          Aller au contenu principal
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
