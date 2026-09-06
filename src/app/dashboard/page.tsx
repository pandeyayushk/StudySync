import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { calculateCycleDay, getCyclePhase, getPhaseInfo, getDaysUntilNextPhase } from '@/lib/cycle/engine'
import { PhaseIndicator } from '@/components/dashboard/phase-indicator'
import { DailySummary } from '@/components/dashboard/daily-summary'
import { ExamList } from '@/components/dashboard/exam-list'
import { PomodoroTimer } from '@/components/dashboard/pomodoro-timer'
import { EmptyState } from '@/components/dashboard/empty-state'
import { Settings2 } from 'lucide-react'
import DashboardClient from './dashboard-client'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')

  const { data: cycleSettings } = await supabase
    .from('cycle_settings')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!cycleSettings) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <EmptyState
          icon={Settings2}
          title="Welcome to StudySync!"
          description="Set up your cycle info and exam dates to get personalized study plans."
          action={{ label: 'Get Started', href: '/dashboard/setup' }}
        />
      </div>
    )
  }

  const today = new Date()
  const cycleDay = calculateCycleDay(new Date(cycleSettings.last_period_date), today, cycleSettings.average_cycle_length)
  const phase = getCyclePhase(cycleDay, cycleSettings.average_cycle_length)
  const phaseInfo = getPhaseInfo(phase)
  const daysUntilNext = getDaysUntilNextPhase(cycleDay, cycleSettings.average_cycle_length)

  const todayStr = today.toISOString().split('T')[0]
  const { data: exams } = await supabase
    .from('exams')
    .select('*')
    .eq('user_id', user.id)
    .gte('exam_date', todayStr)
    .order('exam_date', { ascending: true })

  const { data: todayPlan } = await supabase
    .from('study_plans')
    .select('*')
    .eq('user_id', user.id)
    .eq('plan_date', todayStr)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Your personalized study command center</p>
      </div>
      
      <DailySummary 
        phaseInfo={phaseInfo}
        cycleDay={cycleDay}
        examCount={exams?.length ?? 0}
        planGenerated={!!todayPlan}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PhaseIndicator
            phaseInfo={phaseInfo}
            cycleDay={cycleDay}
            cycleLength={cycleSettings.average_cycle_length}
            daysUntilNextPhase={daysUntilNext}
          />
          <DashboardClient 
            initialPlan={todayPlan ? {
              ...todayPlan,
              tasks: todayPlan.tasks as any,
              cyclePhase: todayPlan.cycle_phase as any,
              cycleDay: todayPlan.cycle_day,
              planDate: todayPlan.plan_date,
              studyMethod: todayPlan.study_method,
              focusDuration: todayPlan.focus_duration,
              breakDuration: todayPlan.break_duration,
              motivationNote: todayPlan.motivation_note ?? '',
              createdAt: todayPlan.created_at,
            } : null}
          />
        </div>
        <div className="space-y-6">
          <PomodoroTimer
            focusDuration={phaseInfo.focusDuration}
            breakDuration={phaseInfo.breakDuration}
            phaseInfo={phaseInfo}
          />
          <ExamList exams={exams ?? []} />
        </div>
      </div>
    </div>
  )
}
