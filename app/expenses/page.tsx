import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { connection } from "next/server"
import { Suspense } from "react"
import ExpenseForm from "./expense-form"
import { centsToInput, formatCurrency } from "@/lib/money"
import Link from "next/link"
import DeleteExpenseButton from "./delete-expense-button"
import EditExpenseButton from "./edit-expenses"

type Expense = {
  id: string
  amount_cents: number
  spent_on: string
  note: string | null
  categories: { name: string; color: string }
  category_id: string
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' })

export default function ExpensesPage() {

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ExpensesContent />
    </Suspense>
  )
}


async function ExpensesContent() {
  await connection()
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const claims = data?.claims

  if (!claims) {
    redirect('/login')
  }

  const { data: categories, error: categoriesError } = await supabase.from('categories').select('id, name').order('name')

  const { data: expenses, error } = await supabase
    .from('expenses')
    .select('id,amount_cents, spent_on, note,categories(name, color), category_id')
    .order('spent_on', { ascending: false })
    .overrideTypes<Expense[], { merge: false }>()
  if (error || categoriesError) {
    console.error(error?.message, categoriesError?.message)
    return <p>Could not load your expenses.</p>
  }

  return (
    <>
      {categories.length !== 0 ? <ExpenseForm categories={categories} /> : <Link href="/categories">You don&apos;t have any categories. Click here to create one</Link>}
      <h2 className="text-xl font-semibold my-4">Expenses</h2>
      {expenses.length === 0 ? <p>You don&apos;t have any expenses</p> :
        <ul className="space-y-3">
          {expenses.map((expense) => {
            return <li className="p-3 flex justify-between items-center gap-3 border border-zinc-800 bg-zinc-900 rounded" key={expense.id}>
              <div className="flex gap-2 items-center">
                <span aria-hidden="true" className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: expense.categories.color }} />
                <div>
                  <p className="font-medium">{expense.categories.name}</p>
                  {expense.note && <p className="text-sm text-zinc-400">{expense.note}</p>}
                  <p className="text-xs text-zinc-500">{dateFormatter.format(new Date(expense.spent_on))}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-center font-semibold tabular-nums">{formatCurrency(expense.amount_cents)}</p>
                <div className="flex gap-2">
                  <DeleteExpenseButton expenseId={expense.id} />
                  <EditExpenseButton key={`${expense.id}-${expense.amount_cents}-${expense.spent_on}-${expense.category_id}-${expense.note}`} expenseId={expense.id} amount={centsToInput(expense.amount_cents)} spentOn={expense.spent_on} categories={categories} note={expense.note ?? ''} categoryId={expense.category_id} />
                </div>
              </div>
            </li>
          })}
        </ul>
      }
    </>
  )
}