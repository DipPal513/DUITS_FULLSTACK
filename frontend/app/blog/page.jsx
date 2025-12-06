import Link from "next/link";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown"; // 1. Import this
import { fetchBlogs } from "@/config/fetchBlogs"; 
import { BlogSkeleton } from "@/components/skeleton/BlogSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const metadata = {
  title: "Blog | DUITS",
  description: "Read our latest articles.",
};

export default async function BlogListingPage({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const category = params?.category || "All";

  const { posts, totalPages } = await fetchBlogs(page, category);

  const CATEGORIES = ["All", "Engineering", "Design", "Career", "Events"];

  return (
    <div className="min-h-screen pt-32 bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      
      {/* ... Header ... */}
      <div className="border-b border-slate-200 bg-slate-50 py-16 text-center dark:border-slate-800 dark:bg-slate-900/50">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Our Blog</h1>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row">
        
        {/* ... Sidebar ... */}
        <aside className="w-full flex-shrink-0 lg:w-64">
           {/* ... (Sidebar code unchanged) ... */}
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
                      category === cat
                        ? "bg-indigo-600 text-white shadow-md dark:bg-indigo-500"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* POSTS AREA */}
        <div className="flex-1">
          <Suspense fallback={<BlogSkeleton />}>
            
            {posts.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                {posts.map((post) => (
                  <Link 
                    key={post.id || post._id || post.slug} 
                    href={`/blog/${post.id}`} 
                    className="group block h-full"
                  >
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
                        
                        {/* ⚠️ 2. MARKDOWN RENDERER FOR DESCRIPTION */}
                        {/* We use a div instead of p to avoid hydration errors (div cannot be inside p) */}
                        <div className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3 prose prose-sm dark:prose-invert">
                          <ReactMarkdown 
                            // Only allow inline text styling to prevent breaking the card
                            allowedElements={["p", "strong", "em", "span", "code"]}
                            components={{
                                // Remove margins from paragraphs so they fit nicely
                                p: ({node, ...props}) => <p className="m-0 inline" {...props} />
                            }}
                          >
                            {post.description || "Read more..."}
                          </ReactMarkdown>
                        </div>

                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-500 border border-dashed rounded-xl">
                No posts found.
              </div>
            )}

            {/* ... Pagination (unchanged) ... */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href={`/blog?page=${Math.max(1, page - 1)}&category=${category}`}
                        className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => {
                      const p = i + 1;
                      return (
                        <PaginationItem key={p}>
                          <PaginationLink href={`/blog?page=${p}&category=${category}`} isActive={p === page}>
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext 
                        href={`/blog?page=${Math.min(totalPages, page + 1)}&category=${category}`}
                        className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

          </Suspense>
        </div>
      </div>
    </div>
  );
}