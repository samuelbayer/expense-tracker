'use server'

import { createClient } from "@/lib/supabase/server"
import { expenseSchema } from "@/lib/validations/expense"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type ExpenseFormState = { error?: string } | undefined


export async function createExpense(
  _prevState: ExpenseFormState,
  formData: FormData
): Promise<ExpenseFormState> {

  const data = {
    amountData: String(formData.get('amount') ?? '').trim(),
    spentOnData: String(formData.get('spentOn') ?? ''),
    categoryIdData: String(formData.get('categoryId') ?? '').trim(),
    noteData: String(formData.get('note') ?? '').trim(),

  }

  const { amountData,spentOnData,categoryIdData,noteData } = data

  const result = expenseSchema.safeParse({ amount: amountData, spentOn: spentOnData, categoryId: categoryIdData, note: noteData })

  if (!result.success) {
    return  { error: result.error.issues[0].message }
  }

  const { amount, spentOn, categoryId, note } = result.data

  const supabase = await createClient()
  const { data: claimsData } = await supabase.auth.getClaims()
  const claims = claimsData?.claims

  if (!claims) {
    redirect('/login')
  }

 
  const { error } = await supabase.from('expenses').insert({ amount_cents: amount, spent_on: spentOn, category_id: categoryId, note: note || null })

  if (error) {
    console.error(error.code, error.message)
    if (error.code === '23503') {
      return { error: 'The selected category is not valid.' }
    }
    return { error: 'Could not create the expense.' }
  }
  revalidatePath('/expenses')
}

export async function deleteExpense(_prevState: ExpenseFormState,
  formData: FormData): Promise<ExpenseFormState> {

    const data = {
    id: String(formData.get('id') ?? '').trim()
  }
  const { id } = data
  
  if (!id) return { error: 'Missing expense.' }

 
  const supabase = await createClient()
  const { data: claimsData } = await supabase.auth.getClaims()
  const claims = claimsData?.claims

  if (!claims) {
    redirect('/login')
  }

 
  const { error } = await supabase.from('expenses').delete().eq('id', id)

  if (error) {
    console.error(error.code, error.message)
    return { error: 'Could not delete the expense.' }
  }
  revalidatePath('/expenses')
}