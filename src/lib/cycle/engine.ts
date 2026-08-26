import { CyclePhase, PhaseInfo } from '@/types'
import { differenceInDays, startOfDay } from 'date-fns'

export function calculateCycleDay(lastPeriodDate: Date, currentDate: Date, cycleLength: number): number {
  const diffDays = differenceInDays(startOfDay(currentDate), startOfDay(lastPeriodDate))
  if (diffDays === 0) return 1
  const dayInCycle = (diffDays % cycleLength) + 1
  return dayInCycle > 0 ? dayInCycle : 1
}

export function getCyclePhase(cycleDay: number, cycleLength: number): CyclePhase {
  const scale = cycleLength / 28

  const menstruationEnd = Math.round(5 * scale)
  const follicularEnd = Math.round(14 * scale)
  const ovulationEnd = Math.round(16 * scale)

  if (cycleDay <= menstruationEnd) return 'menstruation'
  if (cycleDay <= follicularEnd) return 'follicular'
  if (cycleDay <= ovulationEnd) return 'ovulation'
  return 'luteal'
}

export function getPhaseInfo(phase: CyclePhase): PhaseInfo {
  switch (phase) {
    case 'menstruation':
      return {
        phase: 'menstruation',
        label: 'Menstruation',
        color: 'text-rose-600',
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-200',
        emoji: '🌙',
        description: 'Rest & gentle review phase',
        focusDuration: 20,
        breakDuration: 5,
        studyTips: [
          'Light revision and review',
          'Watch lecture recordings',
          'Organize notes',
          'Low-pressure reading'
        ]
      }
    case 'follicular':
      return {
        phase: 'follicular',
        label: 'Follicular',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        emoji: '🌱',
        description: 'Peak learning & new concepts',
        focusDuration: 50,
        breakDuration: 10,
        studyTips: [
          'Tackle new concepts',
          'Problem-solving practice',
          'Start challenging topics',
          'Active learning exercises'
        ]
      }
    case 'ovulation':
      return {
        phase: 'ovulation',
        label: 'Ovulation',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        emoji: '☀️',
        description: 'High focus & performance',
        focusDuration: 50,
        breakDuration: 10,
        studyTips: [
          'Mock tests and practice exams',
          'Group study sessions',
          'Presentations and teaching',
          'High-focus deep work'
        ]
      }
    case 'luteal':
      return {
        phase: 'luteal',
        label: 'Luteal',
        color: 'text-sky-600',
        bgColor: 'bg-sky-50',
        borderColor: 'border-sky-200',
        emoji: '🌊',
        description: 'Consolidation & revision',
        focusDuration: 25,
        breakDuration: 5,
        studyTips: [
          'Revision and flashcards',
          'Memorization practice',
          'Summarize and consolidate',
          'Creative projects'
        ]
      }
  }
}

export function getDaysUntilNextPhase(cycleDay: number, cycleLength: number): number {
  const scale = cycleLength / 28

  const menstruationEnd = Math.round(5 * scale)
  const follicularEnd = Math.round(14 * scale)
  const ovulationEnd = Math.round(16 * scale)

  if (cycleDay <= menstruationEnd) return menstruationEnd - cycleDay + 1
  if (cycleDay <= follicularEnd) return follicularEnd - cycleDay + 1
  if (cycleDay <= ovulationEnd) return ovulationEnd - cycleDay + 1
  return cycleLength - cycleDay + 1
}

export function getPhaseProgress(cycleDay: number, cycleLength: number): number {
  const scale = cycleLength / 28
  let start = 1
  let end = cycleLength

  const menstruationEnd = Math.round(5 * scale)
  const follicularEnd = Math.round(14 * scale)
  const ovulationEnd = Math.round(16 * scale)

  if (cycleDay <= menstruationEnd) {
    start = 1
    end = menstruationEnd
  } else if (cycleDay <= follicularEnd) {
    start = menstruationEnd + 1
    end = follicularEnd
  } else if (cycleDay <= ovulationEnd) {
    start = follicularEnd + 1
    end = ovulationEnd
  } else {
    start = ovulationEnd + 1
    end = cycleLength
  }

  const phaseLength = end - start + 1
  const daysInPhase = cycleDay - start + 1
  const progress = (daysInPhase / phaseLength) * 100
  
  return Math.min(Math.max(progress, 0), 100)
}
