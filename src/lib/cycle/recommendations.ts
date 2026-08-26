import { CyclePhase } from '@/types'

export function getStudyRecommendations(phase: CyclePhase): { tasks: string[], methods: string[], tips: string[] } {
  switch (phase) {
    case 'menstruation':
      return {
        tasks: ['Review previous notes', 'Watch video lectures', 'Light reading'],
        methods: ['Passive review', 'Visual learning', 'Spaced repetition'],
        tips: ['Keep sessions short', 'Stay hydrated', 'Be gentle with yourself']
      }
    case 'follicular':
      return {
        tasks: ['Learn new topics', 'Solve practice problems', 'Start difficult chapters'],
        methods: ['Active recall', 'Problem-based learning', 'Feynman technique'],
        tips: ['This is your peak learning time', 'Challenge yourself with harder material', 'Take on complex projects']
      }
    case 'ovulation':
      return {
        tasks: ['Take mock exams', 'Do group study', 'Practice presentations'],
        methods: ['Test-based learning', 'Peer teaching', 'Timed practice'],
        tips: ['Leverage your high energy', 'Great time for verbal tasks', 'Schedule important deadlines now']
      }
    case 'luteal':
      return {
        tasks: ['Review and consolidate', 'Make flashcards', 'Summarize chapters'],
        methods: ['Spaced repetition', 'Mind mapping', 'Summary writing'],
        tips: ['Focus on what you already know', 'Organize and structure notes', 'Prepare materials for next cycle']
      }
  }
}

export function getMotivationalNote(phase: CyclePhase): string {
  const notes: Record<CyclePhase, string[]> = {
    menstruation: [
      "Listen to your body. Light, steady progress is still progress.",
      "Take it easy today. Focus on gentle review.",
      "Rest is productive. Your brain needs time to process information.",
      "Don't push too hard today. Consistency over intensity."
    ],
    follicular: [
      "Your brain is primed for learning! Tackle that hard subject.",
      "Great energy today. Dive into new, complex concepts.",
      "You've got the mental clarity to figure out anything today.",
      "Channel this fresh energy into challenging problems."
    ],
    ovulation: [
      "You are at your sharpest right now. Test your limits!",
      "Perfect day to collaborate and teach others.",
      "High energy, high focus. Make these study hours count.",
      "You can handle intense practice sessions today. Go for it!"
    ],
    luteal: [
      "Focus on consolidating what you know. You've learned a lot.",
      "Wrap up loose ends and organize your notes.",
      "Steady effort wins the race. Keep reviewing.",
      "Trust your preparation. Refine and memorize."
    ]
  }

  const phaseNotes = notes[phase]
  const randomIndex = Math.floor(Math.random() * phaseNotes.length)
  return phaseNotes[randomIndex]
}
