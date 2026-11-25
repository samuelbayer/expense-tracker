'use client'

import { useActionState, useState } from 'react'
import { login, signup } from './actions'
import Button from '@/components/ui/button'

export default function LoginPage() {
  const [loginState, loginAction, loginPending] = useActionState(login, undefined)
  const [signupState, signupAction, signupPending] = useActionState(signup, undefined)
  const [mode, setMode] = useState<"login" | "signup">("login")

  const loginError = loginState?.error
  const signupError = signupState?.error
  const pending = loginPending || signupPending
  const loginPendingText = loginPending ? 'Logging in...' : 'Log in'
  const signupPendingText = signupPending ? 'Signing up...' : 'Sign up'
  const toggleMode = () => setMode(prev => prev === 'login' ? 'signup' : 'login')
  const isLogin = mode === "login"
  const error = isLogin ? loginError : signupError

  return (
    <div className='flex flex-col justify-center items-center mt-16 gap-3 mx-auto max-w-sm'>
      <div className='text-center'>
        <h1 className='text-2xl font-semibold'>Expense Tracker</h1>
        <p className='text-zinc-400'>{isLogin ? "Log in to track expenses" : "Create your account"}</p>
      </div>
      <form className='p-4 w-full flex flex-col gap-4 border border-zinc-800 bg-zinc-900 rounded'>
        <label className='flex flex-col gap-1 text-sm text-zinc-400'>Email:
          <input required className='px-3 py-2 rounded bg-zinc-950' disabled={pending} name="email" type="email" autoComplete='email' />
        </label>
        <label className='flex flex-col gap-1 text-sm text-zinc-400'>Password:
          <input required className='px-3 py-2 rounded bg-zinc-950' disabled={pending} name="password" autoComplete={isLogin ? 'current-password' : "new-password"} type="password" />
        </label>
        {error && <p role='alert' className='text-red-400 text-sm'>{error}</p>}
        <Button className='bg-emerald-600 text-white hover:bg-emerald-500 mt-2' disabled={pending} formAction={isLogin ? loginAction : signupAction}>{isLogin ? loginPendingText : signupPendingText}</Button>
      </form>
      <button className='text-sm text-zinc-400 hover:text-zinc-100 cursor-pointer' onClick={toggleMode} type='button'>{isLogin ? "No account? Sign up" : "Already have an account? Log in"}</button>
    </div>
  )
}