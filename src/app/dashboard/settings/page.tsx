import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from '@/components/forms/profile-form'

export const metadata: Metadata = {
  title: 'Settings — StudySync',
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/sign-in')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500">Manage your profile and account preferences</p>
      </div>

      <ProfileForm 
        defaultValues={profile ? {
          fullName: profile.full_name || ''
        } : undefined}
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="text-sm font-medium text-slate-900 mb-2">Email Address</h3>
        <p className="text-sm text-slate-500 bg-slate-50 p-2.5 rounded-md border border-slate-200 w-fit">
          {user.email}
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Member since {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="bg-red-50 p-6 rounded-xl border border-red-100">
        <h2 className="text-lg font-semibold text-red-900 mb-2">Danger Zone</h2>
        <p className="text-sm text-red-700 mb-4">
          Need to delete your account or wipe your data? You can manage your account directly via Supabase Auth.
        </p>
        <button 
          className="text-sm font-medium text-red-600 border border-red-200 bg-white px-4 py-2 rounded-md opacity-60 cursor-not-allowed"
          disabled
        >
          Delete Account (Contact Support)
        </button>
      </div>
    </div>
  )
}
