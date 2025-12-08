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
  // 1. The fetch happens here now
  const { posts, totalPages } = await fetchBlogs(page, category);

  if (!posts || posts.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500 border border-dashed rounded-xl">
        No posts found.
      </div>
    );
  }

  return (
    <>
      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.id || post._id || post.slug} post={post} />
        ))}
      </div>

      {/* Pagination */}
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