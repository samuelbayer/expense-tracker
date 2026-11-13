'use client'

import { useActionState } from "react"
import { deleteExpense } from "./actions"

export default function DeleteExpenseButton({ expenseId }: { expenseId: string }) {
  const [state, formAction, isPending] = useActionState(deleteExpense, undefined)

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="id" value={expenseId} />
        <button disabled={isPending} type="submit" onClick={(e) => { if (!window.confirm('Delete this expense?')) e.preventDefault() }}>Delete</button>
      </form>
      {state?.error && <p role="alert">{state.error}</p>}
    </>
  )


}