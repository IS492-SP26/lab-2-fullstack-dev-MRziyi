"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const areas = [
  {
    title: "Human-AI Collaboration",
    description:
      "Designing workflows where humans can intervene, steer, and refine AI-driven processes in real time.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="4" />
        <circle cx="16" cy="16" r="4" />
        <path d="M11 5h6v6" />
        <path d="M13 11l4-4" />
      </svg>
    ),
  },
  {
    title: "LLM Agents",
    description:
      "Modular orchestration frameworks for task decomposition, preference alignment, and conflict resolution.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <circle cx="8" cy="16" r="1" />
        <circle cx="16" cy="16" r="1" />
      </svg>
    ),
  },
  {
    title: "Immersive Tech (AR/VR)",
    description:
      "Embodied interfaces, spatial UI, and multimodal interaction through speech, gesture, and gaze.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="10" rx="3" />
        <path d="M12 7v-2" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="16" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Visualization & Interaction Design",
    description:
      "Making complex systems understandable and controllable through clear, engaging visual interfaces.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 6 4-10" />
      </svg>
    ),
  },
];

const principles = ["Clarity", "Control", "Trust", "Delight"];

export function ResearchSection() {
  const ref = useRef<HTMLElement>(null);
  const visible = useScrollReveal(ref);

  return (
    <section
      id="research"
      ref={ref}
      className="relative py-24 lg:py-32 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Research
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What I investigate
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            My research sits at the intersection of intelligent systems and human experience,
            building tools that empower people rather than replace them.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {areas.map((area, i) => (
            <Card
              key={area.title}
              className={`glass border-border/50 transition-all duration-700 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {area.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{area.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Research principles strip */}
        <div
          className={`mt-12 flex flex-wrap items-center justify-center gap-6 rounded-xl border border-border/50 bg-card/50 px-8 py-5 transition-all duration-700 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Research Principles
          </span>
          <div className="h-4 w-px bg-border hidden sm:block" />
          {principles.map((p) => (
            <span key={p} className="text-sm font-semibold text-foreground">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
