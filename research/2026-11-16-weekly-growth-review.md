# HVAC Tools Hub — November 16, 2026 weekly review

## Repository and final decision

- Repository `canghun13/hvactoolshub`, branch `main`. Starting local HEAD, cached origin/main and actual remote main: `197e1d9571feea7f62ff9f8a0d485387d896eb2f`. Actual remote checked before fetch; 0/0, clean tree, no synchronization required. Existing child checkout/runtime reused, no other project/checkout touched, no install/reset/stash/configuration/credential change.
- Current request, handover rules/latest closure, recent weekly/index/growth records and current inventory reviewed. November 9 Load, November 3 Refrigeration, October BTU/Duct/Airflow fixes and integrated Psychrometric/legacy merge decisions retained.
- **FIX — Belt-drive stale-result and unit-change validation defects corrected.** One Priority A workflow only; no new cluster or public URL. This is not an explanation or cure for Google exclusion counts.

## Current-session attachments

Only the six supplied current files were read directly. ZIP CSVs parsed in memory, originals unchanged. No attachment inaccessible and no search for old local reports. Prior figures come from the committed November 9 review.

| Source | Actual report scope |
|---|---|
| hvactoolshub.com-Performance-on-Search-2026-11-16.zip | GSC Web/text, last three months; 92 daily rows August 14–November 13 |
| hvactoolshub.com-Coverage-Drilldown-2026-11-16 (1).zip | Discovered—currently not indexed; 85 chart rows August 21–November 13; 38 detail URLs |
| hvactoolshub.com-Coverage-Drilldown-2026-11-16.zip | Crawled—currently not indexed; 85 chart rows August 21–November 13; 43 detail URLs |
| hvactoolshub.com_PageTrafficReport_2026. 11. 16..csv | Supplementary page report, 54 rows; engine/window unspecified |
| hvactoolshub.com_KeywordReport_2026. 11. 16..csv | Supplementary query report, 524 rows; engine/window unspecified |
| 보고서_개요 (1).csv | GA4 October 19–November 15 |

## Weekly metrics and comparison

### GSC

- 20 impressions, zero clicks, 0% CTR; approximate impression-weighted position **15.855** from rounded daily values, not a claimed unrounded UI headline.
- Latest seven available dates November 7–13: **one impression / zero clicks**; preceding October 31–November 6: **two / zero**. Last impression November 8. Previous review used November 1–7 and different rolling boundaries; do not confuse either with the export date or calculate a weekly growth rate from 19→20 rolling impressions.
- One visible query row: `hvac takeoff calculator`, one impression, position 60, unchanged from prior exported query. Query export is not the complete property impression population and does not justify a takeoff cluster.
- Six page rows: Home 19 / position 14 (prior 18); BTU Formula 2 / 6; CFM per Square Foot 2 / 7; Superheat Guide 1 / 1; Refrigeration Units Reference 1 / 10; Duct Velocity Guide 1 / 52. Do not sum page and query grains into the daily property total.
- Countries: US 17 impressions, Mexico one, Thailand one, Philippines one. Desktop 19, mobile one. Prior rolling property total 19/0, current 20/0; query diversity remains one visible row.

### Indexing

- **38 Discovered / 43 Crawled at November 13**. This week's Crawled ZIP really has a status trend chart, unlike the previous 43-row pending-validation-only export. Do not describe it as a validation outcome or incorrectly carry forward last week's missing-chart limitation.
- Latest listed Crawled timestamp remains **September 25**, all before October 22 initial-HTML discovery repair. Discovered dates are 1970 sentinel values, not proof of a crawl. Stable counts do not prove identical membership or unchanged known-URL identities.
- No current overall indexed total, selected canonical, authenticated live inspection, host history, manual-action check, recrawl request or validation outcome is supplied. Recovery remains unverified; the old indexed count of five is not today's count.
- October 22 static discovery remains intact. Exclusion counts alone do not establish a new site-side defect or justify repeat TLS/robots/canonical rewrites, deletion or bulk content generation. The application defect below is separately demonstrated, not asserted as an index-loss cause.

### Supplementary search reports

- Page report **54 rows / 1,009 impressions / 25 clicks**. Query report **524 / 760 / 25**; numeric right-tail parsing rejects no rows. Engine and date range unspecified; do not mix with GSC, add page/query totals together, or interpret export-row additions as newly acquired weekly Google queries.
- Prior page 51 / 873 / 22 and query 455 / 660 / 22. Important page rows (impressions/clicks): CFM definition **179/1** (156/1), Duct Area **140/1** (110/1), BTU definition **121/0** (114/0), Belt Guide **77/2** (74/2), ACH Guide **56/0** (40/0), Fan Pulley **42/3** (37/3), Motor Sheave **34/4** (31/4), Fan Belt Reference **28/2** (27/2).
- Adjustable-sheave formula query stays 22 impressions / position 1.5 / zero clicks. Minimum driven-sheave/BHP question stays six / one click / position 3.33. Additional pulley/ratio/dimension queries support review of the existing workflow, not an unsafe universal adjustment/overload-approval feature. Existing guide already explains driver/driven adjustment direction and manufacturer-specific limits.

### GA4

- October 19–November 15: **83 active users, 80 new, 47.02 seconds mean engagement, 580 events**. Previous October 12–November 8: 69/66, 67.19 seconds, 614 events; shifted windows and QA traffic prevent a clean weekly organic-growth claim.
- First-user source users / sessions: Direct **71/81**, Bing organic **10/21**, Yahoo organic **1/1**, Twelve.Tools directory **1/1**. Directory referral is visible but engagement/quality cannot be certified from one aggregate row. Google organic row unavailable, not proven zero.
- Singapore 20 and Ashburn 14 users; no bot identity inferred. Repeated calculator/hub views and recent production QA make Direct and calculator views unsuitable as independent search-demand proof.

## Technical health and actual reproduction

- Focused public baseline: four Belt Tool HTML pages and belt-drive.js all HTTP 200 and source-equal to starting HEAD. robots allows crawling and points to canonical sitemap. Static graph/maintained SEO checks below retain previous indexability acceptance; no repeated whole-host audit or invented Googlebot success.
- Public Fan Pulley initially shows 1,750 × 4 / 8 = 875 RPM. Editing motor RPM to **2,000** leaves **875** and 1,832.6 ft/min visible; actual Copy still exports those previous values instead of the now-required 1,000 RPM. This is a stale export, not merely deferred explicit calculation.
- Set motor RPM to **0.5**, below existing native minimum 1, then change diameter unit: results reappear as 0.3 RPM / 0 m/s with ordinary verification guidance. The select-change handler bypasses native form limits.
- Healthy control: November 9 Load responds to lighting 100 W with current 341.2 BTU/h / 15.8 CFM; its existing validation behavior preserved.
- Root cause in shared Belt script: input handler returns immediately for native-valid edits, preserving old outputs; calculate validates positive finite numbers/upper guards but not native lower limits, and unit change invokes it outside native submit validation. Scope: four maintained forms using belt-drive.js. Common Copy/Print correctly reads existing outputs; no shared component change needed.

## Existing candidates and expansion

| Workflow | Evidence / actual gap | Decision |
|---|---|---|
| Belt/sheave | Guide 77/2, Fan Pulley 42/3, Motor Sheave 34/4; actual stale export and native-limit bypass | Priority A FIX selected; no speculative growth score |
| CFM definition / Duct Area | 179/1 and 140/1; existing definition/unit/area workflows already cover observed tasks | Recent targeted upgrades preserved; no new independent missing mode established |
| ACH Guide | 56/0 with related room-volume tools already linked | No rewrite based only on supplementary accumulation |

Expansion considered at decision-tree level; discovery branch **not entered** because demonstrated hard defect takes precedence. Existing implemented/excluded boundaries in handover/recent research reviewed. No 40-family funnel, new-family count, expansion scores or scored NO-GO claimed. Low traffic is not a blanket prohibition. Latest implemented cluster remains Fume Hood, with Belt/Heat Pump and earlier core clusters maintained.

## Changes

- `assets/js/belt-drive.js`: enforce existing native validity and supported unit before calculating on every path. Clear all old results on every input edit, with explicit Calculate-again guidance. Existing valid select changes still calculate; invalid ones stay clear. Reset behavior unchanged.
- Four Tool HTML pages request `belt-drive.js?v=20261116-validation`; visible/meta/schema updated date November 16, creation August 24 retained. Titles/H1/descriptions/canonicals/URLs, formulas, coefficients, defaults, precision, ranges and safety wording unchanged.
- Home initial-HTML Latest starts with the four actual updates before November 9 Load. Existing affected Latest entries moved/replaced rather than duplicated. Current hubs already list all four; no extra category cards.
- Same **86 sitemap URLs**; only four Tools and Home lastmod updated. llms core inventory/robots reviewed and unchanged, no added/deleted/merged URL. No CSS, common Header/Footer/Print/loader, design, public generator, Guide/Reference rewrite or new page.
- New `tests/belt-validation.cjs`, this review and appended handover. Inventory remains **108 HTML / 86 maintained URLs**: 30 Tools, 25 Guides, 10 Compare, 12 References, four hubs, Home, four general pages.

## QA before deployment

- New test first fails against original script on valid-edit stale results, then passes **1,000** assertions across all four forms/both units: required/blank/zero/negative/nonfinite/native min/max, invalid unit-change bypass, explicit Calculate, Reset and independent arithmetic. Unsupported-unit defense included; no invented engineering limit. Nine final discovery checks verify affected Latest uniqueness and sitemap dates against maintained Tool/Home metadata.
- Prior 2,254 assertions retained; **3,254 combined pass**. Static audit: 108 HTML, 86 sitemap URLs, 1,223 local targets, 14 JS syntax checks, no detected missing-target/maintained SEO/JSON-LD error. All 86 maintained URLs reachable from Home initial HTML within two links.
- Actual local browser all four Tools: default/SI calculations, Calculate, Reset, actual clipboard contents; valid edits clear results and block Copy/Print, below-minimum input stays invalid after unit change. Valid Print captures complete current inputs/results in both unit systems using local-only dialog instrumentation; invalid Print does not increment the print call count. No native PDF-pagination claim; shared Print assets unchanged.
- Independent examples: 2,000×4/8 = 1,000 RPM; 1,750 RPM with 101.6/203.2 mm = 875 RPM / 9.31 m/s; target driver 116.114 mm; belt 101.6/203.2 mm with 508 mm centers = 1,499.86 mm and 168.5°/191.5° wrap; fan 800→880 RPM scales 1,000 m³/h /100 Pa /2 kW to 1,100 /121 /2.662. Signed speed/power reductions remain valid.
- Local four Tools + healthy Load + Home at actual 390/768/900/1024/1280/1440: **36 checks**, one visible H1, no off-screen controls/document overflow/nonfinite results. Real mobile/desktop screenshots inspected across all four forms; console has no captured warning/error. Current normal localhost server reused, no installation/security change.
- Protected post-footer Home badge exact comparison and final Git diff are checked before commit. Contact canghun13@naver.com and GA4 G-EDV0PS9MP3 remain unchanged; no unrelated user work touched.

## Technical source

[Greenheck Fan Fundamentals](https://content.greenheck.com/public/DAMProd/Original/10002/FanFundamentals.pdf) and [Greenheck Fan Performance Tables/Fan Laws](https://webcontent.greenheck.com/atg-cms-prod/docs/librariesprovider2/application-articles/application-articles/perf_basics.pdf) official technical search evidence checked November 16: retained same-system flow/speed, pressure/speed² and brake-power/speed³ relationships. Existing Gates/USBR references preserved. No formula change, universal sheave turns, motor-current conversion, OEM clearance, paid-standard value or drive safety approval added.

## Deployment

- Application implementation `dba9e998210fb69be1e63c4ad1149e4b4d95ce73` pushed. Final XML inspection found four existing Belt sitemap entries had no lastmod, so the initial replacement only updated Home. Completed scoped correction `09df3b2d0f4de2b724121896a399eca5bad9a2fc` adds those four dates; XML confirms exactly five November 16 entries. Nine regression checks added before closure to prevent missing dates/duplicate affected Latest entries. No URL inventory change.
- [Pages run 43819678709](https://github.com/canghun13/hvactoolshub/actions/runs/43819678709) succeeded November 16 at 06:52:24 UTC for `09df3b2`. The superseded implementation run was cancelled and is not counted as accepted deployment.
- Seven public resources return HTTP 200 and exactly match source after newline/BOM normalization: four Tool HTML, versioned belt-drive.js, Home and sitemap. All five page canonicals correct. Protected badge region matches baseline exactly (1,947 characters).
- Actual public all four Tools pass default/alternate-unit Calculate, Reset, actual clipboard readback and stale-result blocking. Every valid edit clears old results, invalid Copy leaves clipboard unchanged, invalid Print returns valid-result guidance. Twenty-eight below-minimum/unit-change combinations across every numeric input and both unit selections remain empty. Fan Pulley 2,000×4/8 now recalculates to **1,000 RPM**. A stalled initial QA tab/batch was discarded, not counted; fresh same-browser acceptance passed without settings changes or a new browser environment.
- Production four changed Tools + healthy Load + Home at actual 390/768/900/1024/1280/1440: **36 responsive checks** pass, one visible H1, no off-screen controls/document overflow/nonfinite results. Public mobile/desktop screenshots inspected, console has no captured warning/error. Mobile Contact navigation works. Home Latest begins the four unique November 16 cards before November 9 Load.
- Valid Print input/result summary checks remain the local US/SI instrumentation proof above; shared Print assets unchanged, no new public/native PDF-pagination claim. QA viewport reset, temporary working tab closed and server stopped. No further application correction needed.
- Final test/research/handover closure is committed and pushed separately; final response reports SHA only after local HEAD = fetched origin/main = actual remote main, clean and 0/0. This week's FIX is accepted; Google indexing recovery remains unverified as stated above.

## Next state

1. Check fresh indexing and post-repair crawl/validation evidence; do not infer indexed totals or recovery from stable exclusion counts.
2. Revisit existing growth only when query/interactive-gap evidence is new; existing adjustable-sheave direction guidance already exists and proprietary limits must not be invented.
3. At the next weekly decision, choose one actual defect, strong existing task gap or genuinely new broad discovery branch; no forced URL growth or repeat audit solely because traffic is low.
