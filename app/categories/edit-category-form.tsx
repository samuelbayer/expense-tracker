'use client'

import { useActionState, useState } from "react"
import { editCategory } from "./actions"

export default function EditCategory({ name, color, catId }: { name: string, color: string, catId: string }) {
  const [state, formAction, isPending] = useActionState(editCategory, undefined)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>Edit</button>
      {isVisible && <form className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border p-4`} action={formAction}>
        <button type="button" onClick={() => setIsVisible(false)}>X</button>
        <label>
          Name
          <input name="name" defaultValue={name} required minLength={2} maxLength={30} />
        </label>
        <label>
          Color
          <input name='color' type="color" defaultValue={color} />
        </label>
        <input type="hidden" name="id" value={catId} />
        <button className="m-3" type="submit" disabled={isPending}>{isPending ? 'Editing...' : 'Edit category'}</button>
        {state?.error && <p role="alert">{state.error}</p>}
      </form>}

    </>
  )
}