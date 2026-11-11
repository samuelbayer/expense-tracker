'use client'

import { useActionState } from "react";
import { createExpense } from "./actions";

type Props = { categories: { id: string; name: string }[] }

export default function ExpenseForm({ categories }: Props) {
  const [state, formAction, isPending] = useActionState(createExpense, undefined)

  return (
    <form className="p-4" action={formAction}>
      <label>
        Amount
        <input type="text" required inputMode="decimal" name="amount" placeholder="12.50" />
      </label>
      <label>
        Spent on
        <input type="date" required name="spentOn" />
      </label>
      <label>
        Category
        <select className="bg-black" required name="categoryId">
          <option value=''>
            Select a category
          </option>
          {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
      </label>
      <label>
        Note
        <input type="text" maxLength={200} name="note" />
      </label>
      <button disabled={isPending}>{isPending ? 'Adding...' : 'Add expense'}</button>
      {state?.error && <p role="alert">{state.error}</p>}
    </form>
  )
}