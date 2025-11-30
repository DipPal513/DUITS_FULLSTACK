"use client"
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function PresidentMessage() {
  const cardRef = useRef(null);
  const avatarRef = useRef(null);
  const quoteRef = useRef(null);
  const accentRef = useRef(null);
  const borderRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const avatar = avatarRef.current;
    const quote = quoteRef.current;
    const accent = accentRef.current;
    const border = borderRef.current;

    const handleMouseEnter = () => {
      gsap.to(quote, {
        x: 4,
        color: "#e5e5e5",
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(border, {
        opacity: 1,
        duration: 0.4
      });
    };

    const handleMouseLeave = () => {
      gsap.to(quote, {
        x: 0,
        color: "#a3a3a3",
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(border, {
        opacity: 0,
        duration: 0.4
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className=" bg-gray-200 dark:bg-neutral-950 text-gray-900 dark:text-white py-32 px-4 md:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3 tracking-tight text-gray-900 dark:text-white">
            Messages from Our President
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 text-base">
            A message from the President of the club of DUITS
          </p>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          className="relative bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-8 md:p-12 cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Animated border overlay */}
          <div
            ref={borderRef}
            className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              border: '1px solid rgba(102, 126, 234, 0.3)'
            }}
          />

          {/* Profile Section */}
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div
              ref={avatarRef}
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <img src="/arean.jpeg" alt="Abdullah Al Hanif Arean" className="w-full h-full object-cover" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-1 tracking-tight text-gray-900 dark:text-white">
                Abdullah Al Hanif Arean
              </h2>
              <p className="text-gray-600 dark:text-neutral-400 text-sm">
                President, Department of CSE
              </p>
            </div>
          </div>

          {/* Quote */}
          <div className="relative">
            <div className="absolute -left-2 -top-2 text-6xl font-serif text-purple-500 dark:text-purple-400 opacity-20 leading-none">
              "
            </div>
            <blockquote
              ref={quoteRef}
              className="text-gray-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed italic pl-6 relative z-10"
            >
              At DUITS, we believe in the transformative power of technology and innovation. Our mission is to foster a vibrant community where students can collaborate, learn, and create cutting-edge solutions that address real-world challenges. Together, we are shaping the future of technology, one idea at a time.
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}