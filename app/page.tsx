import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ResearchSection } from "@/components/research-section";
import { ProjectsSection } from "@/components/projects-section";
import { PublicationsSection } from "@/components/publications-section";
import { AwardsSection } from "@/components/awards-section";
import { SkillsSection } from "@/components/skills-section";
import { PlaygroundSection } from "@/components/playground-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ResearchSection />
        <ProjectsSection />
        <PublicationsSection />
        <AwardsSection />
        <SkillsSection />
        <PlaygroundSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
