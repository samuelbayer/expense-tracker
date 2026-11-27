import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center mt-16">
        <h1 className='text-4xl font-semibold'>Expense Tracker</h1>
        <p className="text-zinc-400">Track your spending by category</p>
        <div className="flex gap-4 justify-center items-center mt-6 ">
          <Link className="bg-emerald-600 text-white hover:bg-emerald-500 rounded px-3 py-1.5 text-sm font-medium " href={"/login"}>Get started</Link>
          <Link className="border border-zinc-700 hover:bg-zinc-800 px-3 py-1.5 text-sm font-medium rounded" href={"/login"}>Log in</Link>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-2 mt-10">
        <div className="bg-zinc-900 p-4 flex flex-col justify-center items-center text-center border border-zinc-800 rounded">
          <p className="font-medium">Categories with color</p>
          <p className="text-sm text-zinc-400">Group your spending with categories and colors you choose.</p>
        </div>
        <div className="bg-zinc-900 p-4 flex flex-col justify-center items-center text-center border border-zinc-800 rounded">
          <p className="font-medium">Every expense</p>
          <p className="text-sm text-zinc-400">Add, edit and delete expenses with amount, date and a note.</p>
        </div>
        <div className="bg-zinc-900 p-4 flex flex-col justify-center items-center text-center border border-zinc-800 rounded">
          <p className="font-medium">Private by default</p>
          <p className="text-sm text-zinc-400">Your data is only visible to you, enforced in the database.</p>
        </div>

      </div>
      <div className="flex flex-col mt-10 items-center justify-center text-sm text-zinc-400">
        <p className="text-sm text-zinc-400">Built with Next.js, TypeScript, Tailwind CSS and Supabase.</p>
        <a className="hover:text-zinc-100" target="_blank" rel="noopener noreferrer" href={"https://github.com/samuelbayer/expense-tracker"} >View source on GitHub ↗</a>
      </div>
    </>
  );
}
