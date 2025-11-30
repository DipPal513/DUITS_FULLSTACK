"use client";
import CountUp from "@/components/CountUp";
import { useState } from 'react';
// import 4 react icons of member, events, workshops, years
    
import { FaUsers } from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';
import { GrWorkshop } from 'react-icons/gr';
import { IoTrophyOutline } from 'react-icons/io5';

export default function Stat() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const stats = [
    { number: 7000, label: "Members", icon: <FaUsers />, color: "from-blue-500 to-cyan-500" },
    { number: 50, label: "Events Per Year", icon: <MdEventAvailable />, color: "from-purple-500 to-pink-500" },
    { number: 20, label: "Workshops", icon: <GrWorkshop />, color: "from-orange-500 to-yellow-500" },
    { number: 10, label: "Years of Excellence", icon: <IoTrophyOutline />, color: "from-green-500 to-emerald-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-gray-950 dark:via-black  dark:to-gray-900 bg-gray-200 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
              <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Statistics</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r dark:from-white dark:via-gray-200 dark:to-gray-400 from-gray-800 via-gray-500 to-gray-800 bg-clip-text text-transparent">
            DUITS by the Numbers
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Our impact in the university and beyond
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Card */}
              <div className={`
                relative bg-gradient-to-br dark:from-gray-900/80 dark:to-gray-950/80 
                backdrop-blur-xl rounded-2xl p-8  dark:bg-gray-900
                border dark:border-gray-800 border-gray-400 
                transition-all duration-500 ease-out
                ${hoveredIndex === index ? ' scale-100 border-blue-500/50 shadow-2xl shadow-blue-500/20' : 'hover:border-gray-700'}
              `}>
                {/* Glow effect */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500
                  bg-gradient-to-br ${stat.color}
                  ${hoveredIndex === index ? 'opacity-10' : ''}
                `}></div>
                
                {/* Icon */}
                <div className={`
                  text-5xl mb-6 transform transition-all duration-500
                  ${hoveredIndex === index ? 'scale-110 rotate-12' : ''}
                `}>
                  <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>

                {/* Number */}
                <div className={`
                  text-5xl md:text-6xl font-bold mb-4 
                  text-black dark:text-white
                  transition-all duration-500
                  ${hoveredIndex === index ? 'scale-110' : ''}
                `}>
                  <CountUp
                    from={0}
                    to={stat.number}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  {stat.number >= 1000 ? '+' : '+'}
                </div>

                {/* Label */}
                <div className="dark:text-gray-300 text-gray-500 text-base md:text-lg font-medium leading-tight">
                  {stat.label}
                </div>

                {/* Decorative corner */}
                <div className={`
                  absolute top-4 left-4 w-6 h-6 
                  transition-all duration-500
                  ${hoveredIndex === index ? `opacity-100` : 'opacity-30'}
                `}>
                  <div className={`w-full h-0.5 bg-gradient-to-r ${stat.color}`}></div>
                  <div className={`w-0.5 h-full bg-gradient-to-b ${stat.color}`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center items-center gap-2 mt-20">
          {stats.map((_, index) => (
            <div
              key={index}
              className={`
                h-1.5 rounded-full transition-all duration-300
                ${hoveredIndex === index ? 'w-12 bg-blue-500' : 'w-8 bg-gray-700'}
              `}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}