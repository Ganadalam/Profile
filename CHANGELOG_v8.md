# portfolio_v8 — 변경 기록

작성일: 2026-05-06  
기반: portfolio_v7

---

## 🔴 버그 수정 (치명적)

### 1. `CustomCursor` — Rules of Hooks 위반 수정
**파일:** `src/App.tsx`

**문제:** `isTouch` 체크 후 조건부 `return null`이 `useEffect` 보다 앞에 위치.  
React StrictMode에서 경고, 일부 환경에서 훅 순서 불일치 크래시.

**수정:** `isTouch` 체크를 `useEffect` 내부로 이동.  
터치 기기이면 early return, 아니면 이벤트 리스너 등록.  
`document.body.classList`로 커서 활성화 신호 전달.

---

### 2. `cursor: none` 전역 적용 — 터치/JS-off 환경 커서 소멸 수정
**파일:** `src/styles/globals.css`

**문제:** `body { cursor: none }` 전역 적용 시 JS가 실행되지 않거나  
터치 기기에서 커서가 완전히 사라짐.

**수정:** `.custom-cursor-active` 클래스가 있을 때만 `cursor: none` 적용.  
JS(`CustomCursor` useEffect)가 마운트 성공 시에만 클래스 추가.  
모바일에서는 `display: none !important`로 커서 요소 강제 숨김.

---

### 3. `useScrollProgress` — rAF pending 체크 방식 개선
**파일:** `src/hooks/index.ts`

**문제:** `let rafId: number | null = null`에서 `if (rafId !== null)`로 체크.  
rAF ID는 0부터 시작 가능 → null 비교로는 정확하지 않음.

**수정:** `pending: boolean` 플래그로 교체. 의미가 명확하고 타입 안전.

---

## 🟡 접근성 개선

### 4. `useScrollAnimation` — `prefers-reduced-motion` 대응
**파일:** `src/hooks/index.ts`

**문제:** 모션에 민감한 사용자도 섹션이 처음에 숨겨진 채로 시작,  
`IntersectionObserver`에 걸려야만 표시됨.

**수정:** `window.matchMedia("(prefers-reduced-motion: reduce)")` 체크.  
`true`이면 `isVisible`을 `true`로 초기화하고 Observer 불등록.

---

## 🟠 빌드 안전성

### 5. `scripts/preflight.js` — placeholder 빌드 가드 추가
**파일:** `scripts/preflight.js`, `package.json`

`"prebuild": "node scripts/preflight.js"` 추가.  
`profile.ts`에 placeholder 문자열이 남아있으면 빌드 중단 및 안내 메시지 출력.

체크 항목:
- `"Your Name"` → PROFILE.name
- `"your@email.com"` → PROFILE.email  
- `"yourid"` → PROFILE.github
- `"yourblog.com"` → PROFILE.blog
- `"회사명 또는 프리랜서"` → TIMELINE.organization
- `"대학교명"` → TIMELINE.organization

---

## 🔵 CSS 유틸리티

### 6. 딜레이 유틸리티 클래스 추가
**파일:** `src/styles/globals.css`

`TimelineContact.tsx` 등에서 동적으로 생성하는  
`.delay-100` ~ `.delay-500` 클래스를 명시적으로 선언.

Tailwind 없는 환경에서 purge 없이 항상 존재 보장.

---

## 미수정 항목 (의도적 제외)

| 항목 | 이유 |
|---|---|
| 인라인 스타일 리팩토링 | 대규모 변경 — 컴포넌트 전체 재작성 필요, 별도 PR 권장 |
| ProjectsSection 파일 분리 | 동작 변경 없음 — 리팩토링 단계에서 처리 |
| 프로젝트 이미지 추가 | 실제 스크린샷 필요 — 개발자가 직접 채워야 함 |
| 언어 일관성 (한/영) | 디자인 의사결정 — 코드 수정 범위 아님 |
