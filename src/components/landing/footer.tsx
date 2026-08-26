import { Heart } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-violet-700">StudySync</span>
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
        </Link>
        <p className="text-slate-600 mb-2">Helping students study in harmony with their natural rhythm.</p>
        <p className="text-sm text-slate-500 mb-8">Built with privacy in mind. We never track medical data.</p>
        <div className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} StudySync. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
