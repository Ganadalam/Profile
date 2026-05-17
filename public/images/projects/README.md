# 프로젝트 썸네일 이미지

각 프로젝트 카드/모달에 표시될 이미지를 이 폴더에 넣으세요.

## 권장 스펙
- 해상도: **1200 × 630px** 이상 (og:image 재활용 가능)
- 비율: 16:9 또는 2:1 (카드 영역에 object-fit: cover 적용)
- 포맷: `.webp` 우선 (용량 ↓), `.png` / `.jpg` 가능
- 용량: 파일당 200KB 이하 권장

## profile.ts 적용 방법

```ts
thumbnail: {
  image: "/images/projects/devlog.webp",   // ← 이 폴더 기준 경로
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
},
```

이미지 없으면 gradient만 표시됩니다.
