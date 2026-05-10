/**
 * AboutSection v12 — 대형 타이포그래피 + 하이라이트 카드
 * 가짜 코드 요소를 제거하고 명확하고 거대한 메시지로 교체
 */

import { useScrollAnimation } from "@/hooks";
import { ABOUT } from "@/constants/profile";
import { GlassCard } from "@/components/ui/GlassCard";

const HIGHLIGHTS_META = [
  { icon: "🧩", color: "var(--accent-primary)" },
  { icon: "🎨", color: "var(--accent-purple)" },
  { icon: "⚡", color: "var(--accent-cyan)" },
  { icon: "🤝", color: "var(--accent-green)" },
];

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        {/* 대형 타이포그래피 섹션 */}
        <div className={`fade-up ${isVisible ? "visible" : ""}`} style={{ marginBottom: "6rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.35, letterSpacing: "-0.03em", color: "var(--text-0)" }}>
              비즈니스 문제를 기술로 해결하고,<br/>
              <span style={{ color: "var(--accent-primary)" }}>사용자 경험</span>을 극한으로 끌어올립니다.
            </h2>
            <p style={{ marginTop: "2rem", fontSize: "1.15rem", color: "var(--text-1)", lineHeight: 1.85, wordBreak: "keep-all", maxWidth: "700px", margin: "2rem auto 0" }}>
              {ABOUT.summary}
            </p>
          </div>
        </div>

        {/* 하이라이트 (소프트 스킬) 그리드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {ABOUT.highlights.map((text, i) => {
            const meta = HIGHLIGHTS_META[i % HIGHLIGHTS_META.length];
            return (
              <GlassCard
                key={i}
                className={`fade-up delay-${(i % 4 + 1) * 100} ${isVisible ? "visible" : ""} interactive-card`}
                style={{ padding: "2rem 1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}
                glow
                accentColor={meta.color}
              >
                <div
                  style={{
                    fontSize: "1.8rem",
                    filter: "drop-shadow(0 0 8px currentColor)",
                    color: meta.color
                  }}
                >
                  {meta.icon}
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-1)",
                    lineHeight: 1.75,
                  }}
                >
                  {text}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
