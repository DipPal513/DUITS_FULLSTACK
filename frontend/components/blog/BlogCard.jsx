import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";

export default function BlogCard({ post }) {
  const postPath = `/blog/${post.id}`;
  const displayDate = post.date
    ? new Date(`${post.date}T00:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <article className="group grid gap-5 border-b border-slate-200 py-6 sm:grid-cols-[minmax(0,1fr)_12rem] dark:border-slate-800">
      <div className="flex min-w-0 flex-col">
        {displayDate && <p className="mb-3 inline-flex items-center gap-2 text-xs text-slate-500"><CalendarDays size={14} />{displayDate}</p>}
        <Link href={postPath} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700">
          <h2 className="mb-2 text-xl font-semibold leading-snug text-slate-950 group-hover:text-blue-800 sm:text-2xl dark:text-white dark:group-hover:text-blue-300">{post.title}</h2>
          {post.description && <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{post.description}</p>}
        </Link>
        <Link href={postPath} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-800 dark:text-blue-300">Read article <ArrowUpRight size={16} /></Link>
      </div>
      {post.image && <Link href={postPath} className="order-first overflow-hidden rounded-md bg-slate-100 sm:order-none"><img src={post.image} alt="" className="aspect-[4/3] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy" /></Link>}
    </article>
  );
}
