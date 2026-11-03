# HVAC Tools Hub weekly review — 2026-11-03

## Repository

- Repository: https://github.com/canghun13/hvactoolshub ; branch main.
- Start local HEAD, cached origin/main and actual remote main: `6a484e39d46d9a3b714418b023c87b362f5494be`.
- Actual remote checked before fetch. Fetch confirms equal heads, 0/0, clean tree. No reset, deletion, stash, force push, installation, configuration or credential changes. Other checkout and unrelated user work untouched.
- Complete handover, recent index repair, weekly records and actual sitemap/HTML/Tool inventory reviewed. Current inventory: 108 HTML paths, 86 maintained canonical URLs (30 Tools, 25 Guides, 10 Comparisons, 12 References, four hubs, Home, four information pages).
- Latest new cluster remains Laboratory Fume Hood. Recent targeted work remains ACH/CFM, Duct Area, Belt Guide, numeric validation, Print/equivalent-diameter data and static discovery. October 28 BTU fix is not rewritten. Integrated Psychrometric Calculator, legacy consolidations and prior exclusion decisions retained.

## Attachments

All six current-session attachments accessible and read directly, including archive CSVs. No source export modified or committed. No search of local report folders or reuse of prior report paths.

| Current attachment | Actual data and period |
|---|---|
| hvactoolshub.com-Performance-on-Search-2026-11-03.zip | Web/text, last three months; August 1–October 31, 92 daily rows, zero visible query rows, 14 page rows |
| hvactoolshub.com-Coverage-Drilldown-2026-11-03.zip | Metadata: Crawled — currently not indexed; August 5–October 23 chart, 43 detail rows |
| hvactoolshub.com-Coverage-Drilldown-2026-11-03 (1).zip | Metadata: Discovered — currently not indexed; same chart dates, 38 detail rows |
| hvactoolshub.com_PageTrafficReport_2026. 11. 3..csv | 50 rows; engine and measurement window unspecified |
| hvactoolshub.com_KeywordReport_2026. 11. 3..csv | 404 rows; engine and measurement window unspecified |
| 보고서_개요 (1).csv | GA4 hvactoolshub, October 6–November 2 |

Supplementary numeric tails parsed separately from labels to preserve inch quotes. Do not add supplementary keyword/page totals together or combine them with GSC.

## Weekly metrics

- GSC: **18 impressions, zero clicks, 0% CTR**. Approximate impression-weighted mean from rounded daily positions: **14.228**, not an unrounded account headline.
- Recent seven days October 25–31: **0 impressions / 0 clicks**. Preceding October 18–24: **4 / 0**. Last reported impression October 23.
- Query diversity: zero visible query rows in this export. This does not prove no underlying queries occurred; privacy/aggregation and the shifted window limit interpretation.
- GSC pages: Home 17 impressions; CFM per Square Foot 3; BTU Formula 2; 11 other page rows each one. Page aggregation differs from property aggregation; do not sum it to replace the 18-impression chart total.
- Coverage: **38 Discovered / 43 Crawled**, status still **October 23**, not November 3. Latest reported Crawled timestamp remains September 25, before October 22 repair. Discovered `1970-01-01` is unavailable/sentinel data. No current total-indexed export, Google-selected canonical or live inspection is supplied.
- Supplementary page report: **723 impressions / 19 clicks**, 50 rows. Keyword report: **556 / 19**, 404 rows. Top pages: CFM definition 146/1, BTU definition 94/0, Duct Area 92/1, Belt Guide 50/2, ACH Guide 37/0, Fan Pulley 32/1, BTU Tool 21/0, Fan Law 19/1, Duct Friction Guide 19/2.
- Supplementary query examples: BTU lookup table 15 impressions; round duct velocity and CFM meaning seven each; fan-speed/pulley ratio five; minimum fan-sheave/BHP question four with one click. No fresh Google query evidence is inferred from these unidentified-engine/window reports.
- GA4 October 6–November 2: **59 active users, 56 new, 64.288 seconds mean engagement, 530 events**. Direct 46 first-source users / 55 sessions; Bing organic 11/14, Yahoo organic 2/3. Google-organic row and genuine-referral rows absent/unavailable, not asserted zero. Singapore 31 users; direct/calculator views overlap frequent production QA and are not organic demand proof.

## Week-over-week

- Prior GSC July 26–October 25 was 25 impressions/0 clicks, three visible query rows/20 page rows. Current August 1–October 31 is 18/0 with zero query/14 page rows. Rolling-window changes and privacy-visible aggregates are not seven newly lost impressions or proof of seven newly deindexed URLs. No matched query/page-by-week breakdown is supplied.
- Current matched seven-day comparison is 0 versus 4, with no clicks. Last week's reported 2 versus 5 used different seven-day boundaries.
- Coverage status endpoint and counts are unchanged from the October 28 attachment: still October 23 and 38/43. Thus the newly named export supplies no later indexing assessment or post-repair Crawled timestamp. Do not declare recovery or a new live block from this file.
- Supplementary page totals 618/14 → 723/19; keyword 485/14 → 556/19. CFM definition 124→146, Duct Area 75→92, Belt Guide 33→50. These are export-total comparisons with unspecified windows, not measured weekly Google growth.
- GA4 prior September 30–October 27: 53 active/51 new, 78 seconds, 458 events; current shifted window is 59/56, 64.288 seconds, 530 events. Bing users/sessions 10/13→11/14; not a matched-week cohort. QA-driven Direct growth is not promoted to search growth.

## Technical health

- No new host/canonical/robots/Googlebot failure demonstrated. The October 22–23 whole-site HTTP audit is not repeated because exclusion counts are unchanged. Current source robots remains Allow-all and canonical sitemap; existing static discovery regression checks remain required.
- Before editing, the three public Refrigeration pages and public refrigeration.js return HTTP 200 and match starting source after newline normalization. Healthy public BTU clears blank input correctly.
- Reproduced actual public Superheat defect: clear the suction-line temperature while saturation remains 40°F; the page publishes **−40°F / −22.22 K**, and Copy exports it. Empty input is incorrectly coerced to numeric zero.
- Public Subcooling: clear the 90°F liquid-line input while saturation remains 100°F; it publishes **100 / 55.56 K** with a normal result message.
- Public Capacity: inputs beyond its existing HTML maxima still publish a normal capacity result. The live handler checks positive finite numbers, but not native required/min/max constraints. Example mass flow `1e200`, enthalpy difference `1e105` produces enormous out-of-range values instead of rejecting the input.
- During actual clipboard QA, both temperature Tools also exported ambiguous `°F or °C difference` labels despite a single selected system. This affects result interpretation, not the temperature-difference formula.
- Root cause: Number('') becomes 0 for physically valid temperature ranges, native constraints are not checked in the live calculation path, and result labels do not follow unit selection. Individual finite-output formatting is not an atomic derived-result guard.
- Affected scope: the three maintained Tools loading refrigeration.js. No other calculator script needs changing. Technical action required: **Yes**, Priority A FIX. This defect is **not asserted to cause Google's index loss**.

## Existing growth candidates

Priority A takes precedence; no speculative scores or existing-upgrade GO claimed.

| Workflow | Evidence | Actual gap / disposition |
|---|---|---|
| CFM definition / Duct Area | Supplementary 146/1 and 92/1 | Existing definitions, dimension-unit choice and multi-unit results already cover observed intent. Recent upgrades retained; no new missing mode established |
| Belt/sheave workflow | Guide 50/2; minimum driven-sheave/BHP question four impressions/one click | Existing ratio/Fan Law chain and motor/max-RPM boundaries remain. Do not turn an ideal BHP calculation into overload approval or add an exact-match page |
| BTU lookup | Supplementary query 15 impressions; reference page 16 | Maintained reference already supplies lookup data and linked conversion. No new interactive gap established |

## Expansion decision

- Expansion considered at decision-tree level: yes; discovery branch entered: **No**, because a reproduced hard defect has priority.
- Current implemented/excluded families reviewed in complete handover and recent research. No renamed rejected family, new cluster, 40-family funnel or expansion NO-GO score claimed.
- Low organic traffic is not used as a blanket expansion prohibition. The concrete selected action is the Refrigeration validation fix.

## Final decision

**FIX — Refrigeration input validation and selected result units corrected.** Deployment acceptance is recorded after push/public checks below.

## Changes

- `assets/js/refrigeration.js`: honor existing native required/min/max/unit constraints before calculating; reject unsupported derived capacity atomically; clear all outputs on failure. Keep valid zero/negative temperatures, signed negative differences and warnings. No new engineering range or refrigerant property data.
- Two temperature-result labels now reflect selected °F or °C, including Copy/Print. No shared Copy/Print code, print stylesheet or global design change.
- Three maintained Tool HTML pages request `refrigeration.js?v=20261103-validation`, retain July 20 creation and receive actual November 3 visible/meta/schema modification dates. Title, H1, description, canonical, URL, formulas, defaults and precision unchanged.
- Home static Latest starts with these three actual November 3 changes before October 28 cards. Static discovery marker/loader architecture retained. Existing category hubs already contain all three Tools; no duplicate category cards added.
- Sitemap remains **86** URLs; lastmod changes only three Tools and Home. llms.txt inventory reviewed and unchanged because no core URL was added/removed/merged. robots unchanged.
- New `tests/refrigeration-validation.cjs` supplies dependency-free fixtures, separate from actual browser proof. New research and appended handover record; no new public page, generator, CSS or unrelated cluster change.

## QA

- Pre-fix fixture fails on the deployed blank→−40 reproduction. Fixed suite passes **461** assertions: all three Tools, both unit selections, blank/nonfinite/native-range boundaries, unsupported selection, Calculate/live handlers/Reset, signed and zero differences, selected result labels, independent capacity and interval examples.
- Existing BTU 383 + Duct 561 + Airflow 85 + Reference 14 + discovery 317 = **1,360** unchanged checks. Combined **1,821** pass.
- Static audit: 108 HTML, 86 sitemap URLs, 1,220 local targets, 14 browser JS syntax checks, no detected missing-target/maintained SEO/JSON-LD error. XML parses; llms URLs consistent. Static graph still reaches all 86 URLs without JS, maximum depth two.
- Actual local browser all three Tools: default/fractional/SI examples, Calculate, Reset, invalid input clearing, actual clipboard readback. Capacity 10 lb/min × 40 Btu/lb returns 24,000 BTU/h, 7.034 kW, 2 RT; SI 0.1 kg/s × 100 kJ/kg returns 10 kW, 34,121 BTU/h, 2.843 RT. Zero temperature remains valid while blank is rejected; negative difference warning retained.
- Local valid Print actions produce complete current-input/result summaries, now with the selected temperature unit. A local-only native-dialog shim counts calls; invalid Print does not invoke it. Shared Print assets unchanged, so no new PDF-pagination acceptance claim is made for this non-Print-layout patch.
- Local responsive: three changed Tools + healthy BTU + Home at 390/768/900/1024/1280/1440, **30** actual-width checks; one H1/nav, no header overlap or off-screen controls/document overflow. Mobile/desktop screenshots inspected, console has no captured warning/error. Temporary QA assets remain outside public repo.
- Home protected post-footer badge region matches starting content exactly. Contact remains `canghun13@naver.com`. No other project/user work touched.

## Sources

- [NIST SI Units – Temperature](https://www.nist.gov/pml/owm/si-units-temperature), checked November 3: temperature intervals retain Δ°F × 5/9 = ΔK, and Δ°C = ΔK. No absolute-temperature offset is applied to a difference.
- [Copeland Superheat Measurement](https://copeland.custhelp.com/app/answers/detail/a_id/1020/~/superheat-measurement), current official search result confirms subtraction of matched saturation from suction gas temperature; retained measurement-point scope. Existing Copeland/Danfoss page references preserved.
- Existing refrigerant-side capacity formula and BTU/kW/ton factors unchanged; no inferred saturation pressures, property tables, charging targets, design approvals or universal equipment limits.

## Deployment

Initial record: implementation/public acceptance pending push. Do not treat local checks as production acceptance. Append verified implementation SHA, Pages result and actual public tests after deployment; final documentation SHA is reported only after clean local/fetched/actual remote equality.

## Protected areas

- Homepage user-managed footer/badges unchanged: yes, exact content comparison.
- Contact unchanged/correct: `canghun13@naver.com`.
- Existing unrelated work preserved: yes. No installations, system/credential changes, AdSense or directory work.

## Next state

1. Compare genuinely fresh post-October-23 indexing status/crawl evidence; current file does not update that status. Do not infer indexed count or recovery.
2. Obtain matching-period, source-identified query/page evidence before repeating recent CFM/Duct/Belt upgrades.
3. At the next weekly decision, select a demonstrated defect, strong existing gap or genuinely new discovery branch without treating low traffic alone as a gate.
