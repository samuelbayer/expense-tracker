import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { connection } from "next/server"

export default async function NavigationBar() {
  await connection()
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const claims = data?.claims

  if (!claims) {
    return null
  }

  return (
    <nav className="border-b border-zinc-800 p-1">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4 ">
          <Link className="py-2 text-zinc-400 hover:text-zinc-100" href={'/dashboard'}>Dashboard</Link>
          <Link className=" py-2 text-zinc-400 hover:text-zinc-100" href={'/expenses'}>Expenses</Link>
          <Link className=" py-2 text-zinc-400 hover:text-zinc-100" href={'/categories'}>Categories</Link>
        </div>
        <form method="post" action="/auth/signout">
          <button className="rounded border border-zinc-700 px-3 py-1 hover:bg-zinc-800 cursor-pointer" id='sign-out'>Sign out</button>
        </form>
      </div>
    </nav>
  )
}
