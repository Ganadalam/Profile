/**
 * ArticlesSection v11
 * Tech Notes & Blog Articles from SKILLS data
 */
import { useScrollAnimation } from "@/hooks";
import { SKILLS } from "@/constants/profile";
import { SectionHeader } from "@/components/ui";
import { GlassCard } from "@/components/ui/GlassCard";

export function ArticlesSection() {
  const { ref, isVisible } = useScrollAnimation();

  // Extract all blog links from SKILLS
  const allArticles = SKILLS.flatMap(category => 
    category.skills.flatMap(skill => 
      (skill.blogLinks || []).map(link => ({
        ...link,
        skillName: skill.name,
        categoryColor: category.color,
      }))
    )
  );

  if (allArticles.length === 0) return null;

  return (
    <section id="articles" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`fade-up ${isVisible ? "visible" : ""}`}>
          <SectionHeader
            eyebrow="// tech notes"
            title="아티클 & 문제해결 노트"
            subtitle="단순한 기술 사용을 넘어, 왜 그리고 어떻게 문제를 해결했는지 기록합니다."
          />
        </div>

        <div 
          className={`fade-up delay-100 ${isVisible ? "visible" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {allArticles.map((article, i) => (
            <a 
              key={i} 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <GlassCard 
                className="interactive-card" 
                style={{ padding: "1.75rem", display: "flex", flexDirection: "column", height: "100%" }}
                glow
                accentColor={article.categoryColor}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                  <span style={{ 
                    fontSize: "0.75rem", fontFamily: "var(--font-mono)", 
                    color: article.categoryColor, background: `color-mix(in srgb, ${article.categoryColor} 10%, transparent)`,
                    padding: "4px 10px", borderRadius: "100px", border: `1px solid color-mix(in srgb, ${article.categoryColor} 30%, transparent)`
                  }}>
                    {article.skillName}
                  </span>
                  {article.date && (
                    <span style={{ fontSize: "0.75rem", color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>
                      {article.date}
                    </span>
                  )}
                </div>
                
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-0)", lineHeight: 1.4, marginBottom: "1rem", flex: 1 }}>
                  {article.title}
                </h3>
                
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-1)", fontSize: "0.85rem", fontWeight: 500, transition: "color 0.2s" }}>
                  <span>Read Article</span>
                  <span style={{ color: article.categoryColor }}>→</span>
                </div>
              </GlassCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
