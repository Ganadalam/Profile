/**
 * Navbar v11 — 통일된 디자인 토큰
 */

import { useState, useEffect } from "react";
import { useActiveSection, useScrollProgress } from "@/hooks";
import { scrollToSection, throttle } from "@/utils";
import { PROFILE } from "@/constants/profile";
import type { SectionId, NavItem } from "@/types";
import type { Theme } from "@/hooks";

interface NavbarProps { theme: Theme; toggleTheme: () => void; }

const NAV_ITEMS: NavItem[] = [
  { label: "About",      href: "about" },
  { label: "Experience", href: "timeline" },
  { label: "Projects",   href: "projects" },
  { label: "Skills",     href: "skills" },
  { label: "Contact",    href: "contact" },
];

const SECTION_IDS: SectionId[] = ["hero", "about", "timeline", "projects", "skills", "contact"];

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      style={{
        width: "42px", height: "23px", borderRadius: "var(--radius-full)",
        border: "1px solid var(--glass-border-hover)",
        background: isDark
          ? "color-mix(in srgb, var(--accent-primary) 14%, transparent)"
          : "color-mix(in srgb, var(--accent-primary) 10%, transparent)",
        cursor: "pointer", position: "relative",
        transition: "background var(--ease-base), border-color var(--ease-base)",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute", top: "3px",
          left: isDark ? "21px" : "3px",
          width: "15px", height: "15px", borderRadius: "50%",
          background: "var(--text-0)",
          transition: "left var(--ease-spring)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "9px",
          color: "var(--bg-0)",
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const activeSection = useActiveSection(SECTION_IDS);
  const progress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = throttle(() => setScrolled(window.scrollY > 50), 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleNavClick = (href: SectionId) => {
    scrollToSection(href);
    setMenuOpen(false);
  };

  return (
    <>
      {/* 스크롤 진행 바 */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, height: "2px",
          width: `${progress * 100}%`,
          background: "var(--accent-primary)",
          zIndex: 1000, transition: "width 0.1s linear",
        }}
      />

      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: "68px", zIndex: 999,
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid var(--nav-border)" : "1px solid transparent",
          transition: "all var(--ease-slow)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)", margin: "0 auto",
            padding: "0 var(--container-px)",
            height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          {/* 로고 */}
          <button
            onClick={() => scrollToSection("hero")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 600,
              color: "var(--text-0)", letterSpacing: "0.04em",
            }}
          >
            <span style={{ fontWeight: 800 }}>{PROFILE.nickname}</span>
          </button>

          {/* 데스크탑 네비 */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <ul style={{ display: "flex", listStyle: "none", gap: "1.75rem", alignItems: "center" }}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "var(--font-sans)", fontSize: "0.88rem", fontWeight: 600,
                      color: activeSection === item.href ? "var(--accent-primary)" : "var(--text-1)",
                      transition: "color var(--ease-base)",
                      position: "relative", padding: "4px 0", letterSpacing: "0.01em",
                    }}
                  >
                    {item.label}
                    {activeSection === item.href && (
                      <span
                        style={{
                          position: "absolute", bottom: "-2px", left: 0, right: 0,
                          height: "2px",
                          background: "var(--accent-primary)",
                          borderRadius: "1px",
                        }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>

          {/* 모바일 */}
          <div style={{ display: "none" }} className="mobile-controls">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "8px", color: "var(--text-0)",
              }}
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
            >
              <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      display: "block", height: "2px",
                      background: "var(--text-0)", borderRadius: "1px",
                      transition: "all var(--ease-base)", transformOrigin: "center",
                      transform: menuOpen
                        ? i === 0 ? "rotate(45deg) translateY(7px)"
                        : i === 1 ? "scaleX(0)"
                        : "rotate(-45deg) translateY(-7px)"
                        : "none",
                      opacity: menuOpen && i === 1 ? 0 : 1,
                    }}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>

        <div aria-hidden onClick={() => setMenuOpen(false)}
          style={{ 
            position: "fixed", inset: 0, top: "68px", zIndex: -1,
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "opacity var(--ease-base)",
            background: "rgba(0,0,0,0.4)"
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "68px",
            left: 0,
            right: 0,
            background: "var(--nav-bg)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            borderTop: "1px solid var(--nav-border)", padding: "0.75rem",
            transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            visibility: menuOpen ? "visible" : "hidden",
            transition: "all var(--ease-base)",
            boxShadow: menuOpen ? "0 10px 30px rgba(0,0,0,0.2)" : "none",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              style={{
                display: "block", width: "100%", background: "none", border: "none",
                cursor: "pointer", textAlign: "left", padding: "12px 16px",
                fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600,
                color: activeSection === item.href ? "var(--accent-primary)" : "var(--text-1)",
                borderRadius: "var(--radius-sm)",
                transition: "color var(--ease-base), background var(--ease-base)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--glass-bg-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; align-items: center; gap: 0.5rem; }
        }
      `}</style>
    </>
  );
}
