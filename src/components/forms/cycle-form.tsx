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
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Activity className="w-5 h-5 text-rose-500" />
          Cycle Settings
        </CardTitle>
        <CardDescription>
          Enter your basic cycle information to personalize your study plans.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lastPeriodDate">First day of last period</Label>
              <Input 
                id="lastPeriodDate" 
                type="date" 
                {...register("lastPeriodDate")} 
                className={errors.lastPeriodDate ? "border-red-500" : ""}
              />
              {errors.lastPeriodDate && (
                <p className="text-sm text-red-500 font-medium">{errors.lastPeriodDate.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="averageCycleLength">Average cycle length (days)</Label>
              <Input 
                id="averageCycleLength" 
                type="number" 
                min={21} 
                max={45} 
                {...register("averageCycleLength", { valueAsNumber: true })} 
                className={errors.averageCycleLength ? "border-red-500" : ""}
              />
              <p className="text-xs text-slate-500">Typically between 21 and 35 days.</p>
              {errors.averageCycleLength && (
                <p className="text-sm text-red-500 font-medium">{errors.averageCycleLength.message}</p>
              )}
            </div>
          </div>
          
          <Button type="submit" disabled={isPending} className="w-full bg-violet-600 hover:bg-violet-700">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
