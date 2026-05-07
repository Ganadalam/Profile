/**
 * ParticleCanvas - 배경 파티클 (테마 대응)
 */

import { useEffect, useRef } from "react";
import type { Theme } from "@/hooks";

interface Props { theme: Theme; }

export function ParticleCanvas({ theme }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // prefers-reduced-motion 사용자는 파티클 루프 자체를 실행하지 않음.
    // CSS에서 #particle-canvas { display:none } 처리도 하지만, JS 루프 자체도 차단해야
    // 불필요한 rAF / 연산 비용이 생기지 않음.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf: number;

    const isDark = theme === "dark";
    const count = Math.min(Math.floor(W * 0.04), 60);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      // 파티클 위치가 새 캔버스 크기 밖으로 나가지 않도록 클램핑
      particles.forEach((p) => {
        p.x = Math.min(p.x, W);
        p.y = Math.min(p.y, H);
      });
    };
    window.addEventListener("resize", onResize, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(94, 174, 255, ${p.alpha})`
          : `rgba(37, 99, 235, ${p.alpha * 0.5})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}
