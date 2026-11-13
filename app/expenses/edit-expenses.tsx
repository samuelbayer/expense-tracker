'use client'

import { useActionState, useState } from "react"
import { updateExpense } from "./actions"

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
      <button disabled={isPending} type="button" onClick={() => { setIsVisible(!isVisible) }}>Edit</button>
      {isVisible && <form className="p-4" action={formAction}>
        <button type="button" onClick={() => setIsVisible(!isVisible)}>X</button>
        <input type="hidden" name="id" value={expenseId} />
        <label>
          Amount
          <input defaultValue={amount} type="text" required inputMode="decimal" name="amount" pattern="\d+([.,]\d{1,2})?"
            title="Use up to 2 decimals, like 12.50" placeholder="12.50" />
        </label>
        <label>
          Spent on
          <input defaultValue={spentOn} type="date" required name="spentOn" />
        </label>
        <label>
          Category
          <select defaultValue={categoryId} className="bg-black ${categoryId}" required name="categoryId">
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </label>
        <label>
          Note
          <input defaultValue={note} type="text" maxLength={200} name="note" />
        </label>
        <button disabled={isPending}>{isPending ? 'Editing...' : 'Edit expense'}</button>
        {state?.error && <p role="alert">{state.error}</p>}
      </form>}
    </>
  )


}