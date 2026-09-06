import { PhaseInfo } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarDays, Clock, Activity } from 'lucide-react'

interface DailySummaryProps {
  phaseInfo: PhaseInfo
  cycleDay: number
  examCount: number
  planGenerated: boolean
}

export function DailySummary({ phaseInfo, cycleDay, examCount }: DailySummaryProps) {
  const items = [
    {
      label: "Current Phase",
      value: phaseInfo.label,
      icon: <span className="text-xl leading-none">{phaseInfo.emoji}</span>,
      color: "bg-[#15d8b3]/15",
      textColor: phaseInfo.color
    },
    {
      label: "Cycle Day",
      value: `Day ${cycleDay}`,
      icon: <Activity className="w-5 h-5 text-[#49a4bb]" />,
      color: "bg-[#49a4bb]/15",
      textColor: "text-[#49a4bb]"
    },
    {
      label: "Upcoming Exams",
      value: examCount.toString(),
      icon: <CalendarDays className="w-5 h-5 text-[#28c4b6]" />,
      color: "bg-[#28c4b6]/15",
      textColor: "text-[#28c4b6]"
    },
    {
      label: "Focus Block",
      value: `${phaseInfo.focusDuration} min`,
      icon: <Clock className="w-5 h-5 text-[#15d8b3]" />,
      color: "bg-[#15d8b3]/15",
      textColor: "text-[#15d8b3]"
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <Card key={idx} className="border-slate-800 bg-[#0c1222]/90 backdrop-blur shadow-xl overflow-hidden">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
              {item.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-400 mb-0.5 truncate">{item.label}</p>
              <p className={`font-bold truncate text-base ${item.textColor}`}>{item.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
