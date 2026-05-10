/**
 * 공통 유틸리티 함수 모음
 *
 * 설계 의도:
 * - 순수 함수(Pure Function)만 포함 → 테스트 용이성
 * - 컴포넌트 로직과 순수 로직 분리 (단일 책임 원칙)
 */

/**
 * CSS 클래스명 조합 유틸
 * 조건부 클래스 적용 시 undefined/false 제거
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * 스크롤 애니메이션용 Intersection Observer 설정값
 * 재사용 가능한 옵션 프리셋
 */
export const OBSERVER_OPTIONS = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
} as const;

/**
 * 이메일 유효성 검사
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 텍스트를 일정 길이로 자르고 말줄임표 추가
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * 부드러운 스크롤 네비게이션
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  // prefers-reduced-motion 사용자는 instant 스크롤 (부드러운 스크롤이 멀미 유발 가능)
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: prefersReduced ? "instant" : "smooth", block: "start" });
}

/**
 * Throttle 함수 - 지정된 시간 간격 내에 한 번만 함수 실행
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
}
