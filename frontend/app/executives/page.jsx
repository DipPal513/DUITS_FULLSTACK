import { Suspense } from "react";
import TeamContent from "@/components/team/TeamContent";

// 1. Dynamic Metadata Generation
export async function generateMetadata({ searchParams }) {
  // Await params (Next.js 15 requirement)
  const params = await searchParams;
  const year = params?.year;

  // If a specific year is selected, show it in the title (e.g., "2022-23 Panel")
  // Otherwise, use the default "Executive Committee"
  const title = year 
    ? `Executive Committee ${year} | DUITS` 
    : "Executive Committee | DUITS";

  return {
    title: title,
    description:
      "Meet the visionary leaders and executive members of Dhaka University IT Society (DUITS). Explore our current committee and the history of past panels who built this legacy.",
    openGraph: {
      title: title,
      description:
        "The dedicated team behind DUITS. See the current Executive Committee and past leaders of the University of Dhaka's premier IT organization.",
      url: "https://duitsbd.org/executives",
      siteName: "Dhaka University IT Society",
      images: [
        {
          url: "https://i.ibb.co.com/tPBj742j/gallery-duits.jpg", // Replace with a group photo of the EC
          width: 1200,
          height: 630,
          alt: "DUITS Executive Committee",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

// A simple Skeleton specific to the Team page
function ExecutiveSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-96 rounded-2xl bg-gray-200 dark:bg-gray-800"
        />
      ))}
    </div>
  );
}

export default async function ExecutivePage({ searchParams }) {
  const params = await searchParams;
  const year = params?.year || "";
  const batch = params?.batch || "";

  return (
    <section
      id="team"
      className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 min-h-screen"
    >
      <div className="container mx-auto px-4 pt-32 lg:px-8 max-w-7xl">
        {/* The Suspense Boundary isolates the slow part */}
        <Suspense key={`${year}-${batch}`} fallback={<ExecutiveSkeleton />}>
          <TeamContent year={year} batch={batch} />
        </Suspense>
      </div>
    </section>
  );
}