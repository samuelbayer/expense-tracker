'use client'

import { useActionState } from "react"
import { createCategory } from "./actions"
import Button from "@/components/ui/button"

export default function CategoryForm() {
  const [state, formAction, isPending] = useActionState(createCategory, undefined)
  return (
    <form className="flex p-4 flex-col gap-4 border border-zinc-800 bg-zinc-900 rounded" action={formAction}>
      <label className="flex flex-col gap-1 text-sm text-zinc-400">Name
        <input className="px-3 py-2 rounded bg-zinc-950" name="name" required minLength={2} maxLength={30} />
      </label>
      <label className="flex flex-col gap-1 text-sm text-zinc-400">Color
        <input className="h-10 cursor-pointer" name='color' type="color" defaultValue="#6B7280" />
      </label>
      <Button className="sm:self-end bg-emerald-600 text-white hover:bg-emerald-500" type="submit" disabled={isPending}>{isPending ? 'Adding...' : 'Add category'}</Button>
      {state?.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
    </form>
  )
}