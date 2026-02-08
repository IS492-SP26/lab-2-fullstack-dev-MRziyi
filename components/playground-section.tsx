"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface Agent {
  id: string;
  role: string;
  shortRole: string;
  color: string;
  avatar: string;
  x: number;
  y: number;
  introduced: boolean;
}

interface PreferenceQuestion {
  agent: string;
  question: string;
  options: { label: string; effect: Record<string, number> }[];
}

interface NegotiationEvent {
  from: string;
  to: string;
  message: string;
}

type Stage = {
  id: number;
  name: string;
  description: string;
  agentsToIntroduce: string[];
  questions: PreferenceQuestion[];
  negotiations: NegotiationEvent[];
};

/* ------------------------------------------------------------------ */
/* Data — modelled after the MAVIS "Sci-Fi Club Promo Video" scenario  */
/* ------------------------------------------------------------------ */

const DIMENSIONS = [
  "Creativity",
  "Budget",
  "Timeline",
  "Quality",
  "Engagement",
] as const;
type Dim = (typeof DIMENSIONS)[number];

const INITIAL_SCORES: Record<Dim, number> = {
  Creativity: 40,
  Budget: 60,
  Timeline: 50,
  Quality: 45,
  Engagement: 35,
};

const ALL_AGENTS: Agent[] = [
  {
    id: "pm",
    role: "Project Manager",
    shortRole: "PM",
    color: "hsl(190, 95%, 50%)",
    avatar: "PM",
    x: 0.5,
    y: 0.18,
    introduced: true,
  },
  {
    id: "concept",
    role: "Concept Developer",
    shortRole: "Concept",
    color: "hsl(160, 70%, 50%)",
    avatar: "CD",
    x: 0.22,
    y: 0.38,
    introduced: false,
  },
  {
    id: "script",
    role: "Scriptwriter",
    shortRole: "Script",
    color: "hsl(35, 85%, 55%)",
    avatar: "SW",
    x: 0.78,
    y: 0.38,
    introduced: false,
  },
  {
    id: "cinema",
    role: "Cinematographer",
    shortRole: "Cinema",
    color: "hsl(280, 65%, 60%)",
    avatar: "CG",
    x: 0.22,
    y: 0.68,
    introduced: false,
  },
  {
    id: "budget",
    role: "Budget Analyst",
    shortRole: "Budget",
    color: "hsl(340, 75%, 55%)",
    avatar: "BA",
    x: 0.78,
    y: 0.68,
    introduced: false,
  },
];

const STAGES: Stage[] = [
  {
    id: 0,
    name: "Guideline Generation",
    description: "MAVIS analyzes your task and generates a staged roadmap.",
    agentsToIntroduce: [],
    questions: [],
    negotiations: [],
  },
  {
    id: 1,
    name: "Theme Exploration",
    description: "The Concept Developer explores your creative vision.",
    agentsToIntroduce: ["concept"],
    questions: [
      {
        agent: "concept",
        question: "What genre excites you most for this promo video?",
        options: [
          {
            label: "Sci-Fi / Space Opera",
            effect: { Creativity: 20, Engagement: 15, Budget: -10 },
          },
          {
            label: "Documentary-style",
            effect: { Quality: 15, Budget: 10, Creativity: -5 },
          },
          {
            label: "Comedy / Skit-based",
            effect: { Engagement: 25, Creativity: 10, Quality: -5 },
          },
        ],
      },
      {
        agent: "concept",
        question: "What emotion should the audience feel?",
        options: [
          {
            label: "Awe & Wonder",
            effect: { Creativity: 15, Quality: 10, Budget: -10 },
          },
          {
            label: "Excitement & Fun",
            effect: { Engagement: 20, Creativity: 5, Timeline: -5 },
          },
          {
            label: "Curiosity & Intrigue",
            effect: { Quality: 15, Engagement: 10, Creativity: 5 },
          },
        ],
      },
    ],
    negotiations: [],
  },
  {
    id: 2,
    name: "Script Development",
    description:
      "The Scriptwriter crafts a narrative aligned with your preferences.",
    agentsToIntroduce: ["script"],
    questions: [
      {
        agent: "script",
        question: "What narrative structure do you prefer?",
        options: [
          {
            label: "Day-in-the-life story",
            effect: { Engagement: 15, Timeline: 10, Quality: 5 },
          },
          {
            label: "Interview montage",
            effect: { Quality: 20, Budget: 5, Creativity: -5 },
          },
          {
            label: "Mini sci-fi short film",
            effect: { Creativity: 25, Engagement: 10, Budget: -15 },
          },
        ],
      },
    ],
    negotiations: [
      {
        from: "script",
        to: "concept",
        message: "The user's theme calls for a strong opening hook.",
      },
      {
        from: "concept",
        to: "script",
        message: "Agreed. Let's tie the hook to the chosen emotion.",
      },
    ],
  },
  {
    id: 3,
    name: "Production Planning",
    description:
      "Cinematographer and Budget Analyst join to negotiate feasibility.",
    agentsToIntroduce: ["cinema", "budget"],
    questions: [
      {
        agent: "cinema",
        question: "Which visual style fits your vision?",
        options: [
          {
            label: "Drone aerials + VFX",
            effect: { Quality: 20, Creativity: 10, Budget: -20 },
          },
          {
            label: "Handheld + natural light",
            effect: { Budget: 15, Timeline: 10, Quality: -5 },
          },
          {
            label: "Stylized color grading",
            effect: { Creativity: 15, Quality: 10, Budget: -5 },
          },
        ],
      },
      {
        agent: "budget",
        question: "How should we handle the budget constraint?",
        options: [
          {
            label: "Reallocate from post-prod",
            effect: { Budget: 15, Timeline: -10, Quality: -5 },
          },
          {
            label: "Seek sponsorship",
            effect: { Budget: 25, Timeline: -15, Engagement: 5 },
          },
          {
            label: "Simplify scope",
            effect: { Budget: 20, Timeline: 15, Creativity: -15 },
          },
        ],
      },
    ],
    negotiations: [
      {
        from: "cinema",
        to: "budget",
        message: "Drone shots will exceed the current budget by 30%.",
      },
      {
        from: "budget",
        to: "cinema",
        message: "Can we replace drone with stabilizer rig + color grade?",
      },
      {
        from: "cinema",
        to: "pm",
        message: "Compromise found: rig + VFX for key scenes only.",
      },
    ],
  },
  {
    id: 4,
    name: "Consolidation",
    description:
      "All agents finalize the preference-aligned plan and export it.",
    agentsToIntroduce: [],
    questions: [],
    negotiations: [
      {
        from: "pm",
        to: "concept",
        message: "Compiling final plan with all resolved trade-offs.",
      },
      {
        from: "concept",
        to: "pm",
        message: "Theme and emotional arc confirmed.",
      },
      {
        from: "script",
        to: "pm",
        message: "Script locked. Ready for production.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Radar Chart (pure canvas)                                           */
/* ------------------------------------------------------------------ */

function RadarChart({
  scores,
  prevScores,
}: {
  scores: Record<Dim, number>;
  prevScores: Record<Dim, number> | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const r = Math.min(cx, cy) - 24;
    const dims = DIMENSIONS;
    const n = dims.length;
    const angleStep = (Math.PI * 2) / n;
    const startAngle = -Math.PI / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Grid rings
    for (let ring = 1; ring <= 4; ring++) {
      const rr = (r * ring) / 4;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a = startAngle + i * angleStep;
        const px = cx + Math.cos(a) * rr;
        const py = cy + Math.sin(a) * rr;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = "hsla(220, 14%, 50%, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axes + labels
    for (let i = 0; i < n; i++) {
      const a = startAngle + i * angleStep;
      const px = cx + Math.cos(a) * r;
      const py = cy + Math.sin(a) * r;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.strokeStyle = "hsla(220, 14%, 50%, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const labelR = r + 16;
      const lx = cx + Math.cos(a) * labelR;
      const ly = cy + Math.sin(a) * labelR;
      ctx.font = "10px sans-serif";
      ctx.fillStyle = "hsl(190, 95%, 50%)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(dims[i], lx, ly);
    }

    // Previous shape (ghost)
    if (prevScores) {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const idx = i % n;
        const a = startAngle + idx * angleStep;
        const val = Math.min(100, Math.max(0, prevScores[dims[idx]]));
        const pr = (val / 100) * r;
        const px = cx + Math.cos(a) * pr;
        const py = cy + Math.sin(a) * pr;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = "hsla(190, 95%, 50%, 0.05)";
      ctx.fill();
      ctx.strokeStyle = "hsla(190, 95%, 50%, 0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Current shape
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const idx = i % n;
      const a = startAngle + idx * angleStep;
      const val = Math.min(100, Math.max(0, scores[dims[idx]]));
      const pr = (val / 100) * r;
      const px = cx + Math.cos(a) * pr;
      const py = cy + Math.sin(a) * pr;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = "hsla(190, 95%, 50%, 0.15)";
    ctx.fill();
    ctx.strokeStyle = "hsl(190, 95%, 50%)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points
    for (let i = 0; i < n; i++) {
      const a = startAngle + i * angleStep;
      const val = Math.min(100, Math.max(0, scores[dims[i]]));
      const pr = (val / 100) * r;
      const px = cx + Math.cos(a) * pr;
      const py = cy + Math.sin(a) * pr;
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(190, 95%, 50%)";
      ctx.fill();
    }
  }, [scores, prevScores]);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: 200 }}
      aria-label="Radar chart showing planning preference dimensions"
      role="img"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Workspace Canvas (agent spatial vis + negotiation lines)            */
/* ------------------------------------------------------------------ */

function WorkspaceCanvas({
  agents,
  activeNegotiation,
  currentAgentId,
  pulsePhase,
}: {
  agents: Agent[];
  activeNegotiation: NegotiationEvent | null;
  currentAgentId: string | null;
  pulsePhase: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // Central "table"
    const tableW = w * 0.34;
    const tableH = h * 0.22;
    const tableX = w / 2 - tableW / 2;
    const tableY = h / 2 - tableH / 2;
    ctx.beginPath();
    ctx.roundRect(tableX, tableY, tableW, tableH, 10);
    ctx.fillStyle = "hsla(190, 50%, 50%, 0.06)";
    ctx.fill();
    ctx.strokeStyle = "hsla(190, 50%, 50%, 0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = "9px sans-serif";
    ctx.fillStyle = "hsla(190, 50%, 50%, 0.4)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Virtual Workspace", w / 2, h / 2);

    // User node
    const ux = w / 2;
    const uy = h * 0.88;
    ctx.beginPath();
    ctx.arc(ux, uy, 14, 0, Math.PI * 2);
    ctx.fillStyle = "hsla(190, 95%, 50%, 0.12)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ux, uy, 7, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(190, 95%, 50%)";
    ctx.fill();
    ctx.font = "bold 9px sans-serif";
    ctx.fillStyle = "hsl(190, 95%, 50%)";
    ctx.textAlign = "center";
    ctx.fillText("You", ux, uy + 22);

    // Connection from user to table
    ctx.beginPath();
    ctx.moveTo(ux, uy - 14);
    ctx.lineTo(ux, tableY + tableH);
    ctx.strokeStyle = "hsla(190, 95%, 50%, 0.1)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Agents
    const introduced = agents.filter((a) => a.introduced);
    for (const agent of introduced) {
      const ax = agent.x * w;
      const ay = agent.y * h;

      // Connection to table center
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(w / 2, h / 2);
      ctx.strokeStyle = agent.color.replace(")", ", 0.12)");
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Agent halo
      const isActive = agent.id === currentAgentId;
      const haloSize = isActive ? 18 + Math.sin(pulsePhase) * 3 : 16;
      ctx.beginPath();
      ctx.arc(ax, ay, haloSize, 0, Math.PI * 2);
      ctx.fillStyle = isActive
        ? agent.color.replace(")", ", 0.2)")
        : agent.color.replace(")", ", 0.08)");
      ctx.fill();

      // Agent circle
      ctx.beginPath();
      ctx.arc(ax, ay, 8, 0, Math.PI * 2);
      ctx.fillStyle = agent.color;
      ctx.fill();

      // Avatar text
      ctx.font = "bold 7px sans-serif";
      ctx.fillStyle = "hsl(222, 47%, 5%)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(agent.avatar, ax, ay);

      // Role label
      ctx.font = isActive ? "bold 9px sans-serif" : "9px sans-serif";
      ctx.fillStyle = agent.color;
      ctx.textAlign = "center";
      ctx.fillText(agent.shortRole, ax, ay - 22);
    }

    // Negotiation line
    if (activeNegotiation) {
      const fromAgent = agents.find((a) => a.id === activeNegotiation.from);
      const toAgent = agents.find((a) => a.id === activeNegotiation.to);
      if (fromAgent && toAgent) {
        const fx = fromAgent.x * w;
        const fy = fromAgent.y * h;
        const tx = toAgent.x * w;
        const ty = toAgent.y * h;

        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(tx, ty);
        const grad = ctx.createLinearGradient(fx, fy, tx, ty);
        grad.addColorStop(0, fromAgent.color);
        grad.addColorStop(1, toAgent.color);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.lineDashOffset = -pulsePhase * 8;
        ctx.stroke();
        ctx.setLineDash([]);

        // Pulse dot traveling along line
        const t = (Math.sin(pulsePhase * 2) + 1) / 2;
        const dx = fx + (tx - fx) * t;
        const dy = fy + (ty - fy) * t;
        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(190, 95%, 50%)";
        ctx.fill();
      }
    }
  }, [agents, activeNegotiation, currentAgentId, pulsePhase]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-lg"
      style={{ height: 260 }}
      aria-label="MAVIS virtual workspace showing agents collaborating around a table"
      role="img"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Chat message type                                                   */
/* ------------------------------------------------------------------ */

interface ChatMsg {
  sender: string;
  text: string;
  color?: string;
}

/* ------------------------------------------------------------------ */
/* Main Playground Component                                           */
/* ------------------------------------------------------------------ */

export function PlaygroundSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useScrollReveal(sectionRef);

  const [currentStage, setCurrentStage] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [agents, setAgents] = useState<Agent[]>(ALL_AGENTS);
  const [scores, setScores] = useState<Record<Dim, number>>(INITIAL_SCORES);
  const [prevScores, setPrevScores] = useState<Record<Dim, number> | null>(
    null
  );
  const [chatLog, setChatLog] = useState<ChatMsg[]>([]);
  const [activeNeg, setActiveNeg] = useState<NegotiationEvent | null>(null);
  const [phase, setPhase] = useState<
    "idle" | "intro" | "questions" | "negotiation" | "stage-done" | "finished"
  >("idle");
  const [pulsePhase, setPulsePhase] = useState(0);
  const [planScore, setPlanScore] = useState(0);
  const [controlsFlash, setControlsFlash] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const controlsFlashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMountedRef = useRef(false);

  // Use refs to avoid circular dependencies in timeouts
  const currentStageRef = useRef(currentStage);
  currentStageRef.current = currentStage;
  const agentsRef = useRef(agents);
  agentsRef.current = agents;

  const stage = STAGES[currentStage];

  const triggerControlsFlash = useCallback(() => {
    setControlsFlash(true);
    if (controlsFlashTimer.current) {
      clearTimeout(controlsFlashTimer.current);
    }
    controlsFlashTimer.current = setTimeout(() => setControlsFlash(false), 900);
  }, []);

  // Pulse animation
  useEffect(() => {
    let raf: number;
    const animate = () => {
      setPulsePhase((p) => p + 0.05);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Compute plan quality score
  useEffect(() => {
    const vals = Object.values(scores);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const minVal = Math.min(...vals);
    const maxVal = Math.max(...vals);
    const balanced = 100 - (maxVal - minVal);
    setPlanScore(Math.round(avg * 0.6 + balanced * 0.4));
  }, [scores]);

  const currentAgentId = useMemo(() => {
    if (phase === "questions" && stage.questions[questionIndex]) {
      return stage.questions[questionIndex].agent;
    }
    if (phase === "negotiation" && activeNeg) {
      return activeNeg.from;
    }
    return stage.agentsToIntroduce[0] || "pm";
  }, [phase, stage, questionIndex, activeNeg]);

  // Helpers using refs
  const addChat = useCallback(
    (sender: string, text: string, color?: string) => {
      setChatLog((prev) => [...prev.slice(-25), { sender, text, color }]);
    },
    []
  );

  const getAgentColor = useCallback((id: string) => {
    return (
      ALL_AGENTS.find((a) => a.id === id)?.color || "hsl(190, 95%, 50%)"
    );
  }, []);

  const getAgentRole = useCallback((id: string) => {
    return ALL_AGENTS.find((a) => a.id === id)?.shortRole || id;
  }, []);

  const introduceAgents = useCallback(
    (agentIds: string[]) => {
      setAgents((prev) =>
        prev.map((a) =>
          agentIds.includes(a.id) ? { ...a, introduced: true } : a
        )
      );
      for (const agentId of agentIds) {
        const ag = ALL_AGENTS.find((a) => a.id === agentId);
        if (ag) {
          addChat("PM", `Introducing ${ag.role} to the collaboration.`, "hsl(190, 95%, 50%)");
        }
      }
    },
    [addChat]
  );

  // Run negotiations for a given stage
  const runNegotiations = useCallback(
    (stageData: Stage, startIdx: number) => {
      const negs = stageData.negotiations;
      if (startIdx >= negs.length) {
        setActiveNeg(null);
        setPhase("stage-done");
        return;
      }
      const neg = negs[startIdx];
      setActiveNeg(neg);

      setTimeout(() => {
        addChat(getAgentRole(neg.from), neg.message, getAgentColor(neg.from));
      }, 800);

      setTimeout(() => {
        if (startIdx + 1 >= negs.length) {
          setActiveNeg(null);
          setPhase("stage-done");
        } else {
          const nextNeg = negs[startIdx + 1];
          setActiveNeg(nextNeg);
          // Recursion through timeout
          runNegotiations(stageData, startIdx + 1);
        }
      }, 2200);
    },
    [addChat, getAgentRole, getAgentColor]
  );

  // Advance to next stage
  const advanceToStage = useCallback(
    (nextIdx: number) => {
      if (nextIdx >= STAGES.length) {
        setPhase("finished");
        addChat(
          "MAVIS",
          "Plan consolidated and exported! All preferences aligned.",
          "hsl(190, 95%, 50%)"
        );
        return;
      }

      const nextStage = STAGES[nextIdx];
      setCurrentStage(nextIdx);
      setQuestionIndex(0);
      setActiveNeg(null);

      // Introduce new agents
      if (nextStage.agentsToIntroduce.length > 0) {
        introduceAgents(nextStage.agentsToIntroduce);
      }

      if (nextStage.questions.length > 0) {
        setTimeout(() => {
          setPhase("questions");
          const firstQ = nextStage.questions[0];
          addChat(
            getAgentRole(firstQ.agent),
            firstQ.question,
            getAgentColor(firstQ.agent)
          );
        }, 1000);
      } else if (nextStage.negotiations.length > 0) {
        setTimeout(() => {
          setPhase("negotiation");
          addChat(
            "MAVIS",
            "Final round of agent negotiations...",
            "hsl(190, 95%, 50%)"
          );
          runNegotiations(nextStage, 0);
        }, 1000);
      } else {
        setPhase("stage-done");
      }
    },
    [addChat, getAgentRole, getAgentColor, introduceAgents, runNegotiations]
  );

  // When a stage finishes, auto-advance after delay
  useEffect(() => {
    if (phase !== "stage-done") return;
    const timer = setTimeout(() => {
      advanceToStage(currentStageRef.current + 1);
    }, 800);
    return () => clearTimeout(timer);
  }, [phase, advanceToStage]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (phase === "idle") return;
    triggerControlsFlash();
  }, [phase, currentStage, questionIndex, triggerControlsFlash]);

  // Start simulation
  const handleStart = useCallback(() => {
    setCurrentStage(0);
    setQuestionIndex(0);
    setAgents(ALL_AGENTS);
    setScores(INITIAL_SCORES);
    setPrevScores(null);
    setChatLog([]);
    setActiveNeg(null);
    setPhase("intro");

    // Stage 0: Guideline generation (auto-play)
    setTimeout(() => {
      addChat(
        "PM",
        "Analyzing your task: 'Plan a Sci-Fi club promo video'...",
        "hsl(190, 95%, 50%)"
      );
    }, 500);
    setTimeout(() => {
      addChat(
        "PM",
        "Identified 4 dimensions: Theme, Script, Production, Budget. Generating staged guideline...",
        "hsl(190, 95%, 50%)"
      );
    }, 2000);
    setTimeout(() => {
      addChat(
        "MAVIS",
        "Guideline ready. 5 expert agents assigned. Starting incremental collaboration.",
        "hsl(190, 95%, 50%)"
      );
    }, 3500);
    // Introduce concept agent and move to stage 1
    setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) => (a.id === "concept" ? { ...a, introduced: true } : a))
      );
      addChat(
        "PM",
        "Introducing the Concept Developer to explore your creative vision.",
        "hsl(190, 95%, 50%)"
      );
    }, 4500);
    setTimeout(() => {
      setCurrentStage(1);
      setPhase("questions");
      const firstQ = STAGES[1].questions[0];
      addChat(
        getAgentRole(firstQ.agent),
        firstQ.question,
        getAgentColor(firstQ.agent)
      );
    }, 5500);
  }, [addChat, getAgentRole, getAgentColor]);

  // Answer a preference question
  const handleAnswer = useCallback(
    (optionIdx: number) => {
      const q = stage.questions[questionIndex];
      if (!q) return;
      const option = q.options[optionIdx];
      const agentRole = getAgentRole(q.agent);
      const agentColor = getAgentColor(q.agent);

      addChat("You", option.label, "hsl(190, 95%, 50%)");

      // Apply preference effects
      setPrevScores({ ...scores });
      setScores((prev) => {
        const next = { ...prev };
        for (const [key, val] of Object.entries(option.effect)) {
          next[key as Dim] = Math.min(
            100,
            Math.max(5, (next[key as Dim] || 50) + val)
          );
        }
        return next;
      });

      setTimeout(() => {
        addChat(
          agentRole,
          `Great choice! I'll incorporate "${option.label}" into the plan.`,
          agentColor
        );
      }, 600);

      setTimeout(() => {
        if (questionIndex + 1 < stage.questions.length) {
          const nextQIdx = questionIndex + 1;
          setQuestionIndex(nextQIdx);
          const nextQ = stage.questions[nextQIdx];
          addChat(
            getAgentRole(nextQ.agent),
            nextQ.question,
            getAgentColor(nextQ.agent)
          );
        } else if (stage.negotiations.length > 0) {
          setPhase("negotiation");
          addChat(
            "MAVIS",
            "Agents are now negotiating trade-offs...",
            "hsl(190, 95%, 50%)"
          );
          runNegotiations(stage, 0);
        } else {
          setPhase("stage-done");
        }
      }, 1200);
    },
    [stage, questionIndex, scores, addChat, getAgentRole, getAgentColor, runNegotiations]
  );

  const hasStarted = phase !== "idle";
  const isFinished = phase === "finished";

  return (
    <section ref={sectionRef} id="playground" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        {/* Section header */}
        <div
          className={`text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge
            variant="outline"
            className="border-primary/30 text-primary text-xs"
          >
            Research Playground
          </Badge>
          <h3 className="mt-3 text-2xl font-bold text-foreground lg:text-3xl text-balance">
            <a
              href="#project-virtual-minds"
              className="inline-flex items-center gap-2 rounded-md px-2 py-1 -ml-2 transition-colors hover:bg-primary/10 hover:text-primary underline decoration-primary/40 underline-offset-4"
            >
              MAVIS Planning Simulator
            </a>
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Experience the incremental multi-agent collaboration from our{" "}
            <a
              href="#publication-virtual-minds"
              className="text-primary hover:underline"
            >
              CHI 2026
            </a>{" "}
            paper. Watch agents join sequentially, answer preference questions,
            and observe real-time trade-off negotiations.
          </p>
        </div>

        {/* Main content */}
        <div
          className={`mt-8 grid gap-4 lg:grid-cols-5 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left: Workspace + Radar */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Spatial workspace */}
            <div className="glass rounded-xl p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">
                Virtual Workspace (CoNavigator)
              </p>
              <WorkspaceCanvas
                agents={agents}
                activeNegotiation={activeNeg}
                currentAgentId={currentAgentId}
                pulsePhase={pulsePhase}
              />
            </div>

            {/* Radar chart */}
            <div className="glass rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  Preference Balance
                </p>
                {hasStarted && (
                  <span className="text-xs font-bold text-primary">
                    Plan Score: {planScore}
                  </span>
                )}
              </div>
              <RadarChart scores={scores} prevScores={prevScores} />
            </div>
          </div>

          {/* Right: Chat + Controls */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Stage progress bar (Taskformer Guideline) */}
            <div className="glass rounded-xl p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">
                Taskformer Staged Guideline
              </p>
              <div className="flex gap-1">
                {STAGES.map((s, i) => (
                  <div key={s.id} className="flex-1">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i < currentStage
                          ? "bg-primary"
                          : i === currentStage
                            ? "bg-primary/50"
                            : "bg-muted"
                      }`}
                    />
                    <p
                      className={`mt-1 text-[9px] truncate transition-colors ${
                        i <= currentStage
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {s.name}
                    </p>
                  </div>
                ))}
              </div>
              {hasStarted && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {stage.description}
                </p>
              )}
            </div>

            {/* Chat log */}
            <div className="glass rounded-xl p-3 flex-1 min-h-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">
                Collaboration Log
              </p>
              <div className="h-48 lg:h-64 overflow-y-auto space-y-2 pr-1">
                {!hasStarted && (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-xs text-muted-foreground">
                      Click &quot;Start Planning&quot; to begin the MAVIS
                      simulation.
                    </p>
                  </div>
                )}
                {chatLog.map((msg, i) => (
                  <div
                    key={`chat-${i}`}
                    className={`flex gap-2 text-xs ${
                      msg.sender === "You" ? "justify-end" : ""
                    }`}
                    style={{ animationDelay: "0ms" }}
                  >
                    {msg.sender !== "You" && (
                      <span
                        className="font-semibold shrink-0"
                        style={{ color: msg.color }}
                      >
                        {msg.sender}
                      </span>
                    )}
                    <span
                      className={
                        msg.sender === "You"
                          ? "bg-primary/10 text-primary rounded-lg px-2 py-1"
                          : "text-foreground/80"
                      }
                    >
                      {msg.text}
                    </span>
                    {msg.sender === "You" && (
                      <span
                        className="font-semibold shrink-0"
                        style={{ color: msg.color }}
                      >
                        You
                      </span>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Controls */}
            <div
              className={`glass rounded-xl p-3 transition-all duration-500 ${
                controlsFlash
                  ? "ring-2 ring-primary/60 shadow-lg shadow-primary/20"
                  : ""
              }`}
            >
              {!hasStarted ? (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-3">
                    Scenario: Plan a promotional video for a university Sci-Fi
                    club
                  </p>
                  <Button
                    onClick={handleStart}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Start Planning
                  </Button>
                </div>
              ) : phase === "questions" && stage.questions[questionIndex] ? (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Choose your preference:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stage.questions[questionIndex].options.map((opt, i) => (
                      <Button
                        key={opt.label}
                        variant="outline"
                        size="sm"
                        className="text-xs border-primary/30 hover:bg-primary/10 hover:text-primary transition-colors bg-transparent"
                        onClick={() => handleAnswer(i)}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {stage.questions[questionIndex].options.map((opt) => (
                      <span key={opt.label} className="text-[9px] text-muted-foreground">
                        {opt.label}:{" "}
                        {Object.entries(opt.effect)
                          .map(
                            ([k, v]) =>
                              `${k} ${v > 0 ? "+" : ""}${v}`
                          )
                          .join(", ")}
                      </span>
                    ))}
                  </div>
                </div>
              ) : isFinished ? (
                <div className="text-center">
                  <p className="text-sm font-medium text-primary mb-1">
                    Plan Complete
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    5 agents collaborated across 5 stages to produce a
                    preference-aligned plan with score {planScore}.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                    onClick={() => {
                      setPhase("idle");
                      setChatLog([]);
                      setAgents(ALL_AGENTS);
                      setScores(INITIAL_SCORES);
                      setPrevScores(null);
                      setCurrentStage(0);
                      setQuestionIndex(0);
                      setActiveNeg(null);
                      triggerControlsFlash();
                    }}
                  >
                    Restart Simulation
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 py-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <p className="text-xs text-muted-foreground">
                    Agents are collaborating...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
