'use client'

import { useActionState } from "react";
import { createExpense } from "./actions";
import Button from "@/components/ui/button";

type Props = { categories: { id: string; name: string }[] }

export default function ExpenseForm({ categories }: Props) {
  const [state, formAction, isPending] = useActionState(createExpense, undefined)

  return (
    <form className="p-4 flex flex-col gap-4 border border-zinc-800 bg-zinc-900 rounded" action={formAction}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm text-zinc-400 flex-1" >
          Amount
          <input className="px-3 py-2 rounded bg-zinc-950" type="text" required inputMode="decimal" name="amount" pattern="\d+([.,]\d{1,2})?"
            title="Use up to 2 decimals, like 12.50" placeholder="12.50" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-zinc-400 flex-1">
          Spent on
          <input className="px-3 py-2 rounded bg-zinc-950" type="date" required name="spentOn" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-zinc-400 flex-1">
          Category
          <select className="px-3 py-2 rounded bg-zinc-950" required name="categoryId">
            <option value=''>
              Select a category
            </option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </label>

      </div>
      <label className="flex flex-col gap-1 text-sm text-zinc-400">
        Note
        <input className="px-3 py-2 rounded bg-zinc-950" type="text" maxLength={200} name="note" />
      </label>
      <Button className='sm:self-end bg-emerald-600 text-white hover:bg-emerald-500' disabled={isPending}>{isPending ? 'Adding...' : 'Add expense'}</Button>
      {state?.error && <p role="alert">{state.error}</p>}
    </form>
  )
}