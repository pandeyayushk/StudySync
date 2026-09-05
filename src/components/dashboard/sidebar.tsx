'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings2, FileText, BookOpen, LogOut } from 'lucide-react'
import { signOut } from '@/actions/auth'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/setup', label: 'Setup', icon: Settings2 },
    { href: '/dashboard/plans', label: 'My Plans', icon: FileText },
  ]

  return (
    <div className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-white border-r border-slate-200">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-violet-600" />
          <span className="text-xl font-bold text-slate-900">StudySync</span>
        </Link>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive 
                  ? "bg-violet-100 text-violet-700" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-slate-100">
        <form action={signOut}>
          <button 
            type="submit"
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}
