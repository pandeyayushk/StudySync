import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      title: "Set Up",
      description: "Enter your cycle info and exam dates. We only need the basics — no detailed tracking required.",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "bg-violet-100 text-violet-600 border-violet-200"
    },
    {
      title: "Get Your Plan",
      description: "Receive a personalized daily study plan optimized for your current phase.",
      icon: <ArrowRight className="w-6 h-6" />,
      color: "bg-fuchsia-100 text-fuchsia-600 border-fuchsia-200"
    },
    {
      title: "Study Smarter",
      description: "Follow adaptive Pomodoro sessions and watch your productivity soar.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600 border-purple-200"
    }
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">How it works</h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block z-0" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-white border-2 shadow-sm ${step.color}`}>
                  {step.icon}
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full w-full max-w-sm">
                  <div className="text-sm font-semibold text-slate-400 mb-2">STEP {idx + 1}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
