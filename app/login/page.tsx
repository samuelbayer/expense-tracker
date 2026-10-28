'use client'

import { useActionState } from 'react'
import { login, signup } from './actions'

export default function LoginPage() {
  const [loginState, loginAction, loginPending] = useActionState(login, undefined)
  const [signupState, signupAction, signupPending] = useActionState(signup, undefined)

  const error = loginState?.error ?? signupState?.error
  const pending = loginPending || signupPending

  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input disabled={pending} id="email" name="email" type="email" autoComplete='email' />
        <label htmlFor="password">Password:</label>
        <input disabled={pending} id="password" name="password" autoComplete='current-password' type="password" />
        <button disabled={pending} formAction={loginAction}>Log in</button>
        <button disabled={pending} formAction={signupAction}>Sign up</button>
      </form>
      {error && <p role='alert'>{error}</p>}
    </>
  )
}