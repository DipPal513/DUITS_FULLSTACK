import { Suspense } from "react";
import BlogContent from "@/components/blog/BlogContent";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { BlogSkeleton } from "@/components/skeleton/BlogSkeleton";

export const metadata = {
  title: "Blog | DUITS",
  description: "Read our latest articles.",
};

export default async function BlogListingPage({ searchParams }) {
  // Await searchParams in Next.js 15/16
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const category = params?.category || "All";

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      {/* Header */}
      <div className="border-b pt-42 border-slate-200 bg-slate-50 py-16 text-center dark:border-slate-800 dark:bg-slate-900/50">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Our Blog</h1>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row">
        {/* Sidebar - Loads Instantly */}
        <aside className="w-full flex-shrink-0 lg:w-64">
           <BlogSidebar currentCategory={category} />
        </aside>

        {/* Content Area - Fetches Independently */}
        <div className="flex-1">
          <Suspense key={`${page}-${category}`} fallback={<BlogSkeleton />}>
            <BlogContent page={page} category={category} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}