'use client'

import { useActionState } from "react";
import { deleteCategory } from "./actions";

export default function DeleteButton({ catId }: { catId: string }) {

  const [state, formAction, isPending] = useActionState(deleteCategory, undefined)

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="id" value={catId} />
        <button disabled={isPending} type="submit" onClick={(e) => { if (!window.confirm('Delete this category?')) e.preventDefault() }}>Delete</button>
      </form>
      {state?.error && <p role="alert">{state.error}</p>}
    </>
  )
}