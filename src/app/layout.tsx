import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SupabaseProvider from '@/components/providers/supabase-provider'
import { Toaster } from '@/components/ui/toaster'

import { BackgroundAnimation } from '@/components/ui/background-animation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StudySync',
  description: 'Study smarter with cycle-aware study plans',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#060919] text-slate-100 antialiased selection:bg-[#15d8b3]/30 selection:text-[#15d8b3]`}>
        <BackgroundAnimation />
        <SupabaseProvider>
          {children}
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  )
}
