# 🚀 Portfolio — Euina Jeong (Lunar.Dev)

> **React 18 + TypeScript + Vite** 기반 개인 포트폴리오 사이트  
> Glassmorphism 디자인 시스템, 커스텀 훅 아키텍처, 성능 최적화에 초점을 맞춘 프론트엔드 역량 시연 프로젝트

**Live:** _https://devlunar.vercel.app/_ · **Stack:** React 18 · TypeScript 5 · Vite 5 · CSS Custom Properties

---

## 📁 프로젝트 구조

```
portfolio_v11/
├── public/
│   └── images/          # 정적 에셋 (프로젝트 썸네일 등)
└── src/
    ├── constants/
    │   └── profile.ts   # ✅ Single Source of Truth — 모든 콘텐츠 데이터
    ├── types/
    │   └── index.ts     # 공유 TypeScript 타입 (SectionId, NavItem, BaseProps)
    ├── utils/
    │   └── index.ts     # 순수 함수 유틸 (cn, throttle, scrollToSection…)
    ├── hooks/
    │   └── index.ts     # 커스텀 훅 — UI 로직과 컴포넌트 완전 분리
    ├── styles/
    │   ├── globals.css  # CSS 토큰 + 전역 레이아웃 (다크/라이트 테마)
    │   └── hero.css     # 히어로 섹션 전용 스타일
    └── components/
        ├── common/      # 앱 전역 공통 (ParticleCanvas)
        ├── layout/      # 레이아웃 (Navbar)
        ├── ui/          # 원자 컴포넌트 (Button, Badge, GlassCard, SectionHeader)
        └── sections/    # 페이지 섹션 (Hero, About, Skills, Projects, Timeline, Contact)
```

---

## ⚡ 빠른 시작

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 프로덕션 빌드 (prebuild 검사 포함)
npm run preview  # 빌드 결과물 미리보기
```

**콘텐츠만 수정하려면 `src/constants/profile.ts` 파일 하나만 편집하면 됩니다.**

---

## 🧠 핵심 설계 결정

### 1. Single Source of Truth — `constants/profile.ts`

모든 개인 정보·프로젝트·스킬 데이터를 **단일 파일**에서 관리합니다.

```typescript
// ❌ 안티패턴: 컴포넌트마다 데이터 하드코딩
// ✅ 이 프로젝트: profile.ts 하나만 수정 → 전체 반영
export const PROFILE = {
  name: "Euina Jeong",
  role: "Frontend Engineer",
} as const;
```

**이점:** 수정 지점 최소화. 향후 CMS·API로 교체 시 이 파일 인터페이스만 유지하면 됩니다.

---

### 2. 커스텀 훅으로 UI 로직 분리 (`hooks/index.ts`)

| 훅                   | 역할                                                        | 사용처                    |
| -------------------- | ----------------------------------------------------------- | ------------------------- |
| `useScrollAnimation` | IntersectionObserver 추상화 + `prefers-reduced-motion` 대응 | 모든 섹션 진입 애니메이션 |
| `useTypewriter`      | 타이핑·삭제 상태 머신                                       | HeroSection               |
| `useMouseParallax`   | 마우스 좌표 정규화 (−1~1)                                   | HeroSection 배경          |
| `useActiveSection`   | 현재 뷰포트 섹션 감지                                       | Navbar 활성 링크          |
| `useScrollProgress`  | 스크롤 진행률 0~1 (rAF 최적화)                              | Navbar 상단 프로그레스 바 |
| `useTheme`           | 다크/라이트 토글 + `localStorage` 영속화                    | App 루트                  |
| `useCopyToClipboard` | 클립보드 복사 + 폴백 + 자동 리셋                            | ContactSection            |

**원칙:** 컴포넌트는 _무엇을 보여줄지_ 만 담당. 로직은 훅이 전담. → 테스트 용이·재사용성 확보

---

### 3. CSS Custom Properties 기반 디자인 시스템 (`globals.css`)

```css
/* 다크 테마 기본값 */
[data-theme="dark"] {
  --text-0: #f0f0f0;
  --text-1: rgba(240, 240, 240, 0.65);
  --bg-0: #0a0a0f;
  --accent-primary: #60a5fa;
}
/* 라이트 테마 오버라이드 */
[data-theme="light"] {
  --text-0: #0f0f13;
  --bg-0: #f5f5f7;
}
```

JS 없이 CSS 변수만으로 테마 전환. `v11`에서 하드코딩 컬러 전면 제거 완료.

---

### 4. Glassmorphism 구현 원리

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px); /* GPU 레이어 생성 */
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

> **성능 주의:** `backdrop-filter`는 GPU 합성 레이어를 생성합니다.  
> 카드가 많은 뷰에서는 `will-change: transform` 대신 `contain: layout` 사용을 권장합니다.

---

### 5. 파티클 애니메이션 — Canvas + rAF

```typescript
// DOM 조작 없이 Canvas API로 60fps 유지
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(update);
  animationId = requestAnimationFrame(animate);
}
// 컴포넌트 언마운트 시 반드시 취소 → 메모리 누수 방지
return () => cancelAnimationFrame(animationId);
```

---

## 🐛 문제 → 해결 이력

### P1: `useScrollProgress` rAF ID `0` 오탐 (v8 fix)

**문제:** `rafId` 초기값 `null` 사용 시 `if (rafId)` 조건에서 `0`(유효한 ID)을 falsy로 오탐 → 잘못된 `cancelAnimationFrame` 호출 가능성.

```typescript
// ❌ 이전 — 0은 유효한 rAF ID인데 null처럼 취급될 우려
let rafId: number | null = null;
if (rafId !== null) cancelAnimationFrame(rafId);

// ✅ 수정 — pending 플래그로 의미를 명확히 분리
let pending = false;
let rafId = 0;
const handleScroll = () => {
  if (pending) return;
  pending = true;
  rafId = requestAnimationFrame(() => { ...; pending = false; });
};
return () => { if (pending) cancelAnimationFrame(rafId); };
```

---

### P2: `useScrollAnimation` — 모션 민감 사용자 배제 (v8 fix)

**문제:** `prefers-reduced-motion: reduce` 설정 사용자도 IntersectionObserver를 통해 애니메이션이 트리거됨 → 멀미·접근성 문제.

```typescript
// ✅ 수정 — 모션 축소 선호 시 즉시 visible 상태로 초기화, Observer 미등록
const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const [isVisible, setIsVisible] = useState(prefersReduced); // 즉시 true

useEffect(() => {
  if (prefersReduced) return; // Observer 등록 자체를 건너뜀
  // ...IntersectionObserver 로직
}, [once, prefersReduced]);
```

---

### P3: `useTypewriter` — words 배열 참조 안정화 (v8 문서화)

**문제:** `words` prop이 매 렌더마다 새 배열로 생성되면 `useEffect` 의존성 배열에 포함 시 무한 재실행.

```typescript
// ✅ wordsRef로 안정적인 참조 유지, effect 재실행 방지
const wordsRef = useRef(words);
useEffect(() => {
  wordsRef.current = words;
}, [words]);
const stableWords = wordsRef.current; // effect deps에 이 값 사용
```

> **사용 계약:** `words` 배열은 컴포넌트 외부 상수(`const`)로 선언하는 것을 권장합니다.  
> 런타임에 `words`가 변경되는 경우 `wordIndex`를 0으로 리셋하는 로직이 별도로 필요합니다.

---

### P4: `useTheme` — SSR(Next.js) 이식성 (v8 fix)

**문제:** `localStorage` 접근이 컴포넌트 최상위에서 즉시 실행될 경우 SSR 환경(Next.js)에서 `window is not defined` 오류.

```typescript
// ✅ 초기화 함수를 분리해 useState lazy initializer로 전달
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark"; // SSR 안전
  const saved = localStorage.getItem("portfolio-theme") as Theme | null;
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme); // 함수 전달 (lazy)
  // ...
}
```

---

### P5: `useActiveSection` — sectionIds 의존성 루프

**문제:** `sectionIds` 배열이 매 렌더마다 새 참조 → `useEffect` deps에 포함 시 Observer가 반복 등록·해제.

```typescript
// ✅ idsRef로 최신 값 유지하되 effect 재실행 방지
const idsRef = useRef(sectionIds);
useEffect(() => {
  idsRef.current = sectionIds;
}, [sectionIds]);

useEffect(() => {
  // idsRef.current 사용 → deps 배열에 sectionIds 불필요
  idsRef.current.forEach((id) => {
    /* observe */
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // 마운트 1회만 실행
```

---

## 🔮 확장성 가이드

### 섹션 추가

1. `src/types/index.ts`의 `SectionId` union에 새 ID 추가
2. `src/constants/profile.ts`에 데이터 추가
3. `src/components/sections/`에 컴포넌트 생성
4. `src/App.tsx`에 임포트 및 배치
5. `Navbar.tsx`의 `NAV_ITEMS` 배열에 링크 추가

### 외부 API/CMS 연동

`constants/profile.ts`의 상수들을 API 응답 타입에 맞는 fetch 함수로 교체하면 됩니다.  
타입 인터페이스(`Project`, `Skill`, `TimelineItem`)는 그대로 재사용 가능합니다.

### 다국어(i18n) 대응

현재 한국어/영어 혼용 구조. i18n 라이브러리 적용 시 `profile.ts`의 문자열 값을 번역 키로 교체하면 최소 변경으로 적용 가능합니다.

---

## 🛠 기술 스택

| 영역          | 기술                                    |
| ------------- | --------------------------------------- |
| UI 프레임워크 | React 18 (Hooks)                        |
| 언어          | TypeScript 5.3                          |
| 빌드          | Vite 5 + @vitejs/plugin-react           |
| 스타일        | CSS Custom Properties (Zero-dependency) |
| 패키지 매니저 | npm                                     |
| 배포          | Vercel / Netlify (Static)               |

---

## 📋 개선 사항

디자인 시스템 통일, CSS 토큰 하드코딩 전면 제거, globals.css 700줄→350줄
훅 안정성 패치 (P1~P5), prefers-reduced-motion 대응, SSR 이식성 개선

---

> 📬 **Contact:** devlunar023@gmail.com · [GitHub](https://github.com/Ganadalam) · [Blog](https://lunar-halo.tistory.com/)
