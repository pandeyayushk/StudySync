'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { calculateCycleDay, getCyclePhase } from '@/lib/cycle/engine'
import { generateAIStudyPlan } from '@/lib/study/ai-generator'
import { StudyPlan } from '@/types'

export async function generateAndSavePlan() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { data: cycleSettings, error: cycleError } = await supabase
    .from('cycle_settings')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (cycleError || !cycleSettings) {
    return { error: 'Cycle settings not found' }
  }

  const todayStr = new Date().toISOString().split('T')[0]
  
  const { data: exams, error: examsError } = await supabase
    .from('exams')
    .select('*')
    .eq('user_id', user.id)
    .gte('exam_date', todayStr)
    .order('exam_date', { ascending: true })

  if (examsError) {
    return { error: 'Error fetching exams' }
  }

  const today = new Date()
  const cycleDay = calculateCycleDay(new Date(cycleSettings.last_period_date), today, cycleSettings.average_cycle_length)
  const phase = getCyclePhase(cycleDay, cycleSettings.average_cycle_length)

  const plan = await generateAIStudyPlan(phase, cycleDay, exams)

  const dbPlan = {
    user_id: user.id,
    plan_date: todayStr,
    cycle_phase: plan.cyclePhase,
    cycle_day: plan.cycleDay,
    tasks: plan.tasks,
    study_method: plan.studyMethod,
    focus_duration: plan.focusDuration,
    break_duration: plan.breakDuration,
    motivation_note: plan.motivationNote,
  }

  const { data: savedPlan, error: saveError } = await supabase
    .from('study_plans')
    .upsert(dbPlan, { onConflict: 'user_id, plan_date' })
    .select()
    .single()

  if (saveError) {
    return { error: saveError.message }
  }

  revalidatePath('/dashboard', 'layout')
  
  return {
    id: savedPlan.id,
    userId: savedPlan.user_id,
    planDate: savedPlan.plan_date,
    cyclePhase: savedPlan.cycle_phase,
    cycleDay: savedPlan.cycle_day,
    tasks: savedPlan.tasks,
    studyMethod: savedPlan.study_method,
    focusDuration: savedPlan.focus_duration,
    breakDuration: savedPlan.break_duration,
    motivationNote: savedPlan.motivation_note,
    createdAt: savedPlan.created_at,
  }
}

export async function getPlans(): Promise<StudyPlan[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('study_plans')
    .select('*')
    .eq('user_id', user.id)
    .order('plan_date', { ascending: false })

  if (error) return []

  return data.map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    planDate: row.plan_date,
    cyclePhase: row.cycle_phase,
    cycleDay: row.cycle_day,
    tasks: row.tasks,
    studyMethod: row.study_method,
    focusDuration: row.focus_duration,
    breakDuration: row.break_duration,
    motivationNote: row.motivation_note,
    createdAt: row.created_at,
  }))
}

export async function deletePlan(planId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('study_plans')
    .delete()
    .eq('id', planId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard', 'layout')
  return { success: true }
}
