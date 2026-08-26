import { CyclePhase, StudyPlan, StudyTask, Exam } from '@/types'
import { getPhaseInfo } from '@/lib/cycle/engine'
import { getStudyRecommendations, getMotivationalNote } from '@/lib/cycle/recommendations'
import { differenceInDays, startOfDay } from 'date-fns'

export function generateStudyPlan(phase: CyclePhase, cycleDay: number, exams: Exam[]): StudyPlan {
  const phaseInfo = getPhaseInfo(phase)
  const recommendations = getStudyRecommendations(phase)
  
  // Sort exams by closest date first, then by priority
  const today = startOfDay(new Date())
  
  const sortedExams = [...exams].sort((a, b) => {
    const daysA = differenceInDays(startOfDay(new Date(a.exam_date)), today)
    const daysB = differenceInDays(startOfDay(new Date(b.exam_date)), today)
    
    if (daysA !== daysB) return daysA - daysB
    
    const priorityWeight = { high: 3, medium: 2, low: 1 }
    return priorityWeight[b.priority] - priorityWeight[a.priority]
  })

  const tasks: StudyTask[] = []

  // Assign up to 3 exam-specific tasks if we have exams
  for (let i = 0; i < Math.min(sortedExams.length, 3); i++) {
    const exam = sortedExams[i]
    const daysUntilExam = differenceInDays(startOfDay(new Date(exam.exam_date)), today)
    let taskDescription = ''

    if (phase === 'menstruation' && daysUntilExam <= 3) {
      taskDescription = `Review key formulas for ${exam.subject}`
    } else if (phase === 'follicular' && daysUntilExam >= 7) {
      taskDescription = `Deep dive into ${exam.subject} complex topics`
    } else if (phase === 'ovulation' && daysUntilExam > 3 && daysUntilExam <= 7) {
      taskDescription = `Take a mock test for ${exam.subject}`
    } else if (phase === 'luteal') {
      taskDescription = `Create flashcards for ${exam.subject}`
    } else {
      taskDescription = `Review notes for ${exam.subject}`
    }

    tasks.push({
      subject: exam.subject,
      task: taskDescription,
      priority: exam.priority,
      estimatedMinutes: phaseInfo.focusDuration
    })
  }

  // Fill remaining task slots up to 4 total tasks with generic phase recommendations
  let recIndex = 0
  while (tasks.length < 4 && recIndex < recommendations.tasks.length) {
    tasks.push({
      subject: 'General',
      task: recommendations.tasks[recIndex],
      priority: 'medium',
      estimatedMinutes: phaseInfo.focusDuration
    })
    recIndex++
  }

  // Ensure there's always an organizational task
  tasks.push({
    subject: 'Planning',
    task: 'Organize study materials & schedule',
    priority: 'low',
    estimatedMinutes: 15
  })

  const studyMethod = recommendations.methods[Math.floor(Math.random() * recommendations.methods.length)]
  const motivationNote = getMotivationalNote(phase)

  return {
    planDate: new Date().toISOString(),
    cyclePhase: phase,
    cycleDay: cycleDay,
    tasks: tasks,
    studyMethod: studyMethod,
    focusDuration: phaseInfo.focusDuration,
    breakDuration: phaseInfo.breakDuration,
    motivationNote: motivationNote
  }
}
