import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  icons: {
    icon: "/computer.png"
  },
  title: "Algonza Dewangga Arjunantyo | Personal Portfolio",
  description: "Seorang Full Stack Developer yang berfokus pada pengembangan web modern dengan React, Next.js, Laravel, dan FastAPI. Portfolio Algonza Dewangga Arjunantyo menampilkan berbagai proyek dan keahlian dalam pengembangan software.",
  keywords: [
    "Algonza",
    "Algonza Dewangga",
    "Algonza Arjunantyo",
    "Algonza Dewangga Arjunantyo",
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "FastAPI Developer"
  ],
  authors: [{ name: "Algonza Dewangga Arjunantyo" }],
  creator: "Algonza Dewangga Arjunantyo",
  publisher: "Algonza Dewangga Arjunantyo",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://algonza.vercel.app",
    title: "Algonza Dewangga Arjunantyo | Personal Portfolio",
    description: "Portfolio website Algonza Dewangga Arjunantyo, seorang Full Stack Developer dengan keahlian dalam React, Next.js, Laravel, dan FastAPI.",
    siteName: "Algonza Dewangga Arjunantyo Portfolio"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "IyE5sFiJg2BpLriWUzf5cr19M8SQcQ_tI5FAQFgATqM", // Ganti dengan kode verifikasi Google Search Console Anda
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
import { Metadata } from "next"
