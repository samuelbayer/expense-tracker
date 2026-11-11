import { z } from 'zod'
import { toCents } from '@/lib/money'

const MAX_CENTS = 100000000

function maxAllowedDate(): string {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
  return tomorrow.toISOString().slice(0, 10)
}

export const expenseSchema = z.object({
  amount: z.string()
  .refine((v) => toCents(v) !== null, 'Enter a valid amount') 
  .transform((v) => toCents(v)!)                               
  .pipe(z.number().min(1, 'Amount must be greater than 0').max(MAX_CENTS, 'Amount is too large')),
  spentOn: z.iso.date('Enter a valid date').refine((d) => d <= maxAllowedDate(), 'The date cannot be in the future'),
  categoryId: z.uuid('Select a category'),
  note: z.string().trim().max(200)
})

export type ExpenseInput = z.infer<typeof expenseSchema>