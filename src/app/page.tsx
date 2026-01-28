"use client";

import { Hero } from "@/components/sections/Hero";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import {
  FullPageScrollProvider,
  PageSection,
  SectionIndicator,
} from "@/components/layout/FullPageScroll";

const sections = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <FullPageScrollProvider sections={sections}>
      <PageSection id="hero" index={0}>
        <Hero />
      </PageSection>

      <PageSection id="work" index={1}>
        <ProjectShowcase />
      </PageSection>

      <PageSection id="about" index={2}>
        <About />
      </PageSection>

      <PageSection id="skills" index={3}>
        <Skills />
      </PageSection>

      <PageSection id="contact" index={4}>
        <Contact />
      </PageSection>

      <SectionIndicator />
    </FullPageScrollProvider>
  );
}
