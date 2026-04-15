"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { FileText, Copy, ExternalLink, Check } from "lucide-react";

type FilterType = "All" | "CHI" | "Journal" | "Security" | "Systems" | "Patent";

const publications = [
  {
    title: "Virtual Minds, Real Work: LLM-Powered Preference-Based Planning through Spatial Multi-Agent-Human Collaboration",
    authors: "Ziyi Zhang, Xin Yi, Zitong Dai, Xuewen Yu, Shuning Zhang, Bo Liu, Jiuxin Cao, Hantao Zhao",
    venue: "CHI '26: Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems",
    year: 2026,
    month: "Sep 2025",
    tags: ["CHI"] as FilterType[],
    pdf: "/pdfs/virtualMind.pdf",
    doi: "https://dl.acm.org/doi/10.1145/3772318.3791926",
    bibtex: `@inproceedings{10.1145/3772318.3791926,
author = {Zhang, Ziyi and Yi, Xin and Dai, Zitong and Yu, Xuewen and Zhang, Shuning and Liu, Bo and Cao, Jiuxin and Zhao, Hantao},
title = {Virtual Minds, Real Work: LLM-Powered Preference-Based Planning through Spatial Multi-Agent-Human Collaboration},
year = {2026},
isbn = {9798400722783},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3772318.3791926},
doi = {10.1145/3772318.3791926},
booktitle = {Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems},
articleno = {118},
numpages = {20},
series = {CHI '26}
}`,
  },
  {
    title: "Enhancing Privacy Awareness in Buildings through Augmented Reality Technology",
    authors: "Liru Chen, Ziyi Zhang, Hantao Zhao",
    venue: "CHI '24: Proceedings of the 2024 CHI Conference on Human Factors in Computing Systems, HabiTech Workshop",
    year: 2024,
    month: "Sep 2023",
    tags: ["CHI"] as FilterType[],
    pdf: undefined as string | undefined,
    doi: undefined as string | undefined,
    bibtex: `@inproceedings{chen2024enhancingprivacyar,
  title={Enhancing Privacy Awareness in Buildings through Augmented Reality Technology},
  author={Chen, Liru and Zhang, Ziyi and Zhao, Hantao},
  booktitle={CHI '24 HabiTech Workshop},
  year={2024}
}`,
  },
  {
    title: "ARena of Privacy: Exploring Augmented Reality in Enhancing Smart Home Privacy Awareness and Control",
    authors: "Hantao Zhao, Xin Yi, Liru Chen, Ziyi Zhang, Wenze Ren, Xiaomeng Shi, Bo Liu, Jiuxin Cao",
    venue: "International Journal of Human-Computer Interaction (IJHCI)",
    year: 2025,
    month: "Aug 2025",
    tags: ["Journal"] as FilterType[],
    pdf: "/pdfs/arena.pdf",
    doi: "https://doi.org/10.1080/10447318.2025.2564276",
    bibtex: `@article{Zhao27102025,
author = {Hantao Zhao and Xin Yi and Liru Chen and Ziyi Zhang and Wenze Ren and Xiaomeng Shi and Bo Liu and Jiuxin Cao},
title = {ARena of Privacy: Exploring Augmented Reality in Enhancing Smart Home Privacy Awareness and Control},
journal = {International Journal of Human–Computer Interaction},
volume = {0},
number = {0},
pages = {1--30},
year = {2025},
publisher = {Taylor & Francis},
doi = {10.1080/10447318.2025.2564276},
URL = {https://doi.org/10.1080/10447318.2025.2564276}
}`,
  },
  {
    title: "Through Their Eyes: User Perceptions on Sensitive Attribute Inference of Social Media Videos by Visual Language Models",
    authors: "Shuning Zhang, Gengrui Zhang, Yibo Meng, Ziyi Zhang, Hantao Zhao, Xin Yi, Hewu Li",
    venue: "HAIPS '25 @ CCS: Workshop on Human Aspects of Information Privacy & Security",
    year: 2025,
    month: "Aug 2025",
    tags: ["Security"] as FilterType[],
    pdf: "/pdfs/eye.pdf",
    doi: "https://dl.acm.org/doi/10.1145/3733816.3760751",
    bibtex: `@inproceedings{10.1145/3733816.3760751,
author = {Zhang, Shuning and Zhang, Gengrui and Meng, Yibo and Zhang, Ziyi and Zhao, Hantao and Yi, Xin and Li, Hewu},
title = {Through Their Eyes: User Perceptions on Sensitive Attribute Inference of Social Media Videos by Visual Language Models},
year = {2025},
isbn = {9798400719059},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3733816.3760751},
doi = {10.1145/3733816.3760751},
pages = {20–32},
numpages = {13},
series = {HAIPS '25}
}`,
  },
  {
    title: "Cooperative and Autonomous Mapping for Heterogeneous NAVs",
    authors: "Ruiwen Xu, Yongtao Ou, Hanjie Yu, Ziyi Zhang, Feng Shan, Weiwei Wu, Junzhou Luo",
    venue: "2023 IEEE 20th International Conference on Mobile Ad Hoc and Smart Systems (MASS)",
    year: 2023,
    month: "Mar 2023",
    tags: ["Systems"] as FilterType[],
    pdf: "/pdfs/uav.pdf",
    doi: "https://doi.org/10.1109/MASS58611.2023.00073",
    bibtex: `@inproceedings{xu2023cooperative,
  title={Cooperative and Autonomous Mapping for Heterogeneous NAVs},
  author={Xu, Ruiwen and Ou, Yongtao and Yu, Hanjie and Zhang, Ziyi and Shan, Feng and Wu, Weiwei and Luo, Junzhou},
  booktitle={2023 IEEE 20th International Conference on Mobile Ad Hoc and Smart Systems (MASS)},
  pages={539--547},
  year={2023},
  organization={IEEE}
}`,
  },
  {
    title: "[Patent] Vision-Based Gimbal Control Method for Target Striking UAVs",
    authors: "Ziyi Zhang, Haoyang Liu, Feng Shan",
    venue: "Patent Application Acceptance Number: 2023115920458",
    year: 2023,
    month: "Nov 2023",
    tags: ["Patent"] as FilterType[],
    pdf: undefined as string | undefined,
    doi: undefined as string | undefined,
    bibtex: `@misc{zhang2023patentgimbal,
  title={Vision-Based Gimbal Control Method for Target Striking UAVs},
  author={Zhang, Ziyi and Liu, Haoyang and Shan, Feng},
  year={2023},
  note={Patent Application: 2023115920458}
}`,
  },
];

const filterOptions: FilterType[] = ["All", "CHI", "Journal", "Security", "Systems", "Patent"];

function highlightAuthor(authors: string) {
  return authors.split(/(Ziyi Zhang)/).map((part, i) =>
    part === "Ziyi Zhang" ? (
      <span key={i} className="font-semibold text-foreground underline decoration-primary/40 underline-offset-2">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function PublicationsSection() {
  const ref = useRef<HTMLElement>(null);
  const visible = useScrollReveal(ref);
  const [filter, setFilter] = useState<FilterType>("All");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetId = "publication-virtual-minds";

  const filtered =
    filter === "All"
      ? publications
      : publications.filter((p) => p.tags.includes(filter));

  const handleCopyBibtex = (bibtex: string, idx: number) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

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
    if (hash === targetId) {
      setFilter("CHI");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        triggerHighlight(hash);
      }, 80);
    }
  }, [targetId, triggerHighlight]);

  useEffect(() => {
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [handleHash]);

  return (
    <section
      id="publications"
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
            Publications
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Published work
          </h2>
        </div>

        {/* Filter chips */}
        <div
          className={`mt-8 flex flex-wrap gap-2 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                filter === opt
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Publication list */}
        <div className="mt-8 space-y-4">
          {filtered.map((pub, i) => {
            const pubId = pub.title.startsWith("Virtual Minds, Real Work")
              ? targetId
              : undefined;
            return (
              <div
                key={pub.title}
                id={pubId}
                className={`rounded-xl border border-border/50 bg-card/50 p-5 transition-all duration-700 hover:border-primary/20 hover:bg-card/80 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } ${
                  pubId && highlightedId === pubId
                    ? "ring-2 ring-primary/60 shadow-lg shadow-primary/20 animate-pulse"
                    : ""
                }`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground leading-snug">
                    {pub.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {highlightAuthor(pub.authors)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {pub.venue}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {pub.year}
                  </Badge>
                  {pub.tags.map((t) => (
                    <Badge
                      key={t}
                      className="text-xs bg-primary/10 text-primary border-transparent"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {pub.pdf && (
                  <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent" asChild>
                    <a href={pub.pdf} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-1 h-3 w-3" />
                      PDF
                    </a>
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 bg-transparent"
                  onClick={() => handleCopyBibtex(pub.bibtex, i)}
                >
                  {copiedIdx === i ? (
                    <>
                      <Check className="mr-1 h-3 w-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 h-3 w-3" />
                      BibTeX
                    </>
                  )}
                </Button>
                {pub.doi && (
                  <Button size="sm" variant="ghost" className="text-xs h-7" asChild>
                    <a href={pub.doi} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1 h-3 w-3" />
                      DOI
                    </a>
                  </Button>
                )}
              </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
