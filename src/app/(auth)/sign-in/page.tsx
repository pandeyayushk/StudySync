import { Metadata } from 'next'
import { SignInForm } from '@/components/forms/sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In — StudySync',
}

export default function SignInPage() {
  return <SignInForm mode="sign-in" />
}
