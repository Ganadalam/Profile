/**
 * 전역 타입 정의
 *
 * 설계 의도:
 * - props 타입은 각 컴포넌트 파일에 함께 정의 (응집도 ↑)
 * - 여러 곳에서 공유되는 타입만 이 파일에 모음
 * - as const + typeof 패턴으로 런타임 값에서 타입 자동 추론
 */

// 섹션 ID 타입 (네비게이션 링크와 섹션 id 동기화)
export type SectionId = "hero" | "about" | "skills" | "projects" | "timeline" | "contact";

export interface NavItem {
  label: string;
  href: SectionId;
}

// 공통 컴포넌트 base props
export interface BaseProps {
  className?: string;
}
