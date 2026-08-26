import { Exam } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Trash2 } from 'lucide-react'
import { format, differenceInDays, isPast } from 'date-fns'

interface ExamListProps {
  exams: Exam[]
}

export function ExamList({ exams }: ExamListProps) {
  if (!exams || exams.length === 0) {
    return (
      <Card className="border-slate-200 shadow-sm h-full flex flex-col">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-500" />
            Upcoming Exams
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center py-8 text-center px-4">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
            <Calendar className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium mb-1">No upcoming exams</p>
          <p className="text-sm text-slate-500">Add exams in Setup to get tailored plans.</p>
        </CardContent>
      </Card>
    )
  }

  // Sort exams by date, nearest first
  const sortedExams = [...exams].sort((a, b) => 
    new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime()
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-amber-100 text-amber-700'
      case 'low': return 'bg-emerald-100 text-emerald-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <Card className="border-slate-200 shadow-sm h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-slate-500" />
          Upcoming Exams
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-y-auto max-h-[400px]">
        <ul className="divide-y divide-slate-100">
          {sortedExams.map((exam) => {
            const examDate = new Date(exam.exam_date)
            const daysUntil = differenceInDays(examDate, new Date())
            const isOver = isPast(examDate) && daysUntil < 0
            
            return (
              <li key={exam.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-slate-900 truncate pr-2">{exam.subject}</h4>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                      {format(examDate, 'MMM d, yyyy')}
                      <span className="text-slate-300">•</span>
                      <span className={`font-medium ${isOver ? 'text-slate-400' : daysUntil <= 7 ? 'text-red-600' : 'text-violet-600'}`}>
                        {isOver ? 'Passed' : daysUntil === 0 ? 'Today!' : `In ${daysUntil} day${daysUntil === 1 ? '' : 's'}`}
                      </span>
                    </p>
                  </div>
                  <Badge variant="secondary" className={`border-0 shrink-0 ${getPriorityColor(exam.priority)}`}>
                    {exam.priority}
                  </Badge>
                </div>
                {exam.notes && (
                  <p className="text-xs text-slate-500 mt-2 bg-slate-100 p-2 rounded-md line-clamp-2">
                    {exam.notes}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
