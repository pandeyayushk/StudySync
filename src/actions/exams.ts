'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { examSchema } from '@/validations/exam'
import { Exam } from '@/types'

export async function getExams(): Promise<Exam[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('user_id', user.id)
    .order('exam_date', { ascending: true })

  if (error) return []

  return data as Exam[]
}

export async function addExam(values: { subject: string, examDate: string, priority: string, notes?: string }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const result = examSchema.safeParse(values)
  if (!result.success) {
    return { error: 'Invalid data' }
  }

  const { error } = await supabase
    .from('exams')
    .insert({
      user_id: user.id,
      subject: result.data.subject,
      exam_date: result.data.examDate,
      priority: result.data.priority,
      notes: result.data.notes || null,
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard', 'layout')
  return { success: true }
}

export async function deleteExam(examId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('exams')
    .delete()
    .eq('id', examId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard', 'layout')
  return { success: true }
}
