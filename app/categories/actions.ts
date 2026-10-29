'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type CategoryFormState = { error?: string } | undefined

export async function createCategory(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {

  const data = {
    name: String(formData.get('name') ?? '').trim(),
    color: String(formData.get('color') ?? ''),
  }

  const { name, color } = data

  const regex = /^#[0-9A-Fa-f]{6}$/;

  if (name.length < 2 || name.length > 30) {
    return { error: 'Your name has to be valid' }
  } else if (!regex.test(color)) {
    return { error: 'Your color has to be valid' }
  }

  const supabase = await createClient()
  const { data: claimsData } = await supabase.auth.getClaims()
  const claims = claimsData?.claims

  if (!claims) {
    redirect('/login')
  }

  const { error } = await supabase.from('categories').insert({ name, color })

  if (error) {
    console.error(error.code, error.message)
    if (error.code === '23505') {
      return { error: 'You already have a category with that name.' }
    }
    return { error: 'Could not create the category.' }
  }
  revalidatePath('/categories')
}