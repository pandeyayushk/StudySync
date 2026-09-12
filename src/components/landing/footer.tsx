import { Heart } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#060919]/90 border-t border-slate-800/80 py-12">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#2f39a9] via-[#2e6fa0] to-[#15d8b3] text-white shadow-sm">
            <span className="font-extrabold text-xs">SS</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-[#15d8b3] bg-clip-text text-transparent">StudySync</span>
          <Heart className="w-5 h-5 text-[#15d8b3] fill-[#15d8b3]" />
        </Link>
        <p className="text-slate-400 mb-2">Helping students study in harmony with their natural rhythm.</p>
        <p className="text-sm text-slate-500 mb-8">Built with privacy in mind. We never track medical data.</p>
        <div className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} StudySync. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
