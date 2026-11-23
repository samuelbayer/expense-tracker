'use client'

import { useActionState, useState } from 'react'
import { login, signup } from './actions'
import Button from '@/components/ui/button'

export default function LoginPage() {
  const [loginState, loginAction, loginPending] = useActionState(login, undefined)
  const [signupState, signupAction, signupPending] = useActionState(signup, undefined)
  const [stateOfSign, setStateOfSign] = useState("login")

  const error = loginState?.error ?? signupState?.error
  const pending = loginPending || signupPending
  const loginPendingText = loginPending ? 'Logging in...' : 'Log In'
  const signupPendingText = signupPending ? 'Signing up...' : 'Sign up'
  function changeStateOfSign() {
    if (stateOfSign === "login") {
      setStateOfSign("signup")
    } else {
      setStateOfSign("login")
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mt-16 gap-3 mx-auto max-w-sm'>
      <div className='text-center'>
        <h1 className='text-2xl font-semibold'>Expense Tracker</h1>
        <p className='text-zinc-400'>Sign in to track expenses</p>
      </div>
      <form className='p-4 w-full flex flex-col gap-4 border border-zinc-800 bg-zinc-900 rounded'>
        <label className='flex flex-col gap-1 text-sm text-zinc-400'>Email:
          <input required className='px-3 py-2 rounded bg-zinc-950' disabled={pending} name="email" type="email" autoComplete='email' />
        </label>
        <label className='flex flex-col gap-1 text-sm text-zinc-400'>Password:
          <input required className='px-3 py-2 rounded bg-zinc-950' disabled={pending} name="password" autoComplete='current-password' type="password" />
        </label>
        {error && <p role='alert' className='text-red-400 text-sm'>{error}</p>}
        <div className='flex gap-4 justify-center'>
          <Button className='bg-emerald-600 text-white hover:bg-emerald-500' disabled={pending} formAction={stateOfSign === "login" ? loginAction : signupAction}>{stateOfSign === "login" ? loginPendingText : signupPendingText}</Button>
        </div>
      </form>
      <button onClick={() => changeStateOfSign()} type='button'>{stateOfSign === "login" ? "No account? Sign up" : "Already have an account? Log in"}</button>
    </div>
  )
}