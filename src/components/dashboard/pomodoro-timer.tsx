'use client'

import { useState, useEffect } from 'react'
import { PhaseInfo } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, SkipForward, Coffee, Brain } from 'lucide-react'

import { logTimerSession } from '@/actions/timer'

interface PomodoroTimerProps {
  focusDuration: number
  breakDuration: number
  phaseInfo: PhaseInfo
}

export function PomodoroTimer({ focusDuration, breakDuration, phaseInfo }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)

  useEffect(() => {
    // Reset timer when duration props change
    setTimeLeft((isBreak ? breakDuration : focusDuration) * 60)
    setIsRunning(false)
  }, [focusDuration, breakDuration, isBreak])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (isRunning && timeLeft === 0) {
      // Auto switch phase when timer hits 0
      if (!isBreak) {
        setIsBreak(true)
        setTimeLeft(breakDuration * 60)
        // Log completed focus session to Supabase
        logTimerSession({
          durationMinutes: focusDuration,
          breakMinutes: breakDuration,
          completed: true,
          cyclePhase: phaseInfo.phase,
        }).catch((err) => console.warn('Could not log timer session', err))
      } else {
        setIsBreak(false)
        setTimeLeft(focusDuration * 60)
        setSessionsCompleted(prev => prev + 1)
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isBreak, focusDuration, breakDuration, phaseInfo.phase])

  const toggleTimer = () => setIsRunning(!isRunning)
  
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft((isBreak ? breakDuration : focusDuration) * 60)
  }
  
  const skipSession = () => {
    setIsRunning(false)
    if (!isBreak) {
      setIsBreak(true)
      setTimeLeft(breakDuration * 60)
    } else {
      setIsBreak(false)
      setTimeLeft(focusDuration * 60)
      setSessionsCompleted(prev => prev + 1)
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Explicit mapping for reliable Tailwind JIT compilation
  const phaseButtonClasses: Record<string, string> = {
    menstruation: 'bg-rose-600 hover:bg-rose-700 text-white',
    follicular: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    ovulation: 'bg-amber-600 hover:bg-amber-700 text-white',
    luteal: 'bg-sky-600 hover:bg-sky-700 text-white',
  }

  const buttonClass = isBreak
    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
    : phaseButtonClasses[phaseInfo.phase] || 'bg-violet-600 hover:bg-violet-700 text-white'

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardContent className={`p-8 flex flex-col items-center justify-center transition-colors duration-500 ${isBreak ? 'bg-emerald-50/50' : 'bg-slate-50/50'}`}>
        <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
          {isBreak ? (
            <Coffee className="w-4 h-4 text-emerald-500" />
          ) : (
            <Brain className={`w-4 h-4 ${phaseInfo.color}`} />
          )}
          <span className="text-sm font-medium text-slate-700">
            {isBreak ? 'Break Time' : 'Focus Time'}
          </span>
        </div>

        <div className={`text-6xl sm:text-7xl font-bold font-mono tabular-nums mb-8 tracking-tighter ${isBreak ? 'text-emerald-700' : 'text-slate-800'}`}>
          {formatTime(timeLeft)}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-12 h-12 rounded-full border-slate-300 text-slate-600 hover:bg-slate-100"
            onClick={resetTimer}
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          
          <Button 
            size="icon" 
            className={`w-16 h-16 rounded-full shadow-md ${buttonClass}`}
            onClick={toggleTimer}
          >
            {isRunning ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7 ml-1" />
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="w-12 h-12 rounded-full border-slate-300 text-slate-600 hover:bg-slate-100"
            onClick={skipSession}
            title="Skip"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-sm text-slate-500 font-medium">
          Sessions completed today: <span className="text-slate-800 font-bold">{sessionsCompleted}</span>
        </p>
      </CardContent>
    </Card>
  )
}
