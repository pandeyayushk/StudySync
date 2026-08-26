'use client'

import { Menu, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  userName?: string | null
}

export function Header({ userName }: HeaderProps) {
  const initial = userName ? userName.charAt(0).toUpperCase() : 'U'

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 lg:justify-end">
      {/* Mobile only branding */}
      <div className="flex items-center gap-2 lg:hidden">
        <BookOpen className="h-5 w-5 text-violet-600" />
        <span className="text-lg font-bold text-slate-900">StudySync</span>
      </div>

      {/* User profile */}
      <div className="flex items-center gap-3">
        {userName && (
          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            {userName}
          </span>
        )}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-700">
          {initial}
        </div>
      </div>
    </header>
  )
}
