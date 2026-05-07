/**
 * 커스텀 훅 모음 - v8 개선판
 *
 * 변경 사항:
 * - useScrollAnimation: prefers-reduced-motion 대응 추가
 * - useScrollProgress: rAF ID 타입 체크 수정 (null 초기값에서 0 오탐 방지)
 * - useTypewriter: wordsRef 동작 계약 명문화
 * - useTheme: SSR 이식성 개선 (Next.js 마이그레이션 대비)
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { OBSERVER_OPTIONS } from "@/utils";
import type { SectionId } from "@/types";

// ── useCopyToClipboard
export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // execCommand fallback (HTTP / iframe / 구형 브라우저)
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
      } catch {
        // 완전 차단 환경 — 무음 처리
      }
    }
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), resetMs);
  }, [resetMs]);

  return { copied, copy };
}

// ── useScrollAnimation
// [Fix] prefers-reduced-motion: 모션 민감 사용자는 애니메이션 없이 즉시 표시
export function useScrollAnimation(once = true) {
  const ref = useRef<HTMLElement>(null);

  // prefers-reduced-motion이 설정된 경우 처음부터 visible로 초기화
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [isVisible, setIsVisible] = useState(prefersReduced);

  useEffect(() => {
    // 모션 줄이기 설정 시 IntersectionObserver 불필요
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once) observer.unobserve(el);
      } else if (!once) {
        setIsVisible(false);
      }
    }, OBSERVER_OPTIONS);
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, prefersReduced]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, isVisible };
}

// ── useTypewriter
interface TypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
}: TypewriterOptions) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  // words 참조 안정화: useRef로 저장해 매 렌더마다 새 참조가 생겨도 effect 재실행 방지.
  // 사용 계약: words 배열은 컴포넌트 외부 상수로 선언하는 것을 권장.
  // 런타임에 words가 바뀌는 경우 wordIndex를 0으로 리셋해야 함 (현재 미지원).
  const wordsRef = useRef(words);
  useEffect(() => { wordsRef.current = words; }, [words]);
  const stableWords = wordsRef.current;

  useEffect(() => {
    const currentWord = stableWords[wordIndex % stableWords.length];
    if (phase === "typing") {
      if (displayed.length < currentWord.length) {
        const t = setTimeout(() => setDisplayed(currentWord.slice(0, displayed.length + 1)), typeSpeed);
        return () => clearTimeout(t);
      } else {
        setPhase("pause");
      }
    }
    if (phase === "pause") {
      const t = setTimeout(() => setPhase("deleting"), pauseDuration);
      return () => clearTimeout(t);
    }
    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed((prev) => prev.slice(0, -1)), deleteSpeed);
        return () => clearTimeout(t);
      } else {
        setWordIndex((i) => i + 1);
        setPhase("typing");
      }
    }
  }, [displayed, phase, wordIndex, stableWords, typeSpeed, deleteSpeed, pauseDuration]);

  return displayed;
}

// ── useMouseParallax
export function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);
  return pos;
}

// ── useActiveSection
export function useActiveSection(sectionIds: SectionId[]) {
  const [active, setActive] = useState<SectionId>(sectionIds[0]);

  const idsRef = useRef(sectionIds);
  useEffect(() => { idsRef.current = sectionIds; }, [sectionIds]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if (visible.length > 0) setActive(visible[0].target.id as SectionId);
      },
      { threshold: 0, rootMargin: "-40% 0px -40% 0px" }
    );
    idsRef.current.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

// ── useScrollProgress
// [Fix] rafId 타입을 number | null → boolean 플래그로 교체
//   기존: if (rafId !== null) — rAF ID가 0일 때 오탐 없음(0은 유효한 ID)
//   명확성을 위해 pending 플래그 방식으로 변경
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let pending = false;
    let rafId = 0;

    const handleScroll = () => {
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? window.scrollY / total : 0);
        pending = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (pending) cancelAnimationFrame(rafId);
    };
  }, []);
  return progress;
}

// ── useTheme (다크/라이트 토글)
// [Fix] SSR 이식성 개선: localStorage 접근을 함수 바깥에서 안전하게 처리
export type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("portfolio-theme") as Theme | null;
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
