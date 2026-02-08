"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ChevronDown, FileText, ExternalLink, Play } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Virtual Minds, Real Work",
    oneLiner:
      "LLM-powered preference-based planning in VR through spatial multi-agent + human collaboration.",
    description:
      "Designed a modular agent orchestration framework for dynamic task decomposition and conflict resolution. Developed a Unity-based VR interface that renders LLM outputs as interactive embodied avatars with contextual UI, enabling real-time user intervention via speech and gesture.",
    image: "/images/project-vr.jpg",
    stack: ["Unity", "C#", "Quest 3", "Python", "LangChain"],
    badges: ["CHI '26"],
    metric: "User study validated",
    role: "Lead designer and developer of the VR multi-agent planning interface.",
    built: "Agent orchestration framework, embodied avatar system, contextual spatial UI, speech/gesture interaction.",
    learned: "Real-time human intervention significantly improves planning quality and user satisfaction over LLM-only baselines.",
    buildLog: [
      { phase: "Problem", detail: "LLM planning lacks human oversight and spatial context." },
      { phase: "Approach", detail: "Multi-agent framework with human-in-the-loop intervention in VR." },
      { phase: "System", detail: "Unity + LangChain pipeline with embodied avatars and contextual UI." },
      { phase: "Study", detail: "Controlled user studies comparing against LLM-only baselines." },
      { phase: "Results", detail: "Significantly improved planning quality, engagement, and satisfaction." },
    ],
    flagship: true,
  },
  {
    title: "ARena of Privacy",
    oneLiner:
      "AR smart home privacy visualization and interaction via HoloLens overlays.",
    description:
      "Designed a HoloLens-enabled Unity application that overlays sensor fields, data flows, and privacy settings into the physical environment. Built a comparative React web interface to evaluate traditional 2D interaction.",
    image: "/images/project-ar.jpg",
    stack: ["Unity", "C#", "HoloLens 2", "Object Tracking", "React", "TypeScript"],
    badges: ["CHI '24", "IJHCI"],
    metric: "Workload reduced",
    role: "Core developer for both AR and web interfaces.",
    built: "HoloLens AR overlay system, sensor field visualization, React comparison baseline.",
    learned: "AR visualization improved task accuracy, user understanding, and reduced cognitive workload relative to 2D web.",
    buildLog: [
      { phase: "Problem", detail: "Smart home privacy settings are invisible and hard to understand." },
      { phase: "Approach", detail: "AR overlays making sensor coverage and data flows visible in-situ." },
      { phase: "System", detail: "HoloLens 2 + Unity with object tracking and spatial anchoring." },
      { phase: "Study", detail: "Controlled comparison against a React web-based privacy dashboard." },
      { phase: "Results", detail: "Improved accuracy, understanding, and reduced cognitive workload." },
    ],
    flagship: false,
  },
  {
    title: "Vision-Based UAV Gimbal Tracking",
    oneLiner:
      "Real-time detection and tracking on a microcomputer for UAV target striking.",
    description:
      "Employed a neural network on a microcomputer for real-time target detection and tracking. Modeled target motion states and communicated with a two-axis gimbal controlled by STM32 for stable targeting.",
    image: "/images/project-uav.jpg",
    stack: ["C/C++", "STM32", "Hardware", "Neural Network"],
    badges: ["IEEE MASS '23", "Patent", "National 1st Prize"],
    metric: "Accuracy improved",
    role: "Lead on vision pipeline and gimbal control software.",
    built: "Neural network detection pipeline, motion state estimator, STM32 gimbal control firmware.",
    learned: "End-to-end hardware-software co-design demands tight latency budgets and robust real-time inference.",
    buildLog: [
      { phase: "Problem", detail: "Stable real-time targeting from a moving UAV platform." },
      { phase: "Approach", detail: "Neural network detection + motion modeling + gimbal PID control." },
      { phase: "System", detail: "Microcomputer inference + STM32 two-axis gimbal on UAV." },
      { phase: "Study", detail: "Live flight tests and competition evaluation." },
      { phase: "Results", detail: "National First Prize, published paper, and patent filed." },
    ],
    flagship: false,
  },
];

function ProjectCard({
  project,
  index,
  visible,
  highlighted,
  anchorId,
}: {
  project: (typeof projects)[0];
  index: number;
  visible: boolean;
  highlighted?: boolean;
  anchorId?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showLog, setShowLog] = useState(false);

  return (
    <Card
      id={anchorId}
      className={`glass border-border/50 overflow-hidden transition-all duration-700 hover:shadow-lg hover:shadow-primary/5 ${
        project.flagship ? "sm:col-span-2 lg:col-span-1" : ""
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${
        highlighted
          ? "ring-2 ring-primary/60 shadow-lg shadow-primary/20 animate-pulse"
          : ""
      }`}
      style={{ transitionDelay: `${200 + index * 150}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {project.flagship && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground text-xs">
              Flagship
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm text-foreground text-xs">
            {project.metric}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5">
        {/* Title + badges */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.badges.map((b) => (
              <Badge
                key={b}
                variant="outline"
                className="text-xs text-primary border-primary/30"
              >
                {b}
              </Badge>
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.oneLiner}
        </p>

        {/* Tech stack */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="text-xs"
            >
              {s}
            </Badge>
          ))}
        </div>

        {/* Expand: role / built / learned */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? "Hide details" : "My role & what I built"}
          <ChevronDown
            className={`h-3 w-3 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
        {expanded && (
          <div className="mt-3 space-y-2 rounded-lg bg-muted/50 p-3">
            <div>
              <p className="text-xs font-semibold text-foreground">My role</p>
              <p className="text-xs text-muted-foreground">{project.role}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">What I built</p>
              <p className="text-xs text-muted-foreground">{project.built}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">What we learned</p>
              <p className="text-xs text-muted-foreground">{project.learned}</p>
            </div>
          </div>
        )}

        {/* Build Log accordion */}
        <button
          onClick={() => setShowLog(!showLog)}
          className="mt-2 flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          aria-expanded={showLog}
        >
          {showLog ? "Hide build log" : "Build log"}
          <ChevronDown
            className={`h-3 w-3 transition-transform ${
              showLog ? "rotate-180" : ""
            }`}
          />
        </button>
        {showLog && (
          <div className="mt-2 space-y-1.5">
            {project.buildLog.map((step) => (
              <div key={step.phase} className="flex gap-2 text-xs">
                <span className="flex-shrink-0 font-semibold text-primary w-16">
                  {step.phase}
                </span>
                <span className="text-muted-foreground">{step.detail}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="text-xs h-8 bg-transparent">
            <FileText className="mr-1 h-3 w-3" />
            View Paper
          </Button>
          <Button size="sm" variant="outline" className="text-xs h-8 bg-transparent">
            <Play className="mr-1 h-3 w-3" />
            Watch Demo
          </Button>
          {project.title === "Virtual Minds, Real Work" && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8 bg-transparent"
              asChild
            >
              <a href="#playground">
                <Play className="mr-1 h-3 w-3" />
                Go to Playground
              </a>
            </Button>
          )}
          <Button size="sm" variant="ghost" className="text-xs h-8">
            <ExternalLink className="mr-1 h-3 w-3" />
            Case Study
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const visible = useScrollReveal(ref);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerHighlight = useCallback((id: string) => {
    setHighlightedId(id);
    if (highlightTimer.current) {
      clearTimeout(highlightTimer.current);
    }
    highlightTimer.current = setTimeout(() => setHighlightedId(null), 1200);
  }, []);

  const handleHash = useCallback(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash === "project-virtual-minds") {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      triggerHighlight(hash);
    }
  }, [triggerHighlight]);

  useEffect(() => {
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [handleHash]);

  return (
    <section id="projects" ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Projects
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Flagship work
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Each project combines functional prototypes with rigorous evaluation. Hover or expand to explore the full story.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const anchorId =
              project.title === "Virtual Minds, Real Work"
                ? "project-virtual-minds"
                : undefined;
            return (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              visible={visible}
              highlighted={anchorId ? highlightedId === anchorId : false}
              anchorId={anchorId}
            />
            );
          })}
        </div>
      </div>
    </section>
  );
}
