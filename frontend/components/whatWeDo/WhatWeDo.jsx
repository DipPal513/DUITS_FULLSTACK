"use client";
import React from 'react';
import { Code2, Sparkles, Users2, Rocket } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';

export default function WhatWeDo() {
  const sections = [
    {
      icon: Code2,
      title: "Learning & Development",
      gradient: "dark:from-blue-900/30 dark:to-purple-900/30 from-blue-50 to-purple-50",
      border: "dark:border-blue-800/30 border-blue-200",
      iconBg: "dark:bg-blue-500/20 bg-blue-100",
      iconColor: "dark:text-blue-400 text-blue-600",
      text: "We believe that learning should be hands-on, engaging, and practical. Our workshops cover everything from web development and mobile app creation to artificial intelligence, machine learning, and cybersecurity. Whether you're writing your first line of code or building complex systems, we provide the guidance, resources, and mentorship to help you grow. Our senior members and industry professionals conduct regular training sessions, ensuring you're always learning the latest technologies and best practices."
    },
    {
      icon: Users2,
      title: "Building Together",
      gradient: "dark:from-green-900/30 dark:to-teal-900/30 from-green-50 to-teal-50",
      border: "dark:border-green-800/30 border-green-200",
      iconBg: "dark:bg-green-500/20 bg-green-100",
      iconColor: "dark:text-green-400 text-green-600",
      text: "Some of our best work happens when we collaborate. Throughout the year, we organize team projects where members work together to solve real problems — building campus management systems, creating mobile apps for local businesses, or contributing to open-source projects that impact thousands of users. These projects don't just look good on resumes; they teach invaluable lessons about teamwork, project management, and delivering solutions that matter. Many of our alumni credit these collaborative experiences as pivotal moments in their careers."
    },
    {
      icon: Sparkles,
      title: "Compete & Excel",
      gradient: "dark:from-orange-900/30 dark:to-red-900/30 from-orange-50 to-red-50",
      border: "dark:border-orange-800/30 border-orange-200",
      iconBg: "dark:bg-orange-500/20 bg-orange-100",
      iconColor: "dark:text-orange-400 text-orange-600",
      text: "Competition brings out the best in us. We regularly host hackathons, coding competitions, and tech challenges that push participants to think creatively under pressure. Our members have represented Dhaka University in national and international programming contests, winning accolades and recognition. But it's not just about winning — it's about the thrill of solving complex problems, the camaraderie formed during late-night coding sessions, and the growth that comes from challenging yourself against the brightest minds."
    },
    {
      icon: Rocket,
      title: "Innovation & Impact",
      gradient: "dark:from-violet-900/30 dark:to-pink-900/30 from-violet-50 to-pink-50",
      border: "dark:border-violet-800/30 border-violet-200",
      iconBg: "dark:bg-violet-500/20 bg-violet-100",
      iconColor: "dark:text-violet-400 text-violet-600",
      text: "We're not just learning technology for its own sake — we're using it to make a difference. Our innovation lab is where ideas come to life, where students brainstorm solutions to campus challenges, community problems, and even national issues. We invite industry experts, successful entrepreneurs, and tech leaders to share their journeys and insights. For those with startup ambitions, we provide mentorship, networking opportunities, and the support system needed to turn concepts into viable businesses. Several startups have been born from our community, and we're proud to have played a part in their journey."
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br dark:from-gray-950 dark:via-black dark:to-gray-900 bg-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Main Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
            <div className="w-2 h-2 rounded-full dark:bg-blue-400 bg-blue-600 animate-pulse"></div>
            <span className="text-sm font-semibold dark:text-blue-400 text-blue-600">
              About Us
            </span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 leading-tight dark:text-white text-gray-900">
            What We Do at <br />
            <span className="dark:text-blue-400 text-blue-600">
              DU IT Club
            </span>
          </h1>
        </div>

        {/* Introduction */}
        <div className="text-lg leading-relaxed space-y-4 dark:text-gray-300 text-gray-700 mb-16">
          <p className="text-xl">
            The Dhaka University IT Club is more than just a student organization — it's a thriving community where passion meets purpose, and ideas transform into reality.
          </p>
          <p>
            Founded by students who share an unwavering enthusiasm for technology, we've created a space where innovation flourishes, skills are honed, and lifelong connections are forged. Every semester, hundreds of students walk through our doors, eager to learn, create, and push the boundaries of what's possible.
          </p>
        </div>
      </div>

      {/* ScrollStack with sections */}
      <ScrollStack 
        
      >
        {sections.map((section, index) => (
          <ScrollStackItem key={index} itemClassName="h-96">
            <div className={`h-full w-full bg-gradient-to-br ${section.gradient} border ${section.border} flex flex-col justify-center`}>
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-xl ${section.iconBg}`}>
                  <section.icon className={section.iconColor} size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-bold dark:text-white text-gray-900">
                    {section.title}
                  </h2>
                </div>
              </div>
              <p className="text-lg leading-relaxed dark:text-gray-300 text-gray-700">
                {section.text}
              </p>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Closing */}
        <div className="text-lg leading-relaxed space-y-4 dark:text-gray-300 text-gray-700 mb-16">
          <p>
            At the heart of everything we do is a simple belief: technology has the power to change the world, and the best way to harness that power is together. Whether you're a beginner taking your first steps into coding or an experienced developer looking to make an impact, the DU IT Club is your home.
          </p>
          <p className="text-xl font-semibold">
            Join us, and let's build the future together.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center p-12 rounded-2xl dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 bg-gradient-to-r from-blue-500 to-purple-500">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Be Part of Something Bigger?
          </h3>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
            Whether you're just curious or ready to dive in, we'd love to have you. Come to one of our events, join a workshop, or simply drop by to say hello.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Join the Community
          </button>
        </div>
      </div>
    </div>
  );
}