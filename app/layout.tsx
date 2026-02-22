import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Clyvuum | Solutions Digitales & Performance",
  description:
    "Clyvuum accompagne les entreprises dans leur transformation digitale avec des solutions fluides, rapides et sur-mesure. Propulsez votre activité dès aujourd'hui.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/clyvuum-logo-white.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/clyvuum-logo-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_geist.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
