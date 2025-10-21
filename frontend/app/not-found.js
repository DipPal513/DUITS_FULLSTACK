"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Home, RefreshCw, Search } from 'lucide-react';

export default function NotFound() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const glitchRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Cursor follow effect
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + 'px';
        cursorDotRef.current.style.top = e.clientY + 'px';
      }

      // Move floating elements based on cursor
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const deltaX = (e.clientX - centerX) * 0.05;
          const deltaY = (e.clientY - centerY) * 0.05;
          
          el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
      });
    };

    // Glitch effect
    const glitchInterval = setInterval(() => {
      if (glitchRef.current) {
        glitchRef.current.style.animation = 'none';
        setTimeout(() => {
          if (glitchRef.current) {
            glitchRef.current.style.animation = 'glitch 0.3s ease-in-out';
          }
        }, 10);
      }
    }, 3000);

    // Floating animation
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        const delay = index * 0.2;
        const duration = 3 + Math.random() * 2;
        el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      }
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden cursor-none">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-10 h-10 border-2 border-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-200 ease-out"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Floating Elements */}
      <div 
        ref={el => floatingElementsRef.current[0] = el}
        className="absolute top-20 left-20 w-20 h-20 border border-cyan-500 rounded-lg opacity-30"
      />
      <div 
        ref={el => floatingElementsRef.current[1] = el}
        className="absolute top-40 right-32 w-16 h-16 border border-purple-500 rounded-full opacity-20"
      />
      <div 
        ref={el => floatingElementsRef.current[2] = el}
        className="absolute bottom-32 left-40 w-24 h-24 border border-pink-500 opacity-20"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
      <div 
        ref={el => floatingElementsRef.current[3] = el}
        className="absolute bottom-40 right-20 w-32 h-32 border border-cyan-500 opacity-10 rounded-lg"
      />
      <div 
        ref={el => floatingElementsRef.current[4] = el}
        className="absolute top-1/2 left-1/4 w-12 h-12 border border-purple-400 rounded-full opacity-25"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* 404 Text with Glitch */}
        <div className="relative mb-8">
          <h1
            ref={glitchRef}
            className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
          >
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-cyan-400 opacity-70 mix-blend-screen"
            style={{ animation: 'glitchSkew 5s infinite' }}>
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="inline-block" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
              Page Not Found
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto" 
            style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}>
            The page you're looking for has been{' '}
            <span className="text-cyan-400 font-semibold">disconnected</span> from the IT Club network.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.6s both' }}>
          <button className="group px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2">
            <Home size={20} />
            <span>Return Home</span>
          </button>
          
          <button className="group px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2">
            <Search size={20} />
            <span>Search</span>
          </button>
          
          <button className="group px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 flex items-center gap-2">
            <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Tech Info */}
        <div className="mt-16 text-center"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.8s both' }}>
          <div className="inline-block px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-gray-500 font-mono">
              ERROR_CODE: <span className="text-cyan-400">IT_CLUB_404</span> | 
              STATUS: <span className="text-red-400">DISCONNECTED</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes glitchSkew {
          0%, 100% {
            transform: skew(0deg);
          }
          20% {
            transform: skew(2deg);
          }
          40% {
            transform: skew(-2deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  );
}