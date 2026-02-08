"use client";

import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Trophy, Award, Star, Medal, LayoutGrid, List } from "lucide-react";

const awards = [
  {
    title: "President's Scholarship",
    date: "Aug 2023",
    year: 2023,
    detail: "Top 0.5% of students in the school",
    amount: "8,000 CNY",
    icon: Trophy,
    tier: "gold",
  },
  {
    title: "Outstanding Student International Exchange Scholarship",
    date: "Jan 2024",
    year: 2024,
    detail: "Top 1% of students in the school",
    amount: "84,000 CNY",
    icon: Star,
    tier: "gold",
  },
  {
    title: "RoboMaster 2024 National First Prize",
    date: "Aug 2024",
    year: 2024,
    detail: "23rd National University Robot Competition, sponsored by DJI",
    icon: Trophy,
    tier: "gold",
  },
  {
    title: "RoboMaster 2023 National Second Prize",
    date: "Aug 2023",
    year: 2023,
    detail: "22nd National University Robot Competition, sponsored by DJI",
    icon: Medal,
    tier: "silver",
  },
  {
    title: "Software Innovation Scholarship",
    date: "May 2023",
    year: 2023,
    detail: "Top 5% of students in the school",
    amount: "5,000 CNY",
    icon: Award,
    tier: "silver",
  },
  {
    title: "Zhishan Scholar",
    date: "2022 & 2024",
    year: 2024,
    detail: "Top 5% of students in the school",
    amount: "3,000 CNY",
    icon: Award,
    tier: "silver",
  },
  {
    title: "Innovation & Entrepreneurship Silver Award",
    date: "May 2023",
    year: 2023,
    detail: "Southeast University Innovation and Entrepreneurship Competition",
    icon: Medal,
    tier: "bronze",
  },
  {
    title: "Outstanding Student",
    date: "2022 & 2023",
    year: 2023,
    detail: "Academic Excellence Award, Southeast University",
    icon: Star,
    tier: "bronze",
  },
  {
    title: "Outstanding Volunteer Service Award",
    date: "Dec 2023",
    year: 2023,
    detail: "Service and Leadership Award",
    icon: Award,
    tier: "bronze",
  },
];

const tierColors: Record<string, string> = {
  gold: "text-amber-500",
  silver: "text-muted-foreground",
  bronze: "text-orange-400",
};

export function AwardsSection() {
  const ref = useRef<HTMLElement>(null);
  const visible = useScrollReveal(ref);
  const [view, setView] = useState<"grid" | "timeline">("grid");

  return (
    <section id="awards" ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Awards
            </p>
            <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Recognition
            </h2>
          </div>
          <div
            className={`flex items-center gap-1 rounded-lg bg-muted p-1 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                view === "grid"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Grid
            </button>
            <button
              onClick={() => setView("timeline")}
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                view === "timeline"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              Timeline
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award, i) => (
              <Card
                key={award.title}
                className={`glass border-border/50 transition-all duration-700 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + i * 60}ms` }}
              >
                <CardContent className="flex items-start gap-3 p-4">
                  <award.icon
                    className={`h-5 w-5 flex-shrink-0 mt-0.5 ${tierColors[award.tier]}`}
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground leading-snug">
                      {award.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {award.detail}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline" className="text-xs">
                        {award.date}
                      </Badge>
                      {award.amount && (
                        <Badge variant="secondary" className="text-xs">
                          {award.amount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-10 relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border sm:left-1/2" />
            <div className="space-y-8">
              {awards.map((award, i) => (
                <div
                  key={award.title}
                  className={`relative flex items-start gap-4 sm:gap-8 transition-all duration-700 ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  } ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                  style={{ transitionDelay: `${200 + i * 60}ms` }}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"} hidden sm:block`}>
                    <p className="text-xs text-muted-foreground">{award.date}</p>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-10">
                    <div className={`h-3 w-3 rounded-full border-2 border-background ${
                      award.tier === "gold" ? "bg-amber-500" : award.tier === "silver" ? "bg-muted-foreground" : "bg-orange-400"
                    }`} />
                  </div>
                  <div className="flex-1 pl-10 sm:pl-0">
                    <p className="text-xs text-muted-foreground sm:hidden">{award.date}</p>
                    <h3 className="text-sm font-semibold text-foreground">
                      {award.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{award.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
