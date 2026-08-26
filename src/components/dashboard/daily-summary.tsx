import { PhaseInfo } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarDays, BookOpen, Clock, Activity } from 'lucide-react'

interface DailySummaryProps {
  phaseInfo: PhaseInfo
  cycleDay: number
  examCount: number
  planGenerated: boolean
}

export function DailySummary({ phaseInfo, cycleDay, examCount, planGenerated }: DailySummaryProps) {
  const items = [
    {
      label: "Current Phase",
      value: phaseInfo.label,
      icon: <span className="text-xl leading-none">{phaseInfo.emoji}</span>,
      color: phaseInfo.bgColor,
      textColor: phaseInfo.color
    },
    {
      label: "Cycle Day",
      value: `Day ${cycleDay}`,
      icon: <Activity className="w-5 h-5 text-violet-500" />,
      color: "bg-violet-50",
      textColor: "text-violet-700"
    },
    {
      label: "Upcoming Exams",
      value: examCount.toString(),
      icon: <CalendarDays className="w-5 h-5 text-amber-500" />,
      color: "bg-amber-50",
      textColor: "text-amber-700"
    },
    {
      label: "Focus Block",
      value: `${phaseInfo.focusDuration} min`,
      icon: <Clock className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-50",
      textColor: "text-emerald-700"
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <Card key={idx} className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
              {item.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 mb-0.5 truncate">{item.label}</p>
              <p className={`font-semibold truncate ${item.textColor}`}>{item.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
