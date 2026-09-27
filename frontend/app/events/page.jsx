import { Suspense } from "react";
import EventsContent from "@/components/events/EventContent";
import GlobalSkeleton from "@/components/GlobalSkeleton";

// Define Metadata for SEO
export const metadata = {
  title: "Events & Activities | DUITS",
  description:
    "Explore upcoming seminars, workshops, hackathons, and the National Campus IT Fest organized by Dhaka University IT Society (DUITS). Stay updated with the latest tech events on campus.",
  openGraph: {
    title: "Upcoming Events | Dhaka University IT Society",
    description:
      "Join the biggest tech community at Dhaka University. Check out our latest workshops, bootcamps, and the signature National Campus IT Fest.",
    url: "https://duitsbd.org/events",
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

export default async function EventsPage({ searchParams }) {
  // 1. Await params instantly (Next.js 15/16 requirement)
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const filter = params?.filter || "all";

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <section className="pt-20">
        <div
          id="events"
          className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50"
        >
          <div className="container mx-auto px-6 lg:px-8">
            <Suspense fallback={<GlobalSkeleton />}>
              <EventsContent page={page} filter={filter} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}