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

## 2026-07-16

- Added a shared content fallback in `assets/js/site.js` for published Tool, Guide, Compare, and Reference pages that were missing static breadcrumb/schema/OG-description markup. It inserts a section-aware breadcrumb, derives missing Open Graph description from the page description, and adds a basic page-type JSON-LD object only when no structured data exists.
- Added the unified HVAC Load Calculator and its supporting guide, comparison, and reference to a new home-page Load Calculation section.

## 2026-07-16

- Site-wide audit identified two exact Tool duplicates: Airflow Calculator duplicated the CFM Calculator (room dimensions + ACH → CFM), and Round Duct Size Calculator duplicated Duct Size Calculator (CFM + velocity → round diameter). Both legacy URLs now noindex-canonicalize to the stronger page and are excluded from the sitemap.
- Retained related but distinct tools where search intent/inputs differ: ACH, room airflow, CFM per area, rectangular duct sizing, equivalent diameter, velocity, and friction loss.

## 2026-07-16

- Content-quality audit consolidated four thin Load Reference pages into their stronger explanatory Guides. The legacy URLs remain noindex canonical redirects for existing links and are removed from `sitemap.xml`.
- Audit risk retained for follow-up: older BTU/Airflow/Duct supporting pages still require page-by-page source and substantive-content expansion before they should be treated as authoritative references.

## 2026-07-16

- Corrected hub-discovery omissions: Guides, Compare, and Reference hubs now surface the maintained Load content alongside BTU, Airflow, and Duct content. Reference intentionally links the maintained Load Guide instead of the four consolidated noindex Reference URLs.

## 2026-07-16

- Began site-wide Tool UX reinforcement: shared `tool-polish.js` now adds Copy result and Print actions to published calculator forms without duplicating buttons, while the rebuilt shared loader retains header/footer, responsive directory styling, breadcrumb fallback, and metadata fallback behavior.

## 2026-07-16

- Added a shared visible Sources and scope section to published prose content. It selects NIST/DOE for BTU, ASHRAE for Duct/Airflow, and ACCA/DOE for Load pages, and explicitly frames pages as planning aids rather than substitutes for codes or qualified design.

## 2026-07-16

- Substantively rebuilt the two highest-priority Load Guides: `how-to-calculate-hvac-load.html` now includes a component workflow, input table, transparent numeric example, and next-step tool flow; `cooling-load-calculation-explained.html` now distinguishes sensible/latent load, provides a gain table, checked conversion examples, and decision criteria.

## 2026-07-16

- Continued substantive Load content reinforcement: expanded the Heating Load Guide with a heat-loss path table and sensible outdoor-air example; rebuilt the Manual J comparison around input differences, valid/invalid uses, room-airflow implications, and the correct load-to-equipment-to-duct sequence.

## 2026-07-16

- Expanded the remaining Load editorial pages: common calculation mistakes, cooling versus heating load, and residential versus commercial load calculation. Each now has a direct answer, input-specific tables, practical examples, explicit estimate limits, FAQs, and contextual links to the maintained Load, BTU, Airflow, and Duct tools.
- Replaced the home Load card that targeted the retired Load Reference redirect with the maintained calculation-review guide. Rebuilt the home HTML while doing so to correct malformed arrow-span markup in the hero, navigation paths, and call to action.

## 2026-07-16

- Began BTU-cluster substantive reinforcement. Rebuilt the BTU Formula guide, BTU/h-versus-refrigeration-tons comparison, and BTU Conversion Reference with correct visible multiplication/division notation, energy-versus-rate distinctions, worked examples, use limits, FAQs, and connected Load/BTU tool paths.
- The revised conversion reference uses NIST’s Btu definition and directs users to a documented load calculation before equipment selection; it does not equate thermal kW to electrical input.

## 2026-07-16

- Continued BTU reinforcement with rebuilt BTU/h-versus-kW comparison, HVAC BTU lookup table, and BTU chart guide. The three pages now distinguish thermal capacity from electrical input, include worked conversion/lookup use, state chart limits, and link users through the load-to-capacity workflow rather than treating nominal capacity as a sizing result.

## 2026-07-16

- Began Airflow-cluster substantive reinforcement: rebuilt the CFM guide, CFM-versus-ACH comparison, and HVAC Airflow Reference Table. The pages now identify the air stream, distinguish a volume-flow conversion from a ventilation/design requirement, provide room-volume examples, and link from airflow to duct checks without asserting unsupported universal ACH values.

## 2026-07-16

- Continued Airflow reinforcement with expanded CFM calculation and ACH guides plus a CFM-versus-m³/h comparison. The content now uses consistent unit notation, demonstrates the volume conversions, separates airflow labels from ventilation claims, and directs duct decisions to area/velocity/friction review.

## 2026-07-16

- Expanded the remaining Airflow area/room/metric reference content: the CFM-per-area guide now identifies its missing variables; the room-CFM guide separates supply, return, outdoor, and exhaust questions; and the CFM conversion chart now provides forward/reverse lookup tables and unit-use limits.

## 2026-07-16

- Consolidated the thin “Recommended Air Changes per Hour Table.” It had no defensible universal data table and duplicated the maintained ACH guide, so its legacy URL is now a noindex canonical redirect to the guide and is removed from the sitemap and Reference hub. Existing legacy links remain safe through the redirect pending their targeted Tool-page refresh.

## 2026-07-16

- Began Duct-cluster substantive reinforcement: rebuilt the duct-sizing workflow guide, the round-versus-rectangular comparison, and the round-duct area chart. They now use safe geometry/velocity examples, require complete pressure-path checks, and avoid presenting a single velocity, shape, or chart row as a universal final design choice.

## 2026-07-16

- Continued Duct reinforcement with duct-velocity and friction-loss guides plus a friction-rate reference. These pages distinguish straight-run friction from total system resistance, document the Darcy-Weisbach input scope, and avoid publishing unsupported universal velocity or friction-rate defaults.

## 2026-07-16

- Consolidated the duplicate Round vs Rectangular Blog into the maintained Compare page; the old Blog URL is now a noindex canonical redirect and is removed from the sitemap. Expanded the distinct duct-sizing-mistakes guide and Flexible-versus-Rigid comparison with complete-path checks, installation conditions, and non-universal design limits.

## 2026-07-16

- Completed the remaining Duct editorial pass: expanded Low-versus-High Velocity and Equivalent Round Diameter resources with formula scope, examples, and full-path limits. Consolidated the unsupported “Recommended Duct Velocity Table” into the maintained velocity guide; its legacy URL is a noindex canonical redirect and is removed from the sitemap.

## 2026-07-16

- Consolidated the duplicate BTU Units Guide into the maintained BTU Formula Explained guide. The legacy URL remains as a noindex canonical redirect and is removed from the sitemap; the stronger formula guide already covers the same BTU/h, watt, kilowatt, and refrigeration-ton intent with examples and source context.

## 2026-07-16

- Began active Tool validation reinforcement for the shared Airflow and BTU-cluster calculators. Zero, negative, non-numeric, and empty inputs now clear any stale result and show an explicit validation message; valid calculations retain the existing conversion formulas and reset behavior.

## 2026-07-16

- Applied the same active validation behavior to shared Duct calculators. All modes now reject non-positive, empty, and non-numeric inputs by clearing stale output; normal result messages use corrected square-unit and multiplication notation.

## 2026-07-16

- Strengthened shared responsive UI: prose tables now use a 40rem minimum width inside horizontally scrollable wrappers; calculator selects receive the same sized, bordered control treatment as inputs with a custom indicator; dynamically added Sources sections now carry the `.source-polish` class in addition to the data attribute for targeted styling.

## 2026-07-20

- Expanded the remaining core BTU guides, `what-is-btu.html` and `how-to-calculate-btu.html`, with an explicit energy-versus-rate distinction, thermal-versus-electrical-label limits, conversion tables, a transparent component-load example, formulas, and the load-to-airflow-to-duct workflow. The guides retain their existing URLs and now direct sizing decisions to the maintained preliminary Load Calculator rather than an area-only rule.

## 2026-07-20

- Aligned the central BTU Converter validation with the audited cluster behavior: empty, zero, negative, and non-numeric entries now clear all stale outputs and require a value greater than zero. The next content pass will update its legacy related-guide link to the maintained BTU Formula guide.

## 2026-07-20

- Expanded the direction-specific BTU-to-tons and tons-to-BTU tools while retaining both distinct conversion intents. Both now use valid positive input bounds, corrected formula notation, updated metadata, result interpretation, unit tables, worked examples, and explicit load-before-equipment-selection guidance.

## 2026-07-20

- Rebuilt the area-based BTU tools to prevent a ratio or chosen planning rate from being presented as final sizing. `btu-per-square-foot-calculator.html` now frames its output as a comparison metric, while `room-btu-calculator.html` requires a documented rate and directs users to the component-based Load Calculator. Both pages now use corrected unit notation, positive input bounds, expanded scope limits, and maintained workflow links.

## 2026-07-20

- Began the Airflow tool pass by correcting shared result-unit labels in `assets/js/airflow.js`. The seven Airflow calculator modes now use encoding-safe `CFM per sq ft` and `m3/h` result text while retaining their existing validated formulas and reset behavior.

## 2026-07-20

- Rebuilt the ACH Calculator around its actual purpose: calculating a volume-flow ratio from an identified CFM stream and room volume. The page now uses positive input bounds, corrected unit/formula notation, explains supply/outdoor/exhaust/recirculation distinctions, replaces its retired reference link, and provides maintained CFM, guide, comparison, and reference paths.

## 2026-07-20

- Consolidated `room-airflow-calculator.html` into the maintained CFM Calculator after confirming the two tools had identical inputs (length, width, height, ACH), formula, and CFM output. The legacy URL remains a noindex canonical redirect and was removed from the sitemap; internal-link cleanup continues in the relevant page refreshes.

## 2026-07-20

- Rebuilt the maintained CFM-per-square-foot tool as an airflow normalization check. It now uses positive inputs, clear air-stream and area-boundary guidance, corrected units/formula notation, ratio limits, maintained CFM/ACH/Load paths, and avoids presenting an area ratio as a universal design target.

## 2026-07-20

- Rebuilt both direction-specific Airflow metric converters. The CFM-to-m3/h and m3/h-to-CFM tools now use corrected notation, positive inputs, explicit reciprocal conversion factors, examples, and scope limits that distinguish unit conversion from fan performance, ventilation, or equipment comparison.

## 2026-07-20

- Began the Duct tool pass with the core Duct Size Calculator. It now uses corrected formula/unit notation, positive inputs, transparent area/diameter math, a theoretical-size label, and complete-path limitations that direct users to velocity and friction checks instead of treating a geometry result as final duct design.

## 2026-07-20

- Expanded the distinct Rectangular Duct Size Calculator with corrected formula notation, positive inputs, transparent area/ratio dimensions, and equal-area versus equal-resistance limits. It now sends users to equivalent-diameter and friction checks rather than treating an aspect-ratio result as final design.

## 2026-07-20

- Expanded the Equivalent Duct Diameter Calculator around its actual Huebscher equal-friction scope. It now has corrected notation, positive inputs, explicit non-equivalence of area/velocity/fittings, and linked rectangular-geometry and friction checks instead of presenting the result as a direct duct substitution.

## 2026-07-20

- Expanded the Duct Velocity Calculator with distinct working round and rectangular modes already supported by the shared script. Both modes now use actual inside dimensions and positive validation, while the page clarifies that face velocity is a preliminary geometry check requiring separate resistance, noise, fitting, and complete-path review.

## 2026-07-20

- Expanded the Duct Cross-Sectional Area Calculator with working round and rectangular modes already supported by the shared script. The page now uses inside dimensions, positive validation, corrected area notation, and a clear area-to-velocity workflow without treating face area as a pressure-loss or distribution result.

## 2026-07-20

- Rebuilt the Duct Friction Loss Calculator around its transparent Darcy-Weisbach scope: straight round duct only with user-supplied density and Darcy friction factor. Corrected notation, positive inputs, variable explanations, and complete-path limits now prevent the result from being presented as total static pressure or a universal friction-rate rule.

## 2026-07-20

- Rebuilt the home-page markup without changing the visual system: corrected malformed arrow spans, removed the Room Airflow card that pointed to the consolidated noindex URL, and refreshed Latest cards using the actual 2026-07-20 updated tool pages. Duct and Load discovery sections remain intact.

## 2026-07-20

- Began the Load Calculator active-result pass. Shared `load.js` now clears stale output for invalid values, recalculates on input/unit changes, guards Copy before a result exists, and uses encoding-safe thermal-capacity, delta-temperature, and volume result text. The documented component aggregation and conversions remain unchanged.

## 2026-07-20

- Rebuilt the HVAC Load Calculator page UI around the maintained component aggregator. Input labels, unit selector, dates, schema, scope, formulas, limits, FAQ, and workflow links now use encoding-safe text and match the active calculation behavior. The page continues to distinguish preliminary planning from Manual J, detailed load methods, and final equipment design.

## 2026-07-20

- Rebuilt the Tools hub around maintained user flows rather than legacy URL count. It now surfaces the active Load, BTU, Airflow, and Duct calculators by purpose, including recently strengthened area, velocity, equivalent-diameter, and friction tools; consolidated noindex URLs are not listed.

## 2026-07-20

- Rebuilt the Guides hub around maintained load-to-capacity and airflow-to-duct learning paths. It now exposes the strengthened BTU, Airflow, and Duct guides alongside Load content, uses only maintained URLs, and preserves the shared directory design.

## 2026-07-20

- Rebuilt the BTU/h versus HVAC Tons comparison with corrected dates, arrows, quotation text, and capacity-label explanations. It retains the comparison table and conversion workflow while reinforcing that thermal capacity conversion is not a load calculation, electrical-input rating, or equipment-selection approval.

## 2026-07-20

- Rebuilt the BTU Conversion Reference with corrected dates, source text, ownership grammar, and thermal-capacity wording. The reference retains verified conversion relationships, lookup rows, formulas, an electrical-input warning, and NIST/DOE source context.

## 2026-07-20

- Rebuilt the BTU/h versus kW comparison with corrected dates and ownership grammar, retaining the conversion table and making the thermal-capacity versus electrical-input decision path explicit.

## 2026-07-20

- Rebuilt the CFM-versus-ACH comparison around the actual flow-to-volume distinction. It now includes the reciprocal formulas, a checked room-volume example, air-stream labeling guidance, explicit non-compliance limits, updated schema/dates, and maintained CFM, ACH, Reference, and Duct workflow links.

## 2026-07-20

- Rebuilt the Compare hub using maintained URLs only. Its capacity, airflow, duct, and next-tool paths now surface every maintained comparison, including previously undiscoverable BTU/kW, metric-airflow, flexible/rigid, and low/high-velocity comparisons.

## 2026-07-20

- Rebuilt the Reference hub using maintained references and intentional next-step tools only. Capacity, airflow, duct-geometry/friction, and Load paths now disclose lookup limits and surface the maintained duct-friction reference that had been omitted from hub discovery.

## 2026-07-20

- Rebuilt the maintained Duct Friction Rate Reference with explicit straight-section inputs, formula variables, use sequence, and total-system limits. It now links to the maintained velocity guide rather than the consolidated noindex velocity-table URL. The legacy Room Cooling Load redirect now points directly to the unified HVAC Load Calculator instead of a second redirect.

## 2026-07-20

- Rebuilt the maintained ACH guide with an identified-air-stream workflow, consistent US/SI formula notation, a checked room-volume example, explicit limitations, and maintained ACH/CFM/Reference/Duct links. The retired unsupported ACH-table URL is no longer linked.

## 2026-07-20

- Rebuilt the Duct Velocity guide with corrected units, explicit area-to-velocity example, full pressure-path decision sequence, updated dates/schema, and maintained friction-reference links. The consolidated noindex duct-velocity-table URL is no longer linked.

## 2026-07-20

- Replaced the maintained BTU calculation guide's consolidated Load Reference link with the maintained How to Calculate HVAC Load guide.

## 2026-07-20

- Rebuilt the maintained Room CFM guide with corrected unit/date notation and direct CFM/ACH tool paths, removing its link to the consolidated noindex Room Airflow Calculator.

## 2026-07-20

- Rebuilt the Duct Sizing Mistakes guide with corrected unit/date notation and a direct maintained CFM Calculator workflow link, removing its link to the consolidated noindex Room Airflow Calculator.

## 2026-07-20

- Browser mobile testing found that Reference grid content could force page-level horizontal overflow when a responsive table had a minimum width. Added grid-child and header-navigation minimum-width safeguards so tables remain inside their intended scroll wrapper and navigation can shrink/scroll within the header.

## 2026-07-20

- Versioned the shared stylesheet URL across all 66 HTML pages (`style.css?v=20260720-mobilefix`) to force clients and CDN layers to request the responsive-overflow fix rather than reuse a stale CSS asset.

## 2026-07-20

- Removed one empty `<url>` node discovered during the final sitemap/robots validation. The sitemap now contains maintained URLs only.

## 2026-07-20

- Added static JSON-LD to the six sitemap pages previously relying on runtime fallback schema: Home, Tools, Guides, the Load Mistakes guide, Cooling-versus-Heating Load, and Residential-versus-Commercial Load. Each now exposes an appropriate WebSite, CollectionPage, or Article object in its initial HTML.

## llms.txt maintenance

- Keep `/llms.txt` at the project root as a concise Markdown index for language-model readers.
- When a maintained page is created, consolidated, or deleted, update `llms.txt` in the same change.
- Include only active canonical URLs with distinct value; never add noindex redirects, keyword lists, advertising copy, or a full page dump.

## 2026-07-20

- Added root `llms.txt` as a concise index of active core calculators, Airflow, Duct, Load, Guide, Comparison, Reference, and site-information URLs. It intentionally excludes noindex redirects and `llms-full.txt`.

## 2026-07-20

- Improved Compare and Reference hub scanability: every category heading now has a concise explanatory paragraph and consistent spacing before its card grid, matching the information hierarchy used by the Tools and Guides hubs.

- Aligned Compare and Reference hub category markup with Tools and Guides: each section now uses the shared home-section-heading wrapper, an eyebrow label, H2, and supporting description.

## 2026-07-20

- Began Refrigeration Tool Cluster phase 1 with three distinct maintained tools: refrigerant-side capacity from documented mass flow and enthalpy difference, matched-point superheat, and matched-point subcooling. The tools do not generate refrigerant pressure-temperature or enthalpy data and do not provide service targets.
- Did not create Refrigeration Ton, BTU/h-to-Tons, or standalone Temperature Difference URLs: the first two duplicate the maintained BTU conversion tools, and the last duplicates the temperature-difference math already contextualized in the Superheat and Subcooling tools. Added the three maintained URLs to Tools, Home, sitemap, and llms.txt.

## 2026-07-20

- Reconciled all four directory hubs against active canonical sitemap URLs. Tools now surface the three previously omitted maintained converters/checks; Guides now surface the eleven previously omitted maintained articles in coherent Load, Airflow, BTU, and Duct paths. Compare and Reference already matched their active sitemap inventories, so no cards were added there.
