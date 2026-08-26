'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function logTimerSession({
  durationMinutes,
  breakMinutes,
  completed,
  cyclePhase,
}: {
  durationMinutes: number
  breakMinutes: number
  completed: boolean
  cyclePhase?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { data, error } = await supabase
    .from('timer_sessions')
    .insert({
      user_id: user.id,
      duration_minutes: durationMinutes,
      break_minutes: breakMinutes,
      completed,
      cycle_phase: cyclePhase || null,
      started_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard', 'layout')
  return { success: true, session: data }
}

export async function getTimerStats() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { totalSessions: 0, totalFocusMinutes: 0 }
  }

  const todayStr = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('timer_sessions')
    .select('duration_minutes, completed')
    .eq('user_id', user.id)
    .gte('started_at', `${todayStr}T00:00:00.000Z`)

  if (error || !data) {
    return { totalSessions: 0, totalFocusMinutes: 0 }
  }

  const completedSessions = data.filter((s) => s.completed)
  const totalFocusMinutes = completedSessions.reduce(
    (acc, curr) => acc + (curr.duration_minutes || 0),
    0
  )

  return {
    totalSessions: completedSessions.length,
    totalFocusMinutes,
  }
}
