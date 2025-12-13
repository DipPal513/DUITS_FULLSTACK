
import Contact from "@/components/contact";

export const metadata = {
  title: "Contact Us | DUITS",
  description:
    "Get in touch with Dhaka University IT Society (DUITS). Connect with the executive committee for collaborations, events, and membership inquiries. Located at TSC, University of Dhaka.",
  openGraph: {
    title: "Contact Dhaka University IT Society (DUITS)",
    description:
      "Connect with the leading IT-based student organization at the University of Dhaka. 'IT-enabled campus for better education.'",
    url: "https://duitsbd.org/contact",
    siteName: "Dhaka University IT Society",
    images: [
      {
        url: "https://i.ibb.co.com/9H9NcXxW/duits-512.jpg", 
        width: 1200,
        height: 630,
        alt: "DUITS Contact Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <div className="">
        <Contact />
      </div>
    </main>
  );
}