import Link from "next/link";
import { fetchBlogs } from "@/config/fetchBlogs";
import BlogCard from "@/components/blog/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function BlogContent({ page, category }) {
  const { posts, totalPages } = await fetchBlogs(page, category);

  if (!posts || posts.length === 0) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-900">
        <p>No posts found for this category.</p>
        <Link href="/blog" className="mt-2 text-sm font-medium text-indigo-600 hover:underline">
          Clear filters
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* MEDIUM STYLE CHANGE: 
         Changed from 'grid sm:grid-cols-2' to 'flex flex-col'.
         The BlogCard component we created handles the spacing (py-8) and the bottom border.
      */}
      <div className="flex flex-col">
        {posts.map((post) => (
          <BlogCard key={post.id || post._id || post.slug} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center border-t border-slate-100 pt-8 dark:border-slate-800">
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
                    <PaginationLink
                      href={`/blog?page=${p}&category=${category}`}
                      isActive={p === page}
                    >
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
    </>
  );
}