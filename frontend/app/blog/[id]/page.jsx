
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
      images: [post.image],
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
    <div className="min-h-screen  bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      
      {/* Navigation Bar */}
      <nav className="pt-42 w-full border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
            ← Back to Blog
          </Link>
          <span className="font-bold tracking-tight">DevLog.</span>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        
        {/* Header */}
        <header className="mb-10 text-center">
          {post.category && (
            <span className="mb-4 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
              {post.category}
            </span>
          )}
          <h1 className="mb-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
             <span className="font-medium text-slate-900 dark:text-white">
               {post.author || "Admin"}
             </span>
             <span>•</span>
             <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 aspect-auto w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900">
          {post.image ? (
            <img 
              src={post.image} 
              alt={post.title} 
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20"></div>
          )}
        </div>

        {/* Article Body (Markdown Renderer) */}
        <article className="prose prose-lg prose-slate mx-auto dark:prose-invert prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-img:rounded-xl">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Footer CTA */}
        <div className="mt-16 rounded-2xl bg-slate-50 p-8 text-center dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <h3 className="mb-2 text-xl font-bold">Enjoyed this post?</h3>
          <p className="mb-6 text-slate-600 dark:text-slate-400">Subscribe to our newsletter for more.</p>
          <button className="rounded-full bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700">
            Subscribe Now
          </button>
        </div>

      </main>
    </div>
  );
}