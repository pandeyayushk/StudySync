'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { cycleSettingsSchema } from '@/validations/cycle'
import { CycleSettings } from '@/types'

export async function getCycleSettings(): Promise<CycleSettings | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data, error } = await supabase
    .from('cycle_settings')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) return null

  return data as CycleSettings
}

export async function saveCycleSettings(values: { lastPeriodDate: string, averageCycleLength: number }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const result = cycleSettingsSchema.safeParse(values)
  if (!result.success) {
    return { error: 'Invalid data' }
  }

  const { error } = await supabase
    .from('cycle_settings')
    .upsert({
      user_id: user.id,
      last_period_date: result.data.lastPeriodDate,
      average_cycle_length: result.data.averageCycleLength,
    }, { onConflict: 'user_id' })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard', 'layout')
  return { success: true }
}
