import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      title: "Set Up",
      description: "Enter your cycle info and exam dates. We only need the basics — no detailed tracking required.",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "bg-[#2f39a9]/30 text-[#15d8b3] border-[#15d8b3]/40 shadow-lg shadow-[#2f39a9]/20"
    },
    {
      title: "Get Your Plan",
      description: "Receive a personalized daily study plan optimized for your current phase.",
      icon: <ArrowRight className="w-6 h-6" />,
      color: "bg-[#2e6fa0]/30 text-[#49a4bb] border-[#49a4bb]/40 shadow-lg shadow-[#2e6fa0]/20"
    },
    {
      title: "Study Smarter",
      description: "Follow adaptive Pomodoro sessions and watch your productivity soar.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-[#15d8b3]/20 text-[#15d8b3] border-[#15d8b3]/40 shadow-lg shadow-[#15d8b3]/20"
    }
  ]

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">How it works</h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800/80 -translate-y-1/2 hidden md:block z-0" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[#0c1229] border-2 ${step.color}`}>
                  {step.icon}
                </div>
                <div className="bg-[#0c1229]/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-800/80 h-full w-full max-w-sm">
                  <div className="text-xs font-bold text-[#15d8b3] mb-2 tracking-wider">STEP {idx + 1}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
