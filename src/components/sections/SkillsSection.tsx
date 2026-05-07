/**
 * SkillsSection v4
 * - 복잡한 드로어 팝업 제거
 * - 순수하고 직관적인 스킬 전시 그리드 (카테고리별 그룹화)
 */

import { useScrollAnimation } from "@/hooks";
import { SKILLS, type Skill } from "@/constants/profile";
import { SectionHeader } from "@/components/ui";

// ── 스킬 대표 썸네일 ──────────────────────────────────────────────────────────
function SkillCover({ skill, color, size = 40 }: { skill: Skill; color: string; size?: number }) {
  if (skill.coverImage) {
    return (
      <div
        style={{
          width: size, height: size, borderRadius: 10,
          background: `color-mix(in srgb, ${color} 18%, var(--bg-1))`,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", flexShrink: 0,
        }}
      >
        <img src={skill.coverImage} alt={skill.name} loading="lazy" decoding="async" style={{ width: size * 0.62, height: size * 0.62, objectFit: "contain" }} />
      </div>
    );
  }

  return (
    <div
      style={{
        width: size, height: size, borderRadius: 10,
        background: `color-mix(in srgb, ${color} 18%, var(--bg-1))`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.48, flexShrink: 0,
      }}
    >
      {skill.icon}
    </div>
  );
}

// ── 스킬 칩 ───────────────────────────────────────────────────────────────────
function SkillChip({ skill, color, index }: { skill: Skill; color: string; index: number }) {
  return (
    <div
      title={skill.name}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: "8px", padding: "1rem 0.5rem 0.85rem", borderRadius: "16px",
        background: "var(--glass-bg)", border: "1px solid var(--glass-border)",
        backdropFilter: "var(--glass-blur)",
        transition: "transform var(--transition-spring), border-color var(--ease-base), background var(--ease-base)",
        animationDelay: `${index * 30}ms`,
        position: "relative",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = `color-mix(in srgb, ${color} 55%, transparent)`;
        el.style.background = `color-mix(in srgb, ${color} 8%, var(--glass-bg))`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "var(--glass-border)";
        el.style.background = "var(--glass-bg)";
      }}
    >
      <SkillCover skill={skill} color={color} size={38} />
      <span style={{ fontSize: "0.68rem", color: "var(--text-1)", textAlign: "center", lineHeight: 1.3, fontWeight: 500, wordBreak: "keep-all" }}>
        {skill.name}
      </span>
    </div>
  );
}

// ── 메인 섹션 ─────────────────────────────────────────────────────────────────
export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`fade-up ${isVisible ? "visible" : ""}`} style={{ marginBottom: "4rem" }}>
          <SectionHeader
            eyebrow="// tech stack"
            title="기술 스택 및 도구"
            subtitle="프론트엔드부터 백엔드까지, 프로덕트 제작에 사용하는 기술들입니다."
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          {SKILLS.map((categoryGroup, groupIdx) => (
            <div key={categoryGroup.category} className={`fade-up delay-${(groupIdx % 3 + 1) * 100} ${isVisible ? "visible" : ""}`}>
              <h3 style={{
                fontSize: "1.1rem", fontWeight: 700, color: "var(--text-0)", 
                marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem",
                letterSpacing: "0.02em"
              }}>
                <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", background: categoryGroup.color, boxShadow: `0 0 10px ${categoryGroup.color}` }} />
                {categoryGroup.category}
              </h3>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))",
                gap: "1.25rem",
              }}>
                {categoryGroup.skills.map((skill, i) => (
                  <SkillChip
                    key={skill.name}
                    skill={skill}
                    color={categoryGroup.color}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
