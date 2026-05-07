/**
 * GlassCard v11 — 반경/패딩 토큰 통일
 */
import { type CSSProperties, type ReactNode, type KeyboardEvent } from "react";
import { cn } from "@/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  accentColor?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  glow = false,
  accentColor,
  style,
  onClick,
}: GlassCardProps) {
  const glowStyle: CSSProperties =
    glow && accentColor
      ? { boxShadow: `0 0 28px ${accentColor}28, var(--shadow-card)` }
      : {};

  const interactiveProps = onClick
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick,
        onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
      }
    : {};

  return (
    <div
      className={cn("glass", className)}
      style={{ ...glowStyle, ...style }}
      {...interactiveProps}
    >
      {children}
    </div>
  );
}
