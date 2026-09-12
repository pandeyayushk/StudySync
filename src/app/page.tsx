import Link from 'next/link'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-slate-100">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080d21]/80 backdrop-blur-md shadow-md shadow-black/20">
        <div className="container flex h-16 items-center mx-auto px-4 sm:px-6">
          <div className="mr-4 flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2f39a9] via-[#2e6fa0] to-[#15d8b3] text-white shadow-sm shadow-[#2f39a9]/30">
                <span className="font-extrabold text-sm">SS</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-100 to-[#15d8b3] bg-clip-text text-transparent">
                StudySync
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-3">
            <nav className="flex items-center space-x-3">
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-slate-800/60 text-slate-300 hover:text-white h-9 px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all bg-gradient-to-r from-[#2f39a9] via-[#2e6fa0] to-[#15d8b3] text-white hover:opacity-90 shadow-md shadow-[#2f39a9]/30 h-9 px-4 py-2 font-semibold"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
