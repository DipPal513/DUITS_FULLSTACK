// pages/about.js (Next.js + Tailwind CSS)

import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <main className="bg-gray-50 min-h-screen font-sans px-6 py-16 max-w-7xl mx-auto">
      
      {/* Header Section */}
      <section className="md:flex md:items-center md:gap-16 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Dhaka University IT Society
          </h1>
          <p className="text-xl text-blue-600 font-medium mb-6">
            Empowering Bangladesh’s Next Generation of Technology Innovators
          </p>
          <p className="text-gray-700 leading-relaxed">
            Established with a passion to foster IT excellence among Dhaka University students, our society unites tech enthusiasts to explore emerging technologies,
            facilitate learning, and build a thriving community of innovators. Through workshops, seminars, hackathons, and mentorship, we nurture skill development for real-world impact.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <Image
            src="/society.jpg"
            width={400}
            height={400}
            alt="Dhaka University IT Society Team"
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white p-8 rounded-xl shadow border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">Our Vision</h2>
          <p className="text-gray-700 leading-snug">
            To be a beacon of technology leadership and innovation at Dhaka University, inspiring students to harness digital advancements for transforming society and enhancing lives.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-snug">
            - Facilitate access to cutting-edge IT knowledge tailored for academic and professional growth.<br/>
            - Create inclusive platforms for collaboration, skill-sharing, and mentorship.<br/>
            - Organize impactful events that bridge gaps between academia, industry, and practical innovation.<br/>
            - Advocate for sustainable tech practices and digital literacy among youth.
          </p>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
            <h3 className="font-bold text-xl mb-2 text-blue-600">Innovation</h3>
            <p className="text-gray-600">Embracing creativity and forward thinking to drive technological advances.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
            <h3 className="font-bold text-xl mb-2 text-blue-600">Collaboration</h3>
            <p className="text-gray-600">Building a supportive network where diversity fuels shared success.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
            <h3 className="font-bold text-xl mb-2 text-blue-600">Excellence</h3>
            <p className="text-gray-600">Pursuing the highest standards in learning, leadership, and technology projects.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
            <h3 className="font-bold text-xl mb-2 text-blue-600">Integrity</h3>
            <p className="text-gray-600">Upholding ethics, transparency, and responsibility in all endeavors.</p>
          </div>
        </div>
      </section>

      {/* History & Impact */}
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Story & Impact</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Since its inception in 2005, Dhaka University IT Society has grown from a small group of passionate students into one of the most active and prestigious technical communities on campus. Over the years, we have:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
          <li>Organized 50+ workshops covering programming, cybersecurity, AI, and cloud computing.</li>
          <li>Hosted annual hackathons that attracted over 500 participants from top universities nationwide.</li>
          <li>Established partnerships with leading tech companies providing internships and mentorship.</li>
          <li>Supported members in publishing research, launching startups, and winning national competitions.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Our community impact extends beyond campus by promoting digital literacy programs in underserved areas and advocating for sustainable technology usage. We pride ourselves on being a catalyst for positive change and technical empowerment.
        </p>
      </section>

      {/* Call to Action / Join Us */}
      <section className="bg-blue-600 text-white rounded-xl p-10 text-center max-w-4xl mx-auto shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Join Us</h2>
        <p className="mb-6 text-lg">Whether you’re a beginner, a seasoned coder, or a future tech leader, Dhaka University IT Society welcomes you! Be part of a vibrant community shaping tomorrow’s technology landscape.</p>
        <Link 
          href="/join"
          className="inline-block bg-white text-blue-600 font-semibold rounded-lg px-6 py-3 hover:bg-gray-100 transition"
        >
          Become a Member
        </Link>
      </section>
    </main>
  )
}
