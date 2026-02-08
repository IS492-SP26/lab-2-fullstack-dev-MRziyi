"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skillGroups = [
  {
    category: "XR & 3D",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="10" rx="3" />
        <path d="M12 7v-2" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="16" cy="12" r="2" />
      </svg>
    ),
    skills: [
      { name: "Unity", context: "Used in VR planning system and AR privacy app" },
      { name: "C#", context: "Primary language for Unity XR development" },
      { name: "Quest 3", context: "Used in Virtual Minds VR multi-agent system" },
      { name: "HoloLens 2", context: "Used in ARena of Privacy" },
      { name: "Object Tracking", context: "Used in AR spatial anchoring" },
    ],
  },
  {
    category: "Web",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    skills: [
      { name: "React", context: "Used in ARena of Privacy web baseline" },
      { name: "TypeScript", context: "Used in web development projects" },
      { name: "Web Development", context: "Full-stack web interfaces" },
    ],
  },
  {
    category: "AI / Agents",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 3.4 2.1 6.3 5 7.5V20h6v-2.5c2.9-1.2 5-4.1 5-7.5a8 8 0 0 0-8-8z" />
        <path d="M12 12v4" />
      </svg>
    ),
    skills: [
      { name: "Python", context: "Used in LangChain agent orchestration" },
      { name: "LangChain", context: "Used in VR planning multi-agent system" },
      { name: "LLM Prototyping", context: "Rapid agent pipeline design and testing" },
    ],
  },
  {
    category: "Systems / Hardware",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
      </svg>
    ),
    skills: [
      { name: "C", context: "Used in STM32 gimbal firmware" },
      { name: "C++", context: "Used in detection neural network pipeline" },
      { name: "STM32", context: "Used in UAV gimbal control system" },
      { name: "Embedded / Robotics", context: "Hardware-software co-design in RoboMaster" },
    ],
  },
  {
    category: "Research",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    skills: [
      { name: "Usability", context: "Core HCI research method" },
      { name: "User Study Design", context: "Controlled experiments across all projects" },
      { name: "Data Storytelling", context: "UIUC coursework and research" },
      { name: "Prototyping", context: "Rapid prototyping for all research projects" },
    ],
  },
];

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const visible = useScrollReveal(ref);

  return (
    <section
      id="skills"
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
            Skills
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Technical toolkit
          </h2>
        </div>

        <TooltipProvider delayDuration={200}>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, gi) => (
              <div
                key={group.category}
                className={`rounded-xl border border-border/50 bg-card/50 p-5 transition-all duration-700 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + gi * 100}ms` }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {group.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {group.category}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Tooltip key={skill.name}>
                      <TooltipTrigger asChild>
                        <span className="cursor-default rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                          {skill.name}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{skill.context}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
