import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-slate-800/80 rounded-2xl bg-[#0c1229]/60 backdrop-blur-sm">
      <div className="w-16 h-16 bg-slate-900/90 rounded-2xl flex items-center justify-center mb-4 shadow-lg border border-slate-700/60 ring-4 ring-[#2f39a9]/20">
        <Icon className="w-8 h-8 text-[#15d8b3]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">{description}</p>
      
      {action && (
        <Button asChild className="bg-gradient-to-r from-[#2f39a9] via-[#2e6fa0] to-[#15d8b3] text-white hover:opacity-90 shadow-md shadow-[#2f39a9]/30 font-semibold px-6">
          <Link href={action.href}>
            {action.label}
          </Link>
        </Button>
      )}
    </div>
  )
}
