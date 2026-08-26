export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cycle_settings: {
        Row: {
          id: string
          user_id: string
          last_period_date: string
          average_cycle_length: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          last_period_date: string
          average_cycle_length?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          last_period_date?: string
          average_cycle_length?: number
          created_at?: string
          updated_at?: string
        }
      }
      exams: {
        Row: {
          id: string
          user_id: string
          subject: string
          exam_date: string
          priority: 'low' | 'medium' | 'high'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          exam_date: string
          priority?: 'low' | 'medium' | 'high'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          exam_date?: string
          priority?: 'low' | 'medium' | 'high'
          notes?: string | null
          created_at?: string
        }
      }
      study_plans: {
        Row: {
          id: string
          user_id: string
          plan_date: string
          cycle_phase: string
          cycle_day: number
          tasks: Json
          study_method: string
          focus_duration: number
          break_duration: number
          motivation_note: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_date: string
          cycle_phase: string
          cycle_day: number
          tasks: Json
          study_method: string
          focus_duration: number
          break_duration: number
          motivation_note?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_date?: string
          cycle_phase?: string
          cycle_day?: number
          tasks?: Json
          study_method?: string
          focus_duration?: number
          break_duration?: number
          motivation_note?: string
          created_at?: string
        }
      }
      timer_sessions: {
        Row: {
          id: string
          user_id: string
          started_at: string
          duration_minutes: number
          break_minutes: number
          completed: boolean
          cycle_phase: string | null
        }
        Insert: {
          id?: string
          user_id: string
          started_at?: string
          duration_minutes: number
          break_minutes: number
          completed?: boolean
          cycle_phase?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          started_at?: string
          duration_minutes?: number
          break_minutes?: number
          completed?: boolean
          cycle_phase?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
