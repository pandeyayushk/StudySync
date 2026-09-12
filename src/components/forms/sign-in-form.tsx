'use client'

import { useState } from 'react'
import { signIn, signUp } from '@/actions/auth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface SignInFormProps {
  mode: 'sign-in' | 'sign-up'
}

export function SignInForm({ mode }: SignInFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const isSignUp = mode === 'sign-up'
  
  const action = isSignUp ? signUp : signIn

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    setErrorMsg(null)
    
    try {
      const res = await action(formData)
      if (res?.error) {
        setErrorMsg(res.error)
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border border-slate-800/80 bg-[#0c1229]/90 backdrop-blur-md text-slate-100">
      <CardHeader className="space-y-2 text-center pb-8 pt-10">
        <div className="flex justify-center mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2f39a9] via-[#2e6fa0] to-[#15d8b3] text-white shadow-md shadow-[#2f39a9]/30">
            <span className="font-extrabold text-sm">SS</span>
          </div>
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight text-white">
          {isSignUp ? "Create an account" : "Welcome back"}
        </CardTitle>
        <CardDescription className="text-base text-slate-400">
          {isSignUp 
            ? "Enter your details below to create your account" 
            : "Enter your email and password to sign in to your account"
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form action={handleSubmit} className="space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-950/40 text-red-300 text-sm font-medium rounded-lg border border-red-800/50 flex items-center gap-2">
              <span className="shrink-0 rounded-full bg-red-900/50 p-1">
                <Lock className="w-3 h-3 text-red-300" />
              </span>
              {errorMsg}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="m@example.com" 
                required 
                className="pl-10 h-11 bg-slate-950/60 border-slate-700/80 text-white placeholder:text-slate-500 focus-visible:ring-[#15d8b3]"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              {!isSignUp && (
                <Link href="#" className="text-sm font-medium text-[#15d8b3] hover:underline">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <Input 
                id="password" 
                name="password"
                type={showPassword ? "text" : "password"} 
                required 
                className="pl-10 pr-10 h-11 bg-slate-950/60 border-slate-700/80 text-white placeholder:text-slate-500 focus-visible:ring-[#15d8b3]"
              />
              <button
                type="button"
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"} 
                  required 
                  className="pl-10 h-11 bg-slate-950/60 border-slate-700/80 text-white placeholder:text-slate-500 focus-visible:ring-[#15d8b3]"
                />
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-11 bg-gradient-to-r from-[#2f39a9] via-[#2e6fa0] to-[#15d8b3] hover:opacity-90 text-white font-semibold text-base mt-2 shadow-lg shadow-[#2f39a9]/30 transition-all" 
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-center border-t border-slate-800/80 pt-6 pb-8">
        <p className="text-sm text-slate-400">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link 
            href={isSignUp ? "/sign-in" : "/sign-up"} 
            className="font-semibold text-[#15d8b3] hover:text-[#49a4bb] transition-colors"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
