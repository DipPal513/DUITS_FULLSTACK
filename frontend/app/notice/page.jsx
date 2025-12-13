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
        url: "https://i.ibb.co.com/tPBj742j/gallery-duits.jpg", // Replace with an image of a notice board or logo
        width: 1200,
        height: 630,
        alt: "DUITS Official Announcements",
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
      className="py-20 lg:py-32 relative bg-background text-foreground transition-colors duration-300"
    >
      <div className="container pt-32 mx-auto px-4 lg:px-8">
        {/* 2. Suspense Boundary for Instant Loading */}
        <Suspense key={`${page}-${filter}`} fallback={<GlobalSkeleton />}>
          <NoticesContent currentPage={page} filter={filter} />
        </Suspense>
      </div>
    </section>
  );
}