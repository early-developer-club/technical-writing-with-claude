# MDX 템플릿 가이드

이 디렉토리에는 다양한 유형의 기술 블로그를 작성할 때 사용할 수 있는 MDX 템플릿이 포함되어 있습니다.

---

## 📁 템플릿 목록

### 1. Tutorial (학습 중심)
**파일**: `tutorial.mdx`
**용도**: 독자가 단계별로 따라하며 새로운 기술을 습득할 수 있는 튜토리얼

**적합한 주제**:
- "React로 Todo 앱 만들기"
- "Next.js로 블로그 구축하기"
- "TypeScript 시작하기"

**주요 구조**:
- 개요 (목표, 사전 준비)
- 단계별 구현 (Step 1, 2, 3...)
- 최종 코드
- 개선 아이디어
- 다음 단계

---

### 2. Troubleshooting (문제 해결)
**파일**: `troubleshooting.mdx`
**용도**: 특정 에러나 문제 상황의 원인과 해결 방법을 제시

**적합한 주제**:
- "Next.js 'Hydration failed' 에러 해결하기"
- "npm install 시 ERESOLVE 에러 해결법"
- "TypeScript 타입 에러 디버깅"

**주요 구조**:
- 문제 개요 (증상, 에러 메시지)
- 빠른 해결 방법
- 원인 분석 (원인별 해결법)
- 예방 방법
- 케이스 스터디

---

### 3. Reference (참조 문서)
**파일**: `reference.mdx`
**용도**: API, 라이브러리, 명령어 등의 체계적인 참조 정보 제공

**적합한 주제**:
- "TypeScript Utility Types 완벽 가이드"
- "React Hooks API 레퍼런스"
- "Git 명령어 전체 정리"

**주요 구조**:
- 개요 및 설치
- 난이도별 분류
- API Reference (함수별 상세 설명)
- 타입 정의
- 실전 예제
- 베스트 프랙티스

---

### 4. Explanation (설명 문서)
**파일**: `explanation.mdx`
**용도**: 개념, 원리, 아키텍처 등을 깊이있게 설명

**적합한 주제**:
- "React Reconciliation 알고리즘 이해하기"
- "브라우저 렌더링 과정 완벽 분석"
- "클로저의 동작 원리 Deep Dive"

**주요 구조**:
- 개념 소개 (정의, 비유)
- 왜 필요한가
- 핵심 원리
- 내부 구조 Deep Dive
- 실전 예제 분석
- 한계와 trade-off

---

## 🚀 템플릿 사용 방법

### 방법 1: 수동 복사

```bash
# 원하는 템플릿 복사
cp packages/posts/templates/tutorial.mdx packages/posts/drafts/my-new-post.mdx

# 파일 편집
code packages/posts/drafts/my-new-post.mdx
```

### 방법 2: Claude에게 요청 (권장)

```
"packages/posts/templates/tutorial.mdx 템플릿을 참고해서
Next.js 15 App Router 튜토리얼을 작성해줘"
```

Claude가 자동으로 템플릿을 읽고 내용을 채워줍니다.

---

## 📝 템플릿 커스터마이징

### Frontmatter 필수 항목

모든 템플릿에는 다음 항목이 포함되어야 합니다:

```yaml
---
title: "제목" # 필수
description: "설명" # 필수 (150자 이내 권장)
date: "YYYY-MM-DD" # 필수
tags: ["태그1", "태그2"] # 필수 (3-5개 권장)
category: "카테고리" # 필수
author: "작성자" # 필수
status: "draft" # 필수 (draft 또는 published)
featured: false # 선택 (추천 포스트로 표시)
---
```

### 카테고리 가이드

일관성을 위해 다음 카테고리 중 하나를 사용하세요:

- `Frontend` - 프론트엔드 기술
- `Backend` - 백엔드 기술
- `DevOps` - 배포, 인프라
- `Tutorial` - 학습 가이드
- `Troubleshooting` - 문제 해결
- `Reference` - 참조 문서
- `Deep Dive` - 심화 학습

### 태그 작성 팁

```yaml
# Good ✅
tags: ["Next.js", "React", "Server Components"]

# Bad ❌
tags: ["nextjs", "NEXTJS", "Next.JS"] # 일관성 없음
tags: ["프론트엔드"] # 너무 포괄적
tags: ["개발", "코딩", "프로그래밍"] # 너무 일반적
```

---

## 💡 타입별 작성 팁

### Tutorial 작성 팁

1. **명확한 목표 설정**
   - 무엇을 만들 것인지
   - 독자가 무엇을 배울 것인지

2. **단계별 구성**
   - 각 단계는 독립적으로 동작하도록
   - 각 단계 후 결과 확인 방법 제공

3. **코드 설명**
   - 주석으로 핵심만 설명
   - 복잡한 부분은 별도로 자세히

4. **트러블슈팅 포함**
   - 흔히 발생하는 에러 미리 안내
   - 해결 방법 제시

---

### Troubleshooting 작성 팁

1. **실제 에러 메시지**
   - 정확한 에러 메시지 제공
   - 스택 트레이스 포함

2. **원인 우선순위**
   - 가장 흔한 원인부터
   - 각 원인의 발생 확률 명시

3. **검증 가능한 해결법**
   - 해결 후 확인 방법 제공
   - Before/After 코드 비교

4. **예방 방법**
   - 같은 문제를 방지하는 팁
   - 베스트 프랙티스 제안

---

### Reference 작성 팁

1. **체계적인 분류**
   - 난이도별 (초급/중급/고급)
   - 카테고리별 그룹핑

2. **표 활용**
   - 파라미터, 반환값을 표로
   - 비교 정보도 표로 제공

3. **간결한 설명**
   - 각 항목은 핵심만
   - 자세한 설명은 별도 섹션으로

4. **실용적인 예제**
   - 가장 흔한 사용 패턴
   - 실무에서 자주 쓰이는 조합

---

### Explanation 작성 팁

1. **쉬운 비유 활용**
   - 일상생활 예시로 시작
   - 점진적으로 깊이 있게

2. **시각화**
   - 다이어그램 활용
   - 단계별 플로우차트

3. **실제 코드 분석**
   - 이론 설명 후 코드로 증명
   - 단계별로 나눠서 분석

4. **한계 설명**
   - 장점뿐 아니라 단점도
   - trade-off 명확히

---

## 🎨 스타일 가이드

### 코드 블록

언어를 명시하세요:

````markdown
```typescript
// Good ✅
const example = "hello";
```

```
// Bad ❌ (언어 미지정)
const example = "hello";
```
````

### 파일명 표시

````markdown
```typescript:app/page.tsx
// 파일명을 명시하면 더 명확
export default function Page() {}
```
````

### 강조

- **볼드**: 중요한 용어, 제목
- *이탤릭*: 외래어, 강조
- `코드`: 함수명, 변수명, 명령어
- > 인용: 주의사항, 팁

### 이모지 사용

```markdown
- ✅ 권장사항
- ❌ 비권장사항
- ⚠️ 주의사항
- 💡 팁
- 🎯 목표
- ⚡ 성능
- 📚 참고자료
```

---

## 📚 예제 포스트

실제로 작성된 예제 포스트:

- `packages/posts/drafts/react-19-new-hooks.mdx` - Tutorial 예제
- `packages/posts/drafts/debugging-nextjs-build-errors.mdx` - Troubleshooting 예제
- `packages/posts/drafts/typescript-utility-types-guide.mdx` - Reference 예제

---

## 🔗 관련 문서

- [워크플로우 가이드](../../../.claude/docs/workflow.md) - 전체 작업 프로세스
- [프롬프트 가이드](../../../.claude/docs/prompts.md) - 효과적인 프롬프트 작성법
- [Technical Writing Guide](../../../.claude/docs/technical-writing-guide.md) - 기술 문서 작성 원칙

---

**마지막 업데이트**: 2025-10-16
**버전**: 1.0
