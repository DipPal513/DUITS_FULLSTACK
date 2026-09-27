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
      className="min-h-screen bg-slate-50 pb-16 pt-24 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-screen-2xl px-5 pt-10 sm:px-8 lg:px-12">
        <Suspense key={`${year}-${batch}`} fallback={<ExecutiveSkeleton />}>
          <TeamContent year={year} batch={batch} />
        </Suspense>
      </div>
    </section>
  );
}