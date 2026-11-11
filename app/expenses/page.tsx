import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { connection } from "next/server"
import { Suspense } from "react"
import ExpenseForm from "./expense-form"
import { formatCurrency } from "@/lib/money"
import Link from "next/link"

type Expense = {
  id: string
  amount_cents: number
  spent_on: string
  note: string | null
  categories: { name: string; color: string }
}

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
    .select('id,amount_cents, spent_on, note,categories(name, color)')
    .order('spent_on', { ascending: false })
    .overrideTypes<Expense[], { merge: false }>()
  if (error || categoriesError) {
    console.error(error?.message, categoriesError?.message)
    return <p>Could not load your expenses.</p>
  }

  return (
    <>
      {categories.length !== 0 ? <ExpenseForm categories={categories} /> : <Link href="/categories">You don't have any categories. Click here to create one</Link>}
      <h2>Expenses</h2>
      <div className="p-4">
        {expenses.length === 0 ? <p>You don't have any expenses</p> :
          <ul>
            {expenses.map((expense) => {
              return <li className="p-3 w-50" key={expense.id}>
                <p>{formatCurrency(expense.amount_cents)}</p>
                <p>{expense.note}</p>
                <p>{expense.spent_on}</p>
                <span aria-hidden="true" className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: expense.categories.color }} />
                {expense.categories.name}
              </li>
            })}
          </ul>
        }
      </div>
    </>
  )
}