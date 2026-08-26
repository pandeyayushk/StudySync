import { Metadata } from 'next'
import { SignInForm } from '@/components/forms/sign-in-form'

export const metadata: Metadata = {
  title: 'Sign Up — StudySync',
}

export default function SignUpPage() {
  return <SignInForm mode="sign-up" />
}
