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

  // Consistent brand palette button styling
  const buttonClass = isBreak
    ? 'bg-[#15d8b3] hover:bg-[#12be9d] text-[#070b19] font-bold shadow-lg shadow-[#15d8b3]/25'
    : 'bg-gradient-to-r from-[#2f39a9] to-[#2e6fa0] hover:opacity-90 text-white shadow-lg shadow-[#2f39a9]/30'

  return (
    <Card className="border-slate-800 bg-[#0c1222]/90 backdrop-blur shadow-xl overflow-hidden">
      <CardContent className={`p-8 flex flex-col items-center justify-center transition-colors duration-500 ${isBreak ? 'bg-[#15d8b3]/5' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner">
          {isBreak ? (
            <Coffee className="w-4 h-4 text-[#15d8b3]" />
          ) : (
            <Brain className={`w-4 h-4 ${phaseInfo.color}`} />
          )}
          <span className="text-sm font-medium text-slate-200">
            {isBreak ? 'Break Time' : 'Focus Time'}
          </span>
        </div>

        <div className={`text-6xl sm:text-7xl font-bold font-mono tabular-nums mb-8 tracking-tighter ${isBreak ? 'text-[#15d8b3]' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-12 h-12 rounded-full border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
            onClick={resetTimer}
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          
          <Button 
            size="icon" 
            className={`w-16 h-16 rounded-full ${buttonClass}`}
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
            className="w-12 h-12 rounded-full border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
            onClick={skipSession}
            title="Skip"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-sm text-slate-400 font-medium">
          Sessions completed today: <span className="text-[#15d8b3] font-bold">{sessionsCompleted}</span>
        </p>
      </CardContent>
    </Card>
  )
}
