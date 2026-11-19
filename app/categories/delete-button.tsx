'use client'

import { useActionState } from "react";
import { deleteCategory } from "./actions";
import Button from "@/components/ui/button";

export default function DeleteButton({ catId }: { catId: string }) {

  const [state, formAction, isPending] = useActionState(deleteCategory, undefined)

  return (
    <>
      {state?.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
      <form action={formAction}>
        <input type="hidden" name="id" value={catId} />
        <Button className='border border-red-900 text-red-400 hover:bg-red-950' disabled={isPending} type="submit" onClick={(e) => { if (!window.confirm('Delete this category?')) e.preventDefault() }}>Delete</Button>
      </form>

    </>
  )
}