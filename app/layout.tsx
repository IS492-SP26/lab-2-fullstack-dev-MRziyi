import React from "react"
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Ziyi Zhang | HCI Researcher & XR Builder",
  description:
    "Ziyi Zhang — HCI Researcher specializing in Human-AI Collaboration, LLM Agents, Immersive Technology, and Interaction Design. Building systems where humans and AI co-plan, visualize, and interact.",
  keywords: [
    "HCI",
    "Human-Computer Interaction",
    "Human-AI Collaboration",
    "LLM Agents",
    "AR",
    "VR",
    "XR",
    "Visualization",
    "Interaction Design",
  ],
  authors: [{ name: "Ziyi Zhang" }],
  openGraph: {
    title: "Ziyi Zhang | HCI Researcher & XR Builder",
    description:
      "Building immersive systems where humans and AI co-plan, visualize, and interact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${_inter.variable} ${_jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
