"use client";

import React from "react"

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Mail, MapPin, Phone, Send, ExternalLink } from "lucide-react";

const socials = [
  { label: "Google Scholar", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const visible = useScrollReveal(ref);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div
          className={`text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Contact
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {"Let's build something immersive together."}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Open to research collaborations and internships.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Contact form */}
          <Card
            className={`flex-1 glass border-border/50 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-muted-foreground mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-muted-foreground mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-xs font-medium text-muted-foreground mb-1.5"
                  >
                    Collaboration topic (optional)
                  </label>
                  <select
                    id="topic"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a topic...</option>
                    <option value="research">Research</option>
                    <option value="speaking">Speaking</option>
                    <option value="internship">Internship / RA</option>
                    <option value="demo">Demo</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-muted-foreground mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Tell me about your idea..."
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitted}>
                  {submitted ? (
                    "Message sent!"
                  ) : (
                    <>
                      <Send className="mr-1 h-4 w-4" />
                      Send message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact info */}
          <div
            className={`flex flex-col gap-6 lg:w-80 transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a
                    href="mailto:ziyiz13@illinois.edu"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    ziyiz13@illinois.edu
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">
                    217-530-7176
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">
                    Champaign, IL, USA
                  </p>
                </div>
              </div>
            </div>

            {/* Availability note */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-medium text-primary">
                Currently available
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Open to research collaborations and internship opportunities.
              </p>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Find me online
              </p>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {s.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
