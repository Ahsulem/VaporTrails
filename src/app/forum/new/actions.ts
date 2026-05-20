'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createThreadAction(title: string, content: string, userId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('threads')
    .insert({ title, content, user_id: userId })

  if (error) {
    return { error: error.message }
  }

  // Force revalidation of forum and community pages
  revalidatePath('/forum')
  revalidatePath('/forum', 'page')
  revalidatePath('/community')

  // Small artificial delay to allow revalidation to propagate before redirecting
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Redirect to /forum
  redirect('/forum')
}
