-- Expense Tracker schema (run in the Supabase SQL Editor).
-- Every row belongs to one user (user_id) and RLS makes sure
-- each user can only read and write their own rows.

-- ───────────────────────── categories ─────────────────────────
create table public.categories (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid()
             references auth.users (id) on delete cascade,
  name       text not null check (char_length(name) between 2 and 30),
  color      text not null default '#6B7280'
             check (color ~ '^#[0-9A-Fa-f]{6}$'),
  created_at timestamptz not null default now(),

  unique (user_id, name),   -- no duplicate names per user
  unique (id, user_id)      -- lets expenses reference (category, owner) together
);

-- ───────────────────────── expenses ─────────────────────────
create table public.expenses (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null default auth.uid()
               references auth.users (id) on delete cascade,
  category_id  uuid not null,
  amount_cents integer not null check (amount_cents > 0),  -- money as integer cents
  spent_on     date not null,
  note         text check (char_length(note) <= 200),
  created_at   timestamptz not null default now(),

  -- The category must exist AND belong to the same user as the expense.
  -- Deleting a category that still has expenses is blocked (restrict).
  foreign key (category_id, user_id)
    references public.categories (id, user_id) on delete restrict
);

create index expenses_user_spent_on_idx on public.expenses (user_id, spent_on desc);
create index expenses_category_id_idx   on public.expenses (category_id);

-- ───────────────────────── Row Level Security ─────────────────────────
alter table public.categories enable row level security;
alter table public.expenses   enable row level security;

-- Table privileges for logged-in users only (never for anon).
grant select, insert, update, delete on public.categories to authenticated;
grant select, insert, update, delete on public.expenses   to authenticated;

-- categories
create policy "categories_select_own" on public.categories
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "categories_insert_own" on public.categories
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "categories_update_own" on public.categories
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "categories_delete_own" on public.categories
  for delete to authenticated
  using (user_id = (select auth.uid()));

-- expenses
create policy "expenses_select_own" on public.expenses
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "expenses_insert_own" on public.expenses
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "expenses_update_own" on public.expenses
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "expenses_delete_own" on public.expenses
  for delete to authenticated
  using (user_id = (select auth.uid()));
