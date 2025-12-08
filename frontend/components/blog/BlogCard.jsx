import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50">
        
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
              {post.category || "General"}
            </span>
            <span className="text-xs text-slate-500">
              {post.date ? new Date(post.date).toLocaleDateString() : ""}
            </span>
          </div>

          <h2 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 line-clamp-2">
            {post.title}
          </h2>

          <div className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3 prose prose-sm dark:prose-invert">
            <ReactMarkdown
              allowedElements={["p", "strong", "em", "span", "code"]}
              components={{
                p: ({ node, ...props }) => <p className="m-0 inline" {...props} />,
              }}
            >
              {post.description || "Read more..."}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </Link>
  );
}