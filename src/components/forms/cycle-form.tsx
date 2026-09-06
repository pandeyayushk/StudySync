'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { saveCycleSettings } from '@/actions/cycle'
import { cycleSettingsSchema } from '@/validations/cycle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Activity } from 'lucide-react'

type CycleFormValues = z.infer<typeof cycleSettingsSchema>

interface CycleFormProps {
  defaultValues?: Partial<CycleFormValues>
}

export function CycleForm({ defaultValues }: CycleFormProps) {
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()
  
  const { register, handleSubmit, formState: { errors } } = useForm<CycleFormValues>({
    resolver: zodResolver(cycleSettingsSchema),
    defaultValues: {
      averageCycleLength: 28,
      ...defaultValues
    }
  })

  const onSubmit = async (data: CycleFormValues) => {
    setIsPending(true)
    try {
      const result = await saveCycleSettings(data)
      
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error saving settings",
          description: result.error
        })
      } else {
        toast({
          title: "Settings saved!",
          description: "Your cycle information has been updated."
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later."
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="border-slate-800 bg-[#0c1222]/90 backdrop-blur shadow-xl">
      <CardHeader className="bg-slate-900/40 border-b border-slate-800/80">
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Activity className="w-5 h-5 text-[#15d8b3]" />
          Cycle Settings
        </CardTitle>
        <CardDescription className="text-slate-400">
          Enter your basic cycle information to personalize your study plans.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lastPeriodDate" className="text-slate-200">First day of last period</Label>
              <Input 
                id="lastPeriodDate" 
                type="date" 
                {...register("lastPeriodDate")} 
                className={`bg-slate-900/60 border-slate-800 text-white focus-visible:ring-[#15d8b3] ${errors.lastPeriodDate ? "border-red-500" : ""}`}
              />
              {errors.lastPeriodDate && (
                <p className="text-sm text-red-400 font-medium">{errors.lastPeriodDate.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="averageCycleLength" className="text-slate-200">Average cycle length (days)</Label>
              <Input 
                id="averageCycleLength" 
                type="number" 
                min={21} 
                max={45} 
                {...register("averageCycleLength", { valueAsNumber: true })} 
                className={`bg-slate-900/60 border-slate-800 text-white focus-visible:ring-[#15d8b3] ${errors.averageCycleLength ? "border-red-500" : ""}`}
              />
              <p className="text-xs text-slate-400">Typically between 21 and 35 days.</p>
              {errors.averageCycleLength && (
                <p className="text-sm text-red-400 font-medium">{errors.averageCycleLength.message}</p>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isPending} 
            className="w-full bg-gradient-to-r from-[#2f39a9] via-[#2e6fa0] to-[#15d8b3] hover:opacity-90 text-white shadow-lg shadow-[#2f39a9]/25 font-semibold text-base h-11"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
