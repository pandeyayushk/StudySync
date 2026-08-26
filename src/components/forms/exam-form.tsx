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
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="w-5 h-5 text-amber-500" />
          Add New Exam
        </CardTitle>
        <CardDescription>
          Keep track of important dates so we can optimize your study intensity.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject / Course</Label>
            <Input 
              id="subject" 
              placeholder="e.g. Biology 101 Midterm"
              {...register("subject")} 
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && (
              <p className="text-sm text-red-500 font-medium">{errors.subject.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="examDate">Exam Date</Label>
              <Input 
                id="examDate" 
                type="date" 
                {...register("examDate")} 
                className={errors.examDate ? "border-red-500" : ""}
              />
              {errors.examDate && (
                <p className="text-sm text-red-500 font-medium">{errors.examDate.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select 
                id="priority" 
                {...register("priority")}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="low">Low (Quiz, Minor test)</option>
                <option value="medium">Medium (Midterm, Paper)</option>
                <option value="high">High (Final, Major Exam)</option>
              </select>
              {errors.priority && (
                <p className="text-sm text-red-500 font-medium">{errors.priority.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea 
              id="notes" 
              placeholder="Topics to cover, format, etc."
              className="resize-none"
              rows={3}
              {...register("notes")} 
            />
          </div>
          
          <Button type="submit" disabled={isPending} className="w-full bg-violet-600 hover:bg-violet-700">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            Add Exam
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
