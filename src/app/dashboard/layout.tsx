import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header as DashboardHeader } from '@/components/dashboard/header'
import Link from 'next/link'
import { LayoutDashboard, Settings2, FileText, User } from 'lucide-react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const userName = profile?.full_name || user.email?.split('@')[0] || 'User'

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden lg:block w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <DashboardHeader userName={userName} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="grid h-full w-full grid-cols-4 mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex flex-col items-center justify-center px-2 hover:bg-slate-50 text-slate-600 hover:text-violet-600 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Dashboard</span>
          </Link>
          <Link
            href="/dashboard/setup"
            className="inline-flex flex-col items-center justify-center px-2 hover:bg-slate-50 text-slate-600 hover:text-violet-600 transition-colors"
          >
            <Settings2 className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Setup</span>
          </Link>
          <Link
            href="/dashboard/plans"
            className="inline-flex flex-col items-center justify-center px-2 hover:bg-slate-50 text-slate-600 hover:text-violet-600 transition-colors"
          >
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Plans</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="inline-flex flex-col items-center justify-center px-2 hover:bg-slate-50 text-slate-600 hover:text-violet-600 transition-colors"
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
