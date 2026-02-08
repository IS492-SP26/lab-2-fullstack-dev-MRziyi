"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Focus, Tag, Coffee } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const quickFacts = [
  {
    icon: MapPin,
    label: "Location",
    value: "Champaign, IL",
    note: "Open to collaboration",
  },
  {
    icon: Focus,
    label: "Focus",
    value: "HCI / Human-AI / LLM Agents / AR & VR",
  },
  {
    icon: Tag,
    label: "Keywords",
    value: "User study, interaction design, immersive UI, agent orchestration",
  },
  {
    icon: Coffee,
    label: "Off-screen",
    value: "Coffee, VR tinkering, visual storytelling, research sketches",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const visible = useScrollReveal(ref);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            About
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The person behind the prototypes
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left: narrative */}
          <div
            className={`flex-1 space-y-5 text-base leading-relaxed text-muted-foreground transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p>
              {"I'm currently pursuing an MS in Information Management at the "}
              <span className="font-medium text-foreground">
                University of Illinois Urbana-Champaign
              </span>
              , where I explore the intersection of human cognition and intelligent systems.
            </p>
            <p>
              {"My background includes a BS in Software Engineering from "}
              <span className="font-medium text-foreground">
                Southeast University
              </span>
              {" (GPA 3.79/4.0) and an exchange semester in Computer Science at the "}
              <span className="font-medium text-foreground">
                University of California, Santa Barbara
              </span>
              {" (GPA 4.0/4.0), covering computer vision, graphics, and compilers."}
            </p>
            <p>
              I thrive at the boundary of research and building. My projects
              combine rigorous user studies with functional prototypes, from
              VR multi-agent planning systems to AR privacy interfaces. I care
              deeply about designing interactions that give people genuine
              control over increasingly powerful AI.
            </p>
          </div>

          {/* Right: Quick Facts */}
          <div
            className={`flex-1 space-y-3 transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {quickFacts.map((fact) => (
              <Card key={fact.label} className="glass border-border/50">
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <fact.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {fact.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {fact.value}
                    </p>
                    {fact.note && (
                      <p className="mt-0.5 text-xs text-primary">{fact.note}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
