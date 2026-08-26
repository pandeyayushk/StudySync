'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StudyPlan } from '@/types'
import { StudyPlanCard } from '@/components/dashboard/study-plan-card'
import { generateAndSavePlan } from '@/actions/plans'
import { useToast } from '@/components/ui/use-toast'

export default function DashboardClient({ initialPlan }: { initialPlan: StudyPlan | null }) {
  const [plan, setPlan] = useState<StudyPlan | null>(initialPlan)
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const result = await generateAndSavePlan()
      
      if ('error' in result) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        })
      } else {
        setPlan(result as StudyPlan)
        toast({
          title: 'Success',
          description: 'Your study plan has been generated!',
        })
        router.refresh()
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate plan',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <StudyPlanCard
      plan={plan}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
    />
  )
}
