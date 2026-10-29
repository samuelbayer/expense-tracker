'use client'

import { useActionState } from "react"
import { createCategory } from "./actions"

export default function CategoryForm() {
  const [state, formAction, isPending] = useActionState(createCategory, undefined)
  return (
    <>
      <form action={formAction}>
        <label htmlFor="name">Insert the name</label>
        <input name="name" id="name" required minLength={2} maxLength={30} />
        <label htmlFor="color">Select the color</label>
        <input name='color' id="color" type="color" defaultValue="#6B7280" />
        <button type="submit" disabled={isPending}>{isPending ? 'Adding...' : 'Add category'}</button>
      </form>
      {state?.error && <p role="alert">{state.error}</p>}
    </>
  )
}