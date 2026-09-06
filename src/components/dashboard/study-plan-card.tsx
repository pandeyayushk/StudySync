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
      <Card className="border-slate-800 bg-[#0c1222]/90 backdrop-blur shadow-xl text-center py-12">
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-[#2f39a9]/20 rounded-full text-[#15d8b3] mb-2 border border-[#15d8b3]/20">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-white">No Plan for Today</h3>
          <p className="text-slate-400 max-w-md mx-auto pb-4">
            Generate a personalized study plan optimized for your current phase and upcoming exams.
          </p>
          <Button 
            onClick={onGenerate} 
            disabled={isGenerating} 
            className="bg-gradient-to-r from-[#2f39a9] to-[#2e6fa0] hover:opacity-90 text-white shadow-lg shadow-[#2f39a9]/25"
          >
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Today's Plan
          </Button>
        </CardContent>
      </Card>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-500/20 text-rose-300 border-rose-500/30'
      case 'medium': return 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      case 'low': return 'bg-[#15d8b3]/20 text-[#15d8b3] border-[#15d8b3]/30'
      default: return 'bg-slate-700/40 text-slate-300 border-slate-700'
    }
  }

  return (
    <Card className="border-slate-800 bg-[#0c1222]/90 backdrop-blur shadow-xl overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-slate-900/40 border-b border-slate-800/80 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl flex items-center gap-2 text-white">
              Today's Study Plan
            </CardTitle>
            <CardDescription className="mt-1.5 text-slate-400">
              {format(new Date(plan.planDate), 'EEEE, MMMM d, yyyy')}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-[#2f39a9]/30 text-[#15d8b3] border border-[#15d8b3]/30 w-fit font-medium">
            {plan.studyMethod}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 flex-1 flex flex-col gap-6">
        <div className="flex items-center gap-4 text-sm text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 font-medium">
            <Target className="w-4 h-4 text-[#15d8b3]" />
            Focus: <span className="text-white">{plan.focusDuration}m</span>
          </div>
          <div className="w-px h-4 bg-slate-700"></div>
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-[#49a4bb]" />
            Break: <span className="text-white">{plan.breakDuration}m</span>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            Tasks for today
          </h4>
          {plan.tasks.length === 0 ? (
            <p className="text-sm text-slate-400 italic">No specific tasks scheduled. Focus on review.</p>
          ) : (
            <ul className="space-y-2">
              {plan.tasks.map((task, idx) => (
                <li key={idx} className="p-3 border border-slate-800/80 rounded-lg bg-slate-900/40 shadow-sm flex items-start gap-3">
                  <div className="mt-0.5">
                    <Badge variant="outline" className={`text-xs py-0 h-5 px-1.5 ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{task.subject}</p>
                    <p className="text-sm text-slate-300 mt-0.5">{task.task}</p>
                  </div>
                  <div className="text-xs font-medium text-[#15d8b3] whitespace-nowrap">
                    ~{task.estimatedMinutes}m
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gradient-to-r from-[#2f39a9]/20 to-[#2e6fa0]/20 p-4 rounded-xl border border-[#2e6fa0]/30">
          <p className="text-sm text-[#e8fbf7] italic font-medium leading-relaxed">
            "{plan.motivationNote}"
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-slate-800/80">
        <Button 
          variant="outline" 
          onClick={onGenerate} 
          disabled={isGenerating}
          className="w-full text-slate-300 border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:text-white"
        >
          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Regenerate Plan
        </Button>
      </CardFooter>
    </Card>
  )
}
