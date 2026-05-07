/**
 * App.tsx - 루트 컴포넌트
 * 다크/라이트 테마 + 전체 섹션 구성
 */

import { ParticleCanvas } from "@/components/common/ParticleCanvas";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import {
  TimelineSection,
  ContactSection,
} from "@/components/sections/TimelineContact";
import { useTheme } from "@/hooks";
import "@/styles/globals.css";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <ParticleCanvas theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />

        <ArticlesSection />
        <ContactSection />
      </main>
    </>
  );
}
