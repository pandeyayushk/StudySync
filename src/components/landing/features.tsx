import { Brain, Calendar, Timer, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function Features() {
  const features = [
    {
      title: "Cycle-Aware Planning",
      description: "Study plans that adapt to your cognitive strengths throughout the month.",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-[#2f39a9]/30 text-[#15d8b3] border border-[#15d8b3]/30"
    },
    {
      title: "Exam Optimizer",
      description: "Align your study intensity with upcoming exams and your natural energy levels.",
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-[#2e6fa0]/30 text-[#49a4bb] border border-[#49a4bb]/30"
    },
    {
      title: "Adaptive Pomodoro",
      description: "Focus and break durations that match your current phase for maximum productivity.",
      icon: <Timer className="w-6 h-6" />,
      color: "bg-[#15d8b3]/20 text-[#15d8b3] border border-[#15d8b3]/30"
    },
    {
      title: "Smart Recommendations",
      description: "Daily study tasks, methods, and motivational support tailored just for you.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-[#2f39a9]/30 text-indigo-300 border border-indigo-500/30"
    }
  ]

  return (
    <section id="features" className="py-20 bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Everything you need to study effectively
          </h2>
          <p className="text-lg text-slate-400">
            StudySync uses science-backed techniques combined with cycle-awareness to help you reach your full potential without burning out.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <Card key={idx} className="bg-[#0c1229]/80 border border-slate-800/80 shadow-xl shadow-black/20 hover:border-slate-700/80 transition-all rounded-2xl backdrop-blur-sm">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-xl mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
