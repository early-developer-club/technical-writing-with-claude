# Technical Writing with Claude - PRD

## 1. 프로젝트 개요

### 프로젝트 명
**Technical Writing with Claude**

### 한 줄 요약
Claude AI를 활용하여 기술 블로그 작성을 돕고, Next.js 기반의 SEO 최적화된 블로그로 자동 게시하는 개발자 친화적 플랫폼

### 프로젝트 배경
개인 개발자들이 기술 블로그를 운영하면서 겪는 주요 pain point:
- 글쓰기에 시간이 많이 소요됨
- 일관된 품질의 콘텐츠 유지가 어려움
- 블로그 시스템 구축 및 관리의 번거로움
- SEO 최적화, RSS, Sitemap 등 부가 기능 구현의 복잡성

Claude AI의 뛰어난 기술 문서 작성 능력과 Next.js의 SSR/SSG 기능을 결합하여, 개발자가 글쓰기에만 집중할 수 있는 환경을 제공합니다.

---

## 2. 목표 및 핵심 가치

### 주요 목표
1. **AI 기반 콘텐츠 생성**: Claude Code를 통해 대화형으로 고품질 기술 블로그 초안 작성
2. **Zero Backend**: 백엔드 없이 프론트엔드만으로 완전한 블로그 시스템 구현
3. **개발자 경험 최적화**: 모노레포 구조로 확장 가능하고 관리하기 쉬운 구조 제공
4. **프로덕션 레디**: SEO, RSS, Sitemap 등 실제 블로그 운영에 필요한 모든 기능 포함

### 핵심 가치 제안
- Claude와의 대화만으로 기술 블로그 작성 가능
- 코드 → 블로그 게시까지 단일 워크플로우
- 별도의 CMS나 데이터베이스 불필요
- Vercel을 통한 원클릭 배포

---

## 3. 타겟 사용자

### Primary Persona
**이름**: 김개발 (개인 개발자)
**특징**:
- 3-7년차 프론트엔드/백엔드 개발자
- 기술 블로그를 운영 중이거나 시작하려는 개발자
- 글쓰기보다 코딩을 선호하지만, 지식 공유의 가치를 인정함
- Medium, velog, tistory 등 기존 플랫폼의 한계를 느낌
- 커스터마이징 가능한 자신만의 블로그를 원함

### 사용자 니즈
- 빠르고 쉬운 글 작성
- 깔끔하고 전문적인 디자인
- 완전한 커스터마이징 권한
- 버전 관리 시스템과의 통합 (Git)
- SEO 최적화된 블로그

---

## 4. 핵심 기능

### 4.1 Claude 통합 (Claude Code)
- Claude Code CLI를 통한 대화형 글쓰기

### 4.2 MDX 기반 콘텐츠 관리
- `.mdx` 포맷으로 React 컴포넌트 삽입 가능
- Frontmatter를 통한 메타데이터 관리
- 포스트 상태 관리 (Draft/Published)
- 작성일, 수정일, 태그, 카테고리 자동 관리

### 4.3 Next.js 블로그 렌더링
- App Router 기반 최신 Next.js 구조
- SSG를 통한 빠른 로딩 속도
- 동적 라우팅 (`/posts/[slug]`)
- 반응형 레이아웃 (모바일 최적화)

### 4.4 포스트 관리
- Draft/Published 구분
- 포스트 목록 자동 생성
- 태그 기반 필터링
- 최신순/인기순 정렬

### 4.5 SEO 최적화
- 자동 메타 태그 생성 (OG, Twitter Card)
- JSON-LD 구조화된 데이터
- 자동 Sitemap 생성 (`sitemap.xml`)
- 자동 RSS Feed 생성 (`feed.xml`)
- 검색 엔진 친화적인 URL 구조

### 4.6 MD 프리뷰
- 작성 중인 포스트 실시간 프리뷰
- 다크/라이트 모드 지원
- 코드 하이라이팅 (Syntax Highlighting)
- 목차(TOC) 자동 생성

---

## 5. 기술 스택

### 프론트엔드
- **프레임워크**: Next.js 15.x (최신 안정화 버전)
- **React**: React 19.x (최신 안정화 버전)
- **언어**: TypeScript 5.x
- **스타일링**: TailwindCSS 4.x
- **UI 컴포넌트**: shadcn/ui

### 콘텐츠 관리
- **MDX**: next-mdx-remote 또는 @next/mdx
- **Frontmatter**: gray-matter
- **Syntax Highlighting**: Shiki 또는 Prism

### 모노레포
- **패키지 매니저**: pnpm (workspace)

### 배포 및 호스팅
- **플랫폼**: Vercel
- **도메인**: 사용자 커스텀 도메인 지원

### AI 통합
- **Claude Code**: Claude AI와 CLI 기반 통합
- **API**: Anthropic Claude API (선택 사항)

---

## 6. 아키텍처

### 모노레포 구조
```
technical-writing-with-claude/
├── apps/
│   └── blog/                 # Next.js 블로그 앱
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── public/
├── packages/
│   ├── ui/                   # 공유 UI 컴포넌트 (shadcn/ui 기반)
│   │   ├── components/
│   │   └── styles/
│   └── posts/                # MDX 포스트 저장소
│       ├── drafts/           # 초안
│       └── published/        # 게시된 글
├── pnpm-workspace.yaml
├── package.json
├── turbo.json (선택)
└── README.md
```

### 데이터 플로우
```
Claude Code (개발자) 
    ↓ (대화형 글쓰기)
MDX 파일 생성 (packages/posts/)
    ↓
Git Commit & Push
    ↓
Vercel 자동 배포
    ↓
Next.js SSG 빌드
    ↓
블로그 게시
```

---

## 7. 사용자 플로우

### 7.1 글 작성 플로우
1. 개발자가 터미널에서 `claude code` 실행
2. Claude에게 기술 블로그 주제 제안 또는 요청
    - 예: "Next.js 15의 새로운 기능에 대해 블로그 글을 써줘"
3. Claude가 초안 작성 및 MDX 파일 생성
    - 파일 위치: `packages/posts/drafts/nextjs-15-new-features.mdx`
4. 개발자가 Claude와 대화하며 내용 수정 및 보완
5. 완성된 글을 `published/` 폴더로 이동
6. Git commit & push

### 7.2 블로그 게시 플로우
1. Vercel이 Git push 감지
2. 자동 빌드 시작
3. Next.js가 MDX 파일 파싱 및 HTML 생성
4. Sitemap 및 RSS 자동 업데이트
5. 배포 완료 (3-5분 소요)
6. 블로그에서 새 포스트 확인 가능

### 7.3 블로그 방문자 플로우
1. 사용자가 블로그 메인 페이지 접속
2. 최신 포스트 목록 확인
3. 포스트 클릭
4. MDX 렌더링된 블로그 글 읽기
5. 관련 포스트 추천 (태그 기반)
6. 공유 또는 구독 (RSS)

---

## 8. 기능 명세

### 8.1 포스트 메타데이터 (Frontmatter)
```yaml
---
title: "Next.js 15의 새로운 기능"
description: "Next.js 15에서 추가된 주요 기능과 마이그레이션 가이드"
date: "2025-10-11"
updated: "2025-10-11"
tags: ["Next.js", "React", "Web Development"]
category: "Frontend"
author: "김개발"
status: "published"  # draft | published
featured: false
coverImage: "/images/nextjs-15-cover.jpg"
---
```

### 8.2 블로그 메인 페이지 (`/`)
- **헤더**: 블로그 제목, 네비게이션 (Home, Posts, Tags, About)
- **히어로 섹션**: 간단한 소개 문구
- **포스트 목록**:
    - 썸네일 이미지 (선택)
    - 제목, 설명, 날짜, 태그
    - 3-column 그리드 레이아웃 (모바일: 1-column)
- **푸터**: 소셜 링크, RSS 구독, Copyright

### 8.3 포스트 상세 페이지 (`/posts/[slug]`)
- **헤더**: 제목, 날짜, 작성자, 태그
- **목차 (TOC)**: 오른쪽 사이드바 (desktop), 접을 수 있는 섹션 (mobile)
- **본문**: MDX 렌더링
    - 코드 블록 (syntax highlighting)
    - 이미지, 비디오 임베드
    - React 컴포넌트 삽입 가능
- **하단**: 이전/다음 포스트, 공유 버튼
- **관련 포스트**: 태그 기반 추천

### 8.4 태그 페이지 (`/tags`)
- 모든 태그 목록 (사용 빈도순)
- 태그 클릭 시 해당 태그의 포스트 필터링

### 8.5 태그 상세 페이지 (`/tags/[tag]`)
- 해당 태그가 달린 모든 포스트 목록

### 8.6 RSS Feed (`/feed.xml`)
- 최근 10개 포스트 자동 생성
- RSS 2.0 포맷

### 8.7 Sitemap (`/sitemap.xml`)
- 모든 페이지 URL 자동 생성
- 검색 엔진 크롤링 최적화

---

## 9. UI/UX 디자인 가이드

### 디자인 컨셉
**Minimal/Tech 스타일** (참고: Vercel Blog, Lee Robinson Blog)

### 디자인 원칙
1. **가독성 최우선**: 긴 글을 읽기 편한 타이포그래피
2. **최소한의 색상**: 블랙, 화이트, 그레이 + 포인트 컬러 1-2개
3. **넓은 여백**: 콘텐츠에 집중할 수 있는 공간감
4. **빠른 로딩**: 이미지 최적화, 불필요한 애니메이션 배제

### 컬러 팔레트
- **배경**: White (#FFFFFF) / Dark (#0A0A0A)
- **텍스트**: Black (#171717) / Light Gray (#FAFAFA)
- **포인트**: Blue (#0070F3) 또는 사용자 지정

### 타이포그래피
- **제목**: Inter, Pretendard (한글)
- **본문**: -apple-system, system-ui
- **코드**: Fira Code, JetBrains Mono

### 반응형 브레이크포인트
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 10. 비기능 요구사항

### 성능
- **Lighthouse 점수**: 90점 이상 (모든 항목)
- **First Contentful Paint (FCP)**: < 1.5초
- **Time to Interactive (TTI)**: < 3초
- **이미지 최적화**: Next.js Image 컴포넌트 사용

### 접근성
- **WCAG 2.1 AA 기준** 준수
- 시맨틱 HTML 사용
- 키보드 네비게이션 지원
- 스크린 리더 호환

### SEO
- 메타 태그 완전 구현
- Sitemap 자동 생성
- RSS Feed 제공
- 구조화된 데이터 (JSON-LD)

### 브라우저 지원
- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)

---

## 11. 개발 마일스톤

### Phase 1: 프로젝트 셋업 (1주)
- [x] 모노레포 구조 설정 (pnpm workspace)
- [x] Next.js 15 + React 19 + TypeScript 세팅
- [x] TailwindCSS + shadcn/ui 설치
- [x] 기본 폴더 구조 생성

### Phase 2: 핵심 기능 구현 (2주)
- [ ] MDX 파싱 및 렌더링 시스템
- [ ] 포스트 메타데이터 관리
- [ ] 블로그 메인 페이지 구현
- [ ] 포스트 상세 페이지 구현
- [ ] Draft/Published 구분 로직

### Phase 3: SEO 및 최적화 (1주)
- [ ] Sitemap 자동 생성
- [ ] RSS Feed 자동 생성
- [ ] 메타 태그 및 OG 이미지
- [ ] 이미지 최적화
- [ ] 코드 하이라이팅

### Phase 4: Claude 통합 (1주)
- [ ] Claude Code 워크플로우 문서화
- [ ] MDX 템플릿 작성
- [ ] 프롬프트 가이드 작성
- [ ] 예제 포스트 생성

### Phase 5: UI 개선 및 테스트 (1주)
- [ ] 다크 모드 구현
- [ ] 태그 페이지 구현
- [ ] 검색 기능 (선택)
- [ ] 반응형 테스트
- [ ] 성능 최적화

### Phase 6: 배포 및 문서화 (1주)
- [ ] Vercel 배포 설정
- [ ] 환경 변수 설정
- [ ] README 작성
- [ ] 기여 가이드 작성
- [ ] 라이선스 설정

---

## 12. 성공 지표 (Success Metrics)

### 출시 후 1개월 목표
- Lighthouse 성능 점수 95점 이상
- 포스트 작성 시간 50% 단축
- SEO 점수 90점 이상
- GitHub 스타 100개 이상 (오픈소스 시)

### 장기 목표 (3개월)
- 월간 활성 사용자 100명
- 커뮤니티 기여자 10명 이상
- 포스트 템플릿 라이브러리 구축

---

## 13. 위험 요소 및 대응 방안

### 위험 요소
1. **Claude API 비용**: 많은 글을 작성할 경우 비용 증가
    - **대응**: Claude Code는 로컬 실행이므로 API 비용 없음

2. **MDX 파싱 복잡도**: 복잡한 컴포넌트 삽입 시 에러 발생 가능
    - **대응**: 기본 컴포넌트 라이브러리 제공 및 문서화

3. **Vercel 빌드 시간**: 포스트가 많아질수록 빌드 시간 증가
    - **대응**: Incremental Static Regeneration (ISR) 활용

---

## 14. 추후 개선 방향

### v2.0 기능
- 포스트 검색 기능 (Algolia 또는 로컬 검색)
- 댓글 시스템 (giscus, utterances)
- 뉴스레터 구독 (Mailchimp 연동)
- 다국어 지원 (i18n)
- 포스트 통계 대시보드

### v3.0 기능
- AI 기반 포스트 추천 엔진
- 자동 이미지 생성 (DALL-E 연동)
- 포스트 A/B 테스트
- SEO 자동 최적화 제안

---

## 15. 참고 자료

### 벤치마크 사이트
- [Vercel Blog](https://vercel.com/blog)
- [Lee Robinson's Blog](https://leerob.io)
- [Josh W. Comeau's Blog](https://www.joshwcomeau.com)

### 기술 문서
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com)
- [Claude AI Documentation](https://docs.anthropic.com)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

**문서 버전**: v1.0  
**작성일**: 2025-10-11  
**작성자**: 프로젝트 기획자  
**상태**: Draft