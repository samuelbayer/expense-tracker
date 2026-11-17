'use client'

import { useActionState } from "react"
import { deleteExpense } from "./actions"
import Button from "@/components/ui/button"

export default function DeleteExpenseButton({ expenseId }: { expenseId: string }) {
  const [state, formAction, isPending] = useActionState(deleteExpense, undefined)

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="id" value={expenseId} />
        <Button className='border border-red-900 text-red-400 hover:bg-red-950' disabled={isPending} type="submit" onClick={(e) => { if (!window.confirm('Delete this expense?')) e.preventDefault() }}>Delete</Button>
      </form>
      {state?.error && <p role="alert">{state.error}</p>}
    </>
  )


}