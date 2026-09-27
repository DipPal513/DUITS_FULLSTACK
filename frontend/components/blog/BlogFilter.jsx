import Link from "next/link";

export default function BlogFilter({ currentCategory }) {
  return (
    <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-5 md:px-6">
        <div>
          <p className="text-xs font-semibold uppercase text-blue-800 dark:text-blue-300">DUITS Journal</p>
          <h1 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">Ideas, work and community</h1>
        </div>
        <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-blue-800 dark:text-slate-300 dark:hover:text-blue-300">
          {currentCategory && currentCategory !== "All" ? "Clear filter" : "All articles"}
        </Link>
      </div>
    </div>
  );
}