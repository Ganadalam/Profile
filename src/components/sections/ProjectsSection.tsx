/**
 * ProjectsSection v12 - Ultra-Premium Bento Box (Spotlight & Asymmetry)
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useScrollAnimation } from "@/hooks";
import { PROJECTS, type Project } from "@/constants/profile";
import { Button, SectionHeader } from "@/components/ui";

// ── 썸네일 (극강의 미니멀리즘) ──────────────────────────────────────────────────
function Thumb({
  thumbnail,
  style,
  className,
}: {
  thumbnail: { image?: string | null; gradient: string };
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      style={{ position: "relative", overflow: "hidden", ...style }}
      className={className}
    >
      {/* 이미지가 없으면 그라데이션을 진하게, 있으면 연하게 설정 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: thumbnail.gradient,
          opacity: thumbnail.image ? 0.2 : 0.85,
        }}
      />
      {/* 이미지가 없을 때 허전하지 않도록 은은한 패턴 추가 */}
      {!thumbnail.image && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}
      {thumbnail.image && (
        <img
          src={thumbnail.image}
          alt=""
          aria-hidden
          className="bento-thumb-img"
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "inherit",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ── 숫자 강조 ─────────────────────────────────────────────────────────────────
function Metric({ text }: { text: string }) {
  const parts = text.split(/(\d+[\w%.]+)/g);
  return (
    <span>
      {parts.map((p, i) =>
        /^\d/.test(p) ? (
          <strong key={i} style={{ color: "var(--text-0)", fontWeight: 700 }}>
            {p}
          </strong>
        ) : (
          p
        ),
      )}
    </span>
  );
}

// ── 미니멀 콘텐츠 섹션 ──────────────────────────────────────────────────────────
function MinimalSection({
  title,
  summary,
  points,
}: {
  title: string;
  summary: string;
  points: string[];
}) {
  return (
    <div
      style={{
        marginBottom: "2.5rem",
      }}
    >
      <h3
        style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "var(--text-2)",
          marginBottom: "1.2rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "var(--text-2)",
          }}
        />
        {title}
      </h3>
      <p
        style={{
          fontSize: "1.05rem",
          color: "var(--text-0)",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
          wordBreak: "keep-all",
          fontWeight: 500,
        }}
      >
        {summary}
      </p>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
        }}
      >
        {points.map((pt, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: "0.75rem",
              fontSize: "0.95rem",
              color: "var(--text-1)",
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "var(--text-2)", flexShrink: 0 }}>—</span>
            <Metric text={pt} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── 성과 대시보드 (미니멀 튜닝) ──────────────────────────────────────────────────
function AchievementGrid({
  summary,
  achievements,
}: {
  summary: string;
  achievements: string[];
}) {
  const parseAchievement = (text: string) => {
    const match = text.match(/(\d+[\w%.]+)/);
    if (match) {
      const metric = match[0];
      const desc = text
        .replace(metric, "")
        .trim()
        .replace(/^[—\-:\s]+|[—\-:\s]+$/g, "");
      return { metric, desc };
    }
    return { metric: "—", desc: text };
  };

  return (
    <div
      style={{
        marginBottom: "2rem",
        paddingTop: "1rem",
        borderTop: "1px solid var(--glass-border)",
      }}
    >
      <h3
        style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "var(--text-2)",
          marginBottom: "1.2rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "var(--text-2)",
          }}
        />
        Key Achievements
      </h3>
      <p
        style={{
          fontSize: "0.95rem",
          color: "var(--text-1)",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
          wordBreak: "keep-all",
        }}
      >
        {summary}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {achievements
          .filter((ach) => ach && ach.trim() !== "")
          .map((ach, i) => {
            const { metric, desc } = parseAchievement(ach);
            return (
              <div
                key={i}
                style={{
                  background: "transparent",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 300,
                    color: "var(--text-0)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {metric}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-2)",
                    lineHeight: 1.5,
                    wordBreak: "keep-all",
                  }}
                >
                  {desc}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// ── 모달 ──────────────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const onOverlay = useCallback(
    (e: React.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        onClose();
    },
    [onClose],
  );

  return createPortal(
    <div
      onClick={onOverlay}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: "min(720px, 100%)",
          maxHeight: "88vh",
          borderRadius: "24px",
          overflow: "hidden",
          background: "var(--bg-1)",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
          animation: "modal-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        <div style={{ position: "relative", height: 200, flexShrink: 0 }}>
          <Thumb
            thumbnail={project.thumbnail}
            style={{ position: "absolute", inset: 0 }}
          />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(0,0,0,0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(0,0,0,0.6)")
            }
            aria-label="닫기"
          >
            ✕
          </button>
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "2rem",
              right: "2rem",
              zIndex: 1,
            }}
          >
            <div
              style={{ display: "flex", gap: "8px", marginBottom: "0.5rem" }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: "none",
                  padding: "4px 10px",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  borderRadius: "100px",
                }}
              >
                {project.role}
              </span>
              {project.featured && (
                <span
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    color: "#000",
                    border: "none",
                    padding: "4px 10px",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    borderRadius: "100px",
                    fontWeight: 700,
                  }}
                >
                  Featured
                </span>
              )}
            </div>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              {project.title}
            </h2>
          </div>
        </div>

        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--glass-border)",
            background: "rgba(10, 10, 10, 0.02)",
            backdropFilter: "blur(12px)",
            flexShrink: 0,
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {project.techStack.map((t) => (
              <span
                key={t}
                style={{
                  padding: "4px 10px",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-1)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "100px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {project.github && (
              <Button variant="ghost" href={project.github}>
                GitHub
              </Button>
            )}
            {project.demo && (
              <Button variant="primary" href={project.demo}>
                Live Demo ↗
              </Button>
            )}
          </div>
        </div>

        <div
          style={{
            padding: "2rem",
            overflowY: "auto",
            flex: 1,
            minHeight: "360px",
            height: "45vh",
          }}
        >
          <MinimalSection
            title="문제 정의"
            summary={project.problem.summary}
            points={project.problem.details}
          />
          <MinimalSection
            title="해결 전략 및 기술"
            summary={project.solution.summary}
            points={[...project.solution.points, ...project.tech.points]}
          />
          <AchievementGrid
            summary={project.implementation.summary}
            achievements={project.implementation.achievements}
          />
        </div>

        <div
          style={{
            padding: "1.2rem 2rem",
            flexShrink: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            borderTop: "1px solid var(--glass-border)",
            background: "var(--bg-1)",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 24px",
              borderRadius: "100px",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-0)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            닫기 (Close)
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ── Ultra-Premium Bento 카드 (Spotlight & Asymmetry) ──────────────────────────
function BentoCard({
  project,
  onClick,
  isVisible,
  delay,
}: {
  project: Project;
  onClick: () => void;
  isVisible: boolean;
  delay: string;
}) {
  const isFeatured = project.featured;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`fade-up ${delay} ${isVisible ? "visible" : ""} bento-card`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        setIsHovered(true);
        const img = e.currentTarget.querySelector(
          ".bento-thumb-img",
        ) as HTMLImageElement;
        if (img) img.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        const img = e.currentTarget.querySelector(
          ".bento-thumb-img",
        ) as HTMLImageElement;
        if (img) img.style.transform = "scale(1)";
      }}
      style={{
        cursor: "pointer",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid var(--glass-border)",
        background: "var(--glass-bg)",
        boxShadow: "var(--shadow-card)",
        backdropFilter: "blur(12px)",
        position: "relative",
        transition:
          "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {/* Spotlight Effect Layer */}
      <div
        className="spotlight"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 40%)`
            : "transparent",
          transition: "background 0.3s ease",
        }}
      />

      <div
        className="bento-content-wrapper"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Content Area */}
        <div
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            zIndex: 2,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--text-2)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {project.period}
              </div>
              {isFeatured && (
                <div
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    color: "#000",
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-mono)",
                    padding: "4px 10px",
                    borderRadius: "100px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Featured
                </div>
              )}
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text-0)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-1)",
                lineHeight: 1.6,
              }}
            >
              {project.description}
            </p>
            {project.implementation?.achievements?.[0]?.trim() && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  background:
                    "color-mix(in srgb, var(--accent-cyan) 10%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--accent-cyan) 30%, transparent)",
                  color: "var(--accent-cyan)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                🚀 <Metric text={project.implementation.achievements[0]} />
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            {project.techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                style={{
                  padding: "4px 12px",
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-1)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "100px",
                  background: "transparent",
                  letterSpacing: "0.02em",
                }}
              >
                {t}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "var(--text-2)",
                  alignSelf: "center",
                  fontWeight: 500,
                }}
              >
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail Area - Right aligned for Featured, Bottom aligned for normal */}
        <div
          className="bento-thumb-container"
          style={{ position: "relative", zIndex: 1 }}
        >
          <Thumb
            thumbnail={project.thumbnail}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "12px 0 24px 0",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── 섹션 ──────────────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState<Project | null>(null);
  const handleClose = useCallback(() => setSelected(null), []);

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const archiveProjects = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <div
          className={`fade-up ${isVisible ? "visible" : ""}`}
          style={{ marginBottom: "4rem" }}
        >
          <SectionHeader
            eyebrow="// selected work"
            title="프로젝트"
            subtitle="비즈니스 문제를 해결하고 사용자 경험을 개선한 핵심 프로젝트입니다."
          />
        </div>

        <div
          className={`fade-up delay-100 ${isVisible ? "visible" : ""} bento-grid`}
        >
          {featuredProjects.map((project, i) => (
            <BentoCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
              isVisible={isVisible}
              delay={`delay-${((i % 5) + 1) * 100}`}
            />
          ))}
        </div>

        {archiveProjects.length > 0 && (
          <div
            className={`fade-up delay-300 ${isVisible ? "visible" : ""}`}
            style={{ marginTop: "6rem" }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--text-0)",
                marginBottom: "2rem",
                letterSpacing: "-0.02em",
              }}
            >
              Other Notable Projects
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              {archiveProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.demo || project.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="archive-card"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.25rem 1.5rem",
                      borderRadius: "12px",
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      gap: "1.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        flex: "1 1 250px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.85rem",
                          color: "var(--text-2)",
                          width: "50px",
                          flexShrink: 0,
                        }}
                      >
                        {project.period.split(".")[0]}
                      </span>
                      <h4
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 600,
                          color: "var(--text-0)",
                          margin: 0,
                        }}
                      >
                        {project.title}
                      </h4>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        flexWrap: "wrap",
                        flex: "2 1 350px",
                      }}
                    >
                      {project.techStack.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: "4px 10px",
                            fontSize: "0.7rem",
                            fontFamily: "var(--font-mono)",
                            color: "var(--text-1)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "100px",
                            background: "transparent",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--text-2)",
                          fontSize: "0.85rem",
                          fontFamily: "var(--font-mono)",
                          transition: "color 0.2s",
                        }}
                        className="archive-link"
                      >
                        View Project ↗
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={handleClose} />}

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          grid-auto-rows: minmax(380px, auto);
        }
        
        .bento-content-wrapper {
          flex-direction: column;
        }
        
        .bento-thumb-container {
          flex: 1;
          min-height: 200px;
          width: 100%;
          margin-top: auto;
        }

        /* Hover Effects */
        .bento-card:hover {
          border-color: rgba(255,255,255,0.15) !important;
          transform: translateY(-4px);
        }
        
        .archive-card > div:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.2) !important;
          transform: translateX(4px);
        }

        .archive-card:hover .archive-link {
          color: var(--accent-primary) !important;
        }

        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
          }
        }

        .tab-fade-in {
          animation: tab-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modal-in {
          from { transform: scale(0.96) translateY(20px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes tab-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
