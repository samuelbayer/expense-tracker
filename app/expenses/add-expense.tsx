'use client'

import Button from "@/components/ui/button"
import { useState } from "react"
import ExpenseForm from "./expense-form"

type Props = { categories: { id: string; name: string }[] }

export default function AddExpense({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <Button aria-expanded={isOpen} className={isOpen ? 'border border-zinc-700 hover:bg-zinc-800' : 'bg-emerald-600 text-white hover:bg-emerald-500'} onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Cancel' : '+ Add expense'}</Button>
      </div>
      {isOpen && <ExpenseForm categories={categories} />}
    </>
  )
}