import GalleryContent from "@/components/gallery/GalleryContent";
import GlobalSkeleton from "@/components/GlobalSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Event Gallery | DUITS",
  description:
    "Browse the visual archive of Dhaka University IT Society. Relive moments from the National Campus IT Fest (NCIF), workshops, seminars, and daily life at TSC.",
  openGraph: {
    title: "Photo Gallery | Dhaka University IT Society",
    description:
      "See the highlights of our journey. Photos from our biggest events, executive committee activities, and community gatherings.",
    url: "https://duitsbd.org/gallery",
    siteName: "Dhaka University IT Society",
    images: [
      {
        url: "/icons/duits-512.png",
        width: 512,
        height: 512,
        alt: "Dhaka University IT Society logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 dark:bg-slate-950">
      <section id="gallery" className="py-12 lg:py-16">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
            <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
              <p className="mb-2 text-xs font-semibold uppercase text-blue-800 dark:text-blue-300">Archive</p>
              <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl dark:text-white">DUITS gallery</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">A visual record of society events, workshops, and campus life.</p>
            </header>

            {/* Content Area - Fetches Independently */}
            <Suspense fallback={<GlobalSkeleton />}>
              <GalleryContent />
            </Suspense>
        </div>
      </section>
    </main>
  );
}