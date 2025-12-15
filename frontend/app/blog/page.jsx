import { Suspense } from "react";
import BlogContent from "@/components/blog/BlogContent";
import BlogFilter from "@/components/blog/BlogFilter";
import BlogRightRail from "@/components/blog/BlogRightRail";
import { BlogSkeleton } from "@/components/skeleton/BlogSkeleton";

export const metadata = {
  title: "Blog | DUITS",
  description: "Read our latest articles.",
};

export default async function BlogListingPage({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const category = params?.category || "All";

  return (
    <div className="min-h-screen pt-42 bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      
      {/* 1. Sticky Filter Bar */}
      <BlogFilter currentCategory={category} />

      {/* 2. Main Grid Layout */}
      <div className="mx-auto max-w-screen-xl px-4 py-8 md:px-6 lg:py-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column: Blog Feed (Span 8) */}
          <main className="lg:col-span-8">
            <Suspense key={`${page}-${category}`} fallback={<BlogSkeleton />}>
               {/* NOTE: Your BlogContent component should map over your posts 
                 and render <BlogCard post={post} /> for each one.
               */}
              <BlogContent page={page} category={category} />
            </Suspense>
          </main>

          {/* Right Column: Sidebar (Span 4) */}
          <aside className="lg:col-span-4">
             <BlogRightRail />
          </aside>
          
        </div>
      </div>
    </div>
  );
}