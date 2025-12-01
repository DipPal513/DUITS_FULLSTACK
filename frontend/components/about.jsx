"use client";
import React, { useEffect, useRef } from 'react';

export default function AboutUs() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        section.style.opacity = '0';
        section.style.transition = 'opacity 1s ease';
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950">
      
      {/* Hero */}
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl w-full">
          <div className="mb-12">
            <div className="w-20 h-px bg-neutral-900 dark:bg-neutral-100 mb-8"></div>
            <h1 className="text-[clamp(3rem,8vw,7rem)] leading-[0.9] font-extralight tracking-tighter text-neutral-900 dark:text-neutral-50">
              IT<br/>Society
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl">
            Technology club at Dhaka University focused on practical learning and real projects
          </p>
        </div>
      </div>

      {/* About */}
      <div ref={(el) => (sectionsRef.current[0] = el)} className="px-8 py-32 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-16">
          <div className="text-neutral-400 dark:text-neutral-600 text-sm font-mono">001</div>
          <div className="space-y-12">
            <p className="text-[clamp(1.5rem,3vw,2.5rem)] leading-tight font-light text-neutral-800 dark:text-neutral-200">
              Started in 2015 by students tired of just theory. We wanted to actually build things.
            </p>
            <div className="grid md:grid-cols-2 gap-12 text-neutral-600 dark:text-neutral-400">
              <p className="leading-loose">
                Most of us came in not knowing much beyond basic HTML. Now members work at companies across Bangladesh and abroad, run their own startups, contribute to open source.
              </p>
              <p className="leading-loose">
                We're not about certificates or resume padding. Just a group that meets regularly to learn whatever tech interests us at the moment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image 1 */}
      <div className="px-8 pb-32">
        <div className="max-w-6xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop&q=80" 
            alt=""
            className="w-full h-[60vh] object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>

      {/* Mission/Vision */}
      <div ref={(el) => (sectionsRef.current[1] = el)} className="px-8 py-32 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-16">
          <div className="text-neutral-400 dark:text-neutral-600 text-sm font-mono">002</div>
          <div className="grid md:grid-cols-2 gap-24">
            <div>
              <div className="mb-8 text-xs tracking-[0.3em] text-neutral-400 dark:text-neutral-600">MISSION</div>
              <p className="text-2xl leading-relaxed font-light text-neutral-700 dark:text-neutral-300">
                Create space where students learn tech through building real projects, not memorizing slides. Share knowledge freely. Help each other debug at 2am.
              </p>
            </div>
            <div>
              <div className="mb-8 text-xs tracking-[0.3em] text-neutral-400 dark:text-neutral-600">VISION</div>
              <p className="text-2xl leading-relaxed font-light text-neutral-700 dark:text-neutral-300">
                Graduate students who can ship products, not just pass exams. Build a community where helping others is the default, not an exception.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div ref={(el) => (sectionsRef.current[2] = el)} className="px-8 py-32 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-16">
          <div className="text-neutral-400 dark:text-neutral-600 text-sm font-mono">003</div>
          <div>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="space-y-4">
                <div className="text-6xl font-extralight text-neutral-300 dark:text-neutral-700">01</div>
                <h3 className="text-xl font-light text-neutral-900 dark:text-neutral-100">Sessions</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Thursday evenings. Someone teaches what they learned that week. Web frameworks, Linux, databases, whatever.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-6xl font-extralight text-neutral-300 dark:text-neutral-700">02</div>
                <h3 className="text-xl font-light text-neutral-900 dark:text-neutral-100">Projects</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Teams form around ideas. Build for 6-8 weeks. Some fail, some become actual products people use.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-6xl font-extralight text-neutral-300 dark:text-neutral-700">03</div>
                <h3 className="text-xl font-light text-neutral-900 dark:text-neutral-100">Events</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Hackathons twice yearly. Alumni talks when someone's back in town. Random workshops when people ask.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="px-8 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&q=80" 
            alt=""
            className="w-full h-80 object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&q=80" 
            alt=""
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Principles */}
      <div ref={(el) => (sectionsRef.current[3] = el)} className="px-8 py-32 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-16">
          <div className="text-neutral-400 dark:text-neutral-600 text-sm font-mono">004</div>
          <div className="space-y-16">
            <div className="border-l border-neutral-900 dark:border-neutral-100 pl-8 space-y-2">
              <h3 className="text-lg font-light">No prerequisites</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Everyone starts somewhere. First-years learning HTML sit next to seniors building ML models.</p>
            </div>
            <div className="border-l border-neutral-900 dark:border-neutral-100 pl-8 space-y-2">
              <h3 className="text-lg font-light">Build in public</h3>
              <p className="text-neutral-600 dark:text-neutral-400">GitHub repos are open. Ask questions in the group chat. Share bugs, not just wins.</p>
            </div>
            <div className="border-l border-neutral-900 dark:border-neutral-100 pl-8 space-y-2">
              <h3 className="text-lg font-light">Real over perfect</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Shipped code beats perfect code sitting on your laptop. Iterate, don't polish endlessly.</p>
            </div>
            <div className="border-l border-neutral-900 dark:border-neutral-100 pl-8 space-y-2">
              <h3 className="text-lg font-light">Help each other</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Got stuck? Someone will help. Figured something out? Share it. Simple as that.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Numbers */}
      <div className="px-8 py-32 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <div className="text-5xl font-extralight mb-3 text-neutral-900 dark:text-neutral-100">480</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-500">Active members</div>
          </div>
          <div>
            <div className="text-5xl font-extralight mb-3 text-neutral-900 dark:text-neutral-100">9</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-500">Years running</div>
          </div>
          <div>
            <div className="text-5xl font-extralight mb-3 text-neutral-900 dark:text-neutral-100">140+</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-500">Events hosted</div>
          </div>
          <div>
            <div className="text-5xl font-extralight mb-3 text-neutral-900 dark:text-neutral-100">60+</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-500">Projects launched</div>
          </div>
        </div>
      </div>

      {/* Join */}
      <div className="px-8 py-48">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-[clamp(2rem,5vw,4rem)] leading-tight font-extralight text-neutral-900 dark:text-neutral-50">
              Drop by sometime
            </h2>
          </div>
          <div className="space-y-8 mb-16">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Thursday at 6pm, Room 304, Science Building. Bring a laptop if you want. First session is always awkward, then it gets better.
            </p>
            <p className="text-neutral-500 dark:text-neutral-500">
              Questions? Message us on Facebook or find anyone wearing a DUITS t-shirt on campus.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="px-10 py-4 bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 text-sm tracking-wide hover:opacity-80 transition-opacity">
              JOIN
            </a>
            <a href="#" className="px-10 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm tracking-wide hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors">
              EVENTS
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="text-sm text-neutral-500 dark:text-neutral-500">
            Dhaka University IT Society<br/>
            Established 2015
          </div>
          <div className="flex gap-8 text-sm text-neutral-600 dark:text-neutral-400">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Facebook</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">GitHub</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Email</a>
          </div>
        </div>
      </div>

    </div>
  );
}