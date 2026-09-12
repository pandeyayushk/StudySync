'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addExam } from '@/actions/exams'
import { examSchema } from '@/validations/exam'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Plus, Calendar } from 'lucide-react'

type ExamFormValues = z.infer<typeof examSchema>

interface ExamFormProps {
  onSuccess?: () => void
}

export function ExamForm({ onSuccess }: ExamFormProps) {
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ExamFormValues>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      priority: 'medium'
    }
  })

  const onSubmit = async (data: ExamFormValues) => {
    setIsPending(true)
    try {
      const result = await addExam(data)
      
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error adding exam",
          description: result.error
        })
      } else {
        toast({
          title: "Exam added!",
          description: `${data.subject} has been added to your schedule.`
        })
        reset()
        if (onSuccess) onSuccess()
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
    <Card className="bg-[#0c1229]/90 border-slate-800 text-slate-100 shadow-xl shadow-black/20 backdrop-blur-sm">
      <CardHeader className="bg-slate-900/40 border-b border-slate-800/80">
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Calendar className="w-5 h-5 text-[#15d8b3]" />
          Add New Exam
        </CardTitle>
        <CardDescription className="text-slate-400">
          Keep track of important dates so we can optimize your study intensity.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-slate-200">Subject / Course</Label>
            <Input 
              id="subject" 
              placeholder="e.g. Biology 101 Midterm"
              {...register("subject")} 
              className={`bg-slate-950/60 border-slate-700/80 text-white placeholder:text-slate-500 focus-visible:ring-[#15d8b3] ${errors.subject ? "border-red-500" : ""}`}
            />
            {errors.subject && (
              <p className="text-sm text-red-400 font-medium">{errors.subject.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="examDate" className="text-slate-200">Exam Date</Label>
              <Input 
                id="examDate" 
                type="date" 
                {...register("examDate")} 
                className={`bg-slate-950/60 border-slate-700/80 text-white focus-visible:ring-[#15d8b3] ${errors.examDate ? "border-red-500" : ""}`}
              />
              {errors.examDate && (
                <p className="text-sm text-red-400 font-medium">{errors.examDate.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-slate-200">Priority</Label>
              <select 
                id="priority" 
                {...register("priority")}
                className="flex h-10 w-full rounded-md border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15d8b3] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="low" className="bg-[#0c1229] text-white">Low (Quiz, Minor test)</option>
                <option value="medium" className="bg-[#0c1229] text-white">Medium (Midterm, Paper)</option>
                <option value="high" className="bg-[#0c1229] text-white">High (Final, Major Exam)</option>
              </select>
              {errors.priority && (
                <p className="text-sm text-red-400 font-medium">{errors.priority.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-200">Notes (Optional)</Label>
            <Textarea 
              id="notes" 
              placeholder="Topics to cover, format, etc."
              className="resize-none bg-slate-950/60 border-slate-700/80 text-white placeholder:text-slate-500 focus-visible:ring-[#15d8b3]"
              rows={3}
              {...register("notes")} 
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isPending} 
            className="w-full bg-gradient-to-r from-[#2f39a9] via-[#2e6fa0] to-[#15d8b3] text-white hover:opacity-90 shadow-md shadow-[#2f39a9]/30 transition-all font-semibold"
          >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            Add Exam
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
