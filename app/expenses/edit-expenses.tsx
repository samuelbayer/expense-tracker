'use client'

import { useActionState, useState } from "react"
import { updateExpense } from "./actions"
import Button from "@/components/ui/button"

type Props = {
  expenseId: string
  amount: string        // ya convertido con centsToInput
  spentOn: string
  categoryId: string
  note: string
  categories: { id: string; name: string }[]   // para el <select>
}

export default function EditExpenseButton({ expenseId, amount, spentOn, categoryId, note, categories }: Props) {
  const [state, formAction, isPending] = useActionState(updateExpense, undefined)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button className='border border-zinc-700 hover:bg-zinc-800' disabled={isPending} type="button" onClick={() => { setIsVisible(!isVisible) }}>Edit</Button>
      {isVisible && <div className="p-4 fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <form className="pt-10 relative p-4 w-full max-w-lg flex flex-col gap-4 border border-zinc-800 bg-zinc-900 rounded" action={formAction}>
          <Button className="hover:text-zinc-100 absolute top-2 right-2 h-8 w-8 p-0 text-zinc-400" type="button" aria-label="Close" onClick={() => setIsVisible(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </Button>
          <input type="hidden" name="id" value={expenseId} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1 text-sm text-zinc-400 flex-1">
              Amount
              <input className="px-3 py-2 rounded bg-zinc-950" defaultValue={amount} type="text" required inputMode="decimal" name="amount" pattern="\d+([.,]\d{1,2})?"
                title="Use up to 2 decimals, like 12.50" placeholder="12.50" />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-400 flex-1">
              Spent on
              <input className="px-3 py-2 rounded bg-zinc-950" defaultValue={spentOn} type="date" required name="spentOn" />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-400 flex-1">
              Category
              <select className="px-3 py-2 rounded bg-zinc-950" defaultValue={categoryId} required name="categoryId">
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm text-zinc-400 flex-1">
            Note
            <input className="px-3 py-2 rounded bg-zinc-950" defaultValue={note} type="text" maxLength={200} name="note" />
          </label>
          <Button className="bg-emerald-600 text-white hover:bg-emerald-500 sm:self-end" disabled={isPending}>{isPending ? 'Editing...' : 'Edit expense'}</Button>
          {state?.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
        </form>
      </div>}
    </>
  )


}