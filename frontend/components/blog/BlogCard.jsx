import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }) {
  // Mock data fallback if post is missing
  const {
    title = "Understanding React Server Components",
    excerpt = "A deep dive into how RSC changes the mental model of building web applications and improves performance.",
    author = "John Doe",
    date = "Dec 15, 2025",
    readTime = "5 min read",
    category = "Engineering",
    id =1,
    image = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80", 
  } = post || {};

  return (
    <article className="group flex w-full flex-col gap-6 py-8 border-b border-slate-100 last:border-0 dark:border-slate-800 sm:flex-row sm:items-center">
      
      {/* Text Content */}
      <div className="flex flex-1 flex-col justify-center">
        {/* Author / Meta Top */}
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
          <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700" /> {/* Placeholder Avatar */}
          <span>{author}</span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span className="text-slate-400">{date}</span>
        </div>

        {/* Title & Excerpt */}
        <Link href={`/blog/${id}`}>
          <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-900 group-hover:underline decoration-2 underline-offset-4 decoration-indigo-500 dark:text-slate-50 md:text-2xl">
            {title}
          </h2>
          <p className="mb-3 line-clamp-2 text-base text-slate-500 font-serif leading-relaxed dark:text-slate-400">
            {excerpt}
          </p>
        </Link>

        {/* Footer Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {category}
            </span>
            <span className="text-xs text-slate-400">{readTime}</span>
          </div>
          {/* Bookmark Icon (Optional) */}
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
          </button>
        </div>
      </div>

      {/* Thumbnail Image (Right Side) */}
      <Link href={`/blog/${id}`} className="order-first sm:order-last flex-shrink-0">
        <div className="relative h-48 w-full overflow-hidden rounded-sm bg-slate-100 sm:h-32 sm:w-48">
             <Image 
                src={image} 
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
             />
        </div>
      </Link>
    </article>
  );
}