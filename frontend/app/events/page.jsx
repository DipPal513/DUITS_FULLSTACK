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
    <main className="min-h-screen bg-slate-50 pt-24 dark:bg-slate-950">
      <section id="events" className="py-12 lg:py-16">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
          <Suspense fallback={<GlobalSkeleton />}>
            <EventsContent page={page} filter={filter} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}