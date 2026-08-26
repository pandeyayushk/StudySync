import { PhaseInfo } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface PhaseIndicatorProps {
  phaseInfo: PhaseInfo
  cycleDay: number
  cycleLength: number
  daysUntilNextPhase: number
}

export function PhaseIndicator({ phaseInfo, cycleDay, cycleLength, daysUntilNextPhase }: PhaseIndicatorProps) {
  // Rough estimate for progress bar
  const progressPercentage = Math.min(100, Math.max(0, (cycleDay / cycleLength) * 100))

  return (
    <Card className={`overflow-hidden border-0 shadow-sm ${phaseInfo.bgColor} ${phaseInfo.borderColor} border`}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl" role="img" aria-label={phaseInfo.phase}>
                {phaseInfo.emoji}
              </span>
              <h2 className={`text-2xl font-bold ${phaseInfo.color}`}>
                {phaseInfo.label}
              </h2>
            </div>
            <p className="text-slate-700 font-medium">Day {cycleDay} of your cycle</p>
          </div>
          <Badge variant="outline" className={`bg-white/50 border-0 shadow-sm text-sm py-1 px-3 ${phaseInfo.color}`}>
            {daysUntilNextPhase} days until next phase
          </Badge>
        </div>

        <div className="space-y-4">
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            {phaseInfo.description}
          </p>
          
          <div className="pt-2">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
              <span>Cycle Start</span>
              <span>Next Phase</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className={`h-2 bg-white/60`} 
              indicatorClassName={`${phaseInfo.color.replace('text-', 'bg-')}`} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
