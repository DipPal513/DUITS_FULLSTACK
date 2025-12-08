import Link from "next/link";

const CATEGORIES = ["All", "Engineering", "Design", "Career", "Events"];

export default function BlogSidebar({ currentCategory }) {
  return (
    <div className="sticky top-24">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Categories
      </h3>
      <div className="flex flex-row flex-wrap gap-2 lg:flex-col">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/blog?page=1&category=${cat}`}
            className={`rounded-lg px-4 py-2 text-left text-sm font-medium transition-all lg:w-full
              ${
                currentCategory === cat
                  ? "bg-indigo-600 text-white shadow-md dark:bg-indigo-500"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}