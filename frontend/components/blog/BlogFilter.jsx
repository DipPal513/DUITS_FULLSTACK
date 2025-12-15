import Link from "next/link";

const CATEGORIES = ["For you", "Engineering", "Design", "Data Science", "Productivity", "AI"];

export default function BlogFilter({ currentCategory }) {
  return (
    <div className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 dark:bg-slate-950/95 dark:border-slate-800">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <nav className="flex space-x-6 overflow-x-auto no-scrollbar py-4" aria-label="Tabs">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat || (cat === "For you" && currentCategory === "All");
            return (
              <Link
                key={cat}
                href={`/blog?page=1&category=${cat}`}
                scroll={false}
                className={`
                  whitespace-nowrap text-sm transition-colors duration-200
                  ${
                    isActive
                      ? "font-medium text-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                  }
                `}
              >
                {cat}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}