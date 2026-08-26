import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { EmptyState } from '@/components/dashboard/empty-state'
import { Calendar } from 'lucide-react'
import PlansClient from './plans-client'

export const metadata: Metadata = {
  title: 'My Plans — StudySync',
}

export default async function PlansPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/sign-in')

  const { data: plans } = await supabase
    .from('study_plans')
    .select('*')
    .eq('user_id', user.id)
    .order('plan_date', { ascending: false })

  if (!plans || plans.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <EmptyState
          icon={Calendar}
          title="No study plans yet"
          description="Generate your first study plan on the dashboard."
          action={{ label: 'Go to Dashboard', href: '/dashboard' }}
        />
      </div>
    )
  }

  const formattedPlans = plans.map(p => ({
    id: p.id,
    userId: p.user_id,
    planDate: p.plan_date,
    cyclePhase: p.cycle_phase,
    cycleDay: p.cycle_day,
    tasks: p.tasks,
    studyMethod: p.study_method,
    focusDuration: p.focus_duration,
    breakDuration: p.break_duration,
    motivationNote: p.motivation_note,
    createdAt: p.created_at,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Study Plans History</h1>
        <p className="text-slate-500">Review your past and current study plans</p>
      </div>

      <PlansClient initialPlans={formattedPlans as any} />
    </div>
  )
}
