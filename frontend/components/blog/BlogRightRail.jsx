export default function BlogRightRail() {
  const TAGS = ["React", "Next.js", "Programming", "Technology", "Web Dev", "Life", "Culture"];
  
  return (
    <div className="sticky top-24 hidden lg:block pl-8 border-l border-slate-100 dark:border-slate-800">
        
        {/* Search */}
        <div className="relative mb-8">
            <input 
                type="text" 
                placeholder="Search" 
                className="w-full rounded-full bg-slate-50 px-4 py-2 text-sm outline-none border border-transparent focus:bg-white focus:border-indigo-500 transition-all dark:bg-slate-900 dark:focus:bg-slate-950"
            />
        </div>

        {/* Recommended Topics */}
        <div className="mb-8">
            <h4 className="mb-4 text-sm font-bold text-slate-900 dark:text-white">Recommended topics</h4>
            <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                    <span key={tag} className="cursor-pointer rounded-full bg-slate-100 px-3 py-2 text-xs text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* Newsletter Box */}
        <div className="rounded-lg bg-indigo-50 p-5 dark:bg-slate-900">
            <h4 className="mb-2 text-sm font-bold text-indigo-900 dark:text-indigo-100">Subscribe to DUITS</h4>
            <p className="mb-4 text-xs text-indigo-700/80 dark:text-indigo-300/70">
                Get the latest engineering posts delivered right to your inbox.
            </p>
            <button className="w-full rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                Subscribe
            </button>
        </div>
    </div>
  );
}