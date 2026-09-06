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
        <h1 className="text-3xl font-bold tracking-tight text-white">Account Settings</h1>
        <p className="text-slate-400 mt-1">Manage your profile and account preferences</p>
      </div>

      <ProfileForm 
        defaultValues={profile ? {
          fullName: profile.full_name || ''
        } : undefined}
      />

      <div className="bg-[#0c1222]/90 backdrop-blur p-6 rounded-xl border border-slate-800 shadow-xl">
        <h3 className="text-sm font-semibold text-slate-200 mb-2">Email Address</h3>
        <p className="text-sm text-[#15d8b3] bg-slate-900/60 p-2.5 rounded-md border border-slate-800 font-mono w-fit">
          {user.email}
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Member since {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="bg-rose-950/20 p-6 rounded-xl border border-rose-900/30">
        <h2 className="text-lg font-semibold text-rose-300 mb-2">Danger Zone</h2>
        <p className="text-sm text-rose-300/80 mb-4">
          Need to delete your account or wipe your data? You can manage your account directly via Supabase Auth.
        </p>
        <button 
          className="text-sm font-medium text-rose-400 border border-rose-800 bg-rose-950/40 px-4 py-2 rounded-md opacity-60 cursor-not-allowed"
          disabled
        >
          Delete Account (Contact Support)
        </button>
      </div>
    </div>
  )
}
