import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CycleForm } from '@/components/forms/cycle-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ExamManager from './exam-manager'

export const metadata: Metadata = {
  title: 'Setup — StudySync',
}

export default async function SetupPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/sign-in')

  const { data: cycleSettings } = await supabase
    .from('cycle_settings')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const { data: exams } = await supabase
    .from('exams')
    .select('*')
    .eq('user_id', user.id)
    .order('exam_date', { ascending: true })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Setup & Settings</h1>
        <p className="text-slate-500">Manage your cycle information and exams</p>
      </div>

      <Tabs defaultValue="cycle" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cycle">Cycle Info</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cycle" className="space-y-4">
          <CycleForm 
            defaultValues={cycleSettings ? {
              lastPeriodDate: cycleSettings.last_period_date,
              averageCycleLength: cycleSettings.average_cycle_length
            } : undefined}
          />
        </TabsContent>
        
        <TabsContent value="exams" className="space-y-4">
          <ExamManager initialExams={exams ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
