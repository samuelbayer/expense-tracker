import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Suspense } from 'react'
import { connection } from 'next/server'

export default function DashboardPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <DashboardContent />
    </Suspense>
  )
}


async function DashboardContent() {
  await connection()
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const claims = data?.claims

  if (!claims) {
    redirect('/login')
  }



  return (
    <main>
      <p>{claims.email}</p>
      <form method="post" action="/auth/signout">
        <button id='sign-out'>Sign out</button>
      </form>
    </main>
  )
}
