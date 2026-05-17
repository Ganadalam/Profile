# 🌙 Lunar.Dev — Personal Portfolio

> **디테일에 집착하며, 사용자 경험을 예술의 경지로 끌어올립니다.**

React 18 + TypeScript + Vite 기반 개인 포트폴리오 사이트입니다.  
외부 UI 라이브러리 없이 **Glassmorphism 디자인 시스템**, **7개의 커스텀 훅**, **Canvas 파티클 애니메이션**을 직접 설계·구현하며 프론트엔드 심화 역량을 시연합니다.

<div align="center">

**🔗 [Live Demo](https://devlunar.vercel.app/)** &nbsp;|&nbsp;
**🐙 [GitHub](https://github.com/Ganadalam)** &nbsp;|&nbsp;
**📝 [Blog](https://lunar-halo.tistory.com/)** &nbsp;|&nbsp;
**📮 devlunar023@gmail.com**

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)

</div>

---

## 🎯 이 프로젝트가 보여주는 것

| 역량              | 구현 내용                                                        |
| ----------------- | ---------------------------------------------------------------- |
| **아키텍처 설계** | Single Source of Truth 패턴, 관심사 분리(훅/컴포넌트)            |
| **성능 최적화**   | rAF 기반 60fps 애니메이션, IntersectionObserver, GPU 레이어 제어 |
| **접근성(a11y)**  | `prefers-reduced-motion` 대응, 키보드 내비게이션                 |
| **확장성**        | CMS·API 교체 가능한 인터페이스 설계, i18n 대비 구조              |
| **디버깅 경험**   | rAF ID 오탐, SSR 이식성, 무한 재실행 등 실제 버그 5건 해결       |

---

## 📁 프로젝트 구조

```
src/
├── constants/profile.ts     # ✅ Single Source of Truth — 여기만 수정하면 전체 반영
├── types/index.ts           # SectionId, NavItem, BaseProps 등
├── utils/index.ts           # cn, throttle, scrollToSection…
├── hooks/index.ts           # 7개 커스텀 훅
├── styles/
│   ├── globals.css          # CSS 토큰 + 다크/라이트 테마
│   └── hero.css
└── components/
    ├── common/              # ParticleCanvas
    ├── layout/              # Navbar
    ├── ui/                  # GlassCard, Button, Badge, SectionHeader
    └── sections/            # Hero, About, Skills, Projects, Timeline, Contact
```

---

## 🚀 빠른 시작

```bash
git clone https://github.com/Ganadalam/Profile.git
cd Profile
npm install
npm run dev      # → http://localhost:5173
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

> 콘텐츠만 바꾸려면 `src/constants/profile.ts` 하나만 편집하세요.

---

## ✨ 섹션별 구현 상세

| 섹션         | 구현 방식                                                         | 핵심 기술                               |
| ------------ | ----------------------------------------------------------------- | --------------------------------------- |
| **Hero**     | `useTypewriter` 상태 머신 + `useMouseParallax` + `ParticleCanvas` | Canvas API, rAF 60fps                   |
| **About**    | 스크롤 진입 시 페이드인 (`useScrollAnimation`)                    | IntersectionObserver                    |
| **Skills**   | 카테고리 컬러 토큰 시스템, 클릭 시 관련 프로젝트·블로그 연동      | CSS Custom Properties                   |
| **Projects** | 카드 → 모달 상세 뷰 (기술선택 / 문제 / 해결 / 구현 4분할 구조)    | React Portal                            |
| **Timeline** | 순수 CSS 수직 타임라인 — 라이브러리 미사용                        | CSS only                                |
| **Navbar**   | 현재 뷰포트 섹션 자동 감지 + 상단 스크롤 진행 바                  | `useActiveSection`, `useScrollProgress` |
| **Contact**  | 원클릭 이메일 복사 + 성공 피드백 자동 리셋                        | `useCopyToClipboard`                    |

---

## 🧠 핵심 설계 결정

### 1. Single Source of Truth — `src/constants/profile.ts`

모든 개인정보·프로젝트·스킬 데이터를 **단 하나의 파일**로 관리.  
콘텐츠 업데이트 시 이 파일만 수정하면 전체 UI에 즉시 반영.

```ts
// ❌ 안티패턴: 컴포넌트마다 데이터 하드코딩
// ✅ 이 프로젝트: profile.ts 하나만 수정 → 전체 반영
export const PROFILE = {
  name: "Euina Jeong",
  role: "Frontend Engineer",
} as const;
```

> **확장 전략** Notion이나 Contentful 같은 CMS, 혹은 백엔드 API로 교체할 때도 이 파일의 타입 인터페이스(`Project`, `Skill`, `TimelineItem`)만 유지하면 됩니다.

---

### 2. 커스텀 훅으로 UI 로직 완전 분리

컴포넌트는 **"무엇을 보여줄지"** 만 담당하고, 모든 비즈니스 로직은 훅이 전담합니다.

| 훅                   | 역할                                                        | 사용 위치                 |
| -------------------- | ----------------------------------------------------------- | ------------------------- |
| `useScrollAnimation` | IntersectionObserver 추상화 + `prefers-reduced-motion` 대응 | 모든 섹션 진입 애니메이션 |
| `useTypewriter`      | 타이핑·삭제 상태 머신                                       | HeroSection               |
| `useMouseParallax`   | 마우스 좌표 정규화 (−1~1)                                   | HeroSection 배경          |
| `useActiveSection`   | 현재 뷰포트 섹션 감지                                       | Navbar 활성 링크          |
| `useScrollProgress`  | 스크롤 진행률 0~1 (rAF 최적화)                              | Navbar 상단 프로그레스 바 |
| `useTheme`           | 다크/라이트 토글 + localStorage 영속화                      | App 루트                  |
| `useCopyToClipboard` | 클립보드 복사 + 폴백 + 자동 리셋                            | ContactSection            |

---

### 3. CSS Custom Properties 기반 테마 시스템

JS 없이 CSS 변수만으로 다크/라이트 테마를 전환합니다.  
v11에서 하드코딩 컬러를 **전면 제거**하고, `globals.css`를 700줄 → 350줄로 리팩토링했습니다.

```css
[data-theme="dark"] {
  --bg-0: #0a0a0f;
  --text-0: #f0f0f0;
  --accent-primary: #60a5fa;
}
[data-theme="light"] {
  --bg-0: #f5f5f7;
  --text-0: #0f0f13;
}
```

---

### 4. Glassmorphism & Canvas 성능 설계

(\* 반투명 유리 질감, 배경 블러(Backdrop Blur), 얇은 흰색 테두리, 은은한 그림자를 활용
→ UI 요소에 입체감과 깊이감을 부여하는 디자인 스타일.
애플의 Liquid Glass와 MS의 Fluent Design이 대표적, 2025 기준 Figma 등에서 Glass 효과로 지원
)

```css
/* GPU 합성 레이어 최소화 — will-change 대신 contain 사용 */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  contain: layout; /* 카드 다수 뷰 성능 최적화 */
}
```

```js
// Canvas API로 DOM 조작 없이 60fps 파티클 유지
// 언마운트 시 cancelAnimationFrame → 메모리 누수 방지
return () => cancelAnimationFrame(animationId);
```

---

## ⚡ 성능 최적화 — Lighthouse 기준

### 📊 측정 결과 (Vercel 배포 기준)

| 항목           | 최적화 전 | 최적화 후 |
| -------------- | --------- | --------- |
| Performance    | 🟡 71     | 🟢 96     |
| Accessibility  | 🟡 78     | 🟢 98     |
| Best Practices | 🟢 92     | 🟢 100    |
| SEO            | 🟡 82     | 🟢 100    |

### 🔧 최적화 항목 상세

(1) Canvas API로 파티클 구현:
DOM 요소를 수백 개 만들어서 움직이면 브라우저가 매 프레임마다 레이아웃을 다시 계산(Layout Thrashing).
Canvas는 픽셀을 직접 그리기 때문에 DOM을 건드리지 않아 훨씬 가볍습니다. requestAnimationFrame(rAF)으로 60fps 유지, 컴포넌트가 화면에서 사라질 때 cancelAnimationFrame을 호출해서 메모리 누수를 막습니다.

(2) IntersectionObserver vs scroll 이벤트:
scroll 이벤트는 스크롤할 때마다 수십 번씩 발생하고, 그때마다 getBoundingClientRect() 호출 시, 브라우저가 강제로 레이아웃 계산. (Forced Layout). IntersectionObserver는 브라우저가 최적 타이밍에 콜백을 호출하므로 이 비용이 없습니다.

(3) rAF 디바운스:
스크롤 프로그레스 바처럼 scroll 이벤트가 꼭 필요한 곳에서는 rAF를 디바운스로 활용. pending 플래그를 두고, 이미 rAF가 예약된 상태라면 다음 이벤트는 무시. 결과적으로 프레임당 최대 1회만 업데이트.

(4) Glassmorphism 성능:
backdrop-filter: blur()는 GPU에서 처리되는데, 많이 쓰면 합성 레이어가 폭증해서 메모리와 페인트 비용 증가. will-change 대신 contain: layout을 써서 각 카드의 레이아웃 영향 범위 격리.

(5) prefers-reduced-motion 접근성:
모션에 민감한 사용자는 OS 설정에서 애니메이션 줄이기를 켜둡니다. 이걸 감지해서 애니메이션을 건너뛰고 바로 visible 상태로 초기화.

🔧 최적화 항목 상세

1. Canvas rAF — 렌더링 성능
   문제: 파티클 애니메이션이 메인 스레드를 점유해 스크롤 버벅임 발생

```bash
 DOM 조작 없이 Canvas API 직접 사용 → Layout Thrashing 0
function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => p.update());
  animId = requestAnimationFrame(animate);
}
return () => cancelAnimationFrame(animId); // 메모리 누수 방지
```

결과: CLS 0, FID 개선

requestAnimationFrame(rAF) & 디바운스란?
브라우저의 다음 리페인트 직전에 애니메이션을 업데이트하도록 예약하는 API입니다. 모니터 주사율(보통 60fps)에 맞춰 실행되므로 화면 밀림 현상을 방지하고, 스크롤 이벤트 발생 시 rAF로 업데이트 횟수를 제한(디바운스)해 스크롤 안정성을 확보합니다. [1]

2. rAF 디바운스 — 스크롤 이벤트

문제: scroll 이벤트 과다 발생 → 프레임 드롭

```bash
tsconst handleScroll = () => {
  if (pending) return; // 이미 rAF 예약됨 → 스킵
  pending = true;
  rafId = requestAnimationFrame(() => {
    setProgress(window.scrollY / maxScroll);
    pending = false;
  });
};
```

결과: 프레임당 최대 1회 업데이트 → 스크롤 FPS 안정화

3. GPU 레이어 제어 — Glassmorphism
   문제: backdrop-filter 남용 시 GPU 합성 레이어 폭증 → 페인트 비용 급증

```bash
css.glass-card {
  backdrop-filter: blur(16px);
  contain: layout; /* will-change 대신 → 리플로우 격리 */
}
```

결과: 카드 다수 뷰에서 TBT 감소

4. IntersectionObserver — 강제 레이아웃 제거

문제: getBoundingClientRect() 매 스크롤 호출 → Forced Layout [2]

```bash
scroll 이벤트 대신 IntersectionObserver 사용
const observer = new IntersectionObserver(callback, { threshold: 0.1 });
```

결과: 강제 레이아웃 제거 → LCP 개선 [3]

5. prefers-reduced-motion — 접근성

문제: 모션 민감 사용자에게 강제 애니메이션 노출 → Accessibility 감점

```bash

tsconst prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const [isVisible, setIsVisible] = useState(prefersReduced); // 즉시 true
```

결과: Accessibility +20pt 개선

---

## 🐛 실제 버그 해결 이력 (P1~P5)

> 단순 구현을 넘어, **실제 발생한 엣지 케이스를 발견하고 해결**한 과정입니다.

| #      | 증상                                                      | 원인                                                                        | 해결                                                                             |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **P1** | `cancelAnimationFrame` 오작동(애니메이션이 계속 살아있음) | `rAF ID = 0` 반환 가능, js에서 "0 = falsy"로 오탐                           | `pending` 불리언 플래그로 분리                                                   |
| **P2** | 모션 민감 사용자 애니메이션 노출                          | `prefers-reduced-motion` 미대응                                             | 설정 감지 시, `visible: true` 초기화, Observer자체는 미등록                      |
| **P3** | `useTypewriter` 무한 loop                                 | `useEffect 의존성 배열 속 words` 배열을 직접 넣으면, 매 렌더 새 참조값 생성 | `wordsRef`로 안정적 참조 유지(의존성 배열 변하지 x)                              |
| **P4** | SSR 환경 `window is not defined`                          | `localStorage` 최상위 즉시 실행                                             | `useState` lazy initializer(함수 형태로 초기값 전달)로 분리, 브라우저에서만 실행 |
| **P5** | IntersectionObserver 반복 등록(매 렌더마다)               | `sectionIds` 배열 새 참조                                                   | `idsRef`로 배열 고정 + 마운트 1회만 observer 등록                                |

---

- JS/React는
  "배열과 객체는 매 렌더마다 새 참조가 생성"

JavaScript에서 배열([])과 객체({})는 참조 타입(Reference Type).
즉, 값이 같아 보여도 생성될 때마다 메모리 주소가 다른 새 객체가 만들어집니다.

```bash
[] === []   // false — 내용이 같아도 참조가 다름
{} === {}   // false
```

React 컴포넌트가 리렌더될 때마다 함수 본문이 다시 실행되므로, 내부에서 선언된 배열/객체/함수는 매번 새 참조로 재생성

\*\* React에서 문제가 되는 이유
useEffect, useMemo, React.memo 등은 참조 동일성(===) 으로 변경 여부 판단. 배열/객체가 매 렌더마다 새 참조면 "값이 안 바뀌었는데도" 변경됐다고 판단.

(1) 배열/객체를 의존성 배열에 넣어야 할 때 = useMemo로 참조 안정화

(2) 함수를 의존성 배열에 넣어야 할 때 = useCallback으로 참조 안정화

(3) 렌더 사이에 값을 유지하고 싶을 때 = useRef로 참조 고정 (이번 포트폴리오의 P3, P5 해결책)

(4) 컴포넌트 외부 상수 = 컴포넌트 바깥에 선언 → 재생성 자체가 없음

## 📂 대표 프로젝트

| 프로젝트          | 설명                                     | 기술 스택                                          |
| ----------------- | ---------------------------------------- | -------------------------------------------------- |
| 🌤 **skyWatcher** | 날씨 기반 국내 여행지 경로 최적화 서비스 | Vanilla JS · Node.js · Express · Firebase · Vercel |
| 📚 **studyMate**  | 스터디룸 예약 및 세션별 자료 관리 플랫폼 | Vanilla JS · Express · SQLite · bcryptjs           |
| 🛡 **Deepguard**  | 딥페이크·AI 생성 이미지 판별 서비스      | Vanilla JS · Canvas API · Node.js · Google Gemini  |
| 🏠 **Zipgap**     | 국토부 실거래가 기반 부동산 시각화 분석  | Chart.js · FastAPI · SQLite · Docker               |

---

## 🔮 확장성 가이드

**섹션 추가** (5단계)

1. `src/types/index.ts` — `SectionId` union에 ID 추가
2. `src/constants/profile.ts` — 데이터 추가
3. `src/components/sections/` — 컴포넌트 생성
4. `src/App.tsx` — import 및 배치
5. `Navbar.tsx` — `NAV_ITEMS`에 링크 추가

**CMS / API 연동** — `profile.ts` 상수를 fetch 함수로 교체. 타입 인터페이스 재사용 가능.

**다국어(i18n)** — `profile.ts` 문자열을 번역 키로 교체하면 최소 변경으로 적용 가능.

---

<p align="center">
  Made with ❤️ by <strong><a href="https://github.com/Ganadalam">Euina Jeong (Lunar.Dev)</a></strong><br/>
  <sub>Seoul, South Korea · Available for work</sub>
</p>
