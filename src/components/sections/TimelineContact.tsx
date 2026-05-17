/**
 * TimelineSection + ContactSection v11
 * 통일된 토큰, 하드코딩 color 제거
 */

import { useScrollAnimation, useCopyToClipboard } from "@/hooks";
import { TIMELINE, PROFILE } from "@/constants/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader, Button } from "@/components/ui";

/* ── 타임라인 ─────────────────────────────────────────── */
const TYPE_META = {
  work: { color: "var(--accent-primary)", icon: "💼" },
  education: { color: "var(--accent-purple)", icon: "🎓" },
  achievement: { color: "var(--accent-green)", icon: "🏆" },
} as const;

export function TimelineSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="timeline"
      className="section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <div className={`fade-up ${isVisible ? "visible" : ""}`}>
          <SectionHeader
            eyebrow="// experience"
            title="경험 & 학력"
            subtitle="지금까지 걸어온 개발자로서의 발자취입니다."
          />
        </div>

        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* 타임라인 선 */}
          <div
            style={{
              position: "absolute",
              left: "7px",
              top: 0,
              bottom: 0,
              width: "2px",
              background:
                "linear-gradient(to bottom, var(--accent-primary), var(--accent-purple), transparent)",
              opacity: 0.6,
            }}
          />

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}
          >
            {TIMELINE.map((item, i) => {
              const meta = TYPE_META[item.type];
              return (
                <div
                  key={item.id}
                  className={`fade-up delay-${Math.min((i + 1) * 100, 500)} ${isVisible ? "visible" : ""}`}
                  style={{ position: "relative" }}
                >
                  {/* 타임라인 점 */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-2rem",
                      top: "1.5rem",
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      background: meta.color,
                      border: "2.5px solid var(--bg-0)",
                      boxShadow: `0 0 8px ${meta.color}`,
                      zIndex: 1,
                    }}
                  />

                  <GlassCard
                    className="interactive-card"
                    style={{ padding: "1.4rem" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "0.5rem",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={{ fontSize: "1rem" }}>{meta.icon}</span>
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: "0.98rem",
                            color: "var(--text-0)",
                          }}
                        >
                          {item.title}
                        </span>
                        <span
                          style={{ color: meta.color, fontSize: "0.82rem" }}
                        >
                          @ {item.organization}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.71rem",
                          color: "var(--text-2)",
                          background: "var(--glass-bg)",
                          padding: "2px 10px",
                          borderRadius: "var(--radius-full)",
                          border: "1px solid var(--glass-border)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.date}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.86rem",
                        color: "var(--text-1)",
                        lineHeight: 1.68,
                      }}
                    >
                      {item.description}
                    </p>
                    {item.achievements && item.achievements.length > 0 && (
                      <div
                        style={{
                          marginTop: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                        }}
                      >
                        {item.achievements.map((ach, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: "4px 0",
                              color: "var(--text-1)",
                              fontSize: "0.85rem",
                              fontWeight: 500,
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              width: "fit-content",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--text-2)",
                                fontSize: "0.7rem",
                              }}
                            >
                              —
                            </span>
                            {ach}
                          </div>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────── */
export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { copied, copy } = useCopyToClipboard();

  const contactLinks = [
    {
      label: "GitHub",
      icon: "🐙",
      url: PROFILE.github,
      color: "var(--accent-primary)",
    },
    ...(PROFILE.blog
      ? [
          {
            label: "Blog",
            icon: "📝",
            url: PROFILE.blog,
            color: "var(--accent-green)",
          },
        ]
      : []),
    {
      label: "Email",
      icon: "📬",
      url: `mailto:${PROFILE.email}`,
      color: "var(--accent-purple)",
    },
  ];

  return (
    <section
      id="contact"
      className="section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <div className={`fade-up ${isVisible ? "visible" : ""}`}>
          <SectionHeader
            eyebrow="// contact"
            title="함께 일해요"
            subtitle="새로운 기회와 협업 제안을 언제나 환영합니다."
          />
        </div>

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.75rem",
            alignItems: "start",
          }}
        >
          {/* 이메일 카드 */}
          <div className={`fade-up delay-100 ${isVisible ? "visible" : ""}`}>
            <GlassCard style={{ padding: "2rem" }}>
              {PROFILE.availableForWork && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "1.5rem",
                    padding: "5px 14px",
                    background:
                      "color-mix(in srgb, var(--accent-green) 10%, transparent)",
                    border:
                      "1px solid color-mix(in srgb, var(--accent-green) 28%, transparent)",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "var(--accent-green)",
                      display: "inline-block",
                      animation: "pulse-available 2s infinite",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--accent-green)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    채용 포지션 검토 중
                  </span>
                </div>
              )}

              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  color: "var(--text-0)",
                }}
              >
                이메일로 연락하기
              </h3>

              <div
                style={{
                  padding: "12px 16px",
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.88rem",
                  color: "var(--accent-primary)",
                  marginBottom: "1.25rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {PROFILE.email}
                </span>
                <button
                  onClick={() => copy(PROFILE.email)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: copied ? "var(--accent-green)" : "var(--text-2)",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    transition: "color var(--ease-base)",
                    flexShrink: 0,
                  }}
                >
                  {copied ? "✓ 복사됨" : "복사"}
                </button>
              </div>

              <Button variant="primary" href={`mailto:${PROFILE.email}`}>
                📬 메일 보내기
              </Button>
            </GlassCard>
          </div>

          {/* 소셜 링크 */}
          <div
            className={`fade-up delay-200 ${isVisible ? "visible" : ""}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
          >
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} 페이지로 이동`}
                style={{ textDecoration: "none" }}
              >
                <GlassCard
                  className="interactive-card"
                  style={{
                    padding: "1.15rem 1.4rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                  glow
                  accentColor={link.color}
                >
                  <span style={{ fontSize: "1.4rem" }}>{link.icon}</span>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "var(--text-0)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {link.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-2)",
                        fontFamily: "var(--font-mono)",
                        marginTop: "2px",
                      }}
                    >
                      {link.url.replace("https://", "").replace("mailto:", "")}
                    </div>
                  </div>
                  <span
                    style={{
                      marginLeft: "auto",
                      color: link.color,
                      fontSize: "1rem",
                    }}
                  >
                    →
                  </span>
                </GlassCard>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div
        style={{
          textAlign: "center",
          marginTop: "5rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--glass-border)",
          color: "var(--text-2)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.73rem",
        }}
      >
        <p>
          Designed & Built by {PROFILE.nickname} · {new Date().getFullYear()}
        </p>
        <p style={{ marginTop: "4px", opacity: 0.55 }}>
          React · TypeScript · Vite
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
