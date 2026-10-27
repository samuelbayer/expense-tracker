import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required autoComplete='email' />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" autoComplete='current-password' type="password" minLength={6} required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}