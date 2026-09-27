"use client";
import CountUp from "@/components/CountUp";
import { UsersRound, CalendarDays, Presentation, Award } from "lucide-react";

export default function Stat() {
  const stats = [
    { number: 7000, label: "Community members", icon: UsersRound },
    { number: 50, label: "Events each year", icon: CalendarDays },
    { number: 20, label: "Workshops", icon: Presentation },
    { number: 10, label: "Years of activity", icon: Award }
  ];

  return (
    <section className="border-b border-border bg-background py-12 sm:py-16">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 divide-x divide-y divide-border px-5 sm:grid-cols-4 sm:divide-y-0 sm:px-8 lg:px-12">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="flex min-h-28 items-center gap-4 px-3 py-5 sm:min-h-24 sm:px-6 sm:py-2">
              <Icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.8} aria-hidden="true" />
              <div>
                <p className="text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
                  <CountUp from={0} to={stat.number} separator="," direction="up" duration={1} className="count-up-text" />+
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}