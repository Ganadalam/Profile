/**
 * 📌 포트폴리오 핵심 데이터 상수 - v10
 * skill에 coverImage / relatedProjects / blogLinks 추가
 */

export const PROFILE = {
  name: "Euina Jeong",
  nickname: "Lunar.Dev",
  role: "Frontend Engineer",
  tagline: "디테일에 집착하며, 사용자 경험을 예술의 경지로 끌어올립니다.",
  email: "devlunar023@gmail.com",
  github: "https://github.com/Ganadalam",
  blog: "https://lunar-halo.tistory.com/",
  location: "Seoul, South Korea",
  availableForWork: true,
  photo: null as string | null,
  resume: "/resume.pdf",
} as const;

export const ABOUT = {
  summary: `
    React와 최신 웹 생태계를 바탕으로 감각적인 인터페이스를 구현하는 프론트엔드 엔지니어입니다.
    사용자가 '느끼는' 아주 미세한 상호작용과 성능의 차이가 완성도를 결정한다고 믿습니다.
    코드 한 줄, 픽셀 하나에도 의도와 맥락을 담아 프리미엄 디지털 경험을 제공합니다.
  `.trim(),
  highlights: [
    "시각적 완성도와 마이크로 인터랙션에 대한 강박적인 디테일",
    "컴포넌트 설계와 재사용성을 극대화하는 아키텍처 구성",
    "사용자 경험(UX) 중심의 렌더링 성능 최적화",
    "코드 리뷰와 애자일(Agile) 프로세스를 주도하는 유연한 협업 능력",
  ],
} as const;

export type SkillLevel = "expert" | "advanced" | "intermediate" | "novice";

export interface BlogLink {
  title: string;
  url: string;
  date?: string;
  thumbnail?: string;
}

export interface Skill {
  name: string;
  level?: SkillLevel;
  icon: string;
  /** simpleicons CDN URL or null for emoji fallback */
  coverImage?: string | null;
  /** project IDs this skill appears in */
  relatedProjects?: string[];
  blogLinks?: BlogLink[];
}

export interface SkillCategory {
  category: string;
  color: string;
  skills: Skill[];
}

export const SKILLS: SkillCategory[] = [
  {
    category: "Frontend",
    color: "#60a5fa",
    skills: [
      {
        name: "React",
        level: "novice",
        icon: "⚛️",
        coverImage: "https://cdn.simpleicons.org/react/61DAFB",
        relatedProjects: ["project-2", "project-3"],
        blogLinks: [
          {
            title: "React 상태관리 비교: Zustand vs Recoil 한눈에 정리",
            url: "https://yourblog.com/react-state",
            date: "2024.05.12",
          },
          {
            title: "Compound Component 패턴으로 UI 라이브러리 설계하기",
            url: "https://yourblog.com/compound-component",
            date: "2024.03.08",
          },
        ],
      },
      {
        name: "Next.js",
        level: "novice",
        icon: "▲",
        coverImage: "https://cdn.simpleicons.org/nextdotjs/ffffff",
        relatedProjects: ["project-1", "project-4"],
        blogLinks: [
          {
            title: "Next.js 14 App Router — SSG/ISR 혼합 전략 정리",
            url: "https://yourblog.com/nextjs-app-router",
            date: "2024.06.20",
          },
        ],
      },
      {
        name: "TypeScript",
        level: "novice",
        icon: "🔷",
        coverImage: "https://cdn.simpleicons.org/typescript/3178C6",
        relatedProjects: ["project-1", "project-2", "project-3", "project-4"],
        blogLinks: [
          {
            title: "TypeScript 제네릭 실전 패턴 모음",
            url: "https://yourblog.com/ts-generics",
            date: "2024.02.14",
          },
        ],
      },
      {
        name: "Tailwind CSS",
        level: "novice",
        icon: "🎨",
        coverImage: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        relatedProjects: ["project-1"],
        blogLinks: [
          {
            title: "Tailwind custom prose로 아티클 타이포그래피 만들기",
            url: "https://yourblog.com/tailwind-prose",
            date: "2024.04.01",
          },
        ],
      },
      {
        name: "Framer Motion",
        level: "novice",
        icon: "🎭",
        coverImage: "https://cdn.simpleicons.org/framer/0055FF",
        relatedProjects: [],
        blogLinks: [],
      },
      {
        name: "Zustand / Recoil",
        level: "novice",
        icon: "🗃️",
        coverImage: null,
        relatedProjects: ["project-2"],
        blogLinks: [],
      },
    ],
  },
  {
    category: "Backend",
    color: "#34d399",
    skills: [
      {
        name: "Node.js",
        level: "novice",
        icon: "🟢",
        coverImage: "https://cdn.simpleicons.org/nodedotjs/339933",
        relatedProjects: ["project-2"],
        blogLinks: [],
      },
      {
        name: "Express",
        level: "novice",
        icon: "🚂",
        coverImage: "https://cdn.simpleicons.org/express/ffffff",
        relatedProjects: ["project-2"],
        blogLinks: [],
      },
      {
        name: "MySQL",
        level: "novice", // 본인의 숙련도에 맞게 수정하세요 (novice/novice/novice)
        icon: "🐬",
        coverImage: "https://cdn.simpleicons.org/mysql/4479A1",
        relatedProjects: [], // 관련 프로젝트 ID가 있다면 추가 (예: "project-2")
        blogLinks: [],
      },
      {
        name: "SQLite",
        level: "novice",
        icon: "📁",
        coverImage: "https://cdn.simpleicons.org/sqlite/003B57",
        relatedProjects: [],
        blogLinks: [],
      },
      // {
      //   name: "PostgreSQL",
      //   level: "novice",
      //   icon: "🐘",
      //   coverImage: "https://cdn.simpleicons.org/postgresql/4169E1",
      //   relatedProjects: ["project-2"],
      //   blogLinks: [],
      // },
      // {
      //   name: "Prisma",
      //   level: "novice",
      //   icon: "💎",
      //   coverImage: "https://cdn.simpleicons.org/prisma/2D3748",
      //   relatedProjects: ["project-4"],
      //   blogLinks: [],
      // },
      {
        name: "REST API",
        level: "novice",
        icon: "🔗",
        coverImage: null,
        relatedProjects: ["project-2", "project-4"],
        blogLinks: [],
      },
    ],
  },
  {
    category: "DevOps & Tools",
    color: "#a78bfa",
    skills: [
      {
        name: "Git / GitHub",
        level: "novice",
        icon: "🐙",
        coverImage: "https://cdn.simpleicons.org/github/ffffff",
        relatedProjects: [],
        blogLinks: [],
      },
      {
        name: "Vercel / Netlify",
        level: "novice",
        icon: "🚀",
        coverImage: "https://cdn.simpleicons.org/vercel/ffffff",
        relatedProjects: ["project-1", "project-4"],
        blogLinks: [],
      },
      {
        name: "Docker",
        level: "novice",
        icon: "🐳",
        coverImage: "https://cdn.simpleicons.org/docker/2496ED",
        relatedProjects: [],
        blogLinks: [],
      },
      // {
      //   name: "Figma",
      //   level: "novice",
      //   icon: "✏️",
      //   coverImage: "https://cdn.simpleicons.org/figma/F24E1E",
      //   relatedProjects: [],
      //   blogLinks: [],
      // },
      // {
      //   name: "Storybook",
      //   level: "novice",
      //   icon: "📖",
      //   coverImage: "https://cdn.simpleicons.org/storybook/FF4785",
      //   relatedProjects: ["project-3"],
      //   blogLinks: [
      //     {
      //       title: "Storybook으로 컴포넌트 문서화 & 스냅샷 테스트 자동화",
      //       url: "https://yourblog.com/storybook",
      //       date: "2024.08.05",
      //     },
      //   ],
      // },
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  demo?: string;
  period: string;
  role: string;
  thumbnail: {
    image?: string | null;
    gradient: string;
  };
  featured: boolean;
  tech: { reason: string; points: string[] };
  problem: { summary: string; details: string[] };
  solution: { summary: string; points: string[] };
  implementation: { summary: string; achievements: string[] };
}

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "skyWatcher",
    description: "날씨 기반 국내 여행지 경로 최적화 서비스",
    techStack: [
      "Vanila JS",
      "jQuery",
      "Node.js",
      "Express",
      "OpenWeatherMap",
      "TourAPI",
      "OpenRouteService",
      "Firebase",
      "Vercel",
      "Renderer",
    ],
    github: "https://github.com/yourid/devlog",
    demo: "https://sky-watcher-kappa.vercel.app/",
    period: "2026.04 ~ ",
    role: "Solo / Full-stack",
    thumbnail: {
      image: "",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    featured: true,
    tech: {
      reason: "",
      points: ["Vercel — Edge Network + ISR 재검증으로 글로벌 TTFB 최소화"],
    },
    problem: {
      summary:
        "기존 날씨 정보 서비스는 단순히 수치 제공에 그쳐 실제 여행 계획과의 연계성이 낮았고, 클라이언트 중심의 API 호출은 키 노출 보안 위험이 있었습니다.",
      details: [
        "외부 API 직접 호출 시 인증 키 노출 — 보안 취약점 및 오용 가능성",
        "실시간성 데이터(날씨, 경로) 요청 시 응답 지연 — 사용자 이탈 및 UX 저하",
        "서버 슬립(Cold Start) 및 프로토콜 불일치(Mixed Content) — 서비스 안정성 저하",
      ],
    },
    solution: {
      summary:
        "Express 프록시 서버를 구축하여 API 키를 은닉하고, 기상 데이터 기반의 가중치 알고리즘과 경로 최적화 로직을 설계하여 지능형 플래너를 구현했습니다.",
      points: [
        "기상 데이터 스코어링 시스템: Weather ID를 분석해 날씨별 최적 관광 카테고리 동적 큐레이션",
        "경로 최적화 알고리즘: Nearest Neighbor(그리디) 및 Haversine 공식을 활용한 방문 순서 자동 정렬",
        "보안 아키텍처: Node.js 프록시 서버 + Google Cloud Referrer 제한을 통한 2중 API 보호",
        "병렬 데이터 페칭: Promise.all을 이용한 날씨·관광 데이터 동시 로드로 네트워크 병목 해소",
        "하이브리드 상태 관리: Firebase Firestore(영구 저장)와 URL 파라미터(휘발성 공유)의 이원화",
      ],
    },
    implementation: {
      summary:
        "Vanilla JS 환경에서 외부 라이브러리 의존도를 최소화하며 복합적 비즈니스 로직 구현",

      achievements: [],
    },
  },
  {
    id: "project-2",
    title: "studyMate",
    description: "스터디룸 예약 및 자료 관리 서비스",
    techStack: [
      "Vanila JS",
      "Express",
      "Node.js",
      "bcryptjs",
      "CSS Variables",
      "Flatpicker",
      "Bootstrap Icons",
      "better-sqlite3",
    ],
    github: "https://github.com/yourid/kanban",
    demo: "https://kanban-demo.vercel.app",
    period: "2026.03 ~ ",
    role: "Solo / Full-stack",
    thumbnail: {
      image: "",
      gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    },
    featured: true,
    tech: {
      reason:
        "실시간 동기화가 핵심인 협업 툴에서 HTTP 폴링 대신 WebSocket을 선택.",
      points: [
        "Socket.io — 양방향 실시간 통신, 자동 재연결 & 폴백 내장",
        "React DnD Kit — 드래그 앤 드롭 접근성(a11y) 기본 지원",
        "PostgreSQL — 칸반 구조의 복잡한 관계형 데이터 모델링",
        "Compound Component 패턴 — Board/Column/Card 계층 UI 분리",
      ],
    },
    problem: {
      summary:
        "스택 공유 및 협업 과정에서 발생하는 스터디룸 예약 충돌과 파편화된 자료 관리 문제를 해결하기 위해, 단순 예약 기능을 넘어 세션별 맥락(Context)이 보존되는 풀스택 협업 플랫폼을 설계했습니다.",
      details: [
        "파편화된 자료 관리: 예약 내역과 관련 파일(PDF, Notion 링크)이 분리되어 회의 이력 추적의 어려움",
        "중복 예약 및 충돌: 실시간 예약 현황 파악 불가로 인한 오프라인 혼선 및 유휴 공간 발생",
        "보안 취약성: 외부 플랫폼 사용 시 사내 기밀 자료 유출 위험 및 권한 관리의 부재",
      ],
    },
    solution: {
      summary:
        "Node.js와 SQLite를 기반으로 한 경량 아키텍처를 채택하여 배포 효율을 극대화하고, JWT 인증 및 프록시 기반의 보안 레이어를 구축했습니다.",
      points: [
        "Zero-Friction 배포: 별도 DB 서버 없이 better-sqlite3를 사용하여 단일 실행 파일 수준의 이식성 확보",
        "실시간 충돌 감지 로직: Allen's Interval Algebra를 활용한 시간 겹침 알고리즘으로 서버·클라이언트 이중 예약 검증",
        "맥락 기반 자료 관리: 파일 업로드 시 반드시 예약 세션에 종속시키도록 설계하여 '언제, 누가, 왜' 생성했는지에 대한 메타데이터 보존",
        "팀 단위 접근 제어 (RBAC): 파일별 scope(Private/Team/Public) 컬럼을 통한 정교한 접근 권한 필터링 구현",
        "프레임워크 프리(Vanilla JS): 의존성을 최소화하고 빌드 도구 없는 정적 서빙으로 초기 로딩 속도 최적화 및 유지보수성 향상",
      ],
    },
    implementation: {
      summary:
        "보안과 UX가 공존하는 설계를 통해 사내 협업 효율 개선, 특히 관리자 대시보드를 통한 리소스 최적화 지표를 시각화.",
      achievements: [],
    },
  },
  {
    id: "project-3",
    title: "Deepguard",
    description: "딥페이크, AI 생성 여부 판단 서비스",
    techStack: [
      "Vanilla JS (ES6+)",
      "Web Workers",
      "Canvas API",
      "CSS Variables",
      "Node.js 18+",
      "Express 4",
      "Google Gemini 1.5 Flash",
      "Observable Store",
    ],
    github: "https://github.com/dadamdaram/DeepGuard",
    period: "2026.04 ~ ",
    role: "Solo",
    thumbnail: {
      image: null,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    featured: false,
    tech: {
      reason:
        "여러 프로젝트에서 동일 UI를 반복 개발하는 비효율을 없애기 위해 headless + styled 분리 아키텍처를 채택했습니다.",
      points: [
        "Rollup — Tree-shaking 최적화 빌드, ESM/CJS 듀얼 포맷 출력",
        "CSS Modules — 스타일 스코프 격리로 소비 프로젝트 충돌 방지",
        "Storybook — 컴포넌트 단위 문서화 및 시각적 회귀 테스트",
        "headless 패턴 — 로직과 스타일 분리로 테마 커스터마이징 자유도 극대화",
      ],
    },
    problem: {
      summary:
        "프로젝트마다 Button, Modal, Input 등 기본 컴포넌트를 반복 구현하며 생산성이 떨어지고, 디자인 일관성도 무너졌습니다.",
      details: [
        "동일 컴포넌트가 프로젝트별로 다른 props 인터페이스를 가져 재사용 불가",
        "접근성(a11y) 고려 없이 개발 → 스크린리더 대응 누락",
        "스타일 충돌: 소비 프로젝트 전역 CSS와 컴포넌트 스타일이 충돌",
      ],
    },
    solution: {
      summary:
        "단일 npm 패키지로 배포 가능한 headless + styled 분리 아키텍처를 설계하고, WCAG 2.1 AA 기준을 처음부터 내재화했습니다.",
      points: [
        "headless hooks로 로직 추출 → 소비자가 스타일만 교체 가능한 구조",
        "WCAG 2.1 AA 기준을 컴포넌트 설계 단계부터 내재화",
        "Rollup + Tree-shaking으로 사용하는 컴포넌트만 번들에 포함",
        "Storybook Controls로 props 조합 자동 문서화",
      ],
    },
    implementation: {
      summary:
        "npm 배포까지 완료한 실제 배포 가능한 라이브러리로, 현재 진행 중인 개인 프로젝트 3곳에서 실사용 중입니다.",
      achievements: [],
    },
  },
  {
    id: "project-4",
    title: "Zipgap",
    description: "Next.js App Router 기반 풀스택 쇼핑몰",
    techStack: [
      "Vanilla JS",
      "Chart.js 4",
      "Plotly.js 2",
      "Python 3.11",
      "FastAPI",
      "SQLite",
      "국토교통부 실거래가 공공 API",
      "Docker",
      "Render",
      "Railway",
    ],
    github: "https://github.com/dadamdaram/zipgap",
    demo: "",
    period: "2026.4 ~",
    role: "Solo / Full-stack",
    thumbnail: {
      image: null,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    featured: false,
    tech: {
      reason:
        "Next.js 14 App Router의 Server Components로 클라이언트 번들을 최소화하고, Stripe Webhook으로 결제 이벤트를 서버에서 안전하게 처리하는 구조를 선택했습니다.",
      points: [
        "Next.js 14 App Router — Server/Client 컴포넌트 경계 명시적 제어",
        "Prisma — 타입 안전한 DB 접근, 마이그레이션 자동화",
        "Stripe — PCI 준수 결제 처리, Webhook 이벤트 기반 주문 상태 관리",
        "Suspense Streaming — 상품 목록 스켈레톤 UI로 TTFB 체감 개선",
      ],
    },
    problem: {
      summary:
        "상품 목록, 장바구니, 결제 플로우가 각각 다른 데이터 요구사항을 가지며, 페이지 전체 로딩 없이 빠른 인터랙션이 필요했습니다.",
      details: [
        "상품 목록(정적) vs 장바구니(실시간) vs 결제(보안 필요)의 렌더링 전략이 달라야 함",
        "결제 완료 후 주문 상태 업데이트 지연 → 사용자가 결제 성공 여부 불확실",
        "장바구니 추가 시 서버 응답 대기 → 느린 UX",
      ],
    },
    solution: {
      summary:
        "App Router의 Server/Client 컴포넌트 경계를 데이터 성격에 맞게 설계하고, Stripe Webhook으로 결제 이벤트를 신뢰할 수 있게 처리했습니다.",
      points: [
        "상품 목록 — Server Component + fetch 캐싱으로 정적 서빙",
        "장바구니 — Client Component + Optimistic UI로 즉각 반응",
        "결제 — Stripe Checkout + Webhook으로 서버 사이드 주문 확정",
        "Suspense 경계로 느린 데이터 영역만 스켈레톤 처리",
      ],
    },
    implementation: {
      summary:
        "App Router의 새 패러다임을 처음부터 적용한 프로젝트로, Server/Client 경계 설계가 핵심 학습 포인트였습니다.",
      achievements: [],
    },
  },
];

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  organization?: string;
  description: string;
  type: "work" | "education" | "achievement";
  achievements?: string[];
}

export const TIMELINE: TimelineItem[] = [
  {
    id: "tl-1",
    date: "2026",
    title: "교육",
    organization: "Kosta in 2026",
    description: "",
    type: "education",
    achievements: [
      "C, C++, Python 크롤링 & 데이터분석",
      "JQuery, Ajax, Typescript, React",
      "MySQL, C# .NET",
    ],
  },
  {
    id: "tl-2",
    date: "2025",
    title: "인턴",
    organization: "주식회사 메가웍스",
    description: "데이터 가공 및 GPS 시각화, 서비스 상용화 기획 및 PT",
    type: "work",
  },
  {
    id: "tl-3",
    date: "2025",
    title: "컴퓨터공학 / 사회교육 학위 취득",
    // organization: "대학교명",
    description:
      "자료구조, 알고리즘, 웹 프로그래밍, 데이터베이스 등 이수. 졸업 프로젝트, [학사 논문] 예비교사의 AI 활용 수업 인식 분석.",
    type: "education",
  },
  {
    id: "tl-4",
    date: "2024",
    title: "교내 아이디어톤(공동 우승), 해커톤 (우수상), 4차산업 경진대회 출전",
    // organization: "대학교명",
    description: "",
    type: "achievement",
  },
  {
    id: "tl-5",
    date: "2024",
    title: "컴퓨터공학과 학생회, 코딩 동아리 임원진",
    // organization: "대학교명",
    description: "문화홍보부장 (게시물 제작, SNS 관리 등), 동아리 시설국장",
    type: "work",
  },
  {
    id: "tl-6",
    date: "2023",
    title: "멋쟁이사자처럼 11기",
    organization: "",
    description: "",
    type: "education",
  },
];
