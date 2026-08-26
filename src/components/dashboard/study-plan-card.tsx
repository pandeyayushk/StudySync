'use client'

import { StudyPlan } from '@/types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw, Sparkles, Clock, Target } from 'lucide-react'
import { format } from 'date-fns'

interface StudyPlanCardProps {
  plan: StudyPlan | null
  onGenerate: () => void
  isGenerating?: boolean
}

export function StudyPlanCard({ plan, onGenerate, isGenerating }: StudyPlanCardProps) {
  if (!plan) {
    return (
      <Card className="border-slate-200 shadow-sm text-center py-12">
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-violet-50 rounded-full text-violet-500 mb-2">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">No Plan for Today</h3>
          <p className="text-slate-500 max-w-md mx-auto pb-4">
            Generate a personalized study plan optimized for your current phase and upcoming exams.
          </p>
          <Button onClick={onGenerate} disabled={isGenerating} className="bg-violet-600 hover:bg-violet-700">
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Today's Plan
          </Button>
        </CardContent>
      </Card>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-100 text-rose-700 border-rose-200'
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      default: return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              Today's Study Plan
            </CardTitle>
            <CardDescription className="mt-1.5">
              {format(new Date(plan.planDate), 'EEEE, MMMM d, yyyy')}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-violet-100 text-violet-700 border-0 w-fit">
            {plan.studyMethod}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 flex-1 flex flex-col gap-6">
        <div className="flex items-center gap-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="flex items-center gap-1.5 font-medium">
            <Target className="w-4 h-4 text-violet-500" />
            Focus: {plan.focusDuration}m
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-slate-400" />
            Break: {plan.breakDuration}m
          </div>
        </div>

        <div className="space-y-3 flex-1">
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            Tasks for today
          </h4>
          {plan.tasks.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No specific tasks scheduled. Focus on review.</p>
          ) : (
            <ul className="space-y-2">
              {plan.tasks.map((task, idx) => (
                <li key={idx} className="p-3 border border-slate-100 rounded-lg bg-white shadow-sm flex items-start gap-3">
                  <div className="mt-0.5">
                    <Badge variant="outline" className={`text-xs py-0 h-5 px-1.5 ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 truncate">{task.subject}</p>
                    <p className="text-sm text-slate-600 mt-0.5">{task.task}</p>
                  </div>
                  <div className="text-xs font-medium text-slate-400 whitespace-nowrap">
                    ~{task.estimatedMinutes}m
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-xl border border-violet-100">
          <p className="text-sm text-violet-800 italic font-medium leading-relaxed">
            "{plan.motivationNote}"
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-slate-100">
        <Button 
          variant="outline" 
          onClick={onGenerate} 
          disabled={isGenerating}
          className="w-full text-slate-600 border-slate-200 hover:bg-slate-50"
        >
          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Regenerate Plan
        </Button>
      </CardFooter>
    </Card>
  )
}
