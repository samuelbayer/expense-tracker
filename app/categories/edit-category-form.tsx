'use client'

import { useActionState, useState } from "react"
import { editCategory } from "./actions"
import Button from "@/components/ui/button"

export default function EditCategory({ name, color, catId }: { name: string, color: string, catId: string }) {
  const [state, formAction, isPending] = useActionState(editCategory, undefined)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button className='border border-zinc-700 hover:bg-zinc-800' onClick={() => setIsVisible(!isVisible)}>Edit</Button>
      {isVisible && <div className="p-4 fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <form className={`pt-10 relative p-4 w-full max-w-lg flex flex-col gap-4 border border-zinc-800 bg-zinc-900 rounded`} action={formAction}>
          <Button className="hover:text-zinc-100 absolute top-2 right-2 h-8 w-8 p-0 text-zinc-400" aria-label="Close" type="button" onClick={() => setIsVisible(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </Button>
          <label className='flex flex-col gap-1 text-sm text-zinc-400'>
            Name
            <input className="px-3 py-2 rounded bg-zinc-950" name="name" defaultValue={name} required minLength={2} maxLength={30} />
          </label>
          <label className="flex flex-col gap-1 text-sm text-zinc-400">
            Color
            <input className="h-10 cursor-pointer" name='color' type="color" defaultValue={color} />
          </label>
          <input type="hidden" name="id" value={catId} />
          <Button className="sm:self-end bg-emerald-600 text-white hover:bg-emerald-500" type="submit" disabled={isPending}>{isPending ? 'Editing...' : 'Edit category'}</Button>
          {state?.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
        </form>
      </div>}
    </>
  )
}