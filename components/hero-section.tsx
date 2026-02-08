"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Download, Mail } from "lucide-react";
import Image from "next/image";

const roles = [
  "HCI Researcher",
  "Human-AI Collaboration",
  "LLM Agents",
  "XR Builder",
  "Interaction Designer",
];

const chips = [
  { icon: "brain", label: "Human-AI" },
  { icon: "bot", label: "LLM Agents" },
  { icon: "glasses", label: "XR" },
  { icon: "chart", label: "Visualization" },
];

function ChipIcon({ type }: { type: string }) {
  switch (type) {
    case "brain":
      return (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a8 8 0 0 0-8 8c0 3.4 2.1 6.3 5 7.5V20h6v-2.5c2.9-1.2 5-4.1 5-7.5a8 8 0 0 0-8-8z"/>
          <path d="M12 2v4M8 6l2 2M16 6l-2 2M12 12v4"/>
        </svg>
      );
    case "bot":
      return (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v4"/>
          <line x1="8" y1="16" x2="8" y2="16"/>
          <line x1="16" y1="16" x2="16" y2="16"/>
        </svg>
      );
    case "glasses":
      return (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="15" r="4"/>
          <circle cx="18" cy="15" r="4"/>
          <path d="M10 15h4"/>
          <path d="M2 15h0M22 15h0"/>
        </svg>
      );
    case "chart":
      return (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M7 16l4-4 4 4 6-6"/>
        </svg>
      );
    default:
      return null;
  }
}

function AgentNodes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const nodes = useRef([
    { x: 80, y: 60, vx: 0.3, vy: 0.2, label: "Agent" },
    { x: 200, y: 100, vx: -0.2, vy: 0.3, label: "Human" },
    { x: 140, y: 180, vx: 0.25, vy: -0.15, label: "Plan" },
    { x: 260, y: 50, vx: -0.15, vy: 0.25, label: "VR" },
    { x: 50, y: 150, vx: 0.2, vy: -0.2, label: "LLM" },
  ]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const ns = nodes.current;

    // Update positions
    for (const n of ns) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 20 || n.x > w - 20) n.vx *= -1;
      if (n.y < 20 || n.y > h - 20) n.vy *= -1;

      // Subtle mouse influence
      const dx = mouseRef.current.x - n.x;
      const dy = mouseRef.current.y - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100 && dist > 0) {
        n.x -= (dx / dist) * 0.5;
        n.y -= (dy / dist) * 0.5;
      }
    }

    // Draw connections
    for (let i = 0; i < ns.length; i++) {
      for (let j = i + 1; j < ns.length; j++) {
        const dx = ns[i].x - ns[j].x;
        const dy = ns[i].y - ns[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 188, 212, ${0.3 * (1 - dist / 180)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(ns[i].x, ns[i].y);
          ctx.lineTo(ns[j].x, ns[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const n of ns) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 188, 212, 0.8)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 188, 212, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = "10px sans-serif";
      ctx.fillStyle = "rgba(0, 188, 212, 0.6)";
      ctx.textAlign = "center";
      ctx.fillText(n.label, n.x, n.y - 16);
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={240}
      className="absolute bottom-0 right-0 opacity-60 pointer-events-auto"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }}
      aria-hidden="true"
    />
  );
}

function TypingRole() {
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[current];

    if (!deleting && text === role) {
      const timeout = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setCurrent((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        if (deleting) {
          setText((prev) => prev.slice(0, -1));
        } else {
          setText(role.slice(0, text.length + 1));
        }
      },
      deleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, current]);

  return (
    <span className="text-primary">
      {text}
      <span className="animate-typing-cursor ml-0.5 inline-block w-0.5 h-5 bg-primary align-middle" />
    </span>
  );
}

export function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden grid-bg">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 pt-20 pb-12 lg:flex-row lg:items-center lg:gap-16 lg:px-6">
        {/* Left content */}
        <div
          className={`flex-1 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Welcome to my research lab
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {"Hi, I'm "}
            <span className="text-primary">Ziyi Zhang</span>
          </h1>
          <div className="mt-4 h-8 text-xl font-medium sm:text-2xl">
            <TypingRole />
          </div>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I build immersive systems where humans and AI co-plan, visualize, and interact. 
            My work spans VR/AR interfaces, LLM agent orchestration, and interaction design, 
            grounded in rigorous user studies.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <a href="#research">
                Explore Research
                <ArrowDown className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-1 h-4 w-4" />
              Download CV
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href="#contact" className="text-muted-foreground">
                <Mail className="mr-1 h-4 w-4" />
                Get in touch
              </a>
            </Button>
          </div>

          {/* Interest chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((chip, i) => (
              <Badge
                key={chip.label}
                variant="secondary"
                className={`gap-1.5 px-3 py-1.5 text-sm transition-all duration-300 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${600 + i * 100}ms` }}
              >
                <ChipIcon type={chip.icon} />
                {chip.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Right: Portrait + Agent Nodes */}
        <div
          className={`relative mt-12 flex flex-shrink-0 items-center justify-center lg:mt-0 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative">
            {/* Holographic frame */}
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 bg-card/30 backdrop-blur-sm" />
              <div className="absolute -inset-1 rounded-2xl bg-primary/5" />
              <div className="absolute inset-2 overflow-hidden rounded-xl">
                <Image
                  src="/images/portrait.jpg"
                  alt="Ziyi Zhang portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-primary rounded-tl-md" />
              <div className="absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2 border-primary rounded-tr-md" />
              <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-primary rounded-bl-md" />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-primary rounded-br-md" />
            </div>

            {/* Agent nodes canvas */}
            <AgentNodes />
          </div>
        </div>
      </div>
    </section>
  );
}
