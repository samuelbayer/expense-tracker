# Expense Tracker

A personal expense tracker where each user logs in, organizes spending into
colored categories and records expenses. Every user only ever sees their own
data, enforced in the database with Row Level Security.

**[Live demo →](https://expense-tracker-xi-orpin.vercel.app/)**

**Demo account** (fake data, feel free to play with it):
`example@example.com` / `example1234`

## Who is it for?

Anyone who wants a simple, private place to track what they spend. It is also
a portfolio project that shows a full-stack flow with authentication, per-user
data and server-side validation.

## What works today

- Sign up, log in and log out (Supabase Auth, session in cookies)
- Protected routes (proxy redirect plus a check inside every Server Action)
- Categories: create, list, edit (name and color) and delete
- A category with expenses cannot be deleted (enforced by the database)
- Row Level Security: one user can never read or change another user's rows

## In progress and planned

Expenses CRUD, monthly dashboard with charts, filters, tests, CI, Storybook and
Docker. The full list, with estimates, is in the
[open issues](https://github.com/samuelbayer/expense-tracker/issues).

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS · Supabase (Auth + Postgres +
RLS) · Zod · Vercel. Planned: React Hook Form, Recharts, Vitest, Testing
Library, Playwright, Storybook, GitHub Actions, Docker.

## Running locally

1. Clone the repo and install dependencies:
   ```bash
   pnpm install
   ```
2. Create a free [Supabase](https://supabase.com) project and run
   `supabase/schema.sql` in its SQL Editor.
3. Copy `.env.example` to `.env.local` and fill in your project URL and
   publishable key. Never use the secret key in this app.
4. Start the dev server:
   ```bash
   pnpm dev
   ```

## Design decisions

- **Money is stored as integer cents** to avoid floating point errors.
- **Security in layers:** proxy redirect, identity check in every Server Action
  (they are public endpoints) and RLS in the database.
- **Composite foreign key** `(category_id, user_id)` guarantees an expense can
  only use a category owned by the same user.

## License

[MIT](LICENSE)
