'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Exam } from '@/types'
import { ExamForm } from '@/components/forms/exam-form'
import { deleteExam } from '@/actions/exams'
import { useToast } from '@/components/ui/use-toast'
import { Trash2 } from 'lucide-react'
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
      
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h2 className="text-lg font-semibold mb-4">Your Exams</h2>
        {exams.length === 0 ? (
          <p className="text-slate-500 text-sm">No exams scheduled yet.</p>
        ) : (
          <ul className="space-y-3">
            {exams.map(exam => (
              <li key={exam.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div>
                  <h3 className="font-medium text-sm">{exam.subject}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-slate-500">{new Date(exam.exam_date).toLocaleDateString()}</span>
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full ${
                      exam.priority === 'high' ? 'bg-red-100 text-red-700' : 
                      exam.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {exam.priority}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(exam.id)} className="text-slate-400 hover:text-red-500">
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
