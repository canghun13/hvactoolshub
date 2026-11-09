# HVAC Tools Hub — November 9, 2026 weekly review

## Baseline and decision

- Repository: `canghun13/hvactoolshub`, branch `main`; starting local HEAD, fetched origin/main and actual remote main all `2e9ccaa2136a2bfb29f753f6b063c7eb3dde9285`, ahead/behind 0/0, clean tree. Existing child checkout reused; no other checkout, credentials, environment installation or configuration changed.
- Current request, complete handover, recent review and maintained inventory checked before changes. Inventory remains 108 HTML files / 86 maintained URLs: 30 Tools, 25 Guides, 10 Comparisons, 12 References, four hubs, Home and four information pages. Integrated Psychrometric Calculator and prior intentional Load/Airflow/Duct merges remain.
- **FIX — HVAC Load Calculator input/result validation corrected.** One demonstrated Priority A defect takes precedence over growth/expansion work. This is not an indexing-cause diagnosis or a new cluster.

## Current-session sources and scope

All six supplied files were readable, parsed without modifying originals. Only the current supplied reports were opened; previous-week comparisons below come from the committed November 3 review, not old raw reports.

| Source | Actual scope |
|---|---|
| hvactoolshub.com-Performance-on-Search-2026-11-09.zip | Web/text, last three months; 92 daily rows, August 8–November 7 |
| hvactoolshub.com-Coverage-Drilldown-2026-11-09.zip | Discovered—currently not indexed; 85 chart rows August 14–November 6, 38 detail URLs |
| hvactoolshub.com-Coverage-Validation-2026-11-09.zip | Crawled—currently not indexed validation cohort: 43 pending rows; no trend chart/status endpoint |
| hvactoolshub.com_PageTrafficReport_2026. 11. 9..csv | Supplementary page export, 51 rows; engine and measurement window unspecified |
| hvactoolshub.com_KeywordReport_2026. 11. 9..csv | Supplementary query export, 455 rows; engine and measurement window unspecified |
| 보고서_개요.csv | GA4 October 12–November 8; overview, first-user source and session-source tables |

### GSC performance

- 19 impressions, zero clicks, 0% CTR. Impression-weighted mean of rounded daily positions is approximately 16.64, not a raw property headline field.
- November 1–7: two impressions / zero clicks; October 25–31: zero / zero. The rolling three-month total was 18 in the prior export; shifted windows prevent treating 18→19 as a matched weekly growth rate.
- One visible query: `hvac takeoff calculator`, one impression, zero clicks, position 60. Query rows are incomplete relative to property totals; this does not establish a new takeoff cluster opportunity.
- Page rows: Home 18 impressions / position 14.72; BTU Formula 2 / 6; CFM per Square Foot 2 / 7; Superheat Guide 1 / 1; Common Refrigeration Units 1 / 10; Duct Velocity Guide 1 / 52. Page/query totals must not be added to the daily property total.
- United States 17 impressions; Thailand and Philippines one each. Desktop 18 impressions; mobile one.

### Indexing evidence

- Discovered exclusions remain **38**, now with chart status through **November 6** (prior review's endpoint October 23). Detail crawl dates are 1970 sentinel values, not real recent crawls.
- The other ZIP is a **43-URL validation cohort**, every row pending (`접수중`), without an overall Crawled-exclusion trend chart or fresh endpoint. Latest listed crawl is September 25, before the October 22 discovery repair. Do not label this a November 6 total of all Crawled exclusions or assert identical cohort membership from the count alone.
- No current indexed-total export, authenticated URL Inspection, Google-selected canonical, host history, manual-action status or recrawl submission is available. Recovery is **not confirmed**. The historical October 12 indexed count of five is not today's indexed count.
- Existing initial-HTML discovery fixes remain in place. Stable exclusions alone do not justify another blanket TLS/canonical/robots rewrite; the calculator defect below is not claimed to cause deindexing.

### Supplementary signals

- Page report: 51 rows, 873 impressions, 22 clicks. Query report: 455 rows, 660 impressions, 22 clicks. Numeric row parsing has no rejected rows. Different report grains and unknown engine/window: do not combine either with GSC or with one another.
- Leading pages: What Is CFM 156/1, What Is BTU 114/0, Duct Area 110/1, Belt Guide 74/2, ACH Guide 40/0, Fan Pulley 37/3, Motor Sheave 31/4, Fan Belt Reference 27/2 (impressions/clicks).
- `formula to set adjustable sheave for fan`: 22 impressions, no clicks, position 1.5. Minimum driven-sheave/BHP question: six impressions / one click, position 3.33. These support a future existing Belt-workflow review, not automatic equipment approval or a duplicate calculator.
- Prior supplementary totals were page 723/19 and query 556/19. Unknown measurement windows prevent attributing the differences to this week's Google organic growth.

### GA4

- October 12–November 8: 69 active users, 66 new, 67.19 seconds average engagement, 614 events.
- First-user source: Direct 54, Bing organic 12, Yahoo three. Sessions: Direct 65, Bing 15, Yahoo four. Google organic and meaningful genuine referral rows are unavailable, not proven zero.
- Singapore 31 users; calculator/page activity includes previous production QA. Refrigeration views after the November 3 tests are not independent evidence of organic demand. Current QA may also enter analytics.
- Prior October 6–November 2 report: 59 active, 56 new, 64.29 seconds, 530 events. Shifted periods and QA contamination preclude a clean weekly organic-growth claim.

## Technical defect: evidence before change

- Public target: `/tool/hvac-load-calculator.html`; deployed HTML and load.js matched baseline source, HTTP 200. Healthy control: Refrigeration Capacity correctly clears all results above its existing maximum.
- Public lighting `1e308` produced infinity in load, tons, kW and CFM, and actual Copy exported infinity. Height `0.5`, below native minimum 1, produced a normal result. Lighting `123.5 W` produced a live result but Calculate was stopped by the integer-default HTML step constraint.
- Root cause: live calculation skipped existing native required/min/max/step validity; intermediate/final finite validation was missing; six continuous component controls omitted `step="any"`. No invented engineering boundary or coefficient was necessary.
- Scope: one Load Tool and its dedicated script. Optional blank components retain their existing zero convention; genuinely absent components and legitimate all-zero loads remain valid. Required dimensions/delta T still require valid positive values.

## Existing growth candidates / expansion

| Candidate | Evidence / current gap | Decision |
|---|---|---|
| Belt/sheave workflow | Supplementary 74/2 guide, 37/3 pulley; 22-impression adjustment formula query | Stronger demand signal merits next review, but no new missing function established this session; existing motor/OEM limits preserved |
| CFM definition / Duct Area | Supplementary 156/1 and 110/1 | Existing recent upgrades retained; no newly demonstrated mode missing |
| BTU lookup | Maintained table and converter already cover lookup intent | No duplicate page justified |

No fabricated candidate scores. Expansion considered at decision-tree level, discovery branch not entered because confirmed Priority A takes precedence. Current implemented/excluded families reviewed in handover/recent research; no renamed rejected family, 40-family discovery funnel, scored expansion NO-GO or new cluster claimed. Low traffic alone is not an expansion veto.

## Changes

- `assets/js/load.js`: check existing native validity and supported unit before calculation; atomically reject nonfinite/invalid derived results before output. Retain formulas, factors, ranges, defaults, precision, Copy/Reset/Print listeners and result markup.
- `tool/hvac-load-calculator.html`: six continuous component controls receive `step="any"`; request `load.js?v=20261109-validation`; November 9 visible/meta/schema modification and July 16 creation metadata. Stable title, description, H1, URL and canonical.
- Home initial-HTML Latest starts with the actual November 9 Load update before November 3 changes. Protected post-footer badge region unchanged. No CSS, shared Header/Footer/Print assets, global layout or generator change.
- Sitemap still 86 URLs; only Home and Load lastmod updated. Existing hubs already list Load, so no duplicate category card. llms.txt and robots reviewed, unchanged: no public URL added, deleted or merged.
- New dependency-free `tests/load-validation.cjs`; this report and handover append. No new production URL/content cluster.

## QA before deployment

- New test first failed against baseline on below-minimum height, then passes **433 assertions**. Both unit systems, native bounds, required blank, nonfinite/overflow, fractional components, optional blank/zero, Reset and independent examples covered.
- Prior Refrigeration 461 + BTU 383 + Duct 561 + Airflow 85 + Equivalent Reference 14 + discovery 317 remain passing: **2,254 combined assertions**.
- Static audit: 108 HTML, 86 sitemap URLs, 1,221 local targets, 14 JS syntax checks; no detected missing targets/maintained SEO/JSON-LD errors. All 86 maintained URLs remain reachable from Home's initial HTML within two steps. XML/llms URL consistency and robots checked.
- Actual browser US fixture: envelope 1000, solar 200, people 100 BTU/h, lights 100 W, equipment 50 W, outdoor air 100 CFM, outdoor/supply delta T 20°F → cooling 3,971.8 BTU/h, heating 3,160 BTU/h, sensible airflow 183.9 CFM. Actual Copy returns all three outputs and units.
- SI fixture: 100 m², 2.5 m, outdoor air 100 m³/h, both delta T 10°C, other components zero → cooling/heating 1,144.2 BTU/h, 58.9 CFM, volume 8,828.7 ft³. Decimal 123.5 W → 421.4 BTU/h and 19.5 CFM; Calculate now submits normally.
- Actual invalid `1e308` and height 0.5 clear stale outputs. Invalid Copy/Print blocked. Reset clears results; valid recalculation supported. Local valid Print produces complete current-input summary (unit selector plus ten numeric fields) and three results; invalid Print does not invoke native printing. Local-only dialog shim used, not deployed. Shared print CSS/JS unchanged; no new native PDF-pagination acceptance claimed.
- Local Load + healthy Refrigeration Capacity + Home at actual 390/768/900/1024/1280/1440: **18 responsive checks**, no off-screen controls/document overflow; screenshots inspected at mobile/desktop; no captured warning/error. Local server initially required normal execution permission, then responded HTTP 200; no install, firewall or security configuration changed.

## Formula sources and limits

- [CaptiveAire sensible/latent CFM technical tool](https://toolbox.captiveaire.com/cooling/sensible-latent-cfm): sensible airflow = load / (1.08 × |delta T in °F|) at standard air density. The retained 1.08 factor is not universal at altitude or other air conditions; this remains a preliminary sensible component worksheet, not latent/total-load design.
- [Trane product technical catalog](https://elibrary.tranetechnologies.com/public/residential-hvac/Literature/Product%20Catalog/22-8301-38_08092025.pdf): official search evidence retains HS = CFM × 1.08 × delta T.
- [DOE rulemaking unit-conversion material](https://public-inspection.federalregister.gov/2022-04017.pdf): official conversion evidence about 3.412142 BTU/h per watt. Existing higher-precision conversion retained unchanged.
- Existing ACCA Manual J and DOE sizing references remain on target page. No area multiplier, design approval, refrigerant data, occupancy coefficient or universal airflow requirement added.

## Deployment

- Implementation `82d72ffca71cd5ec15d72b99c4e584545dad9ca0` pushed to main. [Pages run 42583871875](https://github.com/canghun13/hvactoolshub/actions/runs/42583871875) completed successfully November 9 at 08:09:42 UTC. An earlier in-progress state was not treated as acceptance.
- Four public resources return HTTP 200 and match committed source after newline/BOM normalization: Load Tool HTML, versioned load.js, Home, sitemap. Home and Load canonicals exactly match their intended public URLs.
- Actual public browser verifies US 3,971.8 / 3,160 BTU/h / 183.9 CFM, SI 1,144.2 / 1,144.2 / 58.9, actual clipboard readback, Reset-empty state, fractional 123.5 W submission and infinity-result clearing. Twenty-six native upper-bound/required-blank cases across IP/SI clear all outputs with guidance. Invalid Copy/Print remain blocked. Valid native Print-summary acceptance was local as documented above; no public PDF-pagination claim.
- Production responsive Load + healthy Refrigeration Capacity + Home: 18 actual-width checks at 390/768/900/1024/1280/1440, no off-screen controls/document overflow, screenshots inspected and no captured console warning/error. Load's hidden generated print-document H1 is not a second visible page heading; a fresh page verifies one visible H1 at every width. Primary navigation at 390 reaches Contact correctly. Public Home Latest begins with the November 9 Load card before November 3 updates.
- No follow-up application patch needed. QA viewport reset, working QA tab closed, task server stopped; no security configuration changed. The failed earlier temporary localhost tab was an internal network-error page, not a production TLS/security failure, and was not bypassed.
- Final documentation push is checked separately by local HEAD = fetched origin/main = actual remote main, 0/0 and clean tree; completion SHA is reported in the final response. The scoped application FIX/deployment is complete. Google indexing recovery remains unverified for the evidence reasons above.

## Protected areas and next state

- Home user-managed badge/footer content exact-equal to baseline; contact remains `canghun13@naver.com`; GA4 remains `G-EDV0PS9MP3`. No unrelated user work, other project, installs, credentials, AdSense or directory work changed.
1. Check genuinely fresh indexing/validation outcome and crawl evidence, without inferring recovery from pending cohorts.
2. Review the growing existing Belt/sheave query workflow for an actual unserved task, retaining OEM/motor safety boundaries.
3. Next weekly decision: one demonstrated fix, strong existing gap or genuinely new expansion branch; do not repeat completed audits without new evidence.
