import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import CategoryForm from "./category-form";

export default function CategoriesPage() {

  return (
    <>
      <CategoryForm />
      <Suspense fallback={<div>Loading...</div>}>
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
    return <p>Could not load your categories.</p>
  }

  return (
    <div className="p-4">
      {categories.length !== 0 ? <ul>
        {categories.map((cat) => <li className="flex items-center gap-2" key={cat.id}>
          <span aria-hidden="true"
            className="inline-block h-4 w-4 rounded-full"
            style={{ backgroundColor: cat.color }}></span>
          {cat.name}
        </li>)}
      </ul> : <p>You don't have any categories yet.</p>}

    </div>
  )
}