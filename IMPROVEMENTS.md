# 🔧 최적화 & 개선사항 보고서

> `portfolio_v11` 코드베이스 분석 결과 — 문제점, 해결방법, 확장성 개선 제안

---

## ✅ 이미 잘 된 것들 (유지 권장)

- **Single Source of Truth** — `constants/profile.ts` 단일 파일 데이터 관리
- **커스텀 훅 분리** — 로직과 컴포넌트 UI 완전 분리 (`hooks/index.ts`)
- **CSS Custom Properties** — JS 없이 다크/라이트 테마 전환
- **`prefers-reduced-motion` 대응** — 접근성 고려된 애니메이션 처리
- **rAF 최적화** — `scroll` 이벤트에서 requestAnimationFrame으로 렌더링 분리
- **`as const` 패턴** — 런타임 값에서 타입 자동 추론

---

## 🐛 버그 / 잠재적 문제

### BUG-1: `useTypewriter` — `words` 런타임 변경 미지원

**위치:** `src/hooks/index.ts` → `useTypewriter`

**문제:**
```typescript
// wordsRef는 초기 렌더 시점 words를 캡처하여 업데이트하지만,
// wordIndex 리셋 로직이 없어 words가 바뀌면 이전 인덱스로 잘못된 단어 참조 가능
const wordsRef = useRef(words);
useEffect(() => { wordsRef.current = words; }, [words]);
```

**해결:**
```typescript
// words 배열이 바뀌면 wordIndex를 0으로 리셋
useEffect(() => {
  wordsRef.current = words;
  setWordIndex(0);      // ← 추가
  setDisplayed("");     // ← 추가
  setPhase("typing");   // ← 추가
}, [words]);
```

---

### BUG-2: `Navbar` 모바일 메뉴 — 오버레이 `aria-hidden` 오용

**위치:** `src/components/layout/Navbar.tsx`

**문제:**
```tsx
// aria-hidden은 스크린리더에서 숨기는 속성. 클릭 이벤트에 달면
// 스크린리더 사용자가 접근할 수 없는 요소에 인터랙션이 달림
<div aria-hidden onClick={() => setMenuOpen(false)} ...>
```

**해결:**
```tsx
// role="button" 또는 별도의 닫기 버튼으로 접근성 보장
<div
  role="button"
  tabIndex={-1}
  aria-label="메뉴 닫기"
  onClick={() => setMenuOpen(false)}
  onKeyDown={(e) => e.key === "Enter" && setMenuOpen(false)}
  ...
/>
```

---

### BUG-3: `HeroSection` — 인라인 스타일 과다

**위치:** `src/components/sections/HeroSection.tsx`

**문제:**
```tsx
// 매 렌더마다 새 객체 생성 → React.memo/PureComponent 최적화 무력화
<span style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 700, color: "var(--accent-primary)", display: "block", marginTop: "0.5rem" }}>
```

**해결:** `hero.css`에 클래스로 이동
```css
/* hero.css */
.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 700;
  color: var(--accent-primary);
  display: block;
  margin-top: 0.5rem;
}
```

---

### BUG-4: `useActiveSection` — `eslint-disable` 주석으로 의존성 숨김

**위치:** `src/hooks/index.ts` → `useActiveSection`

**문제:** `sectionIds`가 의존성 배열에서 누락되어 ESLint 경고를 주석으로 억제 중.  
`idsRef` 패턴은 올바르게 구현되었으나 주석 자체가 코드 리뷰 시 혼란을 줄 수 있음.

**해결:** 주석 대신 명확한 설명 추가 또는 `useEffectEvent` (React 19) 활용

```typescript
// 현재 패턴 (React 18 compatible) — 의도 명시적 주석
useEffect(() => {
  // sectionIds는 idsRef를 통해 항상 최신값 접근.
  // 배열 참조 변경으로 Observer가 재등록되는 것을 방지하기 위해
  // 의존성 배열에서 제외 (idsRef.current으로 최신값 보장)
  idsRef.current.forEach(/* ... */);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: see above
}, []);
```

---

## ⚡ 성능 최적화 제안

### OPT-1: `ParticleCanvas` — `devicePixelRatio` 대응 누락

**문제:** Retina/HiDPI 디스플레이에서 캔버스가 흐릿하게 보일 수 있음.

**해결:**
```typescript
// ParticleCanvas.tsx
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = width + "px";
canvas.style.height = height + "px";
ctx.scale(dpr, dpr);
```

---

### OPT-2: `ProjectsSection` — 모달 Portal 성능 개선

**현재:** `createPortal`로 모달을 `document.body`에 렌더 (올바른 패턴).  
**개선:** 모달 내부 무거운 콘텐츠를 `React.lazy` + `Suspense`로 지연 로딩.

```typescript
// 모달이 열릴 때까지 ProjectDetail 번들 로딩 지연
const ProjectDetail = React.lazy(() => import("./ProjectDetail"));

// 모달 내부
<Suspense fallback={<div className="skeleton" />}>
  <ProjectDetail project={selected} />
</Suspense>
```

---

### OPT-3: `globals.css` — 미사용 변수 정리

`v11` 마이그레이션 후 하위 호환 alias가 남아 있음. 프로젝트 안정화 후 제거 권장:
```css
/* 제거 예정 alias (globals.css) */
--text-primary: var(--text-0);        /* → var(--text-0) 직접 사용 */
--accent-blue: var(--accent-primary); /* → var(--accent-primary) 직접 사용 */
```

---

### OPT-4: `Navbar` — `throttle` 직접 구현 vs `lodash`

현재 `utils/index.ts`에 throttle을 직접 구현 중. 이는 번들 크기 측면에서 올바른 선택이나,  
`this` 바인딩 이슈 가능성 존재. 제네릭 타입 활용으로 타입 안전성은 확보됨.

```typescript
// 현재 구현의 this 바인딩 주의사항 문서화 필요
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  // arrow function 내 this 사용 불가 — 명시적 주석 추가 권장
}
```

---

## 🏗 확장성 개선 제안

### EXT-1: 섹션 컴포넌트 lazy loading 도입

**현재:** 모든 섹션이 초기 번들에 포함.  
**개선:** 스크롤 아래 섹션은 지연 로딩으로 초기 JS 감소.

```typescript
// App.tsx
const ProjectsSection = React.lazy(() => import("@/components/sections/ProjectsSection"));
const SkillsSection   = React.lazy(() => import("@/components/sections/SkillsSection"));

// Suspense 경계
<Suspense fallback={<SectionSkeleton />}>
  <ProjectsSection />
</Suspense>
```

---

### EXT-2: 이미지 최적화 파이프라인

`public/images/` 내 PNG/JPG를 WebP/AVIF로 변환하고 `<picture>` 태그로 폴백 구성.

```tsx
// 현재
<img src="/images/1.png" loading="lazy" />

// 개선
<picture>
  <source srcSet="/images/1.avif" type="image/avif" />
  <source srcSet="/images/1.webp" type="image/webp" />
  <img src="/images/1.png" loading="lazy" decoding="async" />
</picture>
```

Vite 플러그인 추가:
```bash
npm install -D vite-plugin-imagemin
```

---

### EXT-3: 환경 변수로 콘텐츠 분리 (CMS 연동 준비)

`profile.ts`가 커질수록 유지보수 부담 증가. 장기적으로 헤드리스 CMS(Sanity, Contentful 등) 연동을 위한 추상 레이어 준비.

```typescript
// src/constants/profile.ts → src/data/fetcher.ts 로 점진적 마이그레이션
export async function fetchProfile(): Promise<typeof PROFILE> {
  if (import.meta.env.VITE_CMS_URL) {
    return fetch(`${import.meta.env.VITE_CMS_URL}/profile`).then(r => r.json());
  }
  return PROFILE; // 폴백: 현재 정적 상수
}
```

---

### EXT-4: 타입 안전 섹션 ID

`SectionId` 타입과 실제 `id=""` 속성의 동기화를 컴파일 타임에 검증하는 유틸리티 함수.

```typescript
// types/index.ts
export type SectionId = "hero" | "about" | "skills" | "projects" | "timeline" | "contact";

// 실제 id 속성에서 타입 검증
function sectionId(id: SectionId): SectionId { return id; }

// 섹션 컴포넌트에서
<section id={sectionId("about")} ...>
```

---

### EXT-5: `vite.config.ts` 청크 분리 최적화

현재 단일 청크로 번들됨. 벤더 라이브러리와 앱 코드 분리로 캐싱 효율 향상.

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
        },
      },
    },
  },
  resolve: {
    alias: { "@": "/src" },
  },
});
```

---

## 📊 우선순위 정리

| 우선순위 | 항목 | 영향 | 난이도 |
|---|---|---|---|
| 🔴 높음 | BUG-2 모바일 메뉴 aria 오용 | 접근성 | 낮음 |
| 🔴 높음 | OPT-1 devicePixelRatio 대응 | 시각 품질 | 낮음 |
| 🟡 중간 | BUG-1 words 변경 미지원 | 안정성 | 낮음 |
| 🟡 중간 | BUG-3 인라인 스타일 과다 | 성능 | 낮음 |
| 🟡 중간 | EXT-5 청크 분리 | 로딩 성능 | 낮음 |
| 🟢 낮음 | EXT-1 섹션 lazy loading | 초기 번들 | 중간 |
| 🟢 낮음 | EXT-2 이미지 최적화 | Core Web Vitals | 중간 |
| ⚪ 선택 | EXT-3 CMS 연동 준비 | 확장성 | 높음 |
