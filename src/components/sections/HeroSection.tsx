/**
 * HeroSection v11 — Premium Minimalist Design
 */

import { PROFILE } from "@/constants/profile";
import { scrollToSection } from "@/utils";
import { Button } from "@/components/ui";
import "@/styles/hero.css";

export function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        {/* 왼쪽 텍스트 콘텐츠 */}
        <div className="hero-content">
          <p className="hero-greeting">
            hello, I'm
          </p>

          <div className="hero-title-wrapper">
            <h1 className="hero-name">
              {PROFILE.name}
            </h1>
            <span className="hero-subtitle" style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 700, color: "var(--accent-primary)", display: "block", marginTop: "0.5rem" }}>
              퍼포먼스와 UX에 집착하는 엔지니어.
            </span>
          </div>

          <p className="hero-description">
            {PROFILE.tagline || "Crafting robust, scaleable, and beautiful digital experiences with modern web technologies."}
          </p>

          <div className="hero-cta-container">
            <Button variant="primary" onClick={() => scrollToSection("projects")}>
              View Projects
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("contact")}>
              Contact Me
            </Button>
            {PROFILE.resume && (
              <Button variant="ghost" href={PROFILE.resume} download style={{ padding: "10px 20px" }}>
                <span style={{ fontSize: "1.1rem" }}>📄</span> 이력서 다운로드
              </Button>
            )}
          </div>
        </div>

        {/* 오른쪽 비주얼/프로필 */}
        <div className="hero-visual">
          <div className="hero-profile-wrapper">
            {PROFILE.photo ? (
              <img
                src={PROFILE.photo}
                alt={`${PROFILE.name} 프로필`}
                className="hero-profile-img"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="hero-profile-placeholder">
                <span className="hero-profile-initial">
                  {PROFILE.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div className="hero-scroll-hint">
        <span>scroll</span>
        <div className="hero-scroll-hint-line" />
      </div>
    </section>
  );
}
