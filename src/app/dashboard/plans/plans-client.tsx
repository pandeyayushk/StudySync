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
          <div key={plan.id} className="bg-[#0c1229]/80 backdrop-blur-sm rounded-2xl border border-slate-800/80 overflow-hidden shadow-lg shadow-black/10 transition-all hover:border-slate-700/80">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/30 transition-colors"
              onClick={() => toggleExpand(plan.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${phaseInfo.bgColor} ${phaseInfo.color}`}>
                  {phaseInfo.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{new Date(plan.planDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                  <div className="flex items-center space-x-3 text-sm text-slate-400 mt-1">
                    <span className="font-medium text-[#15d8b3]">{phaseInfo.label} Phase (Day {plan.cycleDay})</span>
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
                  className="text-slate-400 hover:text-rose-400 hover:bg-rose-950/30"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <div className="text-slate-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-[#15d8b3]" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#0c1229] p-3.5 rounded-xl border border-slate-800/80">
                    <h4 className="text-xs font-semibold uppercase text-slate-400 mb-1">Study Method</h4>
                    <p className="text-sm font-medium text-white">{plan.studyMethod}</p>
                  </div>
                  <div className="bg-[#0c1229] p-3.5 rounded-xl border border-slate-800/80">
                    <h4 className="text-xs font-semibold uppercase text-slate-400 mb-1">Pomodoro Timer</h4>
                    <p className="text-sm font-medium text-[#15d8b3]">{plan.focusDuration}min focus / {plan.breakDuration}min break</p>
                  </div>
                </div>
                
                <h4 className="text-sm font-semibold text-white mb-2">Tasks</h4>
                <ul className="space-y-2">
                  {plan.tasks.map((task, idx) => (
                    <li key={idx} className="bg-[#0c1229] p-3.5 rounded-xl border border-slate-800/80 flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-sm text-[#49a4bb]">{task.subject}:</span> <span className="text-sm text-slate-300 ml-1">{task.task}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-400">{task.estimatedMinutes}m</span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                          task.priority === 'high' ? 'bg-rose-950/40 text-rose-300 border-rose-800/50' : 
                          task.priority === 'medium' ? 'bg-amber-950/40 text-amber-300 border-amber-800/50' : 
                          'bg-teal-950/40 text-[#15d8b3] border-teal-800/50'
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
