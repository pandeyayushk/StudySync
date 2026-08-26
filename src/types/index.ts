export type CyclePhase = 'menstruation' | 'follicular' | 'ovulation' | 'luteal'

export interface PhaseInfo {
  phase: CyclePhase
  label: string
  color: string
  bgColor: string
  borderColor: string
  emoji: string
  description: string
  focusDuration: number
  breakDuration: number
  studyTips: string[]
}

export interface StudyTask {
  subject: string
  task: string
  priority: 'low' | 'medium' | 'high'
  estimatedMinutes: number
}

export interface StudyPlan {
  id?: string
  userId?: string
  planDate: string
  cyclePhase: CyclePhase
  cycleDay: number
  tasks: StudyTask[]
  studyMethod: string
  focusDuration: number
  breakDuration: number
  motivationNote: string
  createdAt?: string
}

export interface Exam {
  id: string
  user_id: string
  subject: string
  exam_date: string
  priority: 'low' | 'medium' | 'high'
  notes: string | null
  created_at: string
}

export interface CycleSettings {
  id: string
  user_id: string
  last_period_date: string
  average_cycle_length: number
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}
