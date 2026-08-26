import { Brain, Calendar, Timer, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function Features() {
  const features = [
    {
      title: "Cycle-Aware Planning",
      description: "Study plans that adapt to your cognitive strengths throughout the month.",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-rose-100 text-rose-600"
    },
    {
      title: "Exam Optimizer",
      description: "Align your study intensity with upcoming exams and your natural energy levels.",
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "Adaptive Pomodoro",
      description: "Focus and break durations that match your current phase for maximum productivity.",
      icon: <Timer className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Smart Recommendations",
      description: "Daily study tasks, methods, and motivational support tailored just for you.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-sky-100 text-sky-600"
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Everything you need to study effectively
          </h2>
          <p className="text-lg text-slate-600">
            StudySync uses science-backed techniques combined with cycle-awareness to help you reach your full potential without burning out.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <Card key={idx} className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-xl">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-full mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
