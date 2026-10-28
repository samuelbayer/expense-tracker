'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'


export type FormState = { error?: string } | undefined

export async function login(prevState:FormState ,formData: FormData): Promise<FormState> {

  const data = {
    email: String(formData.get('email') ?? '').trim(),
    password: String(formData.get('password') ?? ''),
  }

  if (!data.email || !data.password) {
    return { error: 'Email and password are required' }
  }

  if (data.password.length < 6) return { error: 'Password has to be 6 characters or more' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    console.error(error.code ,error.message)
    return { error: 'Email or password incorrect' }
    
  }
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
export async function signup(prevState:FormState ,formData: FormData): Promise<FormState> {
  const data = {
    email: String(formData.get('email') ?? '').trim(),
    password: String(formData.get('password') ?? ''),
  }

  if (!data.email || !data.password) {
    return { error: 'Email and password are required' }
  }

  if (data.password.length < 6) return { error: 'Password has to be 6 characters or more' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp(data)
  if (error) {
    console.error(error.code, error.message)
    return {error: 'Could not create account'}
  }
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}