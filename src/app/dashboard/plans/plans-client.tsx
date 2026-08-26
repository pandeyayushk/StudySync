'use client'

import { useState } from 'react'
import { StudyPlan } from '@/types'
import { deletePlan } from '@/actions/plans'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { getPhaseInfo } from '@/lib/cycle/engine'

export default function PlansClient({ initialPlans }: { initialPlans: StudyPlan[] }) {
  const [plans, setPlans] = useState<StudyPlan[]>(initialPlans)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDelete = async (id: string | undefined) => {
    if (!id) return
    try {
      const result = await deletePlan(id)
      if (result.success) {
        setPlans(plans.filter(p => p.id !== id))
        toast({ title: 'Plan deleted' })
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete plan', variant: 'destructive' })
    }
  }

  const toggleExpand = (id: string | undefined) => {
    if (!id) return
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {plans.map((plan) => {
        const phaseInfo = getPhaseInfo(plan.cyclePhase)
        const isExpanded = expandedId === plan.id

        return (
          <div key={plan.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50"
              onClick={() => toggleExpand(plan.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${phaseInfo.bgColor} ${phaseInfo.color}`}>
                  {phaseInfo.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{new Date(plan.planDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                  <div className="flex items-center space-x-3 text-sm text-slate-500 mt-1">
                    <span className="font-medium text-slate-700">{phaseInfo.label} Phase (Day {plan.cycleDay})</span>
                    <span>•</span>
                    <span>{plan.tasks.length} tasks</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => { e.stopPropagation(); handleDelete(plan.id); }}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <div className="text-slate-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <h4 className="text-xs font-semibold uppercase text-slate-500 mb-1">Study Method</h4>
                    <p className="text-sm font-medium">{plan.studyMethod}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <h4 className="text-xs font-semibold uppercase text-slate-500 mb-1">Pomodoro Timer</h4>
                    <p className="text-sm font-medium">{plan.focusDuration}min focus / {plan.breakDuration}min break</p>
                  </div>
                </div>
                
                <h4 className="text-sm font-semibold mb-2">Tasks</h4>
                <ul className="space-y-2">
                  {plan.tasks.map((task, idx) => (
                    <li key={idx} className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                      <div>
                        <span className="font-medium text-sm">{task.subject}:</span> <span className="text-sm text-slate-600">{task.task}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-500">{task.estimatedMinutes}m</span>
                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700' : 
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-green-100 text-green-700'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
