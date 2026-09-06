'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Exam } from '@/types'
import { ExamForm } from '@/components/forms/exam-form'
import { deleteExam } from '@/actions/exams'
import { useToast } from '@/components/ui/use-toast'
import { Trash2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ExamManager({ initialExams }: { initialExams: Exam[] }) {
  const [exams, setExams] = useState<Exam[]>(initialExams)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setExams(initialExams)
  }, [initialExams])

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteExam(id)
      if (result.success) {
        setExams(exams.filter(e => e.id !== id))
        toast({ title: 'Exam deleted' })
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete exam', variant: 'destructive' })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="h-fit">
        <ExamForm onSuccess={() => router.refresh()} />
      </div>
      
      <div className="bg-[#0c1222]/90 backdrop-blur p-6 rounded-xl border border-slate-800 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#15d8b3]" />
          Your Exams
        </h2>
        {exams.length === 0 ? (
          <p className="text-slate-400 text-sm">No exams scheduled yet.</p>
        ) : (
          <ul className="space-y-3">
            {exams.map(exam => (
              <li key={exam.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div>
                  <h3 className="font-medium text-sm text-white">{exam.subject}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-slate-400">{new Date(exam.exam_date).toLocaleDateString()}</span>
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full ${
                      exam.priority === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 
                      exam.priority === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 
                      'bg-[#15d8b3]/20 text-[#15d8b3] border border-[#15d8b3]/30'
                    }`}>
                      {exam.priority}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(exam.id)} className="text-slate-400 hover:text-rose-400 hover:bg-rose-950/30">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
