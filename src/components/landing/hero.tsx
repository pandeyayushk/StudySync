import Link from 'next/link'
import { BookOpen, Brain, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                Study Smarter, Not Harder
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-[600px] mx-auto md:mx-0 leading-relaxed">
              Personalized study plans that adapt to your natural rhythm. Optimize your focus, memory, and energy throughout the month.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white rounded-full">
                <Link href="/sign-up">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-violet-200 text-violet-700 hover:bg-violet-50">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md mx-auto relative hidden md:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-violet-400 to-purple-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white/60 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl shadow-violet-100/50">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                  <div className="p-3 bg-violet-100 text-violet-600 rounded-xl">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Peak Focus Mode</p>
                    <p className="text-sm text-slate-500">Follicular Phase</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Active Recall</p>
                    <p className="text-sm text-slate-500">Suggested Method</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Exam Ready</p>
                    <p className="text-sm text-slate-500">Optimized Schedule</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
