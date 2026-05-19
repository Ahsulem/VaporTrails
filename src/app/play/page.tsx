import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PlayWelcome from './PlayWelcome'

export default async function PlayPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth')

  const username =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split('@')[0] ??
    'rider'

  return <PlayWelcome username={username} />
}
