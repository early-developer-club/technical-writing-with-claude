# Technical Writing with Claude

> Claude AI를 활용한 AI 기반 기술 블로그 자동화 플랫폼

## 프로젝트 소개

**Technical Writing with Claude**는 Claude AI의 뛰어난 기술 문서 작성 능력과 Next.js의 강력한 SSR/SSG 기능을 결합하여, 개발자가 기술 블로그를 쉽고 빠르게 작성·관리·배포할 수 있도록 돕는 플랫폼입니다.

### 핵심 가치

- **AI 기반 글쓰기**: Claude Code와의 대화만으로 고품질 기술 블로그 작성
- **Zero Backend**: 백엔드 없이 프론트엔드만으로 완전한 블로그 시스템 구현
- **개발자 친화적**: 모노레포 구조로 확장 가능하고 관리하기 쉬운 구조
- **프로덕션 레디**: SEO, RSS, Sitemap 등 실제 블로그 운영에 필요한 모든 기능 포함

## 바이브코딩 정보

### 개발 시간
- **Phase 1 (모노레포 구조 구축)**: 약 30분
- **Phase 2 (MDX 렌더링 시스템)**: 약 45분
- **Phase 3 (SEO 및 최적화)**: 약 20분
- **총 개발 시간**: 약 1시간 35분
- **작업 일자**: 2025-10-16
- **개발 방식**: Claude Code와의 페어 프로그래밍

### 개발 과정

#### Phase 1 (완료)
1. 프로젝트 기획 및 PRD 작성
2. pnpm workspace 기반 모노레포 구조 설계
3. Next.js 15 + React 19 + TypeScript 앱 초기화
4. 공유 패키지 설정 (ui, posts)
5. 개발 환경 테스트 및 검증

#### Phase 2 (완료)
1. shadcn/ui 설치 및 설정 (New York 스타일, Slate 컬러)
2. MDX 관련 패키지 설치 (next-mdx-remote, gray-matter, rehype 플러그인)
3. MDX 유틸리티 함수 구현 (포스트 파싱, 렌더링)
4. 샘플 MDX 포스트 작성 (hello-world, nextjs-15-features)
5. 블로그 메인 페이지 구현 (포스트 목록, 헤더, 푸터)
6. 포스트 상세 페이지 구현 (동적 라우팅, MDX 렌더링)
7. Typography 및 코드 하이라이팅 설정

#### Phase 3 (완료)
1. Sitemap 자동 생성 (`/sitemap.xml`)
2. RSS Feed 자동 생성 (`/feed.xml`)
3. 메타데이터 상수 정의 (lib/constants.ts)
4. SEO 메타 태그 전체 구현 (OpenGraph, Twitter Card)
5. robots.txt 생성
6. RSS 2.0 표준 준수

## 기술 스택

### 프론트엔드
- **프레임워크**: [Next.js](https://nextjs.org/) 15.5.5
- **React**: [React](https://react.dev/) 19.1.0
- **언어**: [TypeScript](https://www.typescriptlang.org/) 5.x
- **스타일링**: [TailwindCSS](https://tailwindcss.com/) 4.x
- **UI 컴포넌트**: [shadcn/ui](https://ui.shadcn.com/)

### 콘텐츠 관리
- **MDX**: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) 5.0.0
- **Frontmatter**: [gray-matter](https://github.com/jonschlinkert/gray-matter) 4.0.3
- **Syntax Highlighting**: [rehype-highlight](https://github.com/rehypejs/rehype-highlight) 7.0.2 + [highlight.js](https://highlightjs.org/) 11.11.1
- **Typography**: [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) 0.5.19

### 모노레포
- **패키지 매니저**: [pnpm](https://pnpm.io/) workspace
- **빌드 도구**: Turbopack (Next.js 내장)

### 배포 및 호스팅
- **플랫폼**: [Vercel](https://vercel.com/) (예정)
- **도메인**: 사용자 커스텀 도메인 지원 (예정)

### AI 통합
- **Claude Code**: Claude AI와 CLI 기반 통합
- **MCP Servers**:
  - Sequential Thinking (논리적 사고 분석)
  - Context7 (라이브러리 문서 참조)
  - Chrome DevTools (브라우저 자동화)

## 프로젝트 구조

```
technical-writing-with-claude/
├── apps/
│   └── blog/                      # Next.js 15 블로그 앱
│       ├── app/                   # App Router
│       ├── public/                # 정적 파일
│       ├── package.json
│       └── next.config.ts
├── packages/
│   ├── ui/                        # 공유 UI 컴포넌트
│   │   ├── components/            # (예정)
│   │   ├── index.ts
│   │   └── package.json
│   └── posts/                     # MDX 포스트 저장소
│       ├── drafts/                # 작성 중인 초안
│       ├── published/             # 게시된 포스트
│       ├── index.ts
│       └── README.md
├── .claude/
│   └── docs/                      # 프로젝트 문서
│       ├── prd.md                 # 제품 요구사항 문서
│       └── technical-writing-guide.md
├── pnpm-workspace.yaml            # pnpm workspace 설정
├── package.json                   # 루트 package.json
├── .gitignore
├── .mcp.json                      # MCP 서버 설정
├── CLAUDE.md                      # Claude 지시사항
└── README.md
```

## 프로젝트 계획

### ✅ Phase 1: 프로젝트 셋업 (완료)
- [x] 프로젝트 기획 및 PRD 작성
- [x] 모노레포 구조 설정 (pnpm workspace)
- [x] Next.js 15 + React 19 + TypeScript 세팅
- [x] TailwindCSS 4 설치
- [x] 기본 폴더 구조 생성
- [x] MCP 서버 설정 (Sequential Thinking, Context7, Chrome DevTools)

### ✅ Phase 2: 핵심 기능 구현 (완료)
- [x] shadcn/ui 설치 및 설정
- [x] MDX 파싱 및 렌더링 시스템
- [x] 포스트 메타데이터 관리 (Frontmatter)
- [x] 블로그 메인 페이지 구현
- [x] 포스트 상세 페이지 구현
- [x] Draft/Published 구분 로직
- [x] 코드 신택스 하이라이팅 (rehype-highlight + highlight.js)
- [x] Typography 스타일링 (@tailwindcss/typography)

### ✅ Phase 3: SEO 및 최적화 (완료)
- [x] Sitemap 자동 생성 (`/sitemap.xml`)
- [x] RSS Feed 자동 생성 (`/feed.xml`)
- [x] 메타 태그 전체 구현 (OpenGraph, Twitter Card)
- [x] robots.txt 생성
- [x] SEO 메타데이터 최적화

### 📋 Phase 4: Claude 통합
- [ ] Claude Code 워크플로우 문서화
- [ ] MDX 템플릿 작성
- [ ] 프롬프트 가이드 작성
- [ ] 예제 포스트 생성
- [ ] Document Classifier Agent 통합
- [ ] Text Refinement Agent 통합
- [ ] Information Architect Agent 통합

### 📋 Phase 5: UI 개선 및 테스트
- [ ] 다크 모드 구현
- [ ] 태그 페이지 구현 (`/tags`, `/tags/[tag]`)
- [ ] 검색 기능 (선택 사항)
- [ ] 반응형 테스트 (Mobile, Tablet, Desktop)
- [ ] 성능 최적화 (Lighthouse 90점 이상)

### 📋 Phase 6: 배포 및 문서화
- [ ] Vercel 배포 설정
- [ ] 환경 변수 설정
- [ ] 기여 가이드 작성 (CONTRIBUTING.md)
- [ ] 라이선스 설정 (MIT)
- [ ] 블로그 포스트: 프로젝트 회고

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- pnpm 8 이상
- Claude Code CLI

### 설치

```bash
# 저장소 클론
git clone https://github.com/yourusername/technical-writing-with-claude.git
cd technical-writing-with-claude

# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
# 블로그 개발 서버 시작
pnpm dev

# 특정 패키지만 실행
pnpm --filter blog dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 시작
pnpm start
```

## 사용 방법 (예정)

### 1. 기술 블로그 작성

```bash
# Claude Code 실행
claude code

# Claude에게 요청
"Next.js 15의 새로운 기능에 대한 블로그 글을 작성해줘"
```

### 2. 포스트 게시

```bash
# 초안을 published 폴더로 이동
mv packages/posts/drafts/nextjs-15.mdx packages/posts/published/

# Git 커밋 및 푸시
git add .
git commit -m "Post: Next.js 15 새로운 기능"
git push
```

### 3. 자동 배포

Vercel이 자동으로 빌드 및 배포를 진행합니다.

## 문서

- [PRD (제품 요구사항 문서)](.claude/docs/prd.md)
- [Technical Writing Guide](.claude/docs/technical-writing-guide.md)

## 기여

이 프로젝트는 아직 개발 초기 단계입니다. 기여 가이드는 추후 작성될 예정입니다.

## 라이선스

MIT License (예정)

## 참고 자료

### 벤치마크 사이트
- [Vercel Blog](https://vercel.com/blog)
- [Lee Robinson's Blog](https://leerob.io)
- [Josh W. Comeau's Blog](https://www.joshwcomeau.com)

### 기술 문서
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com)
- [Claude AI Documentation](https://docs.anthropic.com)
- [pnpm Documentation](https://pnpm.io)

---

**프로젝트 상태**: ✅ Phase 1, 2, 3 완료 | 📋 Phase 4 대기 중
**최종 업데이트**: 2025-10-16
**개발 방식**: Claude Code 페어 프로그래밍
