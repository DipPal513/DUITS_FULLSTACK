import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function BlogRightRail() {
  return (
    <aside className="space-y-6 border-t border-slate-200 pt-6 lg:sticky lg:top-24 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0 dark:border-slate-800">
      <section>
        <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Explore DUITS</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Read about the projects, events and people shaping technology at the University of Dhaka.</p>
      </section>
      <nav className="space-y-1" aria-label="Related pages">
        {[["Events", "/events"], ["Projects", "/projects"], ["Executive team", "/executives"], ["Gallery", "/gallery"]].map(([label, href]) => (
          <Link key={href} href={href} className="flex items-center justify-between border-b border-slate-200 py-3 text-sm font-medium text-slate-700 hover:text-blue-800 dark:border-slate-800 dark:text-slate-200 dark:hover:text-blue-300">
            {label}<ArrowUpRight size={15} />
          </Link>
        ))}
      </nav>
    </aside>
  );
}
