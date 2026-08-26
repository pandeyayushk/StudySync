'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updateProfile } from '@/actions/profile'
import { profileSchema } from '@/validations/profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, User } from 'lucide-react'

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileFormProps {
  defaultValues?: Partial<ProfileFormValues>
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: defaultValues?.fullName || ''
    }
  })

  const onSubmit = async (data: ProfileFormValues) => {
    setIsPending(true)
    try {
      const result = await updateProfile(data)
      
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error updating profile",
          description: result.error
        })
      } else {
        toast({
          title: "Profile updated!",
          description: "Your personal information has been saved."
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
          <User className="w-5 h-5 text-blue-500" />
          Profile Settings
        </CardTitle>
        <CardDescription>
          Manage your personal information and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                placeholder="Jane Doe"
                {...register("fullName")} 
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 font-medium">{errors.fullName.message}</p>
              )}
            </div>
            
            {/* Email is typically read-only or handled separately with Auth, so omitted or can be added as disabled */}
          </div>
          
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
