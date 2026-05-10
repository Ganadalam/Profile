/**
 * UI 원자 컴포넌트 — v11
 * 통일된 토큰 사용, 하드코딩 color 제거
 */

import { type ReactNode, type CSSProperties } from "react";
import { cn } from "@/utils";

/* ── Badge ───────────────────────────────────────────── */
type BadgeVariant = "blue" | "purple" | "green" | "pink" | "amber" | "default";

const BADGE: Record<BadgeVariant, { bg: string; border: string; color: string }> = {
  blue:    { bg: "color-mix(in srgb, var(--accent-primary) 14%, transparent)", border: "color-mix(in srgb, var(--accent-primary) 38%, transparent)", color: "var(--accent-primary)" },
  purple:  { bg: "color-mix(in srgb, var(--accent-purple) 14%, transparent)",  border: "color-mix(in srgb, var(--accent-purple) 38%, transparent)",  color: "var(--accent-purple)" },
  green:   { bg: "color-mix(in srgb, var(--accent-green) 14%, transparent)",   border: "color-mix(in srgb, var(--accent-green) 38%, transparent)",   color: "var(--accent-green)" },
  pink:    { bg: "color-mix(in srgb, var(--accent-pink) 14%, transparent)",    border: "color-mix(in srgb, var(--accent-pink) 38%, transparent)",    color: "var(--accent-pink)" },
  amber:   { bg: "color-mix(in srgb, var(--accent-amber) 14%, transparent)",   border: "color-mix(in srgb, var(--accent-amber) 38%, transparent)",   color: "var(--accent-amber)" },
  default: { bg: "var(--glass-bg)", border: "var(--glass-border-hover)", color: "var(--text-1)" },
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  const s = BADGE[variant];
  return (
    <span
      className={cn(className)}
      style={{
        display: "inline-block",
        padding: "3px 11px",
        borderRadius: "var(--radius-full)",
        fontSize: "0.72rem",
        fontWeight: 500,
        fontFamily: "var(--font-mono)",
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        letterSpacing: "0.03em",
        lineHeight: 1.5,
      }}
    >
      {children}
    </span>
  );
}

/* ── TechTag ─────────────────────────────────────────── */
export function TechTag({ name }: { name: string }) {
  return (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: "var(--radius-sm)",
        fontSize: "0.74rem",
        fontFamily: "var(--font-mono)",
        background: "color-mix(in srgb, var(--accent-primary) 9%, transparent)",
        border: "1px solid color-mix(in srgb, var(--accent-primary) 22%, transparent)",
        color: "var(--accent-primary)",
        display: "inline-block",
        lineHeight: 1.5,
      }}
    >
      {name}
    </span>
  );
}

/* ── Button ──────────────────────────────────────────── */
export function Button({
  children,
  onClick,
  href,
  download,
  variant = "primary",
  style,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  variant?: "primary" | "ghost";
  style?: CSSProperties;
  className?: string;
}) {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 24px",
    borderRadius: "var(--radius-md)",
    fontSize: "0.9rem",
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all var(--ease-spring)",
    textDecoration: "none",
    border: "1px solid transparent",
    letterSpacing: "0.01em",
    ...(variant === "primary"
      ? {
          background:
            "linear-gradient(135deg, var(--accent-primary), var(--accent-purple))",
          color: "white",
          boxShadow: "0 4px 16px rgba(94,168,255,0.22)",
        }
      : {
          background: "var(--glass-bg)",
          color: "var(--text-0)",
          border: "1px solid var(--glass-border-hover)",
          backdropFilter: "var(--glass-blur)",
        }),
    ...style,
  };

  const cls = `btn-${variant} ${cn(className) || ""}`.trim();

  if (href)
    return (
      <a href={href} target={download ? undefined : "_blank"} rel={download ? undefined : "noopener noreferrer"} download={download} style={base} className={cls}>
        {children}
      </a>
    );
  return (
    <button type="button" onClick={onClick} style={base} className={cls}>
      {children}
    </button>
  );
}

/* ── SectionHeader ───────────────────────────────────── */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
