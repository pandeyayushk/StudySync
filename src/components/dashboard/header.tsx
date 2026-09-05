'use client'

import Link from 'next/link'
import { BookOpen, User, LogOut } from 'lucide-react'
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

interface HeaderProps {
  userName?: string | null
  userEmail?: string | null
}

export function Header({ userName, userEmail }: HeaderProps) {
  const displayName = userName || userEmail?.split('@')[0] || 'User'
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6 lg:justify-end">
      {/* Mobile only branding */}
      <div className="flex items-center gap-2 lg:hidden">
        <BookOpen className="h-5 w-5 text-violet-600" />
        <span className="text-lg font-bold text-slate-900">StudySync</span>
      </div>

      {/* User profile with clean dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-3 rounded-full p-1 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            aria-label="User account menu"
          >
            {userName && (
              <span className="hidden text-sm font-medium text-slate-700 sm:block">
                {userName}
              </span>
            )}
            <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white shadow-sm ring-2 ring-violet-200 transition-transform hover:scale-105">
              {initial}
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
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
    </header>
  )
}
