"use client";

import { ExternalLink } from "lucide-react";

const socials = [
  { label: "Google Scholar", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-muted/20 py-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm italic text-muted-foreground">
            {"\"Designing interfaces where humans and AI think together.\""}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {s.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {"© 2026 Ziyi Zhang. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
