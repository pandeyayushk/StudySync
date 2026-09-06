'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, User, LogOut, LayoutDashboard, Settings2, FileText } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from '@/actions/auth'
import { cn } from '@/lib/utils'

interface HeaderProps {
  userName?: string | null
  userEmail?: string | null
}

export function Header({ userName, userEmail }: HeaderProps) {
  const pathname = usePathname()
  const displayName = userName || userEmail?.split('@')[0] || 'User'
  const initial = displayName.charAt(0).toUpperCase()

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/setup', label: 'Setup', icon: Settings2 },
    { href: '/dashboard/plans', label: 'My Plans', icon: FileText },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur shadow-sm md:px-8">
      {/* Left: Brand Logo & Title with new palette colors */}
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2f39a9] via-[#2e6fa0] to-[#15d8b3] text-white shadow-sm shadow-[#2f39a9]/25">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1e2474]">StudySync</span>
        </Link>

        {/* Center/Left Desktop Navigation Bar (left to right) */}
        <nav className="hidden md:flex items-center gap-1.5 ml-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-[#2f39a9]/10 text-[#2f39a9] font-semibold border-b-2 border-[#15d8b3]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <link.icon className={cn('w-4 h-4', isActive ? 'text-[#2f39a9]' : 'text-slate-500')} />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Right: User Profile Avatar with Dropdown */}
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-3 rounded-full p-1 transition-all hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2f39a9] focus:ring-offset-2"
              aria-label="User account menu"
            >
              {userName && (
                <span className="hidden text-sm font-medium text-slate-700 md:block">
                  {userName}
                </span>
              )}
              <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-[#2f39a9] to-[#2e6fa0] text-sm font-semibold text-white shadow-sm ring-2 ring-[#15d8b3]/50 transition-transform hover:scale-105">
                {initial}
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 mt-1" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-slate-900">{displayName}</p>
                {userEmail && (
                  <p className="text-xs leading-none text-slate-500 truncate">{userEmail}</p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex w-full cursor-pointer items-center">
                  <User className="mr-2 h-4 w-4 text-slate-500" />
                  <span>Account Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <form action={signOut} className="w-full">
                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center text-rose-600 hover:text-rose-700"
                >
                  <LogOut className="mr-2 h-4 w-4 text-rose-600" />
                  <span>Sign Out</span>
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
