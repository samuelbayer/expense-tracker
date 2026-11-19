import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import CategoryForm from "./category-form";
import DeleteButton from "./delete-button";
import EditCategory from "./edit-category-form";

export default function CategoriesPage() {

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Categories</h2>
      <div className="mb-6">
        <CategoryForm />
      </div>
      <Suspense fallback={<div className="text-zinc-400">Loading...</div>}>
        <CategoriesContent />
      </Suspense>
    </>
  )
}

async function CategoriesContent() {

  await connection()
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const claims = data?.claims

  if (!claims) {
    redirect('/login')
  }

  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, color')
    .order('name')

  if (error) {
    console.error(error.message)
    return <p className="text-red-400">Could not load your categories.</p>
  }

  return (
    <>
      {categories.length !== 0 ? <ul className="space-y-3">
        {categories.map((cat) => <li className="flex items-center gap-3 p-3 justify-between border border-zinc-800 bg-zinc-900 rounded" key={cat.id}>
          <div className="flex gap-2 items-center">
            <span aria-hidden="true"
              className="inline-block h-4 w-4 rounded-full"
              style={{ backgroundColor: cat.color }}></span>
            <p className="font-medium">{cat.name}</p>
          </div>
          <div className="flex gap-2 items-center">
            <DeleteButton catId={cat.id} />
            <EditCategory key={`${cat.id}-${cat.name}-${cat.color}`} name={cat.name} color={cat.color} catId={cat.id} />
          </div>
        </li>
        )}
      </ul> : <p className="text-zinc-400">You don&apos;t have any categories yet.</p>}
    </>
  )
}