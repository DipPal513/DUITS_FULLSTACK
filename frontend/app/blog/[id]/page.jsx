import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { fetchPostById, fetchAllIds } from "@/config/fetchSingleBlog";
import rehypeHighlight from "rehype-highlight"; 
import "highlight.js/styles/github-dark.css"; 

// 1. GENERATE STATIC PARAMS (SSG)
// Tells Next.js to pre-build pages like /blog/1, /blog/2, etc.
export async function generateStaticParams() {
  const posts = await fetchAllIds();
  return posts; // Returns [{ id: '1' }, { id: '2' }]
}

// 2. METADATA (SEO)
export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await fetchPostById(id);
  
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description || post.title,
    openGraph: {
      images: [{
        url: "/icons/duits-512.png",
        width: 512,
        height: 512,
        alt: "Dhaka University IT Society logo",
      }],
    },
  };
}

// 3. PAGE COMPONENT
export default async function BlogPostPage({ params }) {
  // Await params for Next.js 15+
  const { id } = await params;
  
  // Fetch real data by ID
  const post = await fetchPostById(id);

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      
      {/* Navigation Bar */}
      <nav className="w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
            ← Back to Blog
          </Link>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">DUITS Journal</span>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        
        {/* Header */}
        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase text-blue-800 dark:text-blue-300">Society journal</p>
          <h1 className="mb-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
             {post.date && <span>{new Date(`${post.date}T00:00:00`).toLocaleDateString()}</span>}
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-10 aspect-[16/9] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
          {post.image ? (
            <img 
              src={post.image} 
              alt={post.title} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20"></div>
          )}
        </div>

        {/* Article Body (Markdown Renderer) */}
        <article className="prose prose-lg prose-slate mx-auto dark:prose-invert prose-headings:font-semibold prose-a:text-blue-800 dark:prose-a:text-blue-300 prose-img:rounded-lg">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Footer CTA */}
        <div className="mt-16 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h2 className="mb-2 text-xl font-semibold">Take part in the community</h2>
          <p className="mb-5 text-sm text-slate-600 dark:text-slate-400">Explore upcoming programs and membership information.</p>
          <Link href="/membership" className="inline-flex min-h-11 items-center rounded-md bg-blue-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900">Explore membership</Link>
        </div>

      </main>
    </div>
  );
}