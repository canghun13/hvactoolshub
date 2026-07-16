# HVACTOOLSHUB - PROJECT HANDOVER (v1.1)

> 프로젝트의 단일 기준 문서(Source of Truth)
> Codex는 작업 시작 전에 반드시 이 문서를 끝까지 읽는다.
> 기존 내용을 삭제하거나 덮어쓰지 않는다. 모든 변경은 마지막 "변경 기록"에 추가한다.

---

# 1. 현재 프로젝트 상태

- 프로젝트명: hvactoolshub
- 도메인: hvactoolshub.com
- GitHub Pages: 완료
- Cloudflare: 완료
- HTTPS: 완료
- Google Search Console: 연결 완료
- Google Analytics 4: 연결 완료

## Google Analytics (절대 삭제 금지)

Measurement ID

G-EDV0PS9MP3

규칙

- 모든 HTML은 GA4가 포함되어야 한다.
- 새 HTML 생성 시 반드시 포함 여부 확인.
- 공통 Head에서 관리한다.
- GA 코드가 삭제되거나 중복 삽입되면 안 된다.

---

# 2. 공통 Head 규칙

모든 페이지 공통

- GA4
- charset
- viewport
- title
- meta description
- canonical
- favicon
- Open Graph
- robots

누락 금지.

---

# 3. 기술 스택

- GitHub Pages
- Cloudflare
- HTML
- CSS
- Vanilla JavaScript
- DB 사용 금지

---

# 4. 디렉토리

/assets
/tool
/blog
/compare
/reference
/about
/contact

필요 시 하위 디렉토리 추가 가능.

---

# 5. 사이트 철학

- Tool First
- SEO First
- 기존 페이지 보강 우선
- 성능 우선
- 재사용 가능한 구조 우선

Blog는 Tool을 지원하기 위한 콘텐츠이다.

---

# 6. SEO 전략

우선순위

1. 기존 페이지 보강
2. Search Console 데이터 확인
3. 신규 콘텐츠

절대 검색량만 보고 키워드를 선택하지 않는다.

선택 기준

- 경쟁도
- 검색 의도
- 롱테일 여부
- 내부링크 가능성

---

# 7. 콘텐츠 생성 규칙

신규 페이지 생성 전 반드시

1. 프로젝트 전체 중복 검사
2. Search Console 확인
3. 기존 페이지 보강 가능 여부 확인
4. 웹 검색으로 경쟁도 조사
5. 롱테일 키워드 조사
6. 관련 Tool/Blog 연결 계획 수립

---

# 8. Tool 페이지

필수

- Tool
- 설명
- 공식
- 변수 설명
- 사용 예시
- FAQ
- Related Tool
- Related Blog

---

# 9. Blog

모든 Blog는 최소 1개 이상의 Tool과 연결.

단순 정보글 금지.

---

# 10. Compare

반드시 비교표 포함.

양쪽 Tool 연결.

---

# 11. Reference

- 공식
- 단위
- Lookup
- 표
- 규격

---

# 12. 최신순

모든 페이지

created_date
updated_date

홈 최신 목록은 updated_date DESC

신규 + 수정 모두 최신에 노출.

---

# 13. 내부링크

Tool → Blog
Blog → Tool
Compare → Tool
Reference → Tool

고립 페이지 금지.

---

# 14. Search Console 운영

매 작업 시작 시

- 신규 색인 문제 확인
- CTR 낮은 페이지 확인
- 노출 높고 클릭 낮은 페이지 보강
- 크롤링 오류 확인

---

# 15. Google Analytics 운영

매 작업 시작 시

- 인기 페이지
- 체류시간
- 유입 경로
- 이탈률

확인 후 보강 우선순위 결정.

---

# 16. Sitemap

새 페이지 추가 또는 URL 변경 시

- sitemap.xml 갱신
- Search Console 제출

---

# 17. robots.txt

robots와 sitemap 일치 여부 확인.

---

# 18. 성능

목표

- Lighthouse 95+
- CLS 최소
- JS 최소화
- Lazy Load
- WebP

---

# 19. 금지

- AI 티 나는 글
- 중복 콘텐츠
- 키워드 남발
- 추측 공식
- 중복 코드
- 기존 URL 변경

---

# 20. 작업 종료 체크리스트

- GA4 확인
- 내부링크 확인
- Meta 확인
- Canonical 확인
- Sitemap 확인
- Search Console 영향 검토
- Commit
- Push

---

# 21. 변경 기록

모든 구조 변경은 아래에 날짜와 이유를 추가한다.
삭제 금지.

## 2026-07-16

- Established the static-site foundation: `assets/css`, `assets/js`, and `assets/icons`, plus future content sections (`tool`, `blog`, `compare`, `reference`, `about`, and `contact`).
- Refactored the home page with a complete SEO/GA4 head, responsive mobile-first layout, shared header/footer rendering, and an SVG favicon.
- Normalized sitemap and robots URLs to the canonical lowercase domain.

## 2026-07-16

- Added `/tool/template.html` as the reusable, noindex Tool page template. It includes the required calculator, explanation, formula, variables, example, FAQ, related-resource, date, GA4, and SEO structures.
- Extended the shared styles and JavaScript with responsive Tool-template UI patterns and a deliberate template-only form guard; verified calculation logic must be supplied per published tool.

## 2026-07-16

- Added `/blog/template.html` as the reusable, noindex Blog template with required date metadata, FAQ, article structure, and a mandatory Related Tool placement.
- Added responsive article-header, article-body, callout, and in-page navigation styles for Blog templates.

## 2026-07-16

- Added `/compare/template.html` as a reusable, noindex Compare template with the required comparison table and explicit links to both related Tools.
- Added responsive comparison header, option-card, comparison-table, and Tool-CTA styles.

## 2026-07-16

- Added `/reference/template.html` as a reusable, noindex Reference template with source, formula, units, lookup table, specification, and Related Tool structures.
- Added responsive Reference source, lookup, details, and related-Tool presentation styles.

## 2026-07-16

- Completed the home-page visual system with a Tool-first hero, purpose-led path navigation, responsive engineering-workflow section, and final CTA.
- Added a lightweight, image-free `assets/css/home.css` visual layer to preserve performance and minimize layout shift.

## 2026-07-16

- Added the published `/tool/btu-calculator.html` converter for BTU/h, watts, kilowatts, and refrigeration tons. Calculations use NIST Btu-to-joule conversion and the U.S. DOE's 12,000 BTU/h refrigeration-ton convention.
- Added the connected `/blog/btu-units-guide.html` guide and included both published URLs in `sitemap.xml`.
- Added public Tool and Blog directory pages so the primary navigation routes resolve to the published BTU calculator and its supporting guide.

## 2026-07-16

- Expanded the BTU cluster with four interconnected calculators, a BTU conversion reference, a What Is BTU guide, and a BTU vs HVAC Tons comparison.
- Added unique metadata, visible breadcrumbs, JSON-LD schemas, internal Tool/Blog links, and sitemap entries for all cluster pages.
- Updated the Tool and Blog directories and added a home-page latest section ordered with the new BTU cluster pages first.
- Added Reference and Compare directory pages so all BTU-cluster breadcrumb and navigation targets resolve.

## 2026-07-16

- Refined Tool-page content spacing, table/list containers, formula blocks, and FAQ rhythm for clearer section separation.
- Updated the Tool directory to use a wider three-column desktop grid and more balanced card typography, reducing excessive title wrapping.

## 2026-07-16

- Fixed breadcrumb layout: a specific `.breadcrumb ol.container` rule now preserves the shared centered container width instead of the list reset overriding its auto margins.

## 2026-07-16

- Generalized content typography from Tool/Reference-only selectors to the shared `.prose` class, applying the same heading, paragraph, list, table, formula, and FAQ spacing to Tool, Blog, Compare, and Reference pages.

## 2026-07-16

- Extended shared directory-card styling from `/tool/` to `/blog/`, `/compare/`, and `/reference/` so all content hubs use consistent grid density and typography.

## 2026-07-16

- Added About, Privacy Policy, Contact, and Disclaimer pages with shared Head, navigation, breadcrumbs, and updated-date metadata.
- Added Footer links for About, Privacy Policy, Contact, and Disclaimer. The Contact page intentionally uses a commented replacement placeholder until a verified site email is available.
- Privacy policy reflects the current static-site/GA4 implementation and notes that any future advertising or consent functionality will require a policy update.

## 2026-07-16

- Refined the shared static information-page layout: general information panels are now compact, left-accented notes rather than dominant blue cards.
- Reworked Contact categories into a compact responsive grid: two columns on larger screens and one column on mobile.

## 2026-07-16

- Reduced shared body-section spacing across content pages and all four directory hubs.
- Removed directory-card forced height and automatic paragraph bottom alignment so card copy follows its title without artificial blank space.

## 2026-07-16

- Removed the shared `.prose > h2` top margin entirely so content headings no longer create artificial vertical gaps.

## 2026-07-16

- Removed the redundant `.prose > h2` top-margin declarations while preserving the updated global heading spacing.

## 2026-07-16

- Completed the BTU content cluster with three intent-specific Guides, a BTU-vs-kW comparison, and an HVAC BTU reference table; existing BTU Tools, BTU-vs-Tons comparison, and conversion reference were retained to avoid duplicate URLs.
- Updated content hubs, the home latest list, and `sitemap.xml` to connect the cluster. `robots.txt` already permits crawling and references the canonical sitemap, so no change was required.

## 2026-07-16

- Added the Airflow Tool foundation: seven client-side CFM/ACH/area/metric conversion calculators share `assets/js/airflow.js`; all calculation results include input validation, reset, units, and planning-only guidance.

## 2026-07-16

- Completed the supporting Airflow cluster with five Guides, two unit/metric comparisons, and three references. All published Airflow URLs are included in `sitemap.xml` and connect to the relevant calculators.

## 2026-07-16

- Expanded the Compare and Reference hubs to surface both BTU and Airflow clusters together.

## 2026-07-16

- Updated the home Latest section to surface newly added Airflow pages alongside BTU references by their shared updated date.

## 2026-07-16

- Completed Tool hub discovery by adding all seven Airflow calculators alongside the existing BTU tools.

## 2026-07-16

- Added the Duct Design cluster: seven client-side calculators (duct size, rectangular and round sizing, equivalent diameter, velocity, area, and transparent straight-duct friction loss), five guides, three comparisons, and four references.
- Duct sizing uses the CFM/area/velocity relationship. Equivalent round diameter uses the Huebscher equal-friction approximation; the friction-loss tool requires explicit air-density and Darcy-friction-factor inputs rather than treating a default as a universal design rule.
- Updated Tool, Guide, Compare, and Reference hubs and added all Duct URLs to `sitemap.xml`. `robots.txt` already permits crawling and uses the canonical sitemap.

## 2026-07-16

- Added the HVAC Load cluster: eight preliminary planning/conversion tools, six guides, three comparisons, and four references.
- Area-based tools require an explicit planning rate and adjustment factor. They are labelled as preliminary estimates only and do not represent Manual J or ASHRAE detailed load calculations; pages identify climate, envelope, glazing, orientation, infiltration, ventilation, internal gains, humidity, and schedules as relevant limitations.
- Added the published Load URLs to `sitemap.xml`; `robots.txt` remains compatible with the canonical sitemap.

## 2026-07-16

- Consolidated duplicate Load intents after audit: Residential and Commercial planning URLs canonicalize to the single HVAC Load Calculator; Room Cooling canonicalizes to Cooling Load Calculator; HVAC Tonnage canonicalizes to the existing BTU to Tons Calculator; HVAC Load per Square Foot canonicalizes to the existing BTU per Square Foot Calculator.
- The five duplicate URLs are retained only as noindex redirects for existing links and are removed from `sitemap.xml`.

## 2026-07-16

- Replaced the area-rate Load Calculator with an input-transparent component aggregator. It supports US customary and SI geometry/temperature/airflow input conversion, sums documented envelope, solar, people, lighting, equipment, and outdoor-air sensible components, and reports cooling/heating BTU/h, tons, kW, and a supply-air-ΔT-based sensible CFM estimate.
- Added Copy and Print controls, validation/ranges, and explicit limitations. Cooling and Heating standalone URLs now noindex-canonicalize to the unified calculator and were removed from the sitemap.
