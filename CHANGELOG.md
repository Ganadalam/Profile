# Changelog

## v11 — Design System Unification

### 🎨 디자인 시스템
- **폰트 교체**: Syne + DM Mono → **Outfit + JetBrains Mono** (더 명확한 가독성, 개발자 감성)
- **CSS 변수 정리**: 모든 컴포넌트에서 하드코딩 color 제거, `var(--text-0/1/2)` / `var(--bg-0/1/2)` 토큰 통일
- **하위 호환성 alias 추가**: 기존 `--text-primary`, `--accent-blue` 등은 새 토큰을 가리키도록 리매핑
- **노이즈 텍스처 오버레이**: `body::after` 에 SVG 기반 subtle grain 추가 (분위기 향상)
- **반경 토큰 통일**: `--radius-sm/md/lg/xl/full` 전체 적용
- **Navbar 인디케이터**: 단색 선 → `linear-gradient(accent-primary → accent-purple)` 그라디언트 바
- **Section eyebrow**: uppercase + letter-spacing 0.14em 통일
- **Section title gradient**: `0% text-0 → 100% accent-primary` 일관성

### ♻️ 리팩토링
- `globals.css`: 700줄 → 350줄 (중복 제거, 인라인 keyframe 통합)
- `SectionHeader`: 클래스 기반으로 변경 (`section-eyebrow`, `section-title`, `section-subtitle`)
- `Button`: `var(--radius-md)` 적용, `var(--font-sans)` 명시
- `GlassCard`: glow shadow 강도 조정 (`22` → `28` hex opacity)
- 모든 섹션: `--transition-*` → `--ease-*`, `--text-secondary` → `--text-1` 등 통일

### 🔧 유지보수
- 이전 버전 변수와 동일한 의미의 alias 자동 매핑으로 기존 코드 변경 최소화
