import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Header as DashboardHeader } from '@/components/dashboard/header'
import Link from 'next/link'
import { LayoutDashboard, Settings2, FileText } from 'lucide-react'

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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Fixed top header navbar - stays visible while scrolling */}
      <DashboardHeader userName={userName} userEmail={user.email} />

      {/* Main page content with top padding for fixed header and bottom padding for mobile bar */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pb-12">
        {children}
      </main>

      {/* Mobile Bottom Navigation (for small screens) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
        <div className="grid h-full w-full grid-cols-3 mx-auto">
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
        </div>
      </nav>
    </div>
  )
}
