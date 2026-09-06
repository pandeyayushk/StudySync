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
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 ring-1 ring-slate-100">
      <CardHeader className="space-y-2 text-center pb-8 pt-10">
        <CardTitle className="text-3xl font-bold tracking-tight text-[#1e2474]">
          {isSignUp ? "Create an account" : "Welcome back"}
        </CardTitle>
        <CardDescription className="text-base text-slate-500">
          {isSignUp 
            ? "Enter your details below to create your account" 
            : "Enter your email and password to sign in to your account"
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form action={handleSubmit} className="space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100 flex items-center gap-2">
              <span className="shrink-0 rounded-full bg-red-100 p-1">
                <Lock className="w-3 h-3 text-red-600" />
              </span>
              {errorMsg}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="m@example.com" 
                required 
                className="pl-10 h-11 focus-visible:ring-[#2f39a9]"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {!isSignUp && (
                <Link href="#" className="text-sm font-medium text-[#2e6fa0] hover:text-[#2f39a9]">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input 
                id="password" 
                name="password"
                type={showPassword ? "text" : "password"} 
                required 
                className="pl-10 pr-10 h-11 focus-visible:ring-[#2f39a9]"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"} 
                  required 
                  className="pl-10 h-11 focus-visible:ring-[#2f39a9]"
                />
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-11 bg-gradient-to-r from-[#2f39a9] via-[#2e6fa0] to-[#15d8b3] hover:opacity-95 text-white font-medium text-base mt-2 shadow-md shadow-[#2f39a9]/20 transition-all hover:shadow-lg" 
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-center border-t border-slate-100 pt-6 pb-8">
        <p className="text-sm text-slate-600">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link 
            href={isSignUp ? "/sign-in" : "/sign-up"} 
            className="font-semibold text-[#2f39a9] hover:text-[#2e6fa0] transition-colors"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
