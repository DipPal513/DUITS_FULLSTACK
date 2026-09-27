import { Suspense } from "react";
import NoticesContent from "@/components/notices/NoticesContent";
import GlobalSkeleton from "@/components/GlobalSkeleton";

export const metadata = {
  title: "Notices & Announcements | DUITS",
  description:
    "Official updates, press releases, event schedules, and administrative announcements from the Dhaka University IT Society Executive Committee.",
  openGraph: {
    title: "Official Notices | DUITS",
    description:
      "Stay updated with the latest news, registration deadlines, and important announcements from Dhaka University IT Society.",
    url: "https://duitsbd.org/notice",
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

export default async function NoticesPage({ searchParams }) {
  // 1. Read URL params (Next.js 15+ requires awaiting searchParams)
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const filter = params?.filter || "all";

  return (
    <section
      id="notices"
      className="min-h-screen bg-slate-50 pb-16 pt-24 text-foreground transition-colors duration-300 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-screen-2xl px-5 pt-10 sm:px-8 lg:px-12">
        {/* 2. Suspense Boundary for Instant Loading */}
        <Suspense key={`${page}-${filter}`} fallback={<GlobalSkeleton />}>
          <NoticesContent currentPage={page} filter={filter} />
        </Suspense>
      </div>
    </section>
  );
}